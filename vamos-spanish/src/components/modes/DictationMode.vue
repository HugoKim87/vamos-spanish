<script setup>
import { computed, onMounted, ref } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { shuffle, isCorrect } from '@/composables/useStudyUtils.js';
import { useEnterKey } from '@/composables/useEnterKey.js';
import { useAutoFocus } from '@/composables/useAutoFocus.js';
import { useSpeech, speechRate } from '@/composables/useSpeech.js';
import SpeakButton from '@/components/SpeakButton.vue';

/**
 * 받아쓰기 모드 — Duolingo "Type what you hear" · Quizlet "Spell" 참고
 *
 * 다른 모드는 전부 글자를 보고 푸는데, 실제 회화에서 먼저 부딪히는 건 소리다.
 * 여기서는 스페인어를 화면에 보여주지 않고 소리만 들려준 뒤 받아쓰게 한다.
 * (뜻은 힌트로 제공 — 완전히 깜깜하면 초보자에겐 좌절만 남는다)
 */
const props = defineProps({
  cards: { type: Array, required: true },
});
const emit = defineEmits(['progress', 'finish']);

const progress = useProgressStore();
const { speak, supported } = useSpeech();

const LIMIT = 12; // 한 세션 문항 수 — 받아쓰기는 부담이 커서 짧게

const queue = ref(shuffle(props.cards).slice(0, Math.min(LIMIT, props.cards.length)));
const total = ref(queue.value.length);
const index = ref(0);
const input = ref('');
const judged = ref(null);      // 'right' | 'wrong' | null (확정된 결과)
const correctCount = ref(0);
const showHint = ref(false);

/**
 * 재시도 상태
 * 받아쓰기는 "몰라서"보다 "못 들어서" 틀리는 경우가 많다.
 * 그래서 처음 틀리면 정답을 바로 보여주지 않고 한 번 더 들을 기회를 준다.
 * 무제한으로 열어두면 정답이 나올 때까지 찍게 되므로 딱 한 번만.
 */
const retrying = ref(false);   // 지금이 두 번째 시도인가
const firstTry = ref('');      // 첫 시도에 쓴 답 (결과 화면에서 보여준다)

const current = computed(() => queue.value[index.value] || null);

/** 답을 고칠 수 있는 동안에만 입력란을 보여준다 */
const canType = computed(() => !judged.value);

// ⚠️ current·judged가 만들어진 뒤에 걸어야 한다 (선언 전 참조 오류 방지)
const inputEl = useAutoFocus(() => [current.value, judged.value, retrying.value], () => canType.value);

/** Enter 하나로 진행 (마우스 없이) */
useEnterKey(() => { judged.value ? next() : submit(); });

function play(slow = false) {
  if (!current.value) return;
  // '천천히'는 지금 고른 속도보다 한 단계 더 느리게 (헤더 설정을 존중)
  speak(current.value.es, slow ? { rate: Math.max(0.4, speechRate.value * 0.7) } : {});
}

function report() {
  emit('progress', total.value ? (index.value / total.value) * 100 : 0);
}

onMounted(() => { report(); play(); });

function submit() {
  if (!current.value || judged.value) return;
  const ok = isCorrect(input.value, current.value.es);

  if (ok) {
    judged.value = 'right';
    correctCount.value += 1;
    progress.markLearned(current.value.uid);
    return;
  }

  // 첫 번째 오답 → 정답을 감춘 채 한 번 더 들을 기회를 준다
  if (!retrying.value) {
    retrying.value = true;
    firstTry.value = input.value;
    input.value = '';
    play(true);              // 자동으로 천천히 한 번 더 들려준다
    return;
  }

  // 두 번째도 틀림 → 정답 공개
  judged.value = 'wrong';
}

function next() {
  if (index.value + 1 >= total.value) {
    index.value = total.value;
    report();
    emit('finish');
    return;
  }
  index.value += 1;
  input.value = '';
  judged.value = null;
  retrying.value = false;
  firstTry.value = '';
  showHint.value = false;
  report();
  play();
}
</script>

<template>
  <div v-if="!supported" class="wrap empty">
    <p>이 브라우저는 음성 재생을 지원하지 않아 받아쓰기를 할 수 없어요.</p>
    <p class="sub">크롬이나 사파리 최신 버전에서 사용해 주세요.</p>
  </div>

  <div v-else-if="current" class="wrap">
    <p class="count">{{ index + 1 }} / {{ total }} · 맞힌 개수 {{ correctCount }}</p>

    <div class="card">
      <p class="guide">
        {{ retrying ? '아까와 다르게 들리는 부분이 있는지 확인해 보세요' : '들리는 스페인어를 그대로 적어보세요' }}
      </p>

      <!-- 답을 고칠 수 있을 때만 듣기·입력을 보여준다.
           채점이 끝난 뒤에도 막힌 입력란과 다시듣기가 남아 있으면
           "고칠 수 있나?" 하고 헷갈린다. -->
      <template v-if="canType">
        <div class="players">
          <button class="play" @click="play(false)">🔊 다시 듣기</button>
          <button class="play slow" @click="play(true)">🐢 천천히</button>
        </div>

        <p v-if="retrying" class="retry-note">
          한 번 더 기회가 있어요 · 첫 답: <b class="es-text">{{ firstTry || '(빈칸)' }}</b>
        </p>

        <button v-if="!showHint" class="hint-link" @click="showHint = true">
          힌트 보기 (뜻)
        </button>
        <p v-else class="hint">{{ current.ko }}</p>

        <input
          ref="inputEl"
          v-model="input"
          class="input es-text"
          :class="{ wrong: retrying }"
          placeholder="여기에 입력"
          autocomplete="off" autocapitalize="off" spellcheck="false"
        />

        <button class="btn btn-primary go" @click="submit">
          {{ retrying ? '다시 확인' : '확인' }}
        </button>
      </template>

      <!-- 결과 -->
      <div v-else class="result" :class="judged">
        <p class="r-msg">{{ judged === 'right' ? '정확해요!' : '이렇게 적어요' }}</p>

        <p class="r-answer es-text">
          {{ current.es }}
          <SpeakButton :text="current.es" />
        </p>
        <p class="r-ko">{{ current.ko }}</p>

        <!-- 틀렸을 때만: 내가 쓴 답과 정답을 나란히 -->
        <p v-if="judged === 'wrong' && firstTry" class="r-mine">
          내가 쓴 답 <span class="es-text">{{ firstTry }}</span>
        </p>

        <button class="btn btn-primary go" @click="next">
          {{ index + 1 >= total ? '마치기' : '다음' }}
        </button>
      </div>
    </div>

    <p class="tip">억양 부호(á, é…)와 대소문자는 채점에 반영하지 않아요.</p>
  </div>
</template>

<style scoped>
.wrap { max-width: 520px; margin: 0 auto; }
.count { font-size: 12.5px; color: var(--c-text-mute); font-weight: 700; margin-bottom: var(--sp-3); }

.card {
  padding: var(--sp-5);
  background: var(--c-surface); border: 1px solid var(--c-border);
  border-radius: var(--r-lg); box-shadow: var(--sh-sm);
  text-align: center;
}
.guide { font-size: 13px; color: var(--c-text-mute); }

.players { display: flex; gap: var(--sp-2); justify-content: center; margin: var(--sp-4) 0; }
.play {
  padding: 12px 18px; border-radius: var(--r-full);
  border: 1px solid var(--c-primary); background: var(--c-primary-soft);
  color: var(--c-primary-dark); font-size: 14px; font-weight: 800;
}
.play.slow { border-color: var(--c-border); background: var(--c-surface-soft); color: var(--c-text-soft); }

.hint-link {
  background: none; border: none; margin-bottom: var(--sp-3);
  font-size: 12.5px; font-weight: 700; color: var(--c-text-mute); text-decoration: underline;
}
.hint { margin-bottom: var(--sp-3); font-size: 14px; font-weight: 700; color: var(--c-text-soft); }

.input {
  width: 100%; padding: 13px var(--sp-4);
  border: 2px solid var(--c-border); border-radius: var(--r-md);
  font-size: 16px; font-weight: 700; text-align: center;
}
.input:focus { border-color: var(--c-primary); outline: none; }
.input.right { border-color: var(--c-success); }
.input.wrong { border-color: var(--c-danger); }
.go { width: 100%; margin-top: var(--sp-3); }

.result { margin-top: var(--sp-4); }
.r-msg { font-size: 14px; font-weight: 800; }
.result.right .r-msg { color: var(--c-success-ink); }
.result.wrong .r-msg { color: var(--c-danger-ink); }
.r-answer { margin-top: 6px; font-size: 19px; font-weight: 800; line-height: 1.4; }
.r-ko { margin-top: 4px; font-size: 13.5px; color: var(--c-text-mute); }
.r-answer { display: flex; align-items: center; justify-content: center; gap: 8px; }
.r-mine {
  margin-top: var(--sp-3); padding: 6px 10px; border-radius: var(--r-sm);
  background: var(--c-danger-soft); color: var(--c-danger-ink);
  font-size: 12.5px;
}
.r-mine span { font-weight: 700; text-decoration: line-through; }
.retry-note {
  margin-bottom: var(--sp-3); padding: 6px 10px; border-radius: var(--r-sm);
  background: var(--c-warn-soft); color: var(--c-warn-ink); font-size: 12.5px;
}
.retry-note b { text-decoration: line-through; }

.tip { margin-top: var(--sp-3); text-align: center; font-size: 12px; color: var(--c-text-mute); }
.empty { padding: var(--sp-7) 0; text-align: center; color: var(--c-text-mute); }
.empty .sub { margin-top: 6px; font-size: 13px; }
</style>
