/**
 * 튜토리얼 데이터·화면 검증
 * 새 튜토리얼을 넣었을 때 목록·상세가 실제로 뜨는지 확인한다.
 */
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import { tutorials } from '@/data/tutorials.js';
import { routes } from '@/router.js';
import TutorialsView from '@/views/TutorialsView.vue';
import TutorialView from '@/views/TutorialView.vue';

const VALID_BLOCKS = ['heading', 'paragraphs', 'list', 'table', 'examples', 'alphabet', 'links'];

describe('튜토리얼 데이터', () => {
  it('필수 필드가 모두 있다', () => {
    expect(tutorials.length).toBeGreaterThan(1);
    const ids = new Set();
    for (const t of tutorials) {
      ['id', 'emoji', 'title', 'subtitle', 'summary'].forEach(k =>
        expect(t[k], `${t.id}: ${k} 누락`).toBeTruthy()
      );
      expect(ids.has(t.id), `id 중복: ${t.id}`).toBe(false);
      ids.add(t.id);
      expect(t.sections.length).toBeGreaterThan(0);
    }
  });

  it('알 수 없는 블록 타입이 없다', () => {
    for (const t of tutorials) {
      for (const s of t.sections) {
        for (const key of Object.keys(s)) {
          expect(VALID_BLOCKS, `${t.id}: 처리되지 않는 블록 '${key}'`).toContain(key);
        }
      }
    }
  });

  it('표는 모든 행의 칸 수가 머리글과 같다', () => {
    for (const t of tutorials) {
      for (const s of t.sections) {
        if (!s.table) continue;
        const n = s.table.headers.length;
        s.table.rows.forEach((r, i) =>
          expect(r.length, `${t.id}/${s.heading} ${i}번째 행`).toBe(n)
        );
      }
    }
  });
});

describe('튜토리얼 화면', () => {
  const router = createRouter({ history: createWebHashHistory(), routes });

  it('목록에 모든 튜토리얼이 나온다', async () => {
    const w = mount(TutorialsView, { global: { plugins: [createPinia(), router] } });
    await w.vm.$nextTick();
    tutorials.forEach(t => expect(w.text(), `${t.title} 누락`).toContain(t.title));
  });

  it('각 튜토리얼 상세가 내용을 렌더링한다', async () => {
    for (const t of tutorials) {
      const w = mount(TutorialView, {
        props: { tutorialId: t.id },
        global: { plugins: [createPinia(), router] },
      });
      await w.vm.$nextTick();
      expect(w.text(), `${t.id}: 제목 없음`).toContain(t.title);
      expect(w.text(), `${t.id}: 내용 없음`).not.toContain('존재하지 않는');
      // 모든 섹션 제목이 화면에 있어야 한다
      t.sections.forEach(s => {
        if (s.heading) expect(w.text(), `${t.id}: '${s.heading}' 누락`).toContain(s.heading);
      });
    }
  });

  it('튜토리얼은 학습 진도에 영향을 주지 않는다', async () => {
    const pinia = createPinia();
    const { useProgressStore } = await import('@/stores/progress.js');
    const progress = useProgressStore(pinia);
    const before = progress.learnedCount;

    for (const t of tutorials) {
      const w = mount(TutorialView, {
        props: { tutorialId: t.id },
        global: { plugins: [pinia, router] },
      });
      await w.vm.$nextTick();
    }
    expect(progress.learnedCount, '튜토리얼을 열었는데 진도가 올라감').toBe(before);
  });
});
