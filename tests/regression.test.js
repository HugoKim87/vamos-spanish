/**
 * 눈으로만 확인되던 문제들을 테스트로 고정한다.
 *  1) 낱말카드를 넘길 때 다음 카드의 뜻이 먼저 스쳐 보이면 안 된다
 *  2) 주관식 입력창은 클릭 없이 바로 입력할 수 있어야 한다
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import FlashcardMode from '@/components/modes/FlashcardMode.vue';
import LearnMode from '@/components/modes/LearnMode.vue';
import ConjugationMode from '@/components/modes/ConjugationMode.vue';
import DictationMode from '@/components/modes/DictationMode.vue';
import { useVocabularyStore } from '@/stores/vocabulary.js';

let vocab;
beforeEach(() => {
  setActivePinia(createPinia());
  vocab = useVocabularyStore();
});

const cards = () => vocab.buildSet({ theme: 'food' }).slice(0, 20);

describe('낱말카드 — 정답이 먼저 보이지 않는다', () => {
  it('뒤집은 상태에서 다음 카드로 넘기면 앞면부터 보인다', async () => {
    const w = mount(FlashcardMode, { props: { cards: cards(), setKey: 't' } });
    await w.vm.$nextTick();

    // 뒤집어서 뜻을 본 뒤
    await w.find('.card-area').trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.flipped, '카드가 뒤집히지 않음').toBe(true);

    // 다음 카드로
    const before = w.vm.index;
    await w.find('.controls').findAll('button').at(-1).trigger('click');
    await w.vm.$nextTick();

    expect(w.vm.index, '다음 카드로 넘어가지 않음').toBe(before + 1);
    expect(w.vm.flipped, '다음 카드가 뒤집힌 채로 시작함').toBe(false);
  });

  it('넘기는 순간에는 뒤집기 애니메이션을 끈다', async () => {
    const w = mount(FlashcardMode, { props: { cards: cards(), setKey: 't' } });
    await w.vm.$nextTick();

    await w.find('.card-area').trigger('click');
    await w.vm.$nextTick();

    await w.find('.controls').findAll('button').at(-1).trigger('click');
    await w.vm.$nextTick();

    // 애니메이션이 켜져 있으면 되돌아가는 0.55초 동안 뒷면(뜻)이 보인다
    expect(w.vm.skipFlipAnim, '전환 중 회전 애니메이션이 켜져 있음').toBe(true);
    expect(w.find('.flip').classes(), 'no-anim 클래스가 붙지 않음').toContain('no-anim');
  });

  it('어려움 표시 후 넘겨도 뜻이 먼저 보이지 않는다', async () => {
    const w = mount(FlashcardMode, { props: { cards: cards(), setKey: 't' } });
    await w.vm.$nextTick();

    await w.find('.card-area').trigger('click');
    await w.vm.$nextTick();

    const hard = w.findAll('button').find(b => b.text().includes('어려움'));
    expect(hard, '어려움 버튼 없음').toBeTruthy();
    await hard.trigger('click');
    await w.vm.$nextTick();

    await w.find('.controls').findAll('button').at(-1).trigger('click');
    await w.vm.$nextTick();

    expect(w.vm.flipped, '어려움 표시 후 넘기면 뒤집힌 채로 시작함').toBe(false);
    expect(w.find('.flip').classes()).toContain('no-anim');
  });
});

describe('주관식 — 클릭 없이 바로 입력된다', () => {
  it('동사 활용: 입력창에 자동으로 커서가 놓인다', async () => {
    const w = mount(ConjugationMode, {
      props: { verbs: vocab.verbCards.slice(0, 3) },
      attachTo: document.body,
    });
    await w.vm.$nextTick();
    await new Promise(r => setTimeout(r, 20));

    expect(document.activeElement, '입력창에 커서가 없음').toBe(w.find('input').element);
    w.unmount();
  });

  it('받아쓰기: 입력창에 자동으로 커서가 놓인다', async () => {
    const w = mount(DictationMode, {
      props: { cards: cards() },
      attachTo: document.body,
    });
    await w.vm.$nextTick();
    await new Promise(r => setTimeout(r, 20));

    expect(document.activeElement, '입력창에 커서가 없음').toBe(w.find('input').element);
    w.unmount();
  });

  it('학습하기 단답형: 입력창에 자동으로 커서가 놓인다', async () => {
    const w = mount(LearnMode, {
      props: { cards: cards(), setKey: 't' },
      attachTo: document.body,
    });
    await w.vm.$nextTick();

    let guard = 0;
    while (w.vm.current?.type !== 'fill' && guard++ < 30) {
      w.vm.nextQuestion();
      await w.vm.$nextTick();
    }
    expect(w.vm.current?.type).toBe('fill');
    await new Promise(r => setTimeout(r, 20));

    expect(document.activeElement, '단답형 입력창에 커서가 없음')
      .toBe(w.find('input.fill').element);
    w.unmount();
  });

  it('다음 문제로 넘어가도 커서가 유지된다', async () => {
    const w = mount(ConjugationMode, {
      props: { verbs: vocab.verbCards.slice(0, 3) },
      attachTo: document.body,
    });
    await w.vm.$nextTick();
    await new Promise(r => setTimeout(r, 20));

    // 정답 입력 → 채점 → 다음
    await w.find('input').setValue(w.vm.current.answer);
    await w.findAll('button').find(b => /확인/.test(b.text())).trigger('click');
    await w.vm.$nextTick();
    await w.findAll('button').find(b => /다음/.test(b.text())).trigger('click');
    await w.vm.$nextTick();
    await new Promise(r => setTimeout(r, 20));

    expect(document.activeElement, '다음 문제에서 커서가 풀림')
      .toBe(w.find('input').element);
    w.unmount();
  });
});

describe('낱말카드 — 동사는 활용까지 보여준다', () => {
  it('동사 카드 뒷면에 6인칭 활용이 나온다', async () => {
    const verb = vocab.allCards.find(c => c.type === 'verb' && c.es === 'barrer');
    const w = mount(FlashcardMode, { props: { cards: [verb], setKey: 't' } });
    await w.vm.$nextTick();

    // 앞면에는 활용이 보이면 안 된다 (뜻·활용을 먼저 노출하면 학습이 안 된다)
    expect(w.find('.front').text()).not.toContain('barremos');

    await w.find('.card-area').trigger('click');
    await w.vm.$nextTick();

    const back = w.find('.back').text();
    ['barro', 'barres', 'barre', 'barremos', 'barréis', 'barren']
      .forEach(f => expect(back, `${f} 누락`).toContain(f));
    expect(w.findAll('.c-item').length, '인칭이 6개가 아님').toBe(6);
  });

  it('동사가 아닌 카드에는 활용표가 없다', async () => {
    const noun = vocab.allCards.find(c => c.type === 'noun');
    const w = mount(FlashcardMode, { props: { cards: [noun], setKey: 't' } });
    await w.vm.$nextTick();
    await w.find('.card-area').trigger('click');
    await w.vm.$nextTick();
    expect(w.find('.conj').exists(), '명사 카드에 활용표가 나옴').toBe(false);
  });

  it('날씨·gustar형 동사는 쓰는 인칭만 보여주고 이유를 안내한다', async () => {
    const llover = vocab.allCards.find(c => c.es === 'llover');
    if (llover) {
      const w = mount(FlashcardMode, { props: { cards: [llover], setKey: 't' } });
      await w.vm.$nextTick();
      await w.find('.card-area').trigger('click');
      await w.vm.$nextTick();
      expect(w.findAll('.c-item').length).toBe(1);
      expect(w.find('.c-note').exists(), '안내 문구 없음').toBe(true);
    }
  });

  it('활용표를 눌러도 카드가 뒤집히지 않는다', async () => {
    const verb = vocab.allCards.find(c => c.type === 'verb');
    const w = mount(FlashcardMode, { props: { cards: [verb], setKey: 't' } });
    await w.vm.$nextTick();
    await w.find('.card-area').trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.flipped).toBe(true);

    await w.find('.conj').trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.flipped, '활용표 클릭에 카드가 다시 뒤집힘').toBe(true);
  });
});

describe('낱말카드 — 글자 크기와 레이아웃', () => {
  it('짧은 뜻과 긴 뜻에 다른 크기가 적용된다', async () => {
    const short = vocab.allCards.find(c => c.ko.length <= 6);
    const long = vocab.allCards.find(c => c.ko.length >= 26);

    const a = mount(FlashcardMode, { props: { cards: [short], setKey: 't' } });
    await a.vm.$nextTick();
    expect(a.vm.backSize).toBe('sz-lg');

    const b = mount(FlashcardMode, { props: { cards: [long], setKey: 't' } });
    await b.vm.$nextTick();
    expect(b.vm.backSize).toBe('sz-sm');
    expect(a.vm.backSize).not.toBe(b.vm.backSize);
  });

  it('모든 카드가 세 크기 중 하나를 갖는다', () => {
    const sizes = new Set(['sz-lg', 'sz-md', 'sz-sm']);
    const bad = vocab.allCards.filter(c => {
      const n = c.ko.length;
      const cls = n <= 12 ? 'sz-lg' : n <= 24 ? 'sz-md' : 'sz-sm';
      return !sizes.has(cls);
    });
    expect(bad.length).toBe(0);
  });

  it('중복된 "(1인칭: …)" 설명이 남아 있지 않다', () => {
    const left = vocab.allCards.filter(c => /\(1인칭/.test(c.ko));
    expect(left.length, `아직 ${left.length}장에 남음`).toBe(0);
  });

  it('불규칙·재귀동사 표시는 유지된다', () => {
    const irregular = vocab.allCards.filter(c => c.ko.includes('(불규칙)'));
    const reflexive = vocab.allCards.filter(c => c.ko.includes('(재귀동사)'));
    expect(irregular.length, '불규칙 표시가 사라짐').toBeGreaterThan(5);
    expect(reflexive.length, '재귀동사 표시가 사라짐').toBeGreaterThan(0);
  });
});

describe('출처 표기가 화면에 남아 있지 않다', () => {
  it('푸터·홈 화면에 표기가 없다', async () => {
    const { mount: m } = await import('@vue/test-utils');
    const { createRouter, createWebHashHistory } = await import('vue-router');
    const { routes } = await import('@/router.js');
    const App = (await import('@/App.vue')).default;
    const HomeView = (await import('@/views/HomeView.vue')).default;

    const router = createRouter({ history: createWebHashHistory(), routes });
    for (const Comp of [App, HomeView]) {
      const w = m(Comp, { global: { plugins: [createPinia(), router] } });
      await w.vm.$nextTick();
      expect(w.text(), `${Comp.__name}에 출처 표기가 남음`).not.toContain('Voca LAB');
    }
  });

  it('예문 속 이름이 Hugo로 통일돼 있다', () => {
    expect(vocab.allCards.filter(c => /Silvia|실비아/.test(c.es + c.ko)), 'Silvia가 남음').toEqual([]);
    const hugo = vocab.allCards.filter(c => c.es.includes('Hugo'));
    expect(hugo.length, '자기소개 예문이 사라짐').toBeGreaterThan(0);
  });

  it('Hugo(남성)에 맞게 직업이 남성형이다', () => {
    // Soy profesora(여성형)가 남아 있으면 이름과 성이 어긋난다
    const intro = vocab.lessons.find(l => l.day === 60).cards;
    expect(intro.some(c => c.es === 'Soy profesor de español.'), '남성형이 아님').toBe(true);
    expect(intro.some(c => c.es === 'Soy profesora de español.'), '여성형이 남음').toBe(false);
  });
});
