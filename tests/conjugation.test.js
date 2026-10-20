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
    soler: ['suelo', 'sueles', 'suele', 'solemos', 'soléis', 'suelen'],
    // 재귀 동사는 -se째로 표에 있어야 한다. 과거에 probar만 있고 probarse가 없어
    // 'me probo'로, vestirse는 아예 없어 'me vesto'로 잘못 활용됐다.
    vestir: ['visto', 'vistes', 'viste', 'vestimos', 'vestís', 'visten'],
    vestirse: ['me visto', 'te vistes', 'se viste', 'nos vestimos', 'os vestís', 'se visten'],
    probarse: ['me pruebo', 'te pruebas', 'se prueba', 'nos probamos', 'os probáis', 'se prueban'],
    acordarse: ['me acuerdo', 'te acuerdas', 'se acuerda', 'nos acordamos', 'os acordáis', 'se acuerdan'],
    servir: ['sirvo', 'sirves', 'sirve', 'servimos', 'servís', 'sirven'],
    medir: ['mido', 'mides', 'mide', 'medimos', 'medís', 'miden'],
    repetir: ['repito', 'repites', 'repite', 'repetimos', 'repetís', 'repiten'],
    soñar: ['sueño', 'sueñas', 'sueña', 'soñamos', 'soñáis', 'sueñan'],
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
    // irse는 어간이 없어 정규식으로 분해되지 않는다 — 표에서 바로 꺼내 대명사를 붙여야 한다
    irse: ['me voy', 'te vas', 'se va', 'nos vamos', 'os vais', 'se van'],
    // haber는 완료시제 조동사 — 규칙으로 만들면 'habo'가 된다
    haber: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
    // 재귀형이 표에 없어도 원형(pedir·volver)의 불규칙을 물려받아야 한다
    pedirse: ['me pido', 'te pides', 'se pide', 'nos pedimos', 'os pedís', 'se piden'],
    volverse: ['me vuelvo', 'te vuelves', 'se vuelve', 'nos volvemos', 'os volvéis', 'se vuelven'],
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


describe('재귀형은 원형의 불규칙을 물려받는다', () => {
  // 과거에 vestirse·probarse·pedirse가 표에 없어 규칙 동사로 잘못 활용됐다.
  // 개별 등록에 기대지 않도록, 원형이 불규칙인 모든 재귀형을 한 번에 검사한다.
  const REFLEXIVES = [
    'irse', 'pedirse', 'vestirse', 'probarse', 'ponerse',
    'volverse', 'despedirse', 'acordarse', 'dormirse', 'acostarse',
  ];
  for (const refl of REFLEXIVES) {
    it(refl, () => {
      const base = refl.slice(0, -2);
      const b = conjugatePresent(base);
      const r = conjugatePresent(refl);
      expect(r, `${refl} 활용 불가`).toBeTruthy();
      expect(r.reflexive).toBe(true);
      if (!b) return;   // 원형이 단독으로 쓰이지 않는 동사는 비교 대상이 아니다
      const PRON = { yo: 'me', tu: 'te', el: 'se', nosotros: 'nos', vosotros: 'os', ellos: 'se' };
      for (const k of Object.keys(PRON)) {
        expect(r.forms[k], `${refl} ${k}`).toBe(`${PRON[k]} ${b.forms[k]}`);
      }
    });
  }
});


describe('gustar형 — 주어가 사물이라 3인칭 위주로 쓴다', () => {
  // encantar가 표에 없어 일반 동사로 취급되던 적이 있다.
  // "Me encantan los puentes"처럼 역구조로 쓰는 동사는 표시가 있어야
  // 학습 화면에서 3인칭 위주라는 안내가 나간다.
  for (const v of ['gustar', 'encantar', 'doler', 'interesar', 'apetecer', 'molestar']) {
    it(v, () => {
      const c = conjugatePresent(v);
      expect(c, `${v} 활용 불가`).toBeTruthy();
      expect(c.backwards, `${v}는 gustar형으로 표시되어야 한다`).toBe(true);
      expect(c.note).toMatch(/gustar형/);
    });
  }
});
