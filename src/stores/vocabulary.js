import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { lessons as rawLessons } from '@/data/lessons.js';
import {
  THEMES, THEME_LIST, CARD_TYPES, CARD_TYPE_LIST,
  classifyCard, resolveTheme,
} from '@/data/taxonomy.js';

/**
 * 어휘 스토어 — 원본 lessons.js를 읽어 모든 파생 데이터를 계산합니다.
 *
 * ★ 자동 재구성의 핵심 ★
 * lessons.js에 Day를 추가하기만 하면
 *   - 카드 유형(단어/표현/문장/패턴) 자동 판별
 *   - 테마별 집계, 전체 통계, Day 범위 문구
 *   - 검색/필터 대상
 * 이 전부 자동으로 갱신됩니다. 화면 코드는 수정할 필요가 없습니다.
 */
export const useVocabularyStore = defineStore('vocabulary', () => {
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
          type: classifyCard(c),
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

  /* ---------- 집계 ---------- */
  const totalCards = computed(() => allCards.value.length);
  const totalLessons = computed(() => lessons.value.length);

  const dayRange = computed(() => {
    const days = lessons.value.map(l => l.day).filter(Number.isFinite);
    if (!days.length) return null;
    return { min: Math.min(...days), max: Math.max(...days) };
  });

  /** 테마별 요약 (레슨 수 · 카드 수) — 홈 화면 카드용 */
  const themeSummaries = computed(() =>
    THEME_LIST.map(theme => {
      const inTheme = lessons.value.filter(l => l.theme === theme.key);
      return {
        ...theme,
        lessonCount: inTheme.length,
        cardCount: inTheme.reduce((s, l) => s + l.cards.length, 0),
        lessons: inTheme,
      };
    }).filter(t => t.lessonCount > 0)
  );

  /** 카드 유형별 개수 */
  const typeSummaries = computed(() =>
    CARD_TYPE_LIST.map(t => ({
      ...t,
      count: allCards.value.filter(c => c.type === t.key).length,
    }))
  );

  /* ---------- 조회 헬퍼 ---------- */
  const getLesson = id => lessons.value.find(l => l.id === id);
  const getTheme = key => themeSummaries.value.find(t => t.key === key);

  /**
   * 조건에 맞는 카드 묶음 반환 — 학습 세트 구성의 단일 진입점.
   * @param {{theme?:string, lessonId?:string, types?:string[], query?:string, limit?:number}} opts
   */
  function buildSet(opts = {}) {
    const { theme, lessonId, types, query, limit } = opts;
    let cards = allCards.value;

    if (lessonId) cards = cards.filter(c => c.lessonId === lessonId);
    if (theme) cards = cards.filter(c => c.theme === theme);
    if (types?.length) cards = cards.filter(c => types.includes(c.type));

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

  return {
    // 정의
    THEMES, THEME_LIST, CARD_TYPES, CARD_TYPE_LIST,
    // 데이터
    lessons, allCards,
    // 집계
    totalCards, totalLessons, dayRange, themeSummaries, typeSummaries,
    // 조회
    getLesson, getTheme, buildSet,
    // 검색 상태
    searchQuery, searchTypes, searchTheme,
  };
});
