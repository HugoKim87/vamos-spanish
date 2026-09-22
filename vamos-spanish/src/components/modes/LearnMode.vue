<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { useVocabularyStore } from '@/stores/vocabulary.js';
import { shuffle, isCorrect, makeOptions } from '@/composables/useStudyUtils.js';
import { useEnterKey } from '@/composables/useEnterKey.js';
import { useAutoFocus } from '@/composables/useAutoFocus.js';
import SpeakButton from '@/components/SpeakButton.vue';

const props = defineProps({ cards: { type: Array, required: true } });
const emit = defineEmits(['progress', 'finish']);

const progress = useProgressStore();
// 같은 유형 카드가 모자랄 때 보기를 채울 예비 풀
const vocab = useVocabularyStore();
const FILL_RATIO = 0.25; // 단답형 비율

/** 문제 큐 — 오답은 뒤로 다시 보내 반복 출제 */
const queue = ref(
  shuffle(props.cards).map(card => ({
    card,
    type: Math.random() < FILL_RATIO ? 'fill' : 'choice',
  }))
);
const total = props.cards.length;
const completed = ref(0);
const current = ref(null);
const options = ref([]);
const answer = ref('');
const picked = ref(null);
const feedback = ref(null); // { ok, correctText }

// 단답형 문제가 뜨면 입력창에 바로 커서를 놓는다 (객관식·채점 중에는 제외)
const fillEl = useAutoFocus(
  () => [current.value, feedback.value],
  () => current.value?.type === 'fill' && !feedback.value
);

function nextQuestion() {
  feedback.value = null;
  picked.value = null;
  answer.value = '';

  if (!queue.value.length) {
    emit('progress', 100);
    emit('finish');
    current.value = null;
    return;
  }
  current.value = queue.value.shift();
  if (current.value.type === 'choice') {
    options.value = makeOptions(current.value.card, props.cards, 'ko', { fallback: vocab.allCards });
  }
  emit('progress', (completed.value / total) * 100);
}

function resolve(ok) {
  const card = current.value.card;
  if (ok) {
    completed.value += 1;
    progress.markLearned(card.uid);
  } else {
    queue.value.push({ ...current.value }); // 오답 재출제
  }
  feedback.value = {
    ok,
    correctText: current.value.type === 'choice' ? card.ko : card.es,
  };
}

function choose(opt) {
  if (feedback.value) return;
  picked.value = opt;
  resolve(opt === current.value.card.ko);
}

function submitFill() {
  if (feedback.value || !answer.value.trim()) return;
  resolve(isCorrect(answer.value, current.value.card.es));
}

const progressLabel = computed(() => `${completed.value} / ${total}`);

/**
 * 키보드만으로 진행.
 *  - 채점 결과가 떠 있으면 Enter → 다음 문제
 *  - 단답형이면 Enter → 채점
 *  - 객관식이면 1~4 숫자키로 보기 선택
 */
useEnterKey(() => {
  if (feedback.value) { nextQuestion(); return; }
  if (current.value?.type === 'fill') submitFill();
});

function onNumberKey(e) {
  if (feedback.value || current.value?.type !== 'choice') return;
  const n = Number(e.key);
  if (!n || n > options.value.length) return;
  choose(options.value[n - 1]);
}
onMounted(() => window.addEventListener('keydown', onNumberKey));
onUnmounted(() => window.removeEventListener('keydown', onNumberKey));

nextQuestion();
</script>

<template>
  <div v-if="current" class="study-stage w-quiz">
    <p class="q-meta">
      {{ current.type === 'choice' ? '객관식' : '단답형' }} · {{ progressLabel }}
    </p>

    <!-- 객관식 -->
    <template v-if="current.type === 'choice'">
      <div class="prompt">
        <span class="p-text es-text">{{ current.card.es }}</span>
        <SpeakButton :text="current.card.es" />
      </div>
      <p class="instr">알맞은 한국어 뜻을 고르세요 · 숫자키 1~4로도 선택돼요</p>

      <div class="options">
        <button
          v-for="(opt, i) in options" :key="opt"
          class="opt"
          :class="{
            correct: feedback && opt === current.card.ko,
            wrong: feedback && picked === opt && opt !== current.card.ko,
          }"
          :disabled="!!feedback"
          @click="choose(opt)"
        >
          <span class="key">{{ i + 1 }}</span>
          <span>{{ opt }}</span>
        </button>
      </div>
    </template>

    <!-- 단답형 -->
    <template v-else>
      <div class="prompt"><span class="p-text">{{ current.card.ko }}</span></div>
      <p class="instr">스페인어로 입력하세요 · 대소문자·악센트·기호는 무시됩니다 · Enter로 확인</p>
      <input
        ref="fillEl"
        v-model="answer"
        class="fill"
        :class="{ correct: feedback?.ok, wrong: feedback && !feedback.ok }"
        :disabled="!!feedback"
        placeholder="스페인어로 입력…"
        autocomplete="off"
      />
      <button v-if="!feedback" class="btn btn-soft" :disabled="!answer.trim()" @click="submitFill">
        확인
      </button>
    </template>

    <!-- 피드백 -->
    <div v-if="feedback" class="fb" :class="feedback.ok ? 'ok' : 'bad'">
      <template v-if="feedback.ok">정답!</template>
      <template v-else>정답: <b>{{ feedback.correctText }}</b> · 나중에 다시 나와요</template>
    </div>

    <button v-if="feedback" class="btn btn-primary btn-lg next" @click="nextQuestion">
      다음 →
    </button>
  </div>
</template>

<style scoped>
.q-meta { font-size: 13px; font-weight: 700; color: var(--c-text-mute); margin-bottom: var(--sp-2); }
.prompt { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
.p-text { font-size: clamp(22px, 3.4vw, 30px); font-weight: 800; letter-spacing: -.02em; }
.instr { font-size: 13.5px; color: var(--c-text-mute); margin: var(--sp-2) 0 var(--sp-4); }

.options { display: grid; gap: var(--sp-2); }
.opt {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 15px var(--sp-4);
  border: 2px solid var(--c-border); border-radius: var(--r-md);
  background: var(--c-surface);
  font-size: 15px; font-weight: 600; text-align: left;
  transition: border-color .15s var(--ease), background .15s var(--ease);
}
.opt:hover:not(:disabled) { border-color: var(--c-primary); }
.opt:disabled { cursor: default; }
.key {
  display: grid; place-items: center;
  width: 26px; height: 26px; border-radius: 8px;
  background: var(--c-surface-soft);
  font-size: 12.5px; font-weight: 800; color: var(--c-text-soft);
  flex-shrink: 0;
}
.opt.correct { border-color: var(--c-success); background: var(--c-success-soft); color: var(--c-success-ink); }
.opt.correct .key { background: var(--c-success); color: #fff; }
.opt.wrong { border-color: var(--c-danger); background: var(--c-danger-soft); color: var(--c-danger-ink); }
.opt.wrong .key { background: var(--c-danger); color: #fff; }

.fill {
  width: 100%; padding: 15px var(--sp-4);
  border: 2px solid var(--c-border); border-radius: var(--r-md);
  font-size: 15px; font-weight: 600;
  margin-bottom: var(--sp-3);
}
.fill:focus { outline: none; border-color: var(--c-primary); }
.fill.correct { border-color: var(--c-success); background: var(--c-success-soft); }
.fill.wrong { border-color: var(--c-danger); background: var(--c-danger-soft); }

.fb {
  margin-top: var(--sp-4); padding: 13px var(--sp-4);
  border-radius: var(--r-md); font-size: 14px; font-weight: 600;
}
.fb.ok { background: var(--c-success-soft); color: var(--c-success-ink); }
.fb.bad { background: var(--c-danger-soft); color: var(--c-danger-ink); }
.next { width: 100%; margin-top: var(--sp-3); }
</style>
