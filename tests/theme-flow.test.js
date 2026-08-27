/**
 * 사용자 화면과 동일한 상태를 재현해 6개 학습 모드를 실제로 눌러본다.
 * (테마=음식&식당, 레슨=식당 예약, 유형=명사 → 3장)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import ThemeView from '@/views/ThemeView.vue';
import StudyView from '@/views/StudyView.vue';

const LABEL = {
  flashcards: '낱말카드', learn: '학습하기', dictation: '받아쓰기',
  conjugation: '동사 활용', test: '테스트', match: '카드 맞추기',
};

function makeRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div/>' } },
      { path: '/theme/:themeKey', name: 'theme', component: ThemeView, props: true },
      {
        path: '/study/:mode', name: 'study', component: StudyView,
        props: r => ({
          mode: r.params.mode,
          theme: r.query.theme || '',
          lessonId: r.query.lesson || '',
          types: r.query.types ? String(r.query.types).split(',') : [],
        }),
      },
    ],
  });
}

beforeEach(() => setActivePinia(createPinia()));

describe('학습 세트를 좁힌 상태에서 모드 실행', () => {
  it('레슨+유형을 고른 뒤 6개 버튼이 모두 눌린다', async () => {
    const router = makeRouter();
    await router.push('/theme/food');
    await router.isReady();

    const w = mount(ThemeView, { props: { themeKey: 'food' }, global: { plugins: [router] } });
    await w.vm.$nextTick();

    // 식당 예약 레슨 선택
    const lesson = w.vm.lessonCounts.find(l => l.title.includes('식당 예약'));
    expect(lesson, '식당 예약 레슨 칩이 없음').toBeTruthy();
    w.vm.selectedLesson = lesson.id;
    await w.vm.$nextTick();

    // 명사 유형 선택
    const noun = w.vm.typeCounts.find(t => t.key === 'noun');
    expect(noun, '명사 유형 칩이 없음').toBeTruthy();
    w.vm.toggleType('noun');
    await w.vm.$nextTick();

    expect(w.vm.currentCards.length).toBe(noun.count);
    expect(w.vm.currentCards.length).toBeGreaterThan(0);

    const btns = w.findAll('.mode-btn');
    expect(btns.length).toBe(6);

    // 각 버튼의 활성 여부 확인
    const disabled = [];
    btns.forEach(b => {
      const label = Object.entries(LABEL).find(([, v]) => b.text().includes(v))?.[0];
      if (b.attributes('disabled') !== undefined) disabled.push(label);
    });
    // 명사만 골랐으니 동사 활용만 비활성인 게 정상
    expect(disabled, `예상 외 비활성 버튼: ${disabled}`).toEqual(['conjugation']);
  });

  it('좁힌 조건으로 각 모드가 실제 내용을 렌더링한다', async () => {
    for (const mode of Object.keys(LABEL)) {
      setActivePinia(createPinia());
      const router = makeRouter();
      const query = { theme: 'food', lesson: 'day57' };
      // 동사 활용은 동사가 있어야 하므로 유형을 verb로
      if (mode === 'conjugation') query.types = 'verb';
      else query.types = 'noun';

      await router.push({ name: 'study', params: { mode }, query });
      await router.isReady();

      const w = mount(StudyView, {
        props: {
          mode, theme: 'food', lessonId: 'day57',
          types: [query.types],
        },
        global: { plugins: [router] },
      });
      await w.vm.$nextTick();
      await new Promise(r => setTimeout(r, 0));

      expect(w.text(), `${mode}: 카드 없음 화면이 떴다`).not.toContain('카드가 없어요');
      const area = w.find('.mode-area');
      expect(area.exists(), `${mode}: 학습 영역이 없다`).toBe(true);
      expect(area.text().length, `${mode}: 내용이 비어 있다`).toBeGreaterThan(10);
      // 조작 가능한 요소가 하나라도 있어야 한다
      const interactive = area.findAll('button, input');
      expect(interactive.length, `${mode}: 누를 수 있는 요소가 없다`).toBeGreaterThan(0);
    }
  });
});
