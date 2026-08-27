import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { lessons as rawLessons } from '@/data/lessons.js';
import {
  THEMES, THEME_LIST, CARD_TYPES, CARD_TYPE_LIST,
  classifyCard, resolveTheme,
} from '@/data/taxonomy.js';
import { conjugatePresent, practicePersons } from '@/data/conjugation.js';
import { isInfinitive } from '@/data/verbForms.js';

/**
 * 어휘 스토어 — 원본 lessons.js를 읽어 모든 파생 데이터를 계산합니다.
 *
 * ★ 자동 재구성의 핵심 ★
 * lessons.js에 Day를 추가하기만 하면
 *   - 카드 유형(명사/동사/형용사/표현/패턴) 자동 판별
 *   - 동사원형 카드는 현재형 6인칭 활용까지 자동 생성
 *   - 테마별 집계, 전체 통계, Day 범위 문구
 *   - 검색/필터 대상
 * 이 전부 자동으로 갱신됩니다. 화면 코드는 수정할 필요가 없습니다.
 */
export const useVocabularyStore = defineStore('vocabulary', () => {
  /**
   * 활용형 사전 — "이 문장에 동사가 들어있나?" 판별에 씁니다.
   * 데이터에 있는 동사원형을 전부 현재형으로 펼쳐 담아 둡니다.
   */
  const verbForms = computed(() => {
    const set = new Set();
    for (const l of rawLessons) {
      for (const c of l.cards) {
        const es = (c.es || '').trim().toLowerCase();
        if (!isInfinitive(es)) continue;
        const conj = conjugatePresent(es);
        if (!conj) continue;
        for (const form of Object.values(conj.forms)) {
          form.split(/\s+/).forEach(w => set.add(w));
        }
      }
    }
    return set;
  });

  /* ---------- 정규화된 레슨 ---------- */
  const lessons = computed(() =>
    rawLessons
      .map(l => ({
        ...l,
        theme: resolveTheme(l.theme),
        cards: l.cards.map((c, i) => ({
          ...c,
          // 카드 고유 ID: 진도 추적·중복 판별용
          uid: `${l.id}:${i}`,
          type: classifyCard(c, verbForms.value),
          lessonId: l.id,
          day: l.day,
          theme: resolveTheme(l.theme),
          lessonTitle: l.title,
          emoji: l.emoji,
        })),
      }))
      .sort((a, b) => a.day - b.day)
  );

  /** 모든 카드를 평평하게 편 배열 (검색·전체 학습용) */
  const allCards = computed(() => lessons.value.flatMap(l => l.cards));

  /**
   * 동사 카드 + 활용표 — 동사 활용 학습 모드의 원천.
   * 같은 동사가 여러 Day에 있으면 하나로 합칩니다.
   */
  const verbCards = computed(() => {
    const byInf = new Map();
    for (const c of allCards.value) {
      if (c.type !== 'verb') continue;
      const conj = conjugatePresent(c.es);
      if (!conj) continue;
      byInf.set(conj.infinitive, {
        ...c,
        conj,
        persons: practicePersons(conj),
      });
    }
    return [...byInf.values()];
  });

  /* ---------- 집계 ---------- */
  const totalCards = computed(() => allCards.value.length);
  const totalLessons = computed(() => lessons.value.length);

  const dayRange = computed(() => {
    const days = lessons.value.map(l => l.day).filter(Number.isFinite);
    if (!days.length) return null;
    return { min: Math.min(...days), max: Math.max(...days) };
  });

  /** 테마별 요약 (레슨 수 · 카드 수) — 홈 화면 카드용 */
  // cards를 여기서 한 번만 펼쳐 둔다. 템플릿에서 flatMap을 돌리면
  // 렌더링마다 9개 테마 × 수백 장의 배열이 새로 만들어진다.
  const themeSummaries = computed(() =>
    THEME_LIST.map(theme => {
      const inTheme = lessons.value.filter(l => l.theme === theme.key);
      const cards = inTheme.flatMap(l => l.cards);
      return {
        ...theme,
        lessonCount: inTheme.length,
        cardCount: cards.length,
        lessons: inTheme,
        cards,
      };
    }).filter(t => t.lessonCount > 0)
  );

  /** 카드 유형별 개수 — allCards를 한 번만 훑는다 */
  const typeSummaries = computed(() => {
    const counts = Object.create(null);
    for (const c of allCards.value) counts[c.type] = (counts[c.type] || 0) + 1;
    return CARD_TYPE_LIST.map(t => ({ ...t, count: counts[t.key] || 0 }));
  });

  /* ---------- 조회 헬퍼 ---------- */
  const getLesson = id => lessons.value.find(l => l.id === id);
  const getTheme = key => themeSummaries.value.find(t => t.key === key);

  /**
   * 조건에 맞는 카드 묶음 반환 — 학습 세트 구성의 단일 진입점.
   * @param {{theme?:string, lessonId?:string, types?:string[], uids?:string[], query?:string, limit?:number}} opts
   */
  function buildSet(opts = {}) {
    const { theme, lessonId, types, uids, query, limit } = opts;
    let cards = allCards.value;

    if (lessonId) cards = cards.filter(c => c.lessonId === lessonId);
    if (theme) cards = cards.filter(c => c.theme === theme);
    if (types?.length) cards = cards.filter(c => types.includes(c.type));
    if (uids?.length) {
      const set = new Set(uids); // 배열 includes로 돌면 O(n×m)이 된다
      cards = cards.filter(c => set.has(c.uid));
    }

    if (query) {
      const q = query.trim().toLowerCase();
      if (q) {
        cards = cards.filter(
          c => c.es.toLowerCase().includes(q) || c.ko.toLowerCase().includes(q)
        );
      }
    }
    return limit ? cards.slice(0, limit) : cards;
  }

  /* ---------- 검색 상태 (모든 단어 보기 화면 공유) ---------- */
  const searchQuery = ref('');
  const searchTypes = ref([]);
  const searchTheme = ref('');
  const searchHardOnly = ref(false); // 홈의 "어려운 카드 복습" 진입용

  return {
    // 정의
    THEMES, THEME_LIST, CARD_TYPES, CARD_TYPE_LIST,
    // 데이터
    lessons, allCards, verbCards,
    // 집계
    totalCards, totalLessons, dayRange, themeSummaries, typeSummaries,
    // 조회
    getLesson, getTheme, buildSet,
    // 검색 상태
    searchQuery, searchTypes, searchTheme, searchHardOnly,
  };
});
