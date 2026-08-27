import { EXTRA_FORMS, INFINITIVE_RE, normalizeToken } from './verbForms.js';

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


/** 스페인어 관사 */
const ARTICLE_RE = /^(el|la|los|las|un|una|unos|unas)\s+/i;


/**
 * 뜻(한국어)으로 형용사·부사를 알아본다.
 * 스페인어만 봐서는 명사와 형용사가 잘 구분되지 않아 뜻 쪽 어미를 본다.
 * 예: '잘 익은', '시원한, 상쾌한', '간단한'
 */
const ADJ_KO_RE = /(은|는|한|운|든|린|픈|singular)$|^(아주|매우|너무)\s/;


/** 동사가 하나라도 들어있는지 */
export function containsVerb(es, verbForms) {
  const tokens = es.split(/[\s/]+/).map(normalizeToken).filter(Boolean);
  return tokens.some(t => INFINITIVE_RE.test(t) || verbForms.has(t) || EXTRA_FORMS.has(t));
}


/**
 * 카드를 유형별로 자동 분류.
 *
 * 분류 기준
 *   1) 문법 패턴  — '+', '→' 등 설명 기호가 있는 카드
 *   2) 동사       — 동사원형 한 단어 (활용 학습 대상)
 *   3) 표현       — 여러 단어 중 동사가 들어간 것 (완성 문장 포함)
 *   4) 형용사·부사 — 꾸미는 말 한 단어
 *   5) 명사       — 나머지 (단일 명사, 관사+명사, 명사끼리 연결된 구)
 *
 * @param {{es:string, ko:string}} card
 * @param {Set<string>} [verbForms] 활용형 사전 (없으면 원형·기본형만으로 판별)
 */
export function classifyCard(card, verbForms = new Set()) {
  const es = (card.es || '').trim();
  const ko = (card.ko || '').trim();

  // 1) 설명형 패턴 카드
  if (PATTERN_SIGNS.some(sign => es.includes(sign))) return 'pattern';

  const tokens = es.split(/\s+/).filter(Boolean);

  // 2) 동사원형 한 단어 → 활용 학습 대상
  if (tokens.length === 1 && INFINITIVE_RE.test(normalizeToken(es))) return 'verb';

  // 3) 여러 단어 + 동사 포함 → 표현
  if (tokens.length >= 2 && containsVerb(es, verbForms)) return 'phrase';

  // 4) 한 단어인데 관사가 없고 뜻이 꾸밈말 → 형용사·부사
  if (tokens.length === 1 && !ARTICLE_RE.test(es) && ADJ_KO_RE.test(ko)) return 'adj';

  // 5) 나머지는 명사 (단일 명사 · 관사+명사 · 명사구)
  return 'noun';
}


/** 레슨의 theme 키가 유효한지 확인 (없으면 basics로 폴백) */
export function resolveTheme(themeKey) {
  return THEMES[themeKey] ? themeKey : 'basics';
}
