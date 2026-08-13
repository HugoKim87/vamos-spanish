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
  word: { key: 'word', label: '단어', emoji: '🔤', hint: '명사 · 동사원형 등 낱말' },
  phrase: { key: 'phrase', label: '표현', emoji: '🧩', hint: '두 단어 이상의 관용 표현' },
  sentence: { key: 'sentence', label: '문장', emoji: '💬', hint: '바로 말할 수 있는 완성 문장' },
  pattern: { key: 'pattern', label: '문법 패턴', emoji: '📐', hint: '빈칸을 채워 쓰는 틀' },
};

export const CARD_TYPE_LIST = Object.values(CARD_TYPES);

/** 패턴 카드 판별용 신호 (설명형 카드) */
const PATTERN_SIGNS = [
  '+', '재귀', '동사원형', '인칭', '신체부위', '접속법', '복수 ', '단수 ',
];

/** 스페인어 관사로 시작하는지 (→ 명사 단어일 가능성) */
const ARTICLE_RE = /^(el|la|los|las|un|una|unos|unas)\s+/i;

/** 문장부호가 있는지 */
const SENTENCE_RE = /[.!?¿¡]/;

/**
 * 카드를 4가지 유형 중 하나로 자동 분류.
 * 새 카드가 추가돼도 이 함수만 통과하면 필터·통계에 자동 반영됩니다.
 * @param {{es:string, ko:string}} card
 * @returns {'word'|'phrase'|'sentence'|'pattern'}
 */
export function classifyCard(card) {
  const es = (card.es || '').trim();
  const ko = (card.ko || '').trim();

  // 1) 패턴: "Soy + 직업", "me duele + 단수 신체부위" 같은 설명형
  if (PATTERN_SIGNS.some(sign => es.includes(sign))) return 'pattern';
  // 뜻 쪽에만 패턴 설명이 있는 경우 (예: 'a + 층')
  if (/~[을를이가]?\s*(위한|위해|하다|이다)/.test(ko) && es.includes('+')) return 'pattern';

  const words = es.split(/\s+/).length;

  // 2) 문장: 문장부호 + 3단어 이상
  if (SENTENCE_RE.test(es) && words >= 3) return 'sentence';

  // 3) 단어: 한 단어이거나 관사+명사 형태
  if (words === 1 || (ARTICLE_RE.test(es) && words <= 3)) return 'word';

  // 4) 나머지 여러 단어 조합 = 표현
  return words >= 2 ? 'phrase' : 'word';
}

/** 레슨의 theme 키가 유효한지 확인 (없으면 basics로 폴백) */
export function resolveTheme(themeKey) {
  return THEMES[themeKey] ? themeKey : 'basics';
}
