import { defineStore } from 'pinia';
import { computed, nextTick, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase.js';
import { useAuthStore } from '@/stores/auth.js';

const STORAGE_KEY = 'vamos.progress.v1';
const LOCAL_SAVE_MS = 400;   // localStorage 쓰기 디바운스
const CLOUD_SAVE_MS = 1200;  // 네트워크 요청 디바운스 (더 길게)

/** localStorage 안전 읽기 (사용 불가 환경에서도 앱이 죽지 않도록) */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
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

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* 무시 */ }
}

/**
 * 오늘 날짜 키 (YYYY-MM-DD)
 * ⚠️ toISOString()은 UTC 기준이라 한국(UTC+9)에서 오전 9시 이전이면
 *    "어제"로 계산돼 연속 학습일이 잘못 끊긴다. 반드시 로컬 시간으로 만든다.
 */
function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const todayKey = () => dateKey();
const yesterdayKey = () => dateKey(new Date(Date.now() - 86400000));

/**
 * 학습 진도 스토어
 *  - 비로그인: localStorage에만 저장 (이 브라우저 한정)
 *  - 로그인  : localStorage + Supabase 양쪽 저장, 기기 간 이어하기 가능
 *
 * learned : 학습한 카드 uid 집합
 * marks   : uid → 'hard' | 'know'
 * best    : 카드 맞추기 세트별 최고 기록(초)
 * streak  : 연속 학습일
 */
export const useProgressStore = defineStore('progress', () => {
  const auth = useAuthStore();
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

  function progressOf(cards) {
    if (!cards?.length) return 0;
    let done = 0;
    for (const c of cards) if (learned.value.has(c.uid)) done++;
    return Math.round((done / cards.length) * 100);
  }

  /* ---------- 액션 ---------- */
  // Vue 3의 ref는 Set/Map도 반응형으로 감싸므로 .add()만으로 갱신이 감지된다.
  // (예전처럼 new Set(...)으로 통째 복사하면 카드 1장마다 O(n) 복사가 발생한다.)
  function markLearned(uid) {
    if (!uid || learned.value.has(uid)) return;
    learned.value.add(uid);
    bumpDaily();
  }

  function setMark(uid, value) {
    if (value) marks.value[uid] = value;
    else delete marks.value[uid];
  }

  function markOf(uid) {
    return marks.value[uid] || null;
  }

  function recordBest(setKey, seconds) {
    const prev = best.value[setKey];
    if (prev == null || seconds < prev) {
      best.value[setKey] = seconds;
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
      streak.value = lastStudyDate.value === yesterdayKey() ? streak.value + 1 : 1;
      lastStudyDate.value = today;
      dailyCount.value = 0;
    }
    dailyCount.value += 1;
  }

  /**
   * 모든 학습 기록 삭제 — 되돌릴 수 없다.
   * 로컬을 비우고, 로그인 상태면 클라우드 기록도 함께 비운다.
   */
  async function resetAll() {
    learned.value = new Set();
    marks.value = {};
    best.value = {};
    streak.value = 0;
    dailyCount.value = 0;
    lastStudyDate.value = null;

    clearTimeout(localTimer);
    clearTimeout(cloudTimer);
    clearState();

    const uid = auth.user?.id;
    if (!uid) return;
    try {
      await supabase.from('progress').upsert(toRow(uid));
    } catch (e) {
      console.error('초기화 동기화 실패:', e);
    }
  }

  /* ---------- 클라우드 동기화 ---------- */
  const syncing = ref(false);
  let suppressSave = false; // 클라우드에서 내려받아 채우는 중엔 되돌려 쓰지 않는다
  let localTimer = null;
  let cloudTimer = null;

  function snapshot() {
    return {
      learned: [...learned.value],
      marks: { ...marks.value },
      best: { ...best.value },
      streak: streak.value,
      dailyCount: dailyCount.value,
      lastStudyDate: lastStudyDate.value,
    };
  }

  function toRow(userId) {
    const s = snapshot();
    return {
      user_id: userId,
      learned: s.learned,
      marks: s.marks,
      best: s.best,
      streak: s.streak,
      daily_count: s.dailyCount,
      last_study_date: s.lastStudyDate,
    };
  }

  /**
   * 로컬 진도와 클라우드 진도를 합친다.
   * 어느 쪽도 버리지 않는 게 핵심 — 로그인했다고 지금까지 공부한 게 날아가면 안 된다.
   */
  function mergeWithCloud(row) {
    // 학습한 카드·어려움 표시는 합집합
    for (const uid of row.learned || []) learned.value.add(uid);
    marks.value = { ...(row.marks || {}), ...marks.value }; // 충돌 시 현재 기기 우선

    // 최고 기록은 더 빠른 쪽
    const cloudBest = row.best || {};
    for (const [k, v] of Object.entries(cloudBest)) {
      if (best.value[k] == null || v < best.value[k]) best.value[k] = v;
    }

    // 마지막 학습일은 더 나중, 연속일은 더 큰 값
    const cloudDate = row.last_study_date || null;
    const localDate = lastStudyDate.value;
    lastStudyDate.value = !localDate || (cloudDate && cloudDate > localDate) ? cloudDate : localDate;
    streak.value = Math.max(streak.value, row.streak || 0);

    // 오늘 학습량은 같은 날짜일 때만 이어받는다
    if (cloudDate === todayKey()) {
      dailyCount.value = Math.max(dailyCount.value, row.daily_count || 0);
    }
  }

  /** 로그인 직후 1회 — 클라우드 진도를 받아 합치고, 합친 결과를 다시 올린다 */
  async function syncOnLogin(uid) {
    syncing.value = true;
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();
      if (error) throw error;

      if (data) {
        suppressSave = true;
        mergeWithCloud(data);
        await nextTick();      // watch가 흘러간 뒤에 해제해야 되돌려쓰기를 막을 수 있다
        suppressSave = false;
      }
      await supabase.from('progress').upsert(toRow(uid));
    } catch (e) {
      console.error('진도 동기화 실패:', e);
    } finally {
      syncing.value = false;
    }
  }

  function scheduleCloudSave() {
    const uid = auth.user?.id;
    if (!uid) return;
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(async () => {
      try {
        await supabase.from('progress').upsert(toRow(uid));
      } catch (e) {
        console.error('진도 저장 실패:', e);
      }
    }, CLOUD_SAVE_MS);
  }

  /** 로그인/로그아웃 감지 */
  watch(
    () => auth.user?.id,
    (uid, prevUid) => {
      if (uid) {
        syncOnLogin(uid);
      } else if (prevUid) {
        // 로그아웃: 이 기기에 남은 진도를 지운다.
        // (클라우드에 이미 저장돼 있고, 공용 PC에서 다음 사람에게 넘어가면 안 되므로)
        clearTimeout(cloudTimer);
        resetAll();
        clearState();
      }
    },
    { immediate: true }
  );

  /* ---------- 자동 저장 (로컬은 항상, 클라우드는 로그인 시) ---------- */
  // 카드 한 장 넘길 때마다 1,000개짜리 배열을 직렬화하지 않도록 디바운스한다.
  watch(
    [learned, marks, best, streak, dailyCount, lastStudyDate],
    () => {
      if (suppressSave) return;

      clearTimeout(localTimer);
      localTimer = setTimeout(() => {
        const s = snapshot();
        saveState({ ...s, dailyDate: todayKey() });
      }, LOCAL_SAVE_MS);

      scheduleCloudSave();
    },
    { deep: true }
  );

  return {
    learned, marks, best, streak, dailyCount, syncing,
    learnedCount, hardCards,
    progressOf, markLearned, setMark, markOf,
    recordBest, bestOf, resetAll,
  };
});
