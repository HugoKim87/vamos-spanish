<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVocabularyStore } from '@/stores/vocabulary.js';
import { useProgressStore } from '@/stores/progress.js';
import ProgressBar from '@/components/ProgressBar.vue';
import SpeakButton from '@/components/SpeakButton.vue';
import TypeBadge from '@/components/TypeBadge.vue';

const PREVIEW_LIMIT = 30;

const props = defineProps({ themeKey: { type: String, required: true } });
const route = useRoute();
const router = useRouter();
const vocab = useVocabularyStore();
const progress = useProgressStore();

const theme = computed(() => vocab.getTheme(props.themeKey));

/** 선택된 레슨 (없으면 테마 전체) — 홈의 "최근 레슨"에서 ?lesson=으로 들어오면 미리 선택 */
const selectedLesson = ref(String(route.query.lesson || ''));
/** 카드 유형 필터 */
const selectedTypes = ref([]);

const currentCards = computed(() =>
  vocab.buildSet({
    theme: props.themeKey,
    lessonId: selectedLesson.value || undefined,
    types: selectedTypes.value.length ? selectedTypes.value : undefined,
  })
);

const previewCards = computed(() => currentCards.value.slice(0, PREVIEW_LIMIT));

/**
 * 칩에 표시할 개수는 "지금 이걸 누르면 실제로 몇 장이 되는지"여야 한다.
 *
 * 레슨을 고른 상태에서 유형 칩이 테마 전체 개수를 보여주면
 * '명사 41'을 눌렀는데 3장만 나오는 일이 생긴다.
 * 그래서 레슨 칩은 선택된 유형을, 유형 칩은 선택된 레슨을 반영해 센다.
 */
function countCards(opts) {
  return vocab.buildSet({ theme: props.themeKey, ...opts }).length;
}

/** 레슨 칩 — 지금 선택된 유형 조건에서 1장 이상인 것만 */
const lessonCounts = computed(() => {
  const types = selectedTypes.value.length ? selectedTypes.value : undefined;
  return (theme.value?.lessons || [])
    .map(l => ({
      id: l.id,
      day: l.day,
      title: l.title,
      emoji: l.emoji,
      count: countCards({ lessonId: l.id, types }),
    }))
    .filter(l => l.count > 0);
});

/** '테마 전체' 칩 — 유형 조건만 적용한 장수 */
const themeTotal = computed(() =>
  countCards({ types: selectedTypes.value.length ? selectedTypes.value : undefined })
);

/** '전체' 유형 칩 — 선택된 레슨의 전체 장수 */
const currentLessonTotal = computed(() =>
  countCards({ lessonId: selectedLesson.value || undefined })
);

/** 유형 칩 — 지금 선택된 레슨에서 1장 이상인 것만 */
const typeCounts = computed(() => {
  const lessonId = selectedLesson.value || undefined;
  return vocab.CARD_TYPE_LIST
    .map(t => ({ ...t, count: countCards({ lessonId, types: [t.key] }) }))
    .filter(t => t.count > 0);
});

/**
 * 선택을 바꾸다 보면 이전 선택이 0장이 되는 조합이 생긴다.
 * (명사를 고른 뒤 명사가 없는 레슨을 고르는 경우)
 * 그대로 두면 "카드가 없어요"만 남으므로, 빈 선택은 자동으로 푼다.
 */
watch([selectedLesson, typeCounts], () => {
  const valid = new Set(typeCounts.value.map(t => t.key));
  const kept = selectedTypes.value.filter(k => valid.has(k));
  if (kept.length !== selectedTypes.value.length) selectedTypes.value = kept;
});

function toggleType(key) {
  const i = selectedTypes.value.indexOf(key);
  if (i >= 0) selectedTypes.value.splice(i, 1);
  else selectedTypes.value.push(key);
}

// 벤치마킹(Duolingo·Quizlet·Conjuguemos·ConjuGato·Linguno) 반영 —
// 보고 익히기 → 듣고 쓰기 → 동사 활용 → 점검 → 게임 순으로 배치
const MODES = [
  { key: 'flashcards', emoji: '🃏', label: '낱말카드', desc: '뒤집으며 익히기' },
  { key: 'learn', emoji: '🧠', label: '학습하기', desc: '문제 풀며 반복' },
  { key: 'dictation', emoji: '👂', label: '받아쓰기', desc: '듣고 그대로 적기' },
  { key: 'conjugation', emoji: '🔀', label: '동사 활용', desc: '인칭별 현재형 연습' },
  { key: 'test', emoji: '📝', label: '테스트', desc: '종합 점검' },
  { key: 'match', emoji: '⚡', label: '카드 맞추기', desc: '짝 맞추기 게임' },
];

/** 이 테마에 활용할 동사가 있는지 (없으면 동사 활용 모드 비활성) */
const verbCount = computed(() => currentCards.value.filter(c => c.type === 'verb').length);

function startStudy(mode) {
  router.push({
    name: 'study',
    params: { mode },
    query: {
      theme: props.themeKey,
      ...(selectedLesson.value ? { lesson: selectedLesson.value } : {}),
      ...(selectedTypes.value.length ? { types: selectedTypes.value.join(',') } : {}),
    },
  });
}
</script>

<template>
  <div v-if="theme" class="container">
    <!-- 테마 헤더 -->
    <header class="theme-head" :style="{ '--accent': theme.color }">
      <RouterLink to="/" class="back">← 테마 목록</RouterLink>
      <div class="th-main">
        <span class="th-emoji">{{ theme.emoji }}</span>
        <div>
          <h1 class="th-title">{{ theme.label }}</h1>
          <p class="th-hint">
            {{ theme.hint }} · {{ theme.lessonCount }}개 레슨 · {{ theme.cardCount }}장
          </p>
        </div>
      </div>
      <ProgressBar
        :value="progress.progressOf(theme.cards)"
        show-label
      />
    </header>

    <!-- 학습 세트 구성 -->
    <section class="builder card">
      <h2 class="b-title">학습 세트 만들기</h2>

      <div class="b-row">
        <span class="b-label">레슨</span>
        <div class="scroll-x">
          <button
            class="chip" :class="{ 'is-active': selectedLesson === '' }"
            @click="selectedLesson = ''"
          >
            테마 전체 <span class="chip-count">{{ themeTotal }}</span>
          </button>
          <button
            v-for="l in lessonCounts" :key="l.id"
            class="chip"
            :class="{ 'is-active': selectedLesson === l.id }"
            @click="selectedLesson = l.id"
          >
            {{ l.emoji }} {{ l.title }} <span class="chip-count">{{ l.count }}</span>
          </button>
        </div>
      </div>

      <div class="b-row">
        <span class="b-label">유형</span>
        <div class="scroll-x">
          <button
            class="chip" :class="{ 'is-active': selectedTypes.length === 0 }"
            @click="selectedTypes = []"
          >전체 <span class="chip-count">{{ currentLessonTotal }}</span></button>
          <button
            v-for="t in typeCounts" :key="t.key"
            class="chip"
            :class="{ 'is-active': selectedTypes.includes(t.key) }"
            @click="toggleType(t.key)"
          >
            {{ t.emoji }} {{ t.label }} <span class="chip-count">{{ t.count }}</span>
          </button>
        </div>
      </div>

      <p class="b-summary">
        선택한 세트: <b>{{ currentCards.length }}장</b>
      </p>

      <div class="mode-grid">
        <button
          v-for="m in MODES" :key="m.key"
          class="mode-btn"
          :disabled="currentCards.length === 0 || (m.key === 'conjugation' && verbCount === 0)"
          :title="m.key === 'conjugation' && verbCount === 0 ? '이 조건에는 활용할 동사가 없어요' : ''"
          @click="startStudy(m.key)"
        >
          <span class="m-emoji">{{ m.emoji }}</span>
          <span class="m-label">{{ m.label }}</span>
          <span class="m-desc">
            {{ m.key === 'conjugation' && verbCount ? `동사 ${verbCount}개` : m.desc }}
          </span>
        </button>
      </div>
    </section>

    <!-- 카드 미리보기 -->
    <section class="section">
      <div class="section-head">
        <div>
          <h2 class="section-title">카드 미리보기</h2>
          <p class="section-sub">{{ currentCards.length }}장 중 최대 {{ PREVIEW_LIMIT }}장</p>
        </div>
      </div>

      <ul class="preview">
        <li v-for="c in previewCards" :key="c.uid" class="pv-row">
          <div class="pv-main">
            <div class="pv-es es-text">{{ c.es }}</div>
            <div class="pv-ko">{{ c.ko }}</div>
          </div>
          <TypeBadge :type="c.type" />
          <span v-if="progress.learned.has(c.uid)" class="pv-done" title="학습함">✓</span>
          <SpeakButton :text="c.es" size="sm" />
        </li>
      </ul>
    </section>
  </div>

  <div v-else class="container empty">
    <p>존재하지 않는 테마입니다.</p>
    <RouterLink to="/" class="btn btn-primary">홈으로</RouterLink>
  </div>
</template>

<style scoped>
.theme-head {
  --accent: var(--c-primary);
  padding: var(--sp-5) 0 var(--sp-4);
}
.back {
  font-size: 13px; font-weight: 700; color: var(--c-text-mute);
}
.back:hover { color: var(--c-primary); }
.th-main { display: flex; align-items: center; gap: var(--sp-4); margin: var(--sp-3) 0; }
.th-emoji {
  display: grid; place-items: center;
  width: 56px; height: 56px; border-radius: var(--r-md);
  background: var(--c-surface); border: 1px solid var(--c-border);
  font-size: 28px;
}
.th-title { font-size: 26px; font-weight: 900; letter-spacing: -.03em; }
.th-hint { font-size: 13.5px; color: var(--c-text-mute); }

/* 세트 빌더 */
.builder { padding: var(--sp-5); }
.b-title { font-size: 16px; font-weight: 800; margin-bottom: var(--sp-4); }
.b-row {
  display: grid; grid-template-columns: 48px 1fr;
  align-items: center; gap: var(--sp-3);
  margin-bottom: var(--sp-3);
}
.b-label { font-size: 12.5px; font-weight: 800; color: var(--c-text-mute); }
.b-summary {
  margin: var(--sp-3) 0 var(--sp-4);
  font-size: 13.5px; color: var(--c-text-soft);
}

.mode-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--sp-3);
}
.mode-btn {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: var(--sp-4);
  border: 1.5px solid var(--c-border); border-radius: var(--r-md);
  background: var(--c-surface); text-align: left;
  transition: border-color .18s var(--ease), transform .18s var(--ease), box-shadow .18s var(--ease);
}
.mode-btn:hover:not(:disabled) {
  border-color: var(--c-primary); transform: translateY(-2px); box-shadow: var(--sh-sm);
}
.mode-btn:disabled { opacity: .4; cursor: not-allowed; }
.m-emoji { font-size: 22px; }
.m-label { margin-top: 6px; font-weight: 800; font-size: 15px; }
.m-desc { font-size: 12px; color: var(--c-text-mute); }

/* 미리보기 */
.preview { display: flex; flex-direction: column; gap: 2px; }
.pv-row {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 11px var(--sp-3); border-radius: var(--r-sm);
  transition: background .12s var(--ease);
}
.pv-row:hover { background: var(--c-surface); }
.pv-main { flex: 1; min-width: 0; }
.pv-es { font-weight: 700; font-size: 15px; }
.pv-ko { font-size: 13px; color: var(--c-text-soft); }
.pv-done {
  display: grid; place-items: center;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--c-success-soft); color: var(--c-success);
  font-size: 12px; font-weight: 900;
}
.empty { padding: var(--sp-7) 0; text-align: center; }
.empty p { margin-bottom: var(--sp-4); color: var(--c-text-mute); }

@media (max-width: 560px) {
  .b-row { grid-template-columns: 1fr; gap: var(--sp-1); }
}
</style>
