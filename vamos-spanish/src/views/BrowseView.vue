<script setup>
import { computed, ref, watch } from 'vue';
import { useVocabularyStore } from '@/stores/vocabulary.js';
import { useProgressStore } from '@/stores/progress.js';
import SpeakButton from '@/components/SpeakButton.vue';
import TypeBadge from '@/components/TypeBadge.vue';

const PAGE = 150; // 한 번에 그릴 카드 수 — 1,000장을 한꺼번에 그리면 첫 화면이 느리다

const vocab = useVocabularyStore();
const progress = useProgressStore();

/** 검색·필터 결과 (최신 Day가 먼저 오도록 정렬) */
const results = computed(() => {
  const base = vocab.buildSet({
    query: vocab.searchQuery,
    theme: vocab.searchTheme || undefined,
    types: vocab.searchTypes.length ? vocab.searchTypes : undefined,
  });
  const filtered = vocab.searchHardOnly
    ? base.filter(c => progress.markOf(c.uid) === 'hard')
    : base;

  // ⚠️ 자르기(slice)보다 정렬이 먼저여야 한다.
  //    원본은 Day 1부터 담겨 있어서, 먼저 자르면 앞쪽 오래된 Day만 남고
  //    최신 Day는 "더 보기"를 여러 번 눌러야 나온다.
  //    sort는 안정 정렬이라 같은 Day 안에서는 원래 카드 순서가 유지된다.
  return [...filtered].sort((a, b) => b.day - a.day);
});

/** 화면에 실제로 그리는 개수 (더 보기로 늘어남) */
const shown = ref(PAGE);
watch(results, () => { shown.value = PAGE; }); // 조건이 바뀌면 처음부터

/**
 * 칩 숫자는 "지금 이걸 누르면 실제로 몇 장이 되는지"여야 한다.
 * 검색어·다른 필터를 무시하고 전체 개수를 보여주면,
 * '명사 548'을 눌렀는데 2장만 나오는 일이 생긴다.
 */
function countWith({ theme, types, hardOnly }) {
  const base = vocab.buildSet({
    query: vocab.searchQuery,
    theme: theme ?? (vocab.searchTheme || undefined),
    types: types ?? (vocab.searchTypes.length ? vocab.searchTypes : undefined),
  });
  const wantHard = hardOnly ?? vocab.searchHardOnly;
  return wantHard ? base.filter(c => progress.markOf(c.uid) === 'hard').length : base.length;
}

/** 테마 칩 — 다른 조건을 유지한 채 이 테마만 바꿔 본 장수 (0장이면 숨김) */
const themeChips = computed(() => [
  { key: '', label: '전체 테마', emoji: '', count: countWith({ theme: undefined }) },
  ...vocab.themeSummaries
    .map(t => ({ key: t.key, label: t.label, emoji: t.emoji, count: countWith({ theme: t.key }) }))
    .filter(t => t.count > 0),
]);

/** 유형 칩 — 이 유형만 골랐을 때의 장수 (0장이면 숨김) */
const typeChips = computed(() => [
  { key: '', label: '전체 유형', emoji: '', count: countWith({ types: undefined }) },
  ...vocab.CARD_TYPE_LIST
    .map(t => ({ key: t.key, label: t.label, emoji: t.emoji, count: countWith({ types: [t.key] }) }))
    .filter(t => t.count > 0),
]);

/** 어려움 칩 — 지금 조건에서 어려움 표시된 장수 */
const hardCount = computed(() => countWith({ hardOnly: true }));

/**
 * 조건을 바꾸다 보면 이전 선택이 0장이 되는 조합이 생긴다.
 * 그대로 두면 빈 화면만 남으므로 무효해진 선택은 자동으로 푼다.
 */
watch([typeChips, themeChips], () => {
  const validTypes = new Set(typeChips.value.map(t => t.key));
  const kept = vocab.searchTypes.filter(k => validTypes.has(k));
  if (kept.length !== vocab.searchTypes.length) vocab.searchTypes = kept;

  const validThemes = new Set(themeChips.value.map(t => t.key));
  if (vocab.searchTheme && !validThemes.has(vocab.searchTheme)) vocab.searchTheme = '';

  if (vocab.searchHardOnly && hardCount.value === 0) vocab.searchHardOnly = false;
});

const visible = computed(() => results.value.slice(0, shown.value));
const hasMore = computed(() => results.value.length > shown.value);

/** 레슨(Day)별로 묶어 보여주기 */
const grouped = computed(() => {
  const map = new Map();
  for (const c of visible.value) {
    if (!map.has(c.lessonId)) {
      map.set(c.lessonId, { id: c.lessonId, day: c.day, title: c.lessonTitle, emoji: c.emoji, cards: [] });
    }
    map.get(c.lessonId).cards.push(c);
  }
  return [...map.values()].sort((a, b) => b.day - a.day);
});

const hasFilter = computed(() =>
  !!vocab.searchQuery || !!vocab.searchTheme || vocab.searchTypes.length > 0 || vocab.searchHardOnly
);

function toggleType(key) {
  const i = vocab.searchTypes.indexOf(key);
  if (i >= 0) vocab.searchTypes.splice(i, 1);
  else vocab.searchTypes.push(key);
}

function clearAll() {
  vocab.searchQuery = '';
  vocab.searchTheme = '';
  vocab.searchTypes = [];
  vocab.searchHardOnly = false;
}
</script>

<template>
  <div class="container">
    <header class="head">
      <h1 class="title">모든 단어</h1>
      <p class="sub">
        {{ vocab.totalCards }}장 전체에서 스페인어 · 한국어로 검색할 수 있어요
      </p>
    </header>

    <!-- 검색 -->
    <div class="search-wrap">
      <input
        v-model="vocab.searchQuery"
        class="search"
        type="search"
        placeholder="🔍  예: piso, 아프다, tengo…"
        aria-label="단어 검색"
      />
      <button v-if="hasFilter"
        class="btn btn-ghost btn-sm clear" @click="clearAll">초기화</button>
    </div>

    <!-- 필터 — 지금 조건에서 1장 이상인 것만 보여준다 -->
    <div class="filters">
      <div class="scroll-x">
        <button
          v-for="t in themeChips" :key="t.key || 'all'"
          class="chip" :class="{ 'is-active': vocab.searchTheme === t.key }"
          @click="vocab.searchTheme = t.key"
        >{{ t.emoji }} {{ t.label }} <span class="chip-count">{{ t.count }}</span></button>
      </div>
      <div class="scroll-x">
        <button
          v-for="t in typeChips" :key="t.key || 'all'"
          class="chip"
          :class="{ 'is-active': t.key ? vocab.searchTypes.includes(t.key) : vocab.searchTypes.length === 0 }"
          @click="t.key ? toggleType(t.key) : (vocab.searchTypes = [])"
        >{{ t.emoji }} {{ t.label }} <span class="chip-count">{{ t.count }}</span></button>
        <button
          v-if="hardCount > 0 || vocab.searchHardOnly"
          class="chip" :class="{ 'is-active': vocab.searchHardOnly }"
          @click="vocab.searchHardOnly = !vocab.searchHardOnly"
        >😵 어려움만 <span class="chip-count">{{ hardCount }}</span></button>
      </div>
    </div>

    <p class="count">
      {{ results.length }}장<span v-if="hasMore"> 중 {{ visible.length }}장 표시</span>
    </p>

    <!-- 결과 -->
    <div v-if="grouped.length" class="groups">
      <section v-for="g in grouped" :key="g.id" class="group">
        <h2 class="g-head">
          <span>{{ g.emoji }} Day {{ g.day }} · {{ g.title }}</span>
          <span class="g-count">{{ g.cards.length }}</span>
        </h2>
        <ul>
          <li v-for="c in g.cards" :key="c.uid" class="row">
            <div class="r-main">
              <div class="r-es es-text">{{ c.es }}</div>
              <div class="r-ko">{{ c.ko }}</div>
            </div>
            <TypeBadge :type="c.type" />
            <span v-if="progress.markOf(c.uid) === 'hard'" class="r-hard" title="어려움 표시">😵</span>
            <span v-else-if="progress.learned.has(c.uid)" class="r-done" title="학습함">✓</span>
            <SpeakButton :text="c.es" size="sm" />
          </li>
        </ul>
      </section>

      <button v-if="hasMore" class="btn btn-ghost more" @click="shown += PAGE">
        더 보기 ({{ results.length - visible.length }}장 남음)
      </button>
    </div>

    <p v-else class="empty">조건에 맞는 단어가 없어요. 검색어나 필터를 바꿔보세요.</p>
  </div>
</template>

<style scoped>
.head { padding: var(--sp-5) 0 var(--sp-4); }
.title { font-size: 26px; font-weight: 900; letter-spacing: -.03em; }
.sub { font-size: 13.5px; color: var(--c-text-mute); }

.search-wrap {
  position: sticky; top: var(--header-h); z-index: 20;
  display: flex; gap: var(--sp-2); align-items: center;
  padding: var(--sp-3) 0;
  background: var(--c-bg);
}
.search {
  flex: 1;
  padding: 13px var(--sp-4);
  border: 1.5px solid var(--c-border);
  border-radius: var(--r-md);
  background: var(--c-surface);
  font-size: 15px; font-weight: 500;
  transition: border-color .15s var(--ease);
}
.search:focus { outline: none; border-color: var(--c-primary); }
.clear { flex-shrink: 0; }

.filters { display: flex; flex-direction: column; gap: var(--sp-2); margin-bottom: var(--sp-3); }
.count { font-size: 13px; font-weight: 700; color: var(--c-text-mute); margin-bottom: var(--sp-3); }

.groups { display: flex; flex-direction: column; gap: var(--sp-5); }
.g-head {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: var(--sp-2); margin-bottom: var(--sp-2);
  border-bottom: 2px solid var(--c-border);
  font-size: 15px; font-weight: 800;
}
.g-count {
  padding: 2px 9px; border-radius: var(--r-full);
  background: var(--c-primary-soft); color: var(--c-primary);
  font-size: 11.5px; font-weight: 800;
}
.row {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 10px var(--sp-3); border-radius: var(--r-sm);
  transition: background .12s var(--ease);
}
.row:hover { background: var(--c-surface); }
.r-main { flex: 1; min-width: 0; }
.r-es { font-weight: 700; font-size: 15px; }
.r-ko { font-size: 13px; color: var(--c-text-soft); }
.r-done, .r-hard {
  display: grid; place-items: center;
  width: 22px; height: 22px; border-radius: 50%;
  font-size: 12px; font-weight: 900;
}
.r-done { background: var(--c-success-soft); color: var(--c-success); }
.r-hard { background: var(--c-danger-soft); }
.more { align-self: center; margin-top: var(--sp-3); }
.empty { padding: var(--sp-7) 0; text-align: center; color: var(--c-text-mute); }
</style>
