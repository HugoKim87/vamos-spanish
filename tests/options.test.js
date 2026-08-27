/**
 * 객관식 보기가 같은 유형끼리 모이는지 검증한다.
 * (뜻을 몰라도 길이·형태만 보고 정답을 고르는 일을 막기 위함)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { makeOptions } from '@/composables/useStudyUtils.js';
import { useVocabularyStore } from '@/stores/vocabulary.js';

let vocab, all;
beforeEach(() => {
  setActivePinia(createPinia());
  vocab = useVocabularyStore();
  all = vocab.allCards;
});

/** 보기 텍스트로 원래 카드의 유형을 되찾는다 */
function typesOf(options, key) {
  return options.map(text => {
    const card = all.find(c => c[key] === text);
    return card?.type ?? '?';
  });
}

describe('보기 유형 통일', () => {
  it('보기 4개가 모두 정답과 같은 유형이다', () => {
    const pool = vocab.buildSet({ theme: 'food' });
    let checked = 0, mixed = 0;

    for (const card of pool) {
      const opts = makeOptions(card, pool, 'ko', { fallback: all });
      const types = typesOf(opts, 'ko');
      checked++;
      if (types.some(t => t !== card.type && t !== '?')) mixed++;
    }
    expect(checked).toBeGreaterThan(50);
    expect(mixed, `${mixed}개 문제에서 다른 유형이 섞임`).toBe(0);
  });

  it('같은 유형이 부족해도 보기 4개를 채운다', () => {
    // 형용사가 2장뿐인 아주 작은 세트
    const adj = all.filter(c => c.type === 'adj').slice(0, 2);
    const opts = makeOptions(adj[0], adj, 'ko', { fallback: all });

    expect(opts.length, '보기가 4개가 아님').toBe(4);
    expect(new Set(opts).size, '보기가 중복됨').toBe(4);
    expect(opts).toContain(adj[0].ko);
  });

  it('예비 풀이 없어도 깨지지 않는다', () => {
    const pool = vocab.buildSet({ theme: 'food' }).slice(0, 5);
    const opts = makeOptions(pool[0], pool, 'ko');
    expect(opts.length).toBeGreaterThan(1);
    expect(new Set(opts).size).toBe(opts.length);
    expect(opts).toContain(pool[0].ko);
  });

  it('스페인어 보기(매칭형)도 유형이 통일된다', () => {
    const pool = vocab.buildSet({ theme: 'health' });
    let mixed = 0;
    for (const card of pool) {
      const opts = makeOptions(card, pool, 'es', { fallback: all });
      if (typesOf(opts, 'es').some(t => t !== card.type && t !== '?')) mixed++;
    }
    expect(mixed).toBe(0);
  });

  it('정답은 반드시 보기에 있고 중복이 없다', () => {
    const pool = vocab.buildSet({ theme: 'shopping' });
    for (const card of pool.slice(0, 100)) {
      const opts = makeOptions(card, pool, 'ko', { fallback: all });
      expect(opts).toContain(card.ko);
      expect(new Set(opts).size, `중복 보기: ${opts}`).toBe(opts.length);
    }
  });
});
