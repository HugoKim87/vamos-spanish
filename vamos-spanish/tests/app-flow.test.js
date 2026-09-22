/**
 * 앱 전체를 실제 라우터로 띄워 화면 이동을 검증한다.
 * 앱 인스턴스를 하나만 만들고 그 안에서 순서대로 이동한다.
 * (앱을 여러 번 마운트하면 라우터 상태가 섞여 첫 이동이 취소된다)
 */
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from '@/App.vue';
import { routes } from '@/router.js';

const MODES = {
  flashcards: '낱말카드', learn: '학습하기', dictation: '받아쓰기',
  conjugation: '동사 활용', test: '테스트', match: '카드 맞추기',
};

async function settle(w, ms = 80) {
  await new Promise(r => setTimeout(r, ms));
  await w.vm.$nextTick();
}

/**
 * 화면은 별도 청크로 지연 로딩되므로 이동이 끝날 때까지 기다린다.
 * 고정 시간으로 기다리면 느린 환경에서 헛되이 실패한다.
 */
async function waitRoute(w, router, name, timeout = 5000) {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    if (router.currentRoute.value.name === name) {
      await settle(w, 30);
      return true;
    }
    await settle(w, 20);
  }
  return false;
}

describe('앱 전체 화면 이동', () => {
  it('홈 → 테마 → 각 학습 모드 → 모든 단어 → 튜토리얼이 모두 채워진다', async () => {
    const router = createRouter({ history: createWebHashHistory(), routes });
    const w = mount(App, { global: { plugins: [createPinia(), router] } });
    await router.isReady();
    await settle(w);

    // 홈
    expect(w.find('main').text().length, '홈이 비었다').toBeGreaterThan(20);

    // 테마
    await router.push({ name: 'theme', params: { themeKey: 'food' } });
    await waitRoute(w, router, 'theme');
    expect(w.find('main').text(), '테마 화면이 안 뜬다').toContain('학습 세트 만들기');
    expect(w.findAll('.mode-btn').length, '모드 버튼이 6개가 아니다').toBe(6);

    // 각 모드를 버튼 클릭으로 진입 → 확인 → 테마로 복귀
    for (const [mode, label] of Object.entries(MODES)) {
      await router.push({ name: 'theme', params: { themeKey: 'food' } });
      await waitRoute(w, router, 'theme');

      const btn = w.findAll('.mode-btn').find(b => b.text().includes(label));
      expect(btn, `${label} 버튼 없음`).toBeTruthy();
      expect(btn.attributes('disabled'), `${label} 버튼이 비활성`).toBeUndefined();

      await btn.trigger('click');
      const ok = await waitRoute(w, router, 'study');
      expect(ok, `${label}: 학습 화면으로 이동하지 못함`).toBe(true);
      expect(router.currentRoute.value.params.mode).toBe(mode);

      const main = w.find('main');
      expect(main.text(), `${label}: 카드 없음 화면`).not.toContain('카드가 없어요');
      expect(main.findAll('button, input').length, `${label}: 조작 요소 없음`).toBeGreaterThan(1);
    }

    // 모든 단어
    await router.push({ name: 'browse' });
    await waitRoute(w, router, 'browse');
    expect(w.find('main').findAll('li').length, '단어 목록이 비었다').toBeGreaterThan(0);

    // 튜토리얼
    await router.push({ name: 'tutorial', params: { tutorialId: 'alfabeto' } });
    await waitRoute(w, router, 'tutorial');
    expect(w.find('main').text(), '튜토리얼이 안 뜬다').toContain('알파벳');
  }, 30000);
});
