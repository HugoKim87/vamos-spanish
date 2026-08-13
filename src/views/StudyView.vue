<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVocabularyStore } from '@/stores/vocabulary.js';
import { useProgressStore } from '@/stores/progress.js';
import ProgressBar from '@/components/ProgressBar.vue';
import FlashcardMode from '@/components/modes/FlashcardMode.vue';
import LearnMode from '@/components/modes/LearnMode.vue';
import TestMode from '@/components/modes/TestMode.vue';
import MatchMode from '@/components/modes/MatchMode.vue';

const props = defineProps({
  mode: { type: String, required: true },
  theme: { type: String, default: '' },
  lessonId: { type: String, default: '' },
  types: { type: Array, default: () => [] },
});

const router = useRouter();
const vocab = useVocabularyStore();
const progress = useProgressStore();

const MODE_MAP = {
  flashcards: { comp: FlashcardMode, label: '낱말카드', emoji: '🃏' },
  learn: { comp: LearnMode, label: '학습하기', emoji: '🧠' },
  test: { comp: TestMode, label: '테스트', emoji: '📝' },
  match: { comp: MatchMode, label: '카드 맞추기', emoji: '⚡' },
};

const modeInfo = computed(() => MODE_MAP[props.mode] || MODE_MAP.flashcards);

/** 학습 세트 — 쿼리 조건으로 구성 */
const cards = computed(() =>
  vocab.buildSet({
    theme: props.theme || undefined,
    lessonId: props.lessonId || undefined,
    types: props.types.length ? props.types : undefined,
  })
);

/** 세트를 식별하는 키 (최고 기록 저장용) */
const setKey = computed(() =>
  [props.mode, props.theme || 'all', props.lessonId || 'all', props.types.join('|') || 'all'].join('/')
);

/** 세트 설명 문구 */
const setLabel = computed(() => {
  const parts = [];
  if (props.lessonId) parts.push(vocab.getLesson(props.lessonId)?.title ?? props.lessonId);
  else if (props.theme) parts.push(vocab.getTheme(props.theme)?.label ?? props.theme);
  else parts.push('전체');
  if (props.types.length) {
    parts.push(props.types.map(t => vocab.CARD_TYPES[t]?.label ?? t).join('·'));
  }
  return parts.join(' · ');
});

const barValue = ref(0);
const done = ref(false);
// key를 바꿔 모드 컴포넌트를 새로 마운트하기 위한 카운터
const runId = ref(0);

function onProgress(v) { barValue.value = v; }
function onFinish() { done.value = true; barValue.value = 100; }

function goBack() {
  if (props.theme) router.push({ name: 'theme', params: { themeKey: props.theme } });
  else router.push({ name: 'home' });
}

function restart() {
  done.value = false;
  barValue.value = 0;
  runId.value += 1;
}
</script>

<template>
  <div class="container study">
    <!-- 상단 바 -->
    <header class="topbar">
      <button class="close" aria-label="나가기" @click="goBack">✕</button>
      <div class="tb-mid">
        <ProgressBar :value="barValue" />
        <span class="sr-only" aria-live="polite">
          {{ modeInfo.label }} 진행률 {{ Math.round(barValue) }}퍼센트
        </span>
      </div>
      <div class="tb-info">
        <span class="tb-mode">{{ modeInfo.emoji }} {{ modeInfo.label }}</span>
        <span class="tb-set">{{ setLabel }} · {{ cards.length }}장</span>
      </div>
    </header>

    <!-- 카드 부족 -->
    <div v-if="cards.length === 0" class="empty">
      <p>선택한 조건에 맞는 카드가 없어요.</p>
      <button class="btn btn-primary" @click="goBack">돌아가기</button>
    </div>

    <!-- 완료 -->
    <div v-else-if="done" class="finish">
      <div class="f-emoji">🎉</div>
      <h2 class="f-title">학습 완료!</h2>
      <p class="f-desc">
        {{ setLabel }} · {{ cards.length }}장을 마쳤어요.<br />
        지금까지 총 <b>{{ progress.learnedCount }}장</b>을 학습했습니다.
      </p>
      <div class="f-actions">
        <button class="btn btn-primary btn-lg" @click="restart">한 번 더</button>
        <button class="btn btn-ghost btn-lg" @click="goBack">돌아가기</button>
      </div>
    </div>

    <!-- 학습 모드 -->
    <div v-else class="mode-area">
      <component
        :is="modeInfo.comp"
        :key="`${mode}-${runId}`"
        :cards="cards"
        :set-key="setKey"
        @progress="onProgress"
        @finish="onFinish"
      />
    </div>
  </div>
</template>

<style scoped>
.study { padding-bottom: var(--sp-7); }
.topbar {
  display: flex; align-items: center; gap: var(--sp-4);
  padding: var(--sp-4) 0 var(--sp-5);
}
.close {
  display: grid; place-items: center;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--c-surface); border: 1px solid var(--c-border);
  font-size: 15px; color: var(--c-text-soft);
  flex-shrink: 0;
  transition: background .15s var(--ease);
}
.close:hover { background: var(--c-surface-soft); }
.tb-mid { flex: 1; }
.tb-info { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.35; }
.tb-mode { font-size: 14px; font-weight: 800; }
.tb-set { font-size: 12px; color: var(--c-text-mute); }

.mode-area { padding-top: var(--sp-2); }

.empty, .finish { text-align: center; padding: var(--sp-7) 0; }
.empty p { margin-bottom: var(--sp-4); color: var(--c-text-mute); }
.f-emoji { font-size: 56px; }
.f-title { font-size: 28px; font-weight: 900; letter-spacing: -.03em; margin: var(--sp-2) 0; }
.f-desc { color: var(--c-text-soft); margin-bottom: var(--sp-5); }
.f-actions { display: flex; gap: var(--sp-3); justify-content: center; flex-wrap: wrap; }

@media (max-width: 520px) {
  .tb-info { display: none; }
}
</style>
