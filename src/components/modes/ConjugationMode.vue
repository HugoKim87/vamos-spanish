<script setup>
import { computed, ref } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { shuffle, isCorrect } from '@/composables/useStudyUtils.js';
import { useEnterKey } from '@/composables/useEnterKey.js';
import { useSpeech } from '@/composables/useSpeech.js';
import SpeakButton from '@/components/SpeakButton.vue';

/**
 * 동사 활용 모드 — Conjuguemos·ConjuGato 방식 참고
 *  - 인칭을 주고 활용형을 직접 떠올리게 한다 (타이핑 또는 "보고 확인")
 *  - 틀린 문제는 뒤에 다시 넣어 반복시킨다
 *  - 문제를 다 풀면 그 동사의 전체 활용표를 보여준다
 */
const props = defineProps({
  verbs: { type: Array, required: true },   // { es, ko, uid, conj, persons }
});
const emit = defineEmits(['progress', 'finish']);

const progress = useProgressStore();
const { speak } = useSpeech();

/** 입력 방식 — 타이핑이 부담스러우면 "보고 확인"으로 */
const typing = ref(true);

/** 문제 큐: 동사 × 인칭 */
function buildQueue() {
  const items = [];
  for (const v of props.verbs) {
    for (const p of v.persons) {
      items.push({ verb: v, person: p, answer: v.conj.forms[p.key] });
    }
  }
  return shuffle(items);
}

const queue = ref(buildQueue());
const total = ref(queue.value.length);
const doneCount = ref(0);
const current = computed(() => queue.value[0] || null);

const input = ref('');
const revealed = ref(false);
const judged = ref(null);      // 'right' | 'wrong' | null
const showTable = ref(false);

function report() {
  emit('progress', total.value ? (doneCount.value / total.value) * 100 : 0);
}
report();

function submit() {
  if (!current.value || judged.value) return;
  const ok = isCorrect(input.value, current.value.answer);
  judged.value = ok ? 'right' : 'wrong';
  revealed.value = true;
  if (ok) progress.markLearned(current.value.verb.uid);
}

/** 타이핑 없이 "떠올린 뒤 정답 보기" */
function reveal() {
  revealed.value = true;
}

function grade(ok) {
  if (!current.value) return;
  judged.value = ok ? 'right' : 'wrong';
  if (ok) progress.markLearned(current.value.verb.uid);
}

function next() {
  const item = queue.value.shift();
  // 틀린 건 뒤쪽에 다시 넣어 반복
  if (judged.value === 'wrong') queue.value.push(item);
  else doneCount.value += 1;

  input.value = '';
  revealed.value = false;
  judged.value = null;
  showTable.value = false;
  report();

  if (!queue.value.length) emit('finish');
}

const remaining = computed(() => queue.value.length);

/**
 * Enter 하나로 전 과정을 진행한다 (마우스 없이).
 *  타이핑 모드 : 입력 → Enter(채점) → Enter(다음)
 *  보고 확인   : Enter(정답 보기) → Enter(맞혔다고 처리) → Enter(다음)
 */
useEnterKey(() => {
  if (judged.value) { next(); return; }
  if (typing.value) { submit(); return; }
  if (!revealed.value) reveal();
  else grade(true);
});
</script>

<template>
  <div v-if="current" class="wrap">
    <!-- 상단: 남은 문제 · 입력 방식 -->
    <div class="bar">
      <span class="count">{{ doneCount }} / {{ total }} · 남은 {{ remaining }}</span>
      <button class="toggle" @click="typing = !typing">
        {{ typing ? '⌨️ 타이핑' : '👀 보고 확인' }}
      </button>
    </div>

    <!-- 문제 -->
    <div class="card">
      <p class="verb-ko">{{ current.verb.ko.replace(/\s*\(.*\)$/, '') }}</p>
      <h2 class="verb-es es-text">
        {{ current.verb.conj.infinitive }}
        <SpeakButton :text="current.verb.conj.infinitive" size="sm" />
      </h2>

      <p v-if="current.verb.conj.note" class="note">{{ current.verb.conj.note }}</p>

      <div class="prompt">
        <span class="person es-text">{{ current.person.label }}</span>
        <span class="person-ko">{{ current.person.ko }}</span>
      </div>

      <!-- 타이핑 -->
      <template v-if="typing">
        <input
          v-model="input"
          class="input es-text"
          :class="judged"
          :disabled="!!judged"
          placeholder="활용형을 입력하세요"
          autocomplete="off" autocapitalize="off" spellcheck="false"
        />
        <button v-if="!judged" class="btn btn-primary go" @click="submit">확인</button>
      </template>

      <!-- 보고 확인 -->
      <template v-else>
        <button v-if="!revealed" class="btn btn-primary go" @click="reveal">정답 보기</button>
        <div v-else-if="!judged" class="self">
          <p class="answer es-text">
            {{ current.answer }}
            <SpeakButton :text="current.answer" size="sm" />
          </p>
          <div class="self-btns">
            <button class="btn btn-ghost" @click="grade(false)">😵 몰랐어요</button>
            <button class="btn btn-primary" @click="grade(true)">✅ 맞혔어요</button>
          </div>
        </div>
      </template>

      <!-- 채점 결과 -->
      <div v-if="judged" class="result" :class="judged">
        <p class="r-msg">{{ judged === 'right' ? '정답이에요!' : '다시 만나요' }}</p>
        <p class="r-answer es-text">
          {{ current.answer }}
          <SpeakButton :text="current.answer" size="sm" />
        </p>
        <button class="table-link" @click="showTable = !showTable">
          {{ showTable ? '활용표 닫기' : '전체 활용표 보기' }}
        </button>

        <table v-if="showTable" class="conj-table">
          <tr v-for="p in current.verb.persons" :key="p.key"
              :class="{ 'is-now': p.key === current.person.key }">
            <th class="es-text">{{ p.label }}</th>
            <td class="es-text">{{ current.verb.conj.forms[p.key] }}</td>
            <td class="t-speak"><SpeakButton :text="current.verb.conj.forms[p.key]" size="sm" /></td>
          </tr>
        </table>

        <button class="btn btn-primary go" @click="next">다음</button>
      </div>
    </div>
  </div>

  <div v-else class="wrap empty">
    <p>활용할 동사가 없어요. 다른 조건으로 시도해 보세요.</p>
  </div>
</template>

<style scoped>
.wrap { max-width: 560px; margin: 0 auto; }
.bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-3); }
.count { font-size: 12.5px; color: var(--c-text-mute); font-weight: 700; }
.toggle {
  padding: 6px 11px; border-radius: var(--r-full);
  border: 1px solid var(--c-border); background: var(--c-surface);
  font-size: 12.5px; font-weight: 700;
}

.card {
  padding: var(--sp-5);
  background: var(--c-surface); border: 1px solid var(--c-border);
  border-radius: var(--r-lg); box-shadow: var(--sh-sm);
  text-align: center;
}
.verb-ko { font-size: 13px; color: var(--c-text-mute); }
.verb-es {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-top: 4px; font-size: 26px; font-weight: 900; letter-spacing: -.02em;
}
.note {
  margin-top: var(--sp-2); padding: 6px 10px; border-radius: var(--r-sm);
  background: var(--c-warn-soft); color: var(--c-warn-ink); font-size: 12px;
}

.prompt {
  margin: var(--sp-4) 0 var(--sp-3);
  padding: var(--sp-3); border-radius: var(--r-md);
  background: var(--c-primary-soft);
}
.person { display: block; font-size: 20px; font-weight: 800; color: var(--c-primary-dark); }
.person-ko { font-size: 12.5px; color: var(--c-text-mute); }

.input {
  width: 100%; padding: 13px var(--sp-4);
  border: 2px solid var(--c-border); border-radius: var(--r-md);
  font-size: 17px; font-weight: 700; text-align: center;
}
.input:focus { border-color: var(--c-primary); outline: none; }
.input.right { border-color: var(--c-success); }
.input.wrong { border-color: var(--c-danger); }
.go { width: 100%; margin-top: var(--sp-3); }

.self { margin-top: var(--sp-2); }
.answer { font-size: 24px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; }
.self-btns { display: flex; gap: var(--sp-2); margin-top: var(--sp-3); }
.self-btns .btn { flex: 1; }

.result { margin-top: var(--sp-4); }
.r-msg { font-size: 14px; font-weight: 800; }
.result.right .r-msg { color: var(--c-success-ink); }
.result.wrong .r-msg { color: var(--c-danger-ink); }
.r-answer { margin-top: 4px; font-size: 22px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; }

.table-link {
  margin-top: var(--sp-3); background: none; border: none;
  font-size: 12.5px; font-weight: 700; color: var(--c-primary); text-decoration: underline;
}
.conj-table { width: 100%; margin-top: var(--sp-3); border-collapse: collapse; font-size: 14px; }
.conj-table th, .conj-table td { padding: 7px 10px; text-align: left; border-bottom: 1px solid var(--c-border); }
.conj-table th { font-weight: 700; color: var(--c-text-mute); font-size: 13px; }
.conj-table td { font-weight: 700; }
.conj-table .t-speak { width: 34px; text-align: right; }
.conj-table .is-now { background: var(--c-primary-soft); }

.empty { padding: var(--sp-7) 0; text-align: center; color: var(--c-text-mute); }
</style>
