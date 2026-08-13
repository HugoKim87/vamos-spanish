<script setup>
import { computed, ref, watch } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { shuffle, isCorrect, makeOptions } from '@/composables/useStudyUtils.js';

const props = defineProps({ cards: { type: Array, required: true } });
const emit = defineEmits(['progress', 'finish']);

const progress = useProgressStore();

/** 섹션 구성 — 카드가 적으면 가능한 만큼만 출제 */
const SECTIONS = { choice: 3, tf: 2, fill: 2, match: 2 };

function buildQuestions() {
  const pool = shuffle(props.cards);
  let p = 0;
  const take = n => pool.slice(p, (p += n));
  const qs = [];

  take(SECTIONS.choice).forEach(c =>
    qs.push({ type: 'choice', tag: '선택형', q: c.es, a: c.ko, options: makeOptions(c.ko, pool, 'ko'), card: c })
  );
  take(SECTIONS.tf).forEach(c => {
    // 다른 뜻을 못 찾으면 가짜 문장을 만들 수 없으므로 '맞다' 문제로 낸다.
    // (이 처리가 없으면 "A = A"인데 정답이 X인 풀 수 없는 문제가 나온다)
    const others = pool.filter(x => x.ko !== c.ko);
    const fake = others.length ? shuffle(others)[0].ko : null;
    const truthy = !fake || Math.random() > 0.5;
    qs.push({
      type: 'tf', tag: '진위형',
      q: `"${c.es}" = "${truthy ? c.ko : fake}"`,
      a: truthy ? 'O' : 'X',
      card: c,
    });
  });
  take(SECTIONS.fill).forEach(c =>
    qs.push({ type: 'fill', tag: '단답형', q: c.ko, a: c.es, hint: '(스페인어로)', card: c })
  );
  take(SECTIONS.match).forEach(c =>
    qs.push({ type: 'choice', tag: '매칭형', q: c.ko, a: c.es, options: makeOptions(c.es, pool, 'es'), card: c })
  );
  return qs;
}

const questions = ref(buildQuestions());
const answers = ref({});
const result = ref(null);

const canSubmit = computed(() => questions.value.length > 0);

/** 답을 채운 만큼 상단 진행바에 반영 (제출 전까지 0%로 멈춰 있으면 답답하다) */
const answeredCount = computed(() =>
  questions.value.reduce((n, _q, i) => n + (String(answers.value[i] ?? '').trim() ? 1 : 0), 0)
);

watch(answeredCount, n => {
  if (!result.value && questions.value.length) {
    emit('progress', (n / questions.value.length) * 100);
  }
});

function grade() {
  let correct = 0;
  const review = questions.value.map((q, i) => {
    const mine = answers.value[i] || '';
    const ok = isCorrect(mine, q.a);
    if (ok) { correct++; progress.markLearned(q.card.uid); }
    return { q, mine, ok };
  });
  result.value = {
    score: Math.round((correct / questions.value.length) * 100),
    correct,
    total: questions.value.length,
    review,
  };
  emit('progress', 100);
}

function retry() {
  questions.value = buildQuestions();
  answers.value = {};
  result.value = null;
  emit('progress', 0);
}
</script>

<template>
  <!-- 문제 풀이 -->
  <div v-if="!result" class="study-stage w-card stage">
    <div v-for="(q, i) in questions" :key="i" class="q card">
      <span class="tag">{{ q.tag }} · {{ i + 1 }}</span>
      <p class="q-text es-text">
        {{ q.q }}<span v-if="q.hint" class="hint"> {{ q.hint }}</span>
      </p>

      <div v-if="q.type === 'choice'" class="opts">
        <button
          v-for="o in q.options" :key="o"
          class="opt" :class="{ sel: answers[i] === o }"
          @click="answers[i] = o"
        >{{ o }}</button>
      </div>

      <div v-else-if="q.type === 'tf'" class="opts tf">
        <button class="opt" :class="{ sel: answers[i] === 'O' }" @click="answers[i] = 'O'">⭕ 맞다</button>
        <button class="opt" :class="{ sel: answers[i] === 'X' }" @click="answers[i] = 'X'">❌ 틀리다</button>
      </div>

      <input
        v-else v-model="answers[i]" class="fill"
        placeholder="여기에 입력…" autocomplete="off"
      />
    </div>

    <button class="btn btn-primary btn-lg submit" :disabled="!canSubmit" @click="grade">
      제출하고 채점하기
    </button>
  </div>

  <!-- 결과 -->
  <div v-else class="study-stage w-card result">
    <div class="donut" :style="{ '--p': result.score * 3.6 + 'deg' }">
      <span class="d-num">{{ result.score }}%</span>
    </div>
    <p class="r-label">{{ result.correct }} / {{ result.total }} 정답</p>

    <div class="r-actions">
      <button class="btn btn-primary" @click="retry">다시 풀기</button>
      <button class="btn btn-ghost" @click="emit('finish')">학습 마치기</button>
    </div>

    <ul class="review">
      <li v-for="(r, i) in result.review" :key="i" class="rv" :class="{ bad: !r.ok }">
        <div class="rv-head">{{ r.ok ? '✅ 정답' : '❌ 오답' }} · {{ r.q.tag }}</div>
        <div class="rv-q es-text"><b>Q.</b> {{ r.q.q }}</div>
        <div class="rv-a">
          내 답: <span :class="{ mute: !r.mine }">{{ r.mine || '(미응답)' }}</span>
          · 정답: <b class="es-text">{{ r.q.a }}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.stage { display: flex; flex-direction: column; gap: var(--sp-3); }
.q { padding: var(--sp-5); }
.tag {
  display: inline-block; padding: 3px 10px; border-radius: var(--r-full);
  background: var(--c-primary-soft); color: var(--c-primary);
  font-size: 11px; font-weight: 800; letter-spacing: .03em;
}
.q-text { margin: var(--sp-3) 0 var(--sp-4); font-size: 17px; font-weight: 700; }
.hint { font-size: 13px; font-weight: 500; color: var(--c-text-mute); }
.opts { display: grid; gap: var(--sp-2); }
.opts.tf { grid-template-columns: 1fr 1fr; }
.opt {
  padding: 12px var(--sp-4);
  border: 2px solid var(--c-border); border-radius: var(--r-sm);
  background: var(--c-surface); text-align: left;
  font-size: 14px; font-weight: 600;
  transition: border-color .12s var(--ease), background .12s var(--ease);
}
.opt:hover { border-color: var(--c-primary); }
.opt.sel { border-color: var(--c-primary); background: var(--c-primary-soft); }
.fill {
  width: 100%; padding: 12px var(--sp-4);
  border: 2px solid var(--c-border); border-radius: var(--r-sm);
  font-size: 14px; font-weight: 600;
}
.fill:focus { outline: none; border-color: var(--c-primary); }
.submit { width: 100%; margin-top: var(--sp-2); }

/* 결과 */
.result { text-align: center; }
.donut {
  position: relative;
  width: 140px; height: 140px; margin: 0 auto var(--sp-4);
  border-radius: 50%;
  background: conic-gradient(var(--c-primary) var(--p), var(--c-border) 0);
  display: grid; place-items: center;
}
.donut::after {
  content: ''; position: absolute; inset: 12px;
  background: var(--c-bg); border-radius: 50%;
}
.d-num { position: relative; z-index: 1; font-size: 34px; font-weight: 900; color: var(--c-primary); letter-spacing: -.03em; }
.r-label { font-size: 15px; color: var(--c-text-soft); }
.r-actions { display: flex; gap: var(--sp-2); justify-content: center; margin: var(--sp-4) 0 var(--sp-5); flex-wrap: wrap; }

.review { display: flex; flex-direction: column; gap: var(--sp-2); text-align: left; }
.rv {
  padding: 12px var(--sp-4); border-radius: var(--r-sm);
  background: var(--c-surface); border: 1px solid var(--c-border);
  font-size: 13.5px;
}
.rv.bad { background: var(--c-danger-soft); border-color: #fcd3d3; }
.rv-head { font-size: 11.5px; font-weight: 800; color: var(--c-text-mute); margin-bottom: 4px; }
.rv-a { margin-top: 3px; color: var(--c-text-soft); }
.mute { color: var(--c-text-mute); font-style: italic; }
</style>
