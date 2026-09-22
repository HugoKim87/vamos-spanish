import { createRouter, createWebHashHistory } from 'vue-router';

/**
 * 해시 라우터를 쓰는 이유:
 *  - 별도 서버 설정 없이 정적 배포/로컬 미리보기에서 바로 동작
 *  - 나중에 서버가 생기면 createWebHistory로 한 줄만 바꾸면 됨
 */
/**
 * 지연 로딩 안전장치
 * ---------------------------------------------------------------
 * 각 화면은 별도 JS 청크로 나뉘어 클릭하는 순간 내려받는다.
 * 새로 배포하면 청크 파일 이름(해시)이 바뀌는데, 브라우저가 예전 index.html을
 * 캐시에 갖고 있으면 이미 사라진 파일을 요청해 404가 난다.
 *
 * 이때 import()가 조용히 실패해 "버튼을 눌러도 아무 일이 없는" 상태가 된다.
 * 학습 화면은 6개 모드가 한 청크에 들어 있어 한 번 실패하면 6개가 동시에 죽는다.
 *
 * 그래서 실패하면 한 번 재시도하고, 그래도 안 되면 페이지를 새로 받아 온다.
 */
function lazy(loader) {
  return () =>
    loader().catch(async err => {
      console.warn('화면을 불러오지 못해 다시 시도합니다.', err);
      try {
        return await loader();
      } catch {
        // 캐시된 예전 index.html 때문이므로 강제로 새로 받아 온다 (무한 새로고침 방지)
        const KEY = 'vamos.chunkReload';
        if (!sessionStorage.getItem(KEY)) {
          sessionStorage.setItem(KEY, '1');
          window.location.reload();
        }
        throw err;
      }
    });
}

// 정상적으로 화면이 뜨면 새로고침 표시를 지운다
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    try { sessionStorage.removeItem('vamos.chunkReload'); } catch { /* 무시 */ }
  });
}

export const routes = [
  { path: '/', name: 'home', component: lazy(() => import('@/views/HomeView.vue')) },
  {
    // ⚠️ 'key'는 Vue의 예약 prop이라 컴포넌트로 전달되지 않는다. 반드시 다른 이름을 쓴다.
    path: '/theme/:themeKey',
    name: 'theme',
    component: lazy(() => import('@/views/ThemeView.vue')),
    props: true,
  },
  {
    path: '/browse',
    name: 'browse',
    component: lazy(() => import('@/views/BrowseView.vue')),
  },
  {
    path: '/tutorials',
    name: 'tutorials',
    component: lazy(() => import('@/views/TutorialsView.vue')),
  },
  {
    path: '/tutorial/:tutorialId',
    name: 'tutorial',
    component: lazy(() => import('@/views/TutorialView.vue')),
    props: true,
  },
  {
    path: '/study/:mode',
    name: 'study',
    component: lazy(() => import('@/views/StudyView.vue')),
    props: route => ({
      mode: route.params.mode,
      theme: route.query.theme || '',
      lessonId: route.query.lesson || '',
      types: route.query.types ? String(route.query.types).split(',') : [],
    }),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

/** 화면 로딩 실패는 조용히 넘어가면 안 된다 — 원인을 남긴다 */
router.onError(err => {
  console.error('화면 이동 중 오류:', err);
});

/**
 * GA4 페이지뷰 — 해시 라우터라 실제 URL(location.href)이 안 바뀌므로
 * index.html에서 자동 pageview를 끄고 여기서 라우트 전환마다 직접 보낸다.
 *
 * failure를 확인하는 이유: 이미 보고 있는 메뉴를 또 누르면 vue-router가
 * "중복 이동"으로 처리하는데, 그대로 두면 화면은 그대로인데 방문수만 부풀려진다.
 */
router.afterEach((to, _from, failure) => {
  if (failure) return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: to.fullPath,          // 예: /browse, /theme/food
    page_title: document.title,
    page_location: window.location.href,
  });
});
