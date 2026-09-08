/**
 * 동사 활용 엔진 검증
 * 문법서 기준 정답과 대조한다. 여기가 틀리면 앱이 잘못된 걸 가르치게 된다.
 */
import { describe, it, expect } from 'vitest';
import { conjugatePresent } from '@/data/conjugation.js';
import { lessons } from '@/data/lessons.js';
import { isInfinitive } from '@/data/verbForms.js';

const ORDER = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
const forms = v => ORDER.map(k => conjugatePresent(v)?.forms[k]);

describe('규칙 활용', () => {
  const cases = {
    hablar: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'],
    comer: ['como', 'comes', 'come', 'comemos', 'coméis', 'comen'],
    vivir: ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'],
    barrer: ['barro', 'barres', 'barre', 'barremos', 'barréis', 'barren'],
  };
  for (const [v, e] of Object.entries(cases)) {
    it(v, () => expect(forms(v)).toEqual(e));
  }
});

describe('어간 변화', () => {
  const cases = {
    querer: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
    poder: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
    pedir: ['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'],
    fregar: ['friego', 'friegas', 'friega', 'fregamos', 'fregáis', 'friegan'],
  };
  for (const [v, e] of Object.entries(cases)) {
    it(v, () => expect(forms(v)).toEqual(e));
  }
});

describe('철자 규칙에 따른 yo 형태', () => {
  // 표에 개별 등록하지 않아도 어미 규칙으로 처리되어야 한다
  const cases = {
    proteger: 'protejo', dirigir: 'dirijo', recoger: 'recojo', escoger: 'escojo',
    vencer: 'venzo', ejercer: 'ejerzo',
    conocer: 'conozco', agradecer: 'agradezco', ofrecer: 'ofrezco', parecer: 'parezco',
    nacer: 'nazco', aparecer: 'aparezco', establecer: 'establezco',
    conducir: 'conduzco', traducir: 'traduzco', producir: 'produzco',
    reducir: 'reduzco', introducir: 'introduzco',
  };
  for (const [v, e] of Object.entries(cases)) {
    it(`${v} → ${e}`, () => expect(conjugatePresent(v).forms.yo).toBe(e));
  }
  it('규칙 동사의 yo는 그대로다', () => {
    expect(conjugatePresent('comer').forms.yo).toBe('como');
    expect(conjugatePresent('abrir').forms.yo).toBe('abro');
  });
});

describe('완전 불규칙·재귀·특수', () => {
  const cases = {
    ser: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
    estar: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
    dar: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
    saber: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
    salir: ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
    hacer: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
    ir: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
    tener: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
    ver: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
    enviar: ['envío', 'envías', 'envía', 'enviamos', 'enviáis', 'envían'],
    'freír': ['frío', 'fríes', 'fríe', 'freímos', 'freís', 'fríen'],
    ducharse: ['me ducho', 'te duchas', 'se ducha', 'nos duchamos', 'os ducháis', 'se duchan'],
    protegerse: ['me protejo', 'te proteges', 'se protege', 'nos protegemos', 'os protegéis', 'se protegen'],
    seguir: ['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'],
    elegir: ['elijo', 'eliges', 'elige', 'elegimos', 'elegís', 'eligen'],
  };
  for (const [v, e] of Object.entries(cases)) {
    it(v, () => expect(forms(v)).toEqual(e));
  }
});

describe('데이터 전체 커버리지', () => {
  it('앱에 있는 모든 동사가 6인칭 활용된다', () => {
    const infs = [...new Set(
      lessons.flatMap(l => l.cards).filter(c => isInfinitive(c.es)).map(c => c.es.toLowerCase())
    )];
    expect(infs.length).toBeGreaterThan(100);
    const bad = [];
    for (const v of infs) {
      const c = conjugatePresent(v);
      if (!c) { bad.push(`${v}: 활용 실패`); continue; }
      ORDER.forEach(k => { if (!c.forms[k]) bad.push(`${v}/${k} 누락`); });
    }
    expect(bad, bad.join(' / ')).toEqual([]);
  });
});
