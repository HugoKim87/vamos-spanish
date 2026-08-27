/**
 * 사용성 검증 — 실제로 클릭했을 때 동작하는지 확인한다.
 * 렌더링만 통과하고 클릭이 죽어 있는 경우를 잡기 위한 테스트.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';

import ThemeView from '@/views/ThemeView.vue';
import BrowseView from '@/views/BrowseView.vue';
import StudyView from '@/views/StudyView.vue';
import HomeView from '@/views/HomeView.vue';
import { useVocabularyStore } from '@/stores/vocabulary.js';

const MODES = ['flashcards', 'learn', 'dictation', 'conjugation', 'test', 'match'];

function makeRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/theme/:themeKey', name: 'theme', component: ThemeView, props: true },
      { path: '/browse', name: 'browse', component: BrowseView },
      {
        path: '/study/:mode', name: 'study', component: StudyView,
        props: route => ({
          mode: route.params.mode,
          theme: route.query.theme || '',
          lessonId: route.query.lesson || '',
          types: route.query.types ? String(route.query.types).split(',') : [],
        }),
      },
      { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
  });
}

let router;
beforeEach(async () => {
  setActivePinia(createPinia());
  router = makeRouter();
  await router.push('/');
  await router.isReady();
});

describe('테마 화면 — 학습 모드 버튼', () => {
  it('6개 모드 버튼이 모두 렌더링된다', async () => {
    const w = mount(ThemeView, {
      props: { themeKey: 'food' },
      global: { plugins: [router] },
    });
    await w.vm.$nextTick();
    const btns = w.findAll('.mode-btn');
    expect(btns.length).toBe(6);
  });

  it('각 모드 버튼을 누르면 학습 화면으로 이동한다', async () => {
    for (const mode of MODES) {
      setActivePinia(createPinia());
      const r = makeRouter();
      await r.push('/theme/food');
      await r.isReady();

      const w = mount(ThemeView, {
        props: { themeKey: 'food' },
        global: { plugins: [r] },
      });
      await w.vm.$nextTick();

      const btn = w.findAll('.mode-btn').find(b => b.text().includes(
        { flashcards: '낱말카드', learn: '학습하기', dictation: '받아쓰기',
          conjugation: '동사 활용', test: '테스트', match: '카드 맞추기' }[mode]
      ));
      expect(btn, `${mode} 버튼을 찾을 수 없음`).toBeTruthy();
      expect(btn.attributes('disabled'), `${mode} 버튼이 비활성 상태`).toBeUndefined();

      await btn.trigger('click');
      await r.isReady();
      await new Promise(res => setTimeout(res, 0));

      expect(r.currentRoute.value.name, `${mode} 클릭 후 이동 실패`).toBe('study');
      expect(r.currentRoute.value.params.mode).toBe(mode);
    }
  });

  it('유형 칩을 누르면 선택된 세트 장수가 바뀐다', async () => {
    const w = mount(ThemeView, {
      props: { themeKey: 'food' },
      global: { plugins: [router] },
    });
    await w.vm.$nextTick();
    const before = w.vm.currentCards.length;

    const chip = w.findAll('.b-row').at(1).findAll('.chip').at(1);
    await chip.trigger('click');
    await w.vm.$nextTick();

    expect(w.vm.currentCards.length).toBeLessThan(before);
    expect(w.vm.currentCards.length).toBeGreaterThan(0);
  });

  it('보이는 칩 조합은 항상 1장 이상이다', async () => {
    const w = mount(ThemeView, {
      props: { themeKey: 'food' },
      global: { plugins: [router] },
    });
    await w.vm.$nextTick();

    for (const l of w.vm.lessonCounts) {
      w.vm.selectedLesson = l.id;
      await w.vm.$nextTick();
      expect(w.vm.currentCards.length, `${l.title} 선택 시 0장`).toBeGreaterThan(0);
      for (const t of w.vm.typeCounts) {
        expect(t.count, `${l.title}/${t.label} 0장 칩이 보임`).toBeGreaterThan(0);
      }
    }
  });
});

describe('학습 화면 — 각 모드가 실제로 뜬다', () => {
  for (const mode of MODES) {
    it(`${mode} 모드가 내용을 렌더링한다`, async () => {
      const r = makeRouter();
      await r.push({ name: 'study', params: { mode }, query: { theme: 'food' } });
      await r.isReady();

      const w = mount(StudyView, {
        props: { mode, theme: 'food', lessonId: '', types: [] },
        global: { plugins: [r] },
      });
      await w.vm.$nextTick();
      await new Promise(res => setTimeout(res, 0));

      expect(w.text()).not.toContain('카드가 없어요');
      expect(w.find('.mode-area').exists(), `${mode}: 학습 영역 없음`).toBe(true);
      expect(w.find('.mode-area').text().length, `${mode}: 내용 비어 있음`).toBeGreaterThan(10);
    });
  }
});

describe('모든 단어 화면', () => {
  it('카드가 최신 Day부터 보인다', async () => {
    const w = mount(BrowseView, { global: { plugins: [router] } });
    await w.vm.$nextTick();
    const days = w.vm.grouped.map(g => g.day);
    expect(days[0]).toBeGreaterThan(days[days.length - 1]);
  });

  it('검색하면 칩이 줄어들고 결과가 나온다', async () => {
    const vocab = useVocabularyStore();
    const w = mount(BrowseView, { global: { plugins: [router] } });
    await w.vm.$nextTick();
    const themeChipsBefore = w.vm.themeChips.length;

    vocab.searchQuery = 'reserva';
    await w.vm.$nextTick();

    expect(w.vm.themeChips.length).toBeLessThan(themeChipsBefore);
    expect(w.vm.results.length).toBeGreaterThan(0);
    w.vm.themeChips.forEach(c => expect(c.count).toBeGreaterThan(0));
  });
});
