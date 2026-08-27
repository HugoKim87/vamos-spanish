/**
 * 학습 모드 내부 동작 검증 — 카드를 넘기고, 답을 고르고, 채점되는지까지 확인.
 * "화면은 뜨는데 눌러도 아무 일이 없는" 상태를 잡기 위한 테스트.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import FlashcardMode from '@/components/modes/FlashcardMode.vue';
import LearnMode from '@/components/modes/LearnMode.vue';
import TestMode from '@/components/modes/TestMode.vue';
import MatchMode from '@/components/modes/MatchMode.vue';
import ConjugationMode from '@/components/modes/ConjugationMode.vue';
import DictationMode from '@/components/modes/DictationMode.vue';
import { useVocabularyStore } from '@/stores/vocabulary.js';

let vocab;
beforeEach(() => {
  setActivePinia(createPinia());
  vocab = useVocabularyStore();
});

const someCards = () => vocab.buildSet({ theme: 'food' }).slice(0, 20);
const someVerbs = () => vocab.verbCards.slice(0, 3);

describe('낱말카드', () => {
  it('카드를 뒤집고 다음으로 넘어간다', async () => {
    const w = mount(FlashcardMode, { props: { cards: someCards(), setKey: 't' } });
    await w.vm.$nextTick();

    const first = w.text();
    expect(first.length).toBeGreaterThan(5);

    // 뒤집기
    const flip = w.find('.card, .fc-card, [class*="card"]');
    expect(flip.exists()).toBe(true);
    await flip.trigger('click');
    await w.vm.$nextTick();

    // 다음 카드
    const before = w.vm.index;
    const next = w.findAll('button').find(b => /다음|→|next/i.test(b.text()));
    if (next) {
      await next.trigger('click');
      await w.vm.$nextTick();
      expect(w.vm.index).toBeGreaterThan(before);
    }
  });
});

describe('학습하기', () => {
  it('보기를 고르면 채점된다', async () => {
    const w = mount(LearnMode, { props: { cards: someCards(), setKey: 't' } });
    await w.vm.$nextTick();

    // 객관식 문제가 나올 때까지 넘긴다 (단답형이 먼저 나올 수 있음)
    let guard = 0;
    while (w.vm.current?.type !== 'choice' && guard++ < 30) {
      w.vm.nextQuestion();
      await w.vm.$nextTick();
    }
    expect(w.vm.current?.type, '객관식 문제가 나오지 않음').toBe('choice');

    const optBtn = w.findAll('.opt')[0];
    expect(optBtn, '보기 버튼을 찾을 수 없음').toBeTruthy();
    await optBtn.trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.feedback, '보기를 눌러도 채점되지 않음').toBeTruthy();
  });

  it('단답형에서 입력하고 확인하면 채점된다', async () => {
    const w = mount(LearnMode, { props: { cards: someCards(), setKey: 't' } });
    await w.vm.$nextTick();
    let guard = 0;
    while (w.vm.current?.type !== 'fill' && guard++ < 30) {
      w.vm.nextQuestion();
      await w.vm.$nextTick();
    }
    expect(w.vm.current?.type, '단답형 문제가 나오지 않음').toBe('fill');

    await w.find('input.fill').setValue(w.vm.current.card.es);
    const go = w.findAll('button').find(b => /확인/.test(b.text()));
    await go.trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.feedback?.ok, '정답인데 오답 처리됨').toBe(true);
  });
});

describe('테스트', () => {
  it('보기를 고르고 제출하면 점수가 나온다', async () => {
    const w = mount(TestMode, { props: { cards: someCards(), setKey: 't' } });
    await w.vm.$nextTick();

    // 모든 문제에 답 채우기
    w.vm.questions.forEach((q, i) => {
      w.vm.answers[i] = q.type === 'tf' ? 'O' : (q.options?.[0] ?? q.a);
    });
    await w.vm.$nextTick();

    const submit = w.findAll('button').find(b => /제출|채점|확인/.test(b.text()));
    expect(submit, '제출 버튼 없음').toBeTruthy();
    await submit.trigger('click');
    await w.vm.$nextTick();

    expect(w.vm.result, '제출해도 결과가 없음').toBeTruthy();
    expect(typeof w.vm.result.score).toBe('number');
  });
});

describe('카드 맞추기', () => {
  it('타일을 누르면 선택되고 짝이 맞으면 사라진다', async () => {
    const w = mount(MatchMode, { props: { cards: someCards(), setKey: 't' } });
    await w.vm.$nextTick();

    const tiles = w.findAll('.tile');
    expect(tiles.length, '타일이 없음').toBeGreaterThan(0);

    // 정답 짝 찾기
    const first = w.vm.tiles[0];
    const pairIdx = w.vm.tiles.findIndex(t => t.pair === first.pair && t !== first);
    expect(pairIdx).toBeGreaterThan(-1);

    await tiles[0].trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.selected, '타일을 눌러도 선택되지 않음').toBeTruthy();

    await tiles[pairIdx].trigger('click');
    await new Promise(r => setTimeout(r, 400));
    expect(['matched', 'gone']).toContain(w.vm.tiles[0].state);
  });
});

describe('동사 활용', () => {
  it('답을 입력하면 채점되고 다음으로 넘어간다', async () => {
    const w = mount(ConjugationMode, { props: { verbs: someVerbs() } });
    await w.vm.$nextTick();

    const input = w.find('input');
    expect(input.exists(), '입력창 없음').toBe(true);

    await input.setValue(w.vm.current.answer);
    const go = w.findAll('button').find(b => /확인/.test(b.text()));
    expect(go, '확인 버튼 없음').toBeTruthy();
    await go.trigger('click');
    await w.vm.$nextTick();

    expect(w.vm.judged, '채점되지 않음').toBe('right');

    const before = w.vm.doneCount;
    const nextBtn = w.findAll('button').find(b => /다음/.test(b.text()));
    await nextBtn.trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.doneCount).toBe(before + 1);
  });
});

describe('받아쓰기', () => {
  it('소리를 재생하고 답을 채점한다', async () => {
    const w = mount(DictationMode, { props: { cards: someCards() } });
    await w.vm.$nextTick();

    expect(globalThis.__spoken.length, '마운트 시 소리가 재생되지 않음').toBeGreaterThan(0);

    const input = w.find('input');
    expect(input.exists(), '입력창 없음').toBe(true);
    await input.setValue(w.vm.current.es);

    const go = w.findAll('button').find(b => /확인/.test(b.text()));
    await go.trigger('click');
    await w.vm.$nextTick();
    expect(w.vm.judged, '채점되지 않음').toBe('right');
  });
});
