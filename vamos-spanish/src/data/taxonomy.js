import {
  EXTRA_FORMS, NOT_VERBS, AMBIGUOUS,
  INFINITIVE_RE, isInfinitive, normalizeToken,
} from './verbForms.js';

/**
 * 분류 체계 (Taxonomy)
 * ---------------------------------------------------------------
 * 이 파일이 "자동 재구성"의 핵심입니다.
 *  - THEMES      : 생활 테마 정의 (학습자 기준 9개 묶음)
 *  - classifyCard: 카드를 단어/표현/문장/패턴으로 자동 판별
 *  - CARD_TYPES  : 카드 유형 정의
 *
 * 새 Day를 lessons.js에 추가하면 theme만 지정하면 되고,
 * 카드 유형·통계·필터는 전부 여기 로직으로 자동 계산됩니다.
 */


/** 생활 테마 — 순서가 화면 노출 순서 */
export const THEMES = {
  basics: {
    key: 'basics',
    label: '기초 표현',
    emoji: '🌤️',
    hint: '날씨 · 시간 · 계절',
    color: '#6366f1',
  },
  home: {
    key: 'home',
    label: '집 & 일상',
    emoji: '🏠',
    hint: '방 · 루틴 · 소지품',
    color: '#8b5cf6',
  },
  food: {
    key: 'food',
    label: '음식 & 식당',
    emoji: '🍽️',
    hint: '요리 · 주문 · 맛',
    color: '#f59e0b',
  },
  shopping: {
    key: 'shopping',
    label: '쇼핑',
    emoji: '🛒',
    hint: '매장 · 물건 · 계산',
    color: '#ec4899',
  },
  travel: {
    key: 'travel',
    label: '이동 & 여행',
    emoji: '🚌',
    hint: '교통 · 길 · 숙소',
    color: '#06b6d4',
  },
  work: {
    key: 'work',
    label: '일 & 공부',
    emoji: '💼',
    hint: '사무실 · 직업 · 학습',
    color: '#3b82f6',
  },
  people: {
    key: 'people',
    label: '사람 & 감정',
    emoji: '❤️',
    hint: '가족 · 관계 · 기분',
    color: '#ef4444',
  },
  health: {
    key: 'health',
    label: '건강 & 몸',
    emoji: '🏥',
    hint: '병원 · 약국 · 증상',
    color: '#10b981',
  },
  leisure: {
    key: 'leisure',
    label: '취미 & 여가',
    emoji: '🎬',
    hint: '영화 · 음악 · 주말',
    color: '#a855f7',
  },
};

export const THEME_LIST = Object.values(THEMES);


/** 카드 유형 정의 */
export const CARD_TYPES = {
  noun: { key: 'noun', label: '명사', emoji: '📦', hint: '사물·사람·장소 이름 (명사구 포함)' },
  verb: { key: 'verb', label: '동사', emoji: '🏃', hint: '동사원형 — 인칭 변형까지 학습' },
  adj: { key: 'adj', label: '형용사·부사', emoji: '🎨', hint: '상태·성질을 꾸미는 말' },
  phrase: { key: 'phrase', label: '표현', emoji: '💬', hint: '동사가 들어간 표현·문장' },
  pattern: { key: 'pattern', label: '문법 패턴', emoji: '📐', hint: '빈칸을 채워 쓰는 틀' },
};

export const CARD_TYPE_LIST = Object.values(CARD_TYPES);


/** 패턴 카드 판별용 신호 (설명형 카드) */
const PATTERN_SIGNS = [
  '+', '→', '재귀', '동사원형', '인칭', '신체부위', '접속법', '복수 ', '단수 ', ' vs ',
];


/** 스페인어 관사·한정사 — 바로 뒤에 오는 말은 명사 자리다 */
const DETERMINERS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'lo',
  'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'nuestro', 'nuestra',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas',
  'otro', 'otra', 'otros', 'otras', 'mucho', 'mucha', 'muchos', 'muchas',
  'poco', 'poca', 'cada', 'todo', 'toda', 'todos', 'todas', 'primer', 'segundo',
]);

/** 전치사 — 바로 뒤에 오는 말도 명사 자리다 */
const PREPOSITIONS = new Set([
  'a', 'al', 'de', 'del', 'en', 'con', 'sin', 'por', 'para',
  'sobre', 'hasta', 'desde', 'entre', 'hacia', 'tras', 'segun', 'durante',
  // 시간·위치를 나타내는 구를 이끄는 말 (antes de ~, después de ~)
  'antes', 'despues', 'cerca', 'lejos', 'dentro', 'fuera', 'encima', 'debajo',
]);

/** 스페인어 관사로 시작하는지 */
const ARTICLE_RE = /^(el|la|los|las|un|una|unos|unas)\s+/i;

/**
 * 품사는 뜻(한국어)의 어미로 판별한다.
 * 스페인어 철자만으로는 명사(ramen)와 형용사(amargo)를 구분할 수 없기 때문이다.
 *
 * 괄호 안 설명과 두 번째 뜻은 떼어내고 첫 번째 뜻만 본다.
 *   '건강한 (남)'          → '건강한'
 *   '덜 익은; 초록색의'     → '덜 익은'
 *   '시원한, 상쾌한'        → '시원한'
 */
function firstGloss(ko) {
  return (ko || '')
    .replace(/[(（].*?[)）]/g, '')   // 괄호 설명 제거
    .split(/[,;/·]/)[0]              // 첫 번째 뜻만
    .trim();
}

/**
 * 관형형 어미 — 명사를 꾸미는 꼴이면 형용사다.
 * 짠 · 신 · 쓴 · 질긴 · 달콤한 · 매운 · 재미있는 · 기쁜 …
 * (라면·수건처럼 ㄴ으로 끝나는 명사와 섞이지 않도록 어미를 열거한다)
 */
const ADNOMINAL_RE = /(은|는|한|운|린|픈|쁜|든|긴|신|쓴|짠|단|큰|찬|흰|먼|진|난|온)$/;

/**
 * 부사 — 일찍 · 늦게 · 천천히 · 그 다음에
 * '~에'로 끝나는 시간 부사(그 다음에)도 포함한다.
 */
const ADVERB_RE = /(일찍|빨리|자주|가끔|항상|먼저|다음에|나중에|이따가)$|[게히]$/;

/** 용언(동사·형용사)의 사전형 어미 */
const PREDICATE_RE = /다$/;

/**
 * 문장 안에 "진짜 동사"가 있는지 판별.
 *
 * ⚠️ 스페인어에는 명사와 동사 활용형의 철자가 같은 단어가 아주 많다.
 *    la reserva(예약) vs reserva(reservar 3인칭)
 *    el regalo(선물)  vs regalo(regalar 1인칭)
 *    la cocina(부엌)  vs cocina(cocinar 3인칭)
 *  단어만 대조하면 이런 명사구가 전부 '표현'으로 잘못 분류된다.
 *
 * 그래서 앞 단어를 함께 본다 — 관사·한정사·전치사 바로 뒤는 명사 자리다.
 */
export function containsVerb(es, verbForms) {
  const tokens = es.split(/[\s/]+/).map(normalizeToken).filter(Boolean);
  for (let i = 0; i < tokens.length; i++) {
    const prev = i > 0 ? tokens[i - 1] : null;
    if (prev && (DETERMINERS.has(prev) || PREPOSITIONS.has(prev))) continue;
    const t = tokens[i];
    // 늘 명사·형용사인 단어 (solar, lugar …)
    if (NOT_VERBS.has(t)) continue;
    // 명사·동사 양쪽으로 쓰이는 단어는 문장 첫머리에 있을 때만 동사로 본다.
    // (Trabajo en una oficina = 동사 / el trabajo = 명사)
    if (AMBIGUOUS.has(t) && i > 0) continue;
    if (INFINITIVE_RE.test(t) || verbForms.has(t) || EXTRA_FORMS.has(t)) return true;
  }
  return false;
}

/** 쉼표로 끊은 조각 중 전치사로 시작하는 게 있는지 (por la noche / ..., por favor) */
function startsWithPreposition(es) {
  return es.split(',').some(seg => {
    const first = normalizeToken((seg.trim().split(/\s+/)[0] || ''));
    return PREPOSITIONS.has(first);
  });
}

/**
 * 카드를 유형별로 자동 분류. (앞에서부터 먼저 맞는 것으로 결정)
 *
 *   1) 문법 패턴   — '+', '→' 등 설명 기호가 있는 카드
 *   2) 동사        — 동사원형 한 단어              (ayudar, creer)
 *   3) 표현        — 동사가 들어간 조합            (ir a conciertos, me gusta mucho)
 *                    전치사로 시작하는 구          (por la noche, por favor)
 *                    의문·감탄으로 통째 쓰는 말    (¿Qué tal?)
 *   4) 형용사·부사 — 꾸미는 말 한 단어
 *   5) 명사        — 나머지                        (la reserva, el papel de regalo)
 *
 * @param {{es:string, ko:string}} card
 * @param {Set<string>} [verbForms] 활용형 사전
 */
export function classifyCard(card, verbForms = new Set()) {
  const es = (card.es || '').trim();
  const ko = (card.ko || '').trim();

  // 1) 설명형 패턴 카드
  if (PATTERN_SIGNS.some(sign => es.includes(sign))) return 'pattern';

  const tokens = es.split(/\s+/).filter(Boolean);

  /* ---------- 한 단어 ---------- */
  if (tokens.length === 1) {
    const word = normalizeToken(es);
    const gloss = firstGloss(ko);

    // 동사원형 (freír, ir 포함)
    if (isInfinitive(word)) return 'verb';
    // 활용형·조건법 등 동사 형태 (subo, hay, hablaría)
    if (verbForms.has(word) || EXTRA_FORMS.has(word)) return 'verb';
    if (/(1인칭|조건법)/.test(ko)) return 'verb';

    // 전치사·접속사 한 단어 (entre → ~사이에) — 통째로 쓰는 말이라 표현으로 둔다
    if (PREPOSITIONS.has(word)) return 'phrase';

    // 부사
    if (ADVERB_RE.test(gloss)) return 'adj';
    // 관형형이면 형용사 (짠, 쓴, 매운, 달콤한 …)
    if (ADNOMINAL_RE.test(gloss)) return 'adj';
    // '맛있다'처럼 사전형으로 적힌 형용사 — 동사원형이 아니면 형용사로 본다
    if (PREDICATE_RE.test(gloss)) return 'adj';

    return 'noun';
  }

  /* ---------- 두 단어 이상 ---------- */
  // 동사가 들어간 조합
  if (containsVerb(es, verbForms)) return 'phrase';
  // 마침표로 끝나는 완성 문장
  if (/[.]\s*$/.test(es)) return 'phrase';
  // 인사말 등 관용 표현
  if (/^(gracias|muchas gracias|muchisimas gracias|hola|adios|buenos|buenas|perdon|lo siento)/i
    .test(normalizeToken(es))) return 'phrase';
  // 전치사로 시작하는 구
  if (startsWithPreposition(es)) return 'phrase';
  // 의문·감탄으로 통째로 외우는 말
  if (/[¿?¡!]/.test(es)) return 'phrase';

  // 여러 단어짜리 형용사구 (잘 익은, 과즙이 많은)
  // 단, 관사로 시작하면 명사다 — '계단(las escaleras)', '은(la plata)'처럼
  // 뜻의 끝 글자가 관형형 어미와 겹쳐 형용사로 오인되는 것을 막는다.
  if (!ARTICLE_RE.test(es) && ADNOMINAL_RE.test(firstGloss(ko))) return 'adj';

  // 나머지는 명사 (la reserva, el papel de regalo, la comida española)
  return 'noun';
}

/** 레슨의 theme 키가 유효한지 확인 (없으면 basics로 폴백) */
export function resolveTheme(themeKey) {
  return THEMES[themeKey] ? themeKey : 'basics';
}
