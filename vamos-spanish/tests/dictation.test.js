/**
 * 받아쓰기 흐름 검증
 * 채점이 끝난 뒤 막힌 입력란과 다시듣기가 남아 있으면
 * "고칠 수 있나?" 하고 헷갈리므로 아예 감춰야 한다.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import DictationMode from '@/components/modes/DictationMode.vue';
import { useVocabularyStore } from '@/stores/vocabulary.js';

let vocab;
beforeEach(() => {
  setActivePinia(createPinia());
  vocab = useVocabularyStore();
  globalThis.__spoken.length = 0;
});

const cards = () => vocab.buildSet({ theme: 'food' }).slice(0, 5);
const mountIt = () => mount(DictationMode, { props: { cards: cards() } });

async function type(w, text) {
  await w.find('input').setValue(text);
  await w.findAll('button').find(b => /확인/.test(b.text())).trigger('click');
  await w.vm.$nextTick();
}

describe('맞혔을 때', () => {
  it('입력란과 듣기 버튼이 사라지고 정답 화면만 남는다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    await type(w, w.vm.current.es);

    expect(w.vm.judged).toBe('right');
    expect(w.find('input').exists(), '입력란이 남아 있음').toBe(false);
    expect(w.find('.players').exists(), '다시듣기가 남아 있음').toBe(false);
    expect(w.find('.result').exists()).toBe(true);
  });
});

describe('틀렸을 때 — 한 번 더 기회', () => {
  it('첫 오답에는 정답을 보여주지 않고 입력란을 유지한다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    const answer = w.vm.current.es;
    await type(w, '틀린답zz');

    expect(w.vm.judged, '첫 오답에 바로 확정됨').toBe(null);
    expect(w.vm.retrying, '재시도 상태가 아님').toBe(true);
    expect(w.find('input').exists(), '입력란이 사라짐').toBe(true);
    expect(w.text(), '정답이 미리 노출됨').not.toContain(answer);
  });

  it('재시도 때 자동으로 다시 들려준다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    const before = globalThis.__spoken.length;
    await type(w, '틀린답zz');
    expect(globalThis.__spoken.length, '다시 재생되지 않음').toBeGreaterThan(before);
  });

  it('첫 답이 무엇이었는지 보여준다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    await type(w, 'mianswer');
    expect(w.text()).toContain('mianswer');
  });

  it('두 번째에 맞히면 정답 처리된다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    const answer = w.vm.current.es;
    await type(w, '틀린답zz');
    await type(w, answer);

    expect(w.vm.judged).toBe('right');
    expect(w.vm.correctCount).toBe(1);
    expect(w.find('input').exists()).toBe(false);
  });

  it('두 번째도 틀리면 정답을 공개하고 입력란을 없앤다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    const answer = w.vm.current.es;
    await type(w, 'wrong1');
    await type(w, 'wrong2');

    expect(w.vm.judged).toBe('wrong');
    expect(w.find('input').exists(), '입력란이 남아 있음').toBe(false);
    expect(w.find('.players').exists(), '다시듣기가 남아 있음').toBe(false);
    expect(w.text(), '정답이 안 보임').toContain(answer);
    expect(w.text(), '내가 쓴 답이 안 보임').toContain('wrong1');
  });

  it('세 번째 기회는 없다 (무제한 재시도 방지)', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    await type(w, 'a1');
    await type(w, 'a2');
    expect(w.vm.judged).toBe('wrong');
    expect(w.find('input').exists()).toBe(false);
  });
});

describe('다음 문제로 넘어가면', () => {
  it('재시도 상태가 초기화된다', async () => {
    const w = mountIt();
    await w.vm.$nextTick();
    await type(w, 'zz');
    await type(w, 'zz');
    await w.findAll('button').find(b => /다음|마치기/.test(b.text())).trigger('click');
    await w.vm.$nextTick();

    expect(w.vm.retrying).toBe(false);
    expect(w.vm.firstTry).toBe('');
    expect(w.vm.judged).toBe(null);
    expect(w.find('input').exists(), '새 문제인데 입력란이 없음').toBe(true);
  });
});
