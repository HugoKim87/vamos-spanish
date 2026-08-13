import { createRouter, createWebHashHistory } from 'vue-router';

/**
 * 해시 라우터를 쓰는 이유:
 *  - 별도 서버 설정 없이 정적 배포/로컬 미리보기에서 바로 동작
 *  - 나중에 서버가 생기면 createWebHistory로 한 줄만 바꾸면 됨
 */
const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  {
    path: '/theme/:key',
    name: 'theme',
    component: () => import('@/views/ThemeView.vue'),
    props: true,
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/views/BrowseView.vue'),
  },
  {
    path: '/study/:mode',
    name: 'study',
    component: () => import('@/views/StudyView.vue'),
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
