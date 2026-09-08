<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { shuffle } from '@/composables/useStudyUtils.js';
import SpeakButton from '@/components/SpeakButton.vue';
import { conjugatePresent, practicePersons } from '@/data/conjugation.js';
import TypeBadge from '@/components/TypeBadge.vue';

const props = defineProps({ cards: { type: Array, required: true } });
const emit = defineEmits(['progress', 'finish']);

const progress = useProgressStore();
const deck = ref(shuffle(props.cards));
const index = ref(0);
const flipped = ref(false);

const current = computed(() => deck.value[index.value]);
const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === deck.value.length - 1);

/**
 * 카드를 넘기는 순간에는 뒤집기 애니메이션을 끈다.
 *
 * 뒤집힌 상태에서 다음 카드로 넘어가면 카드 내용은 즉시 바뀌는데
 * 되돌아가는 회전(0.55초)이 재생되면서 그동안 새 카드의 뒷면(뜻)이 보인다.
 * 정답이 먼저 스쳐 보이면 낱말카드의 의미가 없으므로, 전환할 때만 회전을 생략한다.
 */
const skipFlipAnim = ref(false);

/**
 * 동사 카드면 현재형 활용을 함께 보여준다.
 * 뜻만 확인하고 넘기면 정작 문장에서 쓰는 형태(hablo/hablas…)를 못 익히기 때문이다.
 * 뒷면에만 넣으므로 앞면에서 뜻을 떠올리는 흐름은 그대로다.
 */
/**
 * 글자 길이에 맞춰 크기를 정한다.
 *
 * 한 크기로 고정하면 긴 문장이 두 줄로 넘어가면서 카드 높이가 출렁인다.
 * 그렇다고 가장 긴 카드(32자)에 맞추면 대부분(중앙값 6자)이 쓸데없이 작아진다.
 * 그래서 길이를 세 구간으로 나눠 크기를 달리하고,
 * 텍스트 영역 높이는 아래 CSS에서 고정해 카드 모양이 흔들리지 않게 한다.
 */
function sizeClass(text) {
  const n = (text || '').length;
  if (n <= 12) return 'sz-lg';
  if (n <= 24) return 'sz-md';
  return 'sz-sm';
}

const frontSize = computed(() => sizeClass(current.value?.es));
const backSize = computed(() => sizeClass(current.value?.ko));

const conjugation = computed(() => {
  if (current.value?.type !== 'verb') return null;
  const conj = conjugatePresent(current.value.es);
  if (!conj) return null;
  return { conj, persons: practicePersons(conj) };
});

function resetFlip() {
  skipFlipAnim.value = true;
  flipped.value = false;
  // 다음 화면 갱신이 끝난 뒤 애니메이션을 되살린다 (사용자가 직접 뒤집을 때는 그대로 동작)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { skipFlipAnim.value = false; });
  });
}

function report() {
  emit('progress', ((index.value + 1) / deck.value.length) * 100);
}

function go(step) {
  const next = index.value + step;
  if (next < 0 || next >= deck.value.length) return;
  if (step > 0) progress.markLearned(current.value.uid);
  resetFlip();
  index.value = next;
  report();
}

function finish() {
  progress.markLearned(current.value.uid);
  emit('finish');
}

function mark(kind) {
  const uid = current.value.uid;
  progress.setMark(uid, progress.markOf(uid) === kind ? null : kind);
  if (kind === 'know') progress.markLearned(uid);
}

function onKey(e) {
  if (e.key === ' ') { e.preventDefault(); flipped.value = !flipped.value; }
  else if (e.key === 'ArrowRight') go(1);
  else if (e.key === 'ArrowLeft') go(-1);
}

onMounted(() => { window.addEventListener('keydown', onKey); report(); });
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <div class="study-stage w-card stage">
    <div class="card-area" @click="flipped = !flipped">
      <div class="flip" :class="{ 'is-flipped': flipped, 'no-anim': skipFlipAnim }">
        <!-- 앞면 -->
        <div class="face front">
          <div class="f-top">
            <span class="f-lang">Español 🇪🇸</span>
            <SpeakButton :text="current.es" />
          </div>
          <p class="f-text es-text" :class="frontSize">{{ current.es }}</p>
          <span class="f-hint">클릭 또는 Space로 뒤집기</span>
        </div>
        <!-- 뒷면 -->
        <div class="face back">
          <div class="f-top">
            <span class="f-lang">한국어 🇰🇷</span>
            <TypeBadge :type="current.type" />
          </div>
          <p class="f-text" :class="backSize">{{ current.ko }}</p>
          <span class="f-sub es-text">{{ current.es }}</span>

          <!-- 동사면 현재형 활용도 함께 -->
          <div v-if="conjugation" class="conj" @click.stop>
            <p class="c-title">직설법 현재</p>
            <ul class="c-grid">
              <li v-for="p in conjugation.persons" :key="p.key" class="c-item">
                <span class="c-person es-text">{{ p.short }}</span>
                <span class="c-form es-text">{{ conjugation.conj.forms[p.key] }}</span>
                <SpeakButton :text="conjugation.conj.forms[p.key]" size="sm" />
              </li>
            </ul>
            <p v-if="conjugation.conj.note" class="c-note">{{ conjugation.conj.note }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="nav" :disabled="isFirst" aria-label="이전" @click="go(-1)">←</button>

      <div class="mid">
        <span class="counter">{{ index + 1 }} / {{ deck.length }}</span>
        <div class="marks">
          <button
            class="mk hard" :class="{ on: progress.markOf(current.uid) === 'hard' }"
            @click="mark('hard')"
          >😵 어려움</button>
          <button
            class="mk know" :class="{ on: progress.markOf(current.uid) === 'know' }"
            @click="mark('know')"
          >✅ 안다</button>
        </div>
      </div>

      <button v-if="!isLast" class="nav" aria-label="다음" @click="go(1)">→</button>
      <button v-else class="btn btn-primary" @click="finish">완료</button>
    </div>
  </div>
</template>

<style scoped>
.stage { display: flex; flex-direction: column; align-items: center; gap: var(--sp-5); }
.card-area { width: 100%; max-width: 620px; height: 330px; perspective: 1400px; cursor: pointer; }
.flip {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform .55s var(--ease);
}
.flip.is-flipped { transform: rotateY(180deg); }
/* 카드를 넘길 때만 회전을 생략해 뒷면(뜻)이 스쳐 보이지 않게 한다 */
.flip.no-anim { transition: none; }
.face {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: var(--sp-6) var(--sp-5);
  border-radius: var(--r-xl);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--sh-md);
  backface-visibility: hidden;
  text-align: center;
  user-select: none;
}
.back { transform: rotateY(180deg); background: linear-gradient(150deg, var(--c-surface), var(--c-surface-tint)); }
.f-top {
  position: absolute; top: var(--sp-4); left: var(--sp-4); right: var(--sp-4);
  display: flex; align-items: center; justify-content: space-between;
}
.f-lang { font-size: 11.5px; font-weight: 800; color: var(--c-text-mute); letter-spacing: .06em; }
/* 길이에 따라 크기를 달리하되, 영역 높이는 고정해 카드가 출렁이지 않게 한다 */
.f-text {
  display: flex; align-items: center; justify-content: center;
  min-height: 2.5em;
  font-weight: 800; letter-spacing: -.02em; line-height: 1.25;
  word-break: keep-all;
}
.f-text.sz-lg { font-size: clamp(22px, 3.6vw, 32px); }
.f-text.sz-md { font-size: clamp(19px, 2.9vw, 25px); }
.f-text.sz-sm { font-size: clamp(16px, 2.3vw, 20px); }
.f-sub { margin-top: var(--sp-3); font-size: 14px; color: var(--c-text-mute); }

/* 동사 활용표 — 6인칭을 2열로 묶어 카드가 길어지지 않게 한다 */
.conj {
  width: 100%; max-width: 460px;
  margin-top: var(--sp-4); padding-top: var(--sp-3);
  border-top: 1px solid var(--c-border);
}
.c-title { font-size: 11.5px; font-weight: 800; color: var(--c-text-mute); letter-spacing: .02em; }
.c-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 2px var(--sp-3); margin-top: 6px;
}
.c-item { display: flex; align-items: center; gap: 5px; padding: 3px 0; min-width: 0; }
.c-person {
  font-size: 11px; color: var(--c-text-mute); font-weight: 700;
  min-width: 34px; flex-shrink: 0;
}
.c-form {
  font-size: 13.5px; font-weight: 700;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.c-note {
  margin-top: 6px; padding: 5px 8px; border-radius: var(--r-sm);
  background: var(--c-warn-soft); color: var(--c-warn-ink);
  font-size: 11px; line-height: 1.4;
}
@media (max-width: 420px) {
  .c-grid { grid-template-columns: 1fr; }
}
.f-hint { position: absolute; bottom: var(--sp-4); font-size: 12.5px; color: var(--c-text-mute); }

.controls {
  display: flex; align-items: center; gap: var(--sp-3);
  width: 100%; max-width: 620px;
}
.nav {
  display: grid; place-items: center;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--c-surface); border: 1px solid var(--c-border);
  font-size: 17px;
  transition: box-shadow .15s var(--ease), transform .12s var(--ease);
  flex-shrink: 0;
}
.nav:hover:not(:disabled) { box-shadow: var(--sh-sm); transform: translateY(-2px); }
.nav:disabled { opacity: .35; cursor: not-allowed; }
.mid { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.counter { font-size: 14px; font-weight: 800; color: var(--c-text-soft); font-variant-numeric: tabular-nums; }
.marks { display: flex; gap: var(--sp-2); }
.mk {
  padding: 7px 13px; border-radius: var(--r-sm);
  border: 1.5px solid var(--c-border); background: var(--c-surface);
  font-size: 12.5px; font-weight: 700;
  transition: all .15s var(--ease);
}
.mk.hard:hover, .mk.hard.on { background: var(--c-danger-soft); border-color: var(--c-danger); color: var(--c-danger-ink); }
.mk.know:hover, .mk.know.on { background: var(--c-success-soft); border-color: var(--c-success); color: var(--c-success-ink); }

@media (max-width: 560px) {
  .card-area { height: 260px; }
  .marks { flex-direction: column; }
}
</style>
