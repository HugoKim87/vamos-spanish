/**
 * 검색 정확도 검증
 * 부분 문자열 일치를 쓰면 antes로 guantes까지 걸리는 문제가 있었다.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useVocabularyStore } from '@/stores/vocabulary.js';

let vocab;
beforeEach(() => {
  setActivePinia(createPinia());
  vocab = useVocabularyStore();
});

const search = q => vocab.buildSet({ query: q });

describe('스페인어 검색 — 단어 중간이 걸리면 안 된다', () => {
  it('antes로 guantes·diamantes가 걸리지 않는다', () => {
    const hits = search('antes');
    expect(hits.length).toBeGreaterThan(0);
    const wrong = hits.filter(c => /guantes|emocionantes|diamantes|elegantes/i.test(c.es));
    expect(wrong.map(c => c.es), '단어 중간이 걸림').toEqual([]);
    // 진짜 antes는 나와야 한다
    expect(hits.some(c => /\bantes\b/i.test(c.es)), 'antes가 안 나옴').toBe(true);
  });

  it('단어 중간 일치가 전반적으로 걸러진다', () => {
    for (const [q, forbidden] of [['ante', 'guantes'], ['sar', 'usar'], ['ida', 'comida']]) {
      const hits = search(q);
      const wrong = hits.filter(c =>
        c.es.toLowerCase().includes(forbidden) &&
        !c.es.toLowerCase().split(/[^a-zñáéíóú]+/).some(w => w.startsWith(q))
      );
      expect(wrong.map(c => c.es), `${q} → ${forbidden}가 걸림`).toEqual([]);
    }
  });

  it('단어 앞부분으로는 찾을 수 있다', () => {
    expect(search('reserv').length).toBeGreaterThan(5);
    expect(search('limpi').length).toBeGreaterThan(3);
  });

  it('문장 안의 단어도 찾는다', () => {
    const hits = search('plantas');
    expect(hits.some(c => c.es.includes('Riego las plantas'))).toBe(true);
  });
});

describe('강세 부호·대소문자', () => {
  it('cafe와 café가 같은 결과를 낸다', () => {
    const a = search('cafe').map(c => c.uid).sort();
    const b = search('café').map(c => c.uid).sort();
    expect(a).toEqual(b);
    expect(a.length).toBeGreaterThan(0);
  });

  it('대문자로 검색해도 찾는다', () => {
    expect(search('ANTES').length).toBe(search('antes').length);
  });
});

describe('한국어 검색', () => {
  it('합성어 일부로도 찾을 수 있다', () => {
    const hits = search('먼지');
    expect(hits.some(c => c.ko.includes('먼지떨이')), '먼지떨이가 안 나옴').toBe(true);
    expect(hits.some(c => c.ko === '먼지')).toBe(true);
  });

  it('한글로 검색하면 스페인어 쪽은 보지 않는다', () => {
    // 한글 검색어가 스페인어에 우연히 걸릴 일은 없어야 한다
    const hits = search('예약');
    expect(hits.length).toBeGreaterThan(0);
    hits.forEach(c => expect(c.ko).toContain('예약'));
  });
});

describe('결과 없음', () => {
  it('없는 말은 0건이다', () => {
    expect(search('zzzzqq').length).toBe(0);
  });
  it('공백만 넣으면 전체가 나온다', () => {
    expect(search('   ').length).toBe(vocab.allCards.length);
  });
});
