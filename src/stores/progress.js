import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const STORAGE_KEY = 'vamos.progress.v1';

/** localStorage 안전 읽기 (사용 불가 환경에서도 앱이 죽지 않도록) */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* 저장 실패는 무시 — 학습은 계속 가능 */
  }
}

/** 오늘 날짜 키 (YYYY-MM-DD) */
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * 학습 진도 스토어 — 브라우저에 자동 저장됩니다.
 *  - learned : 학습한 카드 uid 집합
 *  - marks   : uid → 'hard' | 'know'
 *  - best    : 카드 맞추기 최고 기록 (세트 키별)
 *  - streak  : 연속 학습일
 */
export const useProgressStore = defineStore('progress', () => {
  const saved = loadState() || {};

  const learned = ref(new Set(saved.learned || []));
  const marks = ref(saved.marks || {});
  const best = ref(saved.best || {});
  const lastStudyDate = ref(saved.lastStudyDate || null);
  const streak = ref(saved.streak || 0);
  const dailyCount = ref(
    saved.dailyDate === todayKey() ? (saved.dailyCount || 0) : 0
  );

  /* ---------- 파생값 ---------- */
  const learnedCount = computed(() => learned.value.size);
  const hardCards = computed(() =>
    Object.entries(marks.value).filter(([, v]) => v === 'hard').map(([k]) => k)
  );

  /** 특정 카드 묶음의 학습률(0~100) */
  function progressOf(cards) {
    if (!cards?.length) return 0;
    const done = cards.filter(c => learned.value.has(c.uid)).length;
    return Math.round((done / cards.length) * 100);
  }

  /* ---------- 액션 ---------- */
  function markLearned(uid) {
    if (!uid || learned.value.has(uid)) return;
    learned.value.add(uid);
    learned.value = new Set(learned.value); // 반응성 트리거
    bumpDaily();
  }

  function setMark(uid, value) {
    if (value) marks.value = { ...marks.value, [uid]: value };
    else {
      const next = { ...marks.value };
      delete next[uid];
      marks.value = next;
    }
  }

  function markOf(uid) {
    return marks.value[uid] || null;
  }

  function recordBest(setKey, seconds) {
    const prev = best.value[setKey];
    if (prev == null || seconds < prev) {
      best.value = { ...best.value, [setKey]: seconds };
      return true; // 신기록
    }
    return false;
  }

  function bestOf(setKey) {
    return best.value[setKey] ?? null;
  }

  /** 오늘 학습 카운트 + 연속일 갱신 */
  function bumpDaily() {
    const today = todayKey();
    if (lastStudyDate.value !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      streak.value = lastStudyDate.value === yesterday ? streak.value + 1 : 1;
      lastStudyDate.value = today;
      dailyCount.value = 0;
    }
    dailyCount.value += 1;
  }

  function resetAll() {
    learned.value = new Set();
    marks.value = {};
    best.value = {};
    streak.value = 0;
    dailyCount.value = 0;
    lastStudyDate.value = null;
  }

  /* ---------- 자동 저장 ---------- */
  watch(
    [learned, marks, best, streak, dailyCount, lastStudyDate],
    () => {
      saveState({
        learned: [...learned.value],
        marks: marks.value,
        best: best.value,
        streak: streak.value,
        dailyCount: dailyCount.value,
        dailyDate: todayKey(),
        lastStudyDate: lastStudyDate.value,
      });
    },
    { deep: true }
  );

  return {
    learned, marks, best, streak, dailyCount,
    learnedCount, hardCards,
    progressOf, markLearned, setMark, markOf,
    recordBest, bestOf, resetAll,
  };
});
