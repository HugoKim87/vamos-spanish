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
