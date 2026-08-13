<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { shuffle } from '@/composables/useStudyUtils.js';
import { useSpeech } from '@/composables/useSpeech.js';

const props = defineProps({
  cards: { type: Array, required: true },
  setKey: { type: String, default: 'default' },
});
const emit = defineEmits(['progress', 'finish']);

const progress = useProgressStore();
const { speak } = useSpeech();

const PAIRS = 6;
const ANIM_MS = 380;

// ⚠️ shuffle이 들어가므로 computed가 아닌 ref로 "한 번만" 확정해야 한다.
// computed였다면 재평가 시 tiles와 다른 카드 묶음이 나와
// 완료 판정·학습 기록이 어긋날 수 있다.
const picked = ref(shuffle(props.cards).slice(0, Math.min(PAIRS, props.cards.length)));

const tiles = ref(
  shuffle(
    picked.value.flatMap((c, i) => [
      { id: `es${i}`, pair: i, lang: 'es', text: c.es, state: '' },
      { id: `ko${i}`, pair: i, lang: 'ko', text: c.ko, state: '' },
    ])
  )
);

const selected = ref(null);
const matched = ref(0);
const elapsed = ref(0);
const finished = ref(false);
const isNewBest = ref(false);

const startAt = Date.now();
const timer = setInterval(() => {
  if (!finished.value) elapsed.value = (Date.now() - startAt) / 1000;
}, 100);
onUnmounted(() => clearInterval(timer));

const best = computed(() => progress.bestOf(props.setKey));

function onTile(tile) {
  if (finished.value || tile.state === 'matched' || tile.state === 'gone') return;
  if (selected.value?.id === tile.id) return;

  if (!selected.value) {
    selected.value = tile;
    tile.state = 'selected';
    if (tile.lang === 'es') speak(tile.text);
    return;
  }

  const a = selected.value;
  const isPair = a.pair === tile.pair && a.lang !== tile.lang;

  if (isPair) {
    a.state = 'matched';
    tile.state = 'matched';
    setTimeout(() => { a.state = 'gone'; tile.state = 'gone'; }, ANIM_MS);
    matched.value += 1;
    selected.value = null;
    emit('progress', (matched.value / picked.value.length) * 100);
    if (matched.value === picked.value.length) finish();
  } else {
    tile.state = 'wrong';
    setTimeout(() => {
      tile.state = '';
      a.state = '';
    }, ANIM_MS);
    selected.value = null;
  }
}

function finish() {
  finished.value = true;
  clearInterval(timer);
  isNewBest.value = progress.recordBest(props.setKey, elapsed.value);
  picked.value.forEach(c => progress.markLearned(c.uid));
}
</script>

<template>
  <div class="study-stage w-game">
    <div v-if="!finished">
      <div class="bar">
        <span class="info">{{ picked.length }}쌍 · 빠르게 맞춰보세요</span>
        <span class="timer">{{ elapsed.toFixed(1) }}s</span>
        <span class="info">최고 {{ best != null ? best.toFixed(1) + 's' : '—' }}</span>
      </div>

      <div class="grid">
        <button
          v-for="t in tiles" :key="t.id"
          class="tile" :class="[`lang-${t.lang}`, t.state && `is-${t.state}`]"
          @click="onTile(t)"
        >{{ t.text }}</button>
      </div>
    </div>

    <div v-else class="result">
      <h2 class="r-title">{{ isNewBest ? '🏆 신기록!' : '🎉 완료!' }}</h2>
      <p class="r-time">{{ elapsed.toFixed(1) }}s</p>
      <p class="r-best">
        {{ isNewBest ? '최고 기록을 갱신했어요' : `최고 기록 · ${best?.toFixed(1)}s` }}
      </p>
      <div class="r-actions">
        <button class="btn btn-primary" @click="$emit('finish')">학습 마치기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px var(--sp-4); margin-bottom: var(--sp-4);
  background: var(--c-surface); border: 1px solid var(--c-border);
  border-radius: var(--r-md);
}
.info { font-size: 12.5px; font-weight: 600; color: var(--c-text-mute); }
.timer { font-size: 21px; font-weight: 900; color: var(--c-primary); font-variant-numeric: tabular-nums; }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-2); }
.tile {
  aspect-ratio: 1.15 / 1;
  padding: 10px;
  display: grid; place-items: center;
  border: 2px solid var(--c-border); border-radius: var(--r-md);
  background: var(--c-surface);
  font-size: 13.5px; font-weight: 700; text-align: center; line-height: 1.3;
  word-break: keep-all;
  transition: transform .15s var(--ease), border-color .15s var(--ease), background .15s var(--ease);
}
.tile:hover:not(.is-matched):not(.is-gone) { border-color: var(--c-primary); transform: scale(1.02); }
.lang-es { color: var(--c-primary); }
.lang-ko { background: var(--c-surface-cream); color: var(--c-gold-ink); }
.tile.is-selected { border-color: var(--c-primary); background: var(--c-primary-soft); transform: scale(1.04); }
.tile.is-wrong { border-color: var(--c-danger); background: var(--c-danger-soft); animation: shake .35s; }
.tile.is-matched { animation: pop .38s forwards; }
.tile.is-gone { visibility: hidden; }
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
@keyframes pop { to { transform: scale(0); opacity: 0; } }

.result { text-align: center; padding: var(--sp-6) 0; }
.r-title { font-size: 30px; font-weight: 900; color: var(--c-primary); letter-spacing: -.03em; }
.r-time { font-size: 52px; font-weight: 900; letter-spacing: -.04em; margin: var(--sp-3) 0; }
.r-best { font-size: 14px; color: var(--c-text-mute); margin-bottom: var(--sp-5); }

@media (max-width: 600px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
  .tile { font-size: 12px; }
}
</style>
