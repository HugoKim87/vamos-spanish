/**
 * 튜토리얼에 적은 활용형이 실제 활용 엔진과 일치하는지 검증한다.
 * 설명과 앱 동작이 어긋나면 학습자가 가장 혼란스럽다.
 */
import { describe, it, expect } from 'vitest';
import { tutorials } from '@/data/tutorials.js';
import { conjugatePresent } from '@/data/conjugation.js';

const ORDER = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];

/** 표의 첫 칸이 주어일 때, 각 열의 동사 활용을 엔진과 대조 */
function checkTable(table, verbsByColumn) {
  const problems = [];
  table.rows.forEach((row, i) => {
    const person = ORDER[i];
    verbsByColumn.forEach(({ col, verb }) => {
      const conj = conjugatePresent(verb);
      const expected = conj?.forms[person];
      const shown = row[col];
      if (expected !== shown) {
        problems.push(`${verb} ${person}: 튜토리얼 "${shown}" ≠ 엔진 "${expected}"`);
      }
    });
  });
  return problems;
}

const tutorial = tutorials.find(t => t.id === 'conjugacion');
const sectionBy = h => tutorial.sections.find(s => s.heading?.includes(h));

describe('동사 활용 튜토리얼 정확성', () => {
  it('튜토리얼이 존재한다', () => {
    expect(tutorial, '동사 활용 튜토리얼 없음').toBeTruthy();
  });

  it('규칙 활용표가 엔진과 일치한다', () => {
    const s = sectionBy('규칙 활용');
    const p = checkTable(s.table, [
      { col: 1, verb: 'hablar' }, { col: 2, verb: 'comer' }, { col: 3, verb: 'vivir' },
    ]);
    expect(p, p.join(' / ')).toEqual([]);
  });

  it('어간 변화표가 엔진과 일치한다', () => {
    const s = sectionBy('어간의 모음');
    const p = checkTable(s.table, [
      { col: 1, verb: 'querer' }, { col: 2, verb: 'poder' }, { col: 3, verb: 'pedir' },
    ]);
    expect(p, p.join(' / ')).toEqual([]);
  });

  it('완전 불규칙표가 엔진과 일치한다', () => {
    const s = sectionBy('아예 외워야');
    const p = checkTable(s.table, [
      { col: 1, verb: 'ser' }, { col: 2, verb: 'ir' }, { col: 3, verb: 'tener' },
    ]);
    expect(p, p.join(' / ')).toEqual([]);
  });

  it('재귀동사표가 엔진과 일치한다', () => {
    const s = sectionBy('재귀동사');
    const p = checkTable(s.table, [{ col: 2, verb: 'ducharse' }]);
    expect(p, p.join(' / ')).toEqual([]);
  });

  it('예시로 든 "원형 → 활용형"이 모두 맞다', () => {
    const problems = [];
    for (const s of tutorial.sections) {
      for (const ex of s.examples || []) {
        const m = /^([a-záéíóúñü]+)\s*→\s*([a-záéíóúñü]+)$/.exec(ex.es);
        if (!m) continue;
        const conj = conjugatePresent(m[1]);
        if (conj && conj.forms.yo !== m[2]) {
          problems.push(`${m[1]}: 튜토리얼 "${m[2]}" ≠ 엔진 "${conj.forms.yo}"`);
        }
      }
    }
    expect(problems, problems.join(' / ')).toEqual([]);
  });

  it('본문에 적은 동사 개수가 실제 데이터와 맞다', async () => {
    const { lessons } = await import('@/data/lessons.js');
    const { isInfinitive } = await import('@/data/verbForms.js');
    const infs = new Set(
      lessons.flatMap(l => l.cards).filter(c => isInfinitive(c.es)).map(c => c.es.toLowerCase())
    );
    const arCount = [...infs].filter(v => v.replace(/se$/, '').endsWith('ar')).length;

    const text = tutorial.sections.flatMap(s => s.paragraphs || []).join(' ');
    const total = text.match(/(\d+)개 동사/);
    const ar = text.match(/(\d+)개가 -ar/);
    if (total) expect(Number(total[1]), '전체 동사 수 불일치').toBe(infs.size);
    if (ar) expect(Number(ar[1]), '-ar 동사 수 불일치').toBe(arCount);
  });
});

describe('ser·estar 튜토리얼 정확성', () => {
  const t = tutorials.find(x => x.id === 'ser-estar');

  it('튜토리얼이 존재한다', () => expect(t).toBeTruthy());

  it('활용표가 엔진과 일치한다', () => {
    const s = t.sections.find(x => x.heading?.includes('활용'));
    const p = checkTable(s.table, [{ col: 1, verb: 'ser' }, { col: 2, verb: 'estar' }]);
    expect(p, p.join(' / ')).toEqual([]);
  });

  it('예문에 쓴 ser·estar 형태가 올바르다', () => {
    const bad = [];
    const serForms = new Set(Object.values(conjugatePresent('ser').forms));
    const estarForms = new Set(Object.values(conjugatePresent('estar').forms));
    for (const sec of t.sections) {
      for (const ex of sec.examples || []) {
        const first = ex.es.replace(/^[¿¡]/, '').split(/\s+/)[0].toLowerCase();
        // 문장이 ser/estar로 시작하면 실제 활용형이어야 한다
        if (/^(soy|eres|es|somos|sois|son)$/.test(first) && !serForms.has(first)) bad.push(ex.es);
        if (/^(estoy|estas|está|estás|estamos|estáis|están)$/.test(first) && !estarForms.has(first)) bad.push(ex.es);
      }
    }
    expect(bad, bad.join(' / ')).toEqual([]);
  });
});

describe('전치사 튜토리얼', () => {
  const t = tutorials.find(x => x.id === 'preposiciones');

  it('튜토리얼이 존재한다', () => expect(t).toBeTruthy());

  it('축약형 설명이 정확하다', () => {
    const s = t.sections.find(x => x.heading?.includes('축약'));
    const rows = Object.fromEntries(s.table.rows.map(r => [r[0], r[1]]));
    expect(rows['a + el']).toBe('al');
    expect(rows['de + el']).toBe('del');
    // la/las는 축약하지 않는다
    expect(rows['a + la']).toBe('(그대로)');
  });

  it('예문이 앱 데이터의 표현과 어긋나지 않는다', async () => {
    const { lessons } = await import('@/data/lessons.js');
    const all = lessons.flatMap(l => l.cards).map(c => c.es.toLowerCase());
    // 튜토리얼 예문에 쓴 표현이 앱 데이터에도 (문장 일부로라도) 존재해야 한다.
    // 데이터에 없는 표현을 예로 들면 학습 내용과 이어지지 않는다.
    const haystack = all.join(' | ');
    const check = ['por favor', 'caminar por el sendero', 'los gastos de envío',
                   'la sala de lectura', 'en bicicleta', 'viajar al extranjero'];
    const missing = check.filter(e => !haystack.includes(e));
    expect(missing, `데이터에 없는 예문: ${missing.join(', ')}`).toEqual([]);
  });
});
