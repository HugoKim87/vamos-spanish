/**
 * 스페인어 직설법 현재시제 활용
 * ---------------------------------------------------------------
 * lessons.js의 동사원형 카드를 6인칭 활용형으로 펼쳐 학습할 수 있게 합니다.
 *
 * 설계 원칙
 *  - 규칙 변화는 어미 규칙으로 계산하고, 불규칙만 아래 표에 적어 둡니다.
 *  - 새 동사가 lessons.js에 들어와도 규칙 동사면 표를 건드릴 필요가 없습니다.
 *  - 불규칙인데 표에 없으면 규칙으로 잘못 만들어지므로, 검증 스크립트가
 *    "표에 없는 -cer/-ucir/-ger/-guir 동사"를 경고합니다.
 */

/** 인칭 — 화면 표시 순서 */
export const PERSONS = [
  // short: 좁은 칸(낱말카드 활용표)에 쓰는 짧은 표기
  { key: 'yo', label: 'yo', short: 'yo', ko: '나' },
  { key: 'tu', label: 'tú', short: 'tú', ko: '너' },
  { key: 'el', label: 'él/ella/usted', short: 'él', ko: '그/그녀/당신' },
  { key: 'nosotros', label: 'nosotros', short: 'nos.', ko: '우리' },
  { key: 'vosotros', label: 'vosotros', short: 'vos.', ko: '너희' },
  { key: 'ellos', label: 'ellos/ellas/ustedes', short: 'ellos', ko: '그들/당신들' },
];

/** 재귀대명사 */
const REFLEXIVE = {
  yo: 'me', tu: 'te', el: 'se',
  nosotros: 'nos', vosotros: 'os', ellos: 'se',
};

/** 규칙 어미 */
const ENDINGS = {
  ar: { yo: 'o', tu: 'as', el: 'a', nosotros: 'amos', vosotros: 'áis', ellos: 'an' },
  er: { yo: 'o', tu: 'es', el: 'e', nosotros: 'emos', vosotros: 'éis', ellos: 'en' },
  ir: { yo: 'o', tu: 'es', el: 'e', nosotros: 'imos', vosotros: 'ís', ellos: 'en' },
};

/** 어간 모음이 바뀌는 인칭 (nosotros·vosotros는 바뀌지 않음 — "구두 모양") */
const BOOT = ['yo', 'tu', 'el', 'ellos'];

/**
 * 불규칙 정보
 *  stem   : 어간 모음 변화 'e>ie' | 'o>ue' | 'e>i'
 *  yo     : 1인칭 단수만 다른 경우 그 형태 (재귀대명사 제외한 동사부)
 *  full   : 6인칭 전부 불규칙인 경우
 *  only   : 3인칭 단수만 쓰는 동사 (날씨 등)
 *  backwards: gustar형 — 주어가 사물이라 3인칭 단수/복수만 실제로 쓰임
 */
export const IRREGULARS = {
  ser: { full: { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son' } },
  ir: { full: { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', vosotros: 'vais', ellos: 'van' } },
  // dar: yo가 doy, vosotros는 단음절이라 강세 부호가 없다 (dais)
  dar: {
    full: {
      yo: 'doy', tu: 'das', el: 'da',
      nosotros: 'damos', vosotros: 'dais', ellos: 'dan',
    },
  },
  // saber: yo만 sé
  saber: { yo: 'sé' },
  // salir: yo만 salgo
  salir: { yo: 'salgo' },
  // estar: yo만 -oy, 나머지는 어미에 강세 부호가 붙는다
  estar: {
    full: {
      yo: 'estoy', tu: 'estás', el: 'está',
      nosotros: 'estamos', vosotros: 'estáis', ellos: 'están',
    },
  },
  // tener: 1인칭 tengo + 어간 e→ie 가 같이 일어난다
  tener: {
    full: {
      yo: 'tengo', tu: 'tienes', el: 'tiene',
      nosotros: 'tenemos', vosotros: 'tenéis', ellos: 'tienen',
    },
  },
  // freír: e→i 어간 변화 + í에 강세 (freímos·freís는 어간이 그대로)
  'freír': {
    full: {
      yo: 'frío', tu: 'fríes', el: 'fríe',
      nosotros: 'freímos', vosotros: 'freís', ellos: 'fríen',
    },
  },

  // 어간 e→ie
  querer: { stem: 'e>ie' },
  preferir: { stem: 'e>ie' },
  hervir: { stem: 'e>ie' },
  recomendar: { stem: 'e>ie' },
  fregar: { stem: 'e>ie' },   // friego, friegas, friega, fregamos, fregáis, friegan
  transferir: { stem: 'e>ie' },
  sentirse: { stem: 'e>ie' },

  // 어간 o→ue
  poder: { stem: 'o>ue' },
  mostrar: { stem: 'o>ue' },
  devolver: { stem: 'o>ue' },
  almorzar: { stem: 'o>ue' },
  comprobar: { stem: 'o>ue' },        // compruebo, compruebas …
  acostarse: { stem: 'o>ue' },
  dormirse: { stem: 'o>ue' },

  // 어간 e→i
  pedir: { stem: 'e>i' },
  seguir: { stem: 'e>i', yo: 'sigo' },   // gu→g
  elegir: { stem: 'e>i', yo: 'elijo' },  // g→j

  // 1인칭 단수만 불규칙
  poner: { yo: 'pongo' },
  ponerse: { yo: 'pongo' },
  traer: { yo: 'traigo' },
  // ver는 어간이 v- 한 글자뿐이라 vosotros가 véis가 아닌 veis (강세 부호 없음)
  ver: {
    full: {
      yo: 'veo', tu: 'ves', el: 've',
      nosotros: 'vemos', vosotros: 'veis', ellos: 'ven',
    },
  },
  agradecer: { yo: 'agradezco' },
  conocer: { yo: 'conozco' },
  hacer: { yo: 'hago' },
  introducir: { yo: 'introduzco' },   // -ucir → -uzco
  reducir: { yo: 'reduzco' },
  protegerse: { yo: 'protejo' },

  // 강세가 붙는 -iar 동사
  enviar: {
    full: {
      yo: 'envío', tu: 'envías', el: 'envía',
      nosotros: 'enviamos', vosotros: 'enviáis', ellos: 'envían',
    },
  },

  // 날씨 동사 — 3인칭 단수만 씁니다
  llover: { stem: 'o>ue', only: 'el' },
  nevar: { stem: 'e>ie', only: 'el' },

  // gustar형 — "무엇이 나에게 ~하다" 구조라 3인칭만 실제로 쓰입니다
  gustar: { backwards: true },
  doler: { stem: 'o>ue', backwards: true },
};

/**
 * 철자 규칙에 따른 1인칭 단수 형태.
 *
 * 스페인어는 소리를 유지하려고 yo 형태에서 철자를 바꾸는 동사가 많다.
 * 개별로 등록하면 새 동사가 들어올 때마다 빠뜨리게 되므로 어미 규칙으로 처리한다.
 *
 *   -ger / -gir  → g를 j로   proteger → protejo   (그대로 두면 [게] 소리가 된다)
 *   -guir        → gu를 g로  seguir  → sigo
 *   -cer / -cir  → c를 zc로  conocer → conozco   (모음 뒤일 때만)
 *   -cer / -cir  → c를 z로   vencer  → venzo     (자음 뒤일 때)
 *
 * @returns {string|null} 규칙에 걸리면 yo 형태, 아니면 null
 */
function spellingYo(root, ending) {
  const stem = root;
  if (ending === 'er' || ending === 'ir') {
    if (/g$/.test(stem)) return stem.slice(0, -1) + 'j' + 'o';        // -ger/-gir
    if (/gu$/.test(stem)) return stem.slice(0, -2) + 'g' + 'o';       // -guir
    if (/c$/.test(stem)) {
      const before = stem.slice(-2, -1);
      // 모음 뒤 -cer/-cir는 -zco, 자음 뒤는 -zo
      return /[aeiouáéíóú]/.test(before)
        ? stem.slice(0, -1) + 'zc' + 'o'
        : stem.slice(0, -1) + 'z' + 'o';
    }
  }
  return null;
}

/** 어간의 마지막 해당 모음을 바꾼다 (뒤에서부터 찾아야 정확) */
function changeStem(stem, rule) {
  const [from, to] = rule.split('>');
  const i = stem.lastIndexOf(from);
  if (i < 0) return stem;
  return stem.slice(0, i) + to + stem.slice(i + from.length);
}

/**
 * 동사원형을 현재시제 6인칭으로 활용
 * @returns {null | { infinitive, reflexive, note, forms: { [person]: string } }}
 */
export function conjugatePresent(infinitive) {
  const verb = (infinitive || '').trim().toLowerCase();

  // 전부 불규칙인 동사는 어미 분해 없이 바로 표에서 꺼낸다.
  // ('ir'처럼 어간이 없는 두 글자 원형은 아래 정규식으로 잡히지 않는다)
  const direct = IRREGULARS[verb];
  if (direct?.full) {
    return {
      infinitive: verb,
      reflexive: false,
      only: direct.only || null,
      backwards: !!direct.backwards,
      note: null,
      forms: { ...direct.full },
    };
  }

  const m = /^([a-záéíóúñü]+)(ar|er|ir|ár|ér|ír)(se)?$/.exec(verb);
  if (!m) return null;

  const [, root, ending, se] = m;
  const reflexive = !!se;
  const info = IRREGULARS[verb] || {};
  const forms = {};

  for (const { key } of PERSONS) {
    let word;
    if (info.full) {
      word = info.full[key];
    } else if (info.yo && key === 'yo') {
      word = info.yo;
    } else if (key === 'yo' && !info.stem && spellingYo(root, ending)) {
      // 표에 없어도 철자 규칙으로 처리되는 동사들 (proteger, conocer …)
      word = spellingYo(root, ending);
    } else {
      const stem = info.stem && BOOT.includes(key) ? changeStem(root, info.stem) : root;
      // 어미에 강세 부호가 있으면 규칙 어미로 되돌려 활용한다 (-ír → -ir)
      const plain = ending.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      word = stem + ENDINGS[plain][key];
    }
    forms[key] = reflexive ? `${REFLEXIVE[key]} ${word}` : word;
  }

  return {
    infinitive: verb,
    reflexive,
    only: info.only || null,
    backwards: !!info.backwards,
    note: info.only
      ? '날씨 표현이라 3인칭 단수만 씁니다'
      : info.backwards
        ? 'gustar형 — 주어가 사물이라 3인칭(단수/복수)을 주로 씁니다'
        : null,
    forms,
  };
}

/** 학습에 실제로 쓸 인칭만 추림 (날씨·gustar형은 일부만) */
export function practicePersons(conj) {
  if (!conj) return [];
  if (conj.only) return PERSONS.filter(p => p.key === conj.only);
  if (conj.backwards) return PERSONS.filter(p => p.key === 'el' || p.key === 'ellos');
  return PERSONS;
}
