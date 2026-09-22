<script setup>
import { useSpeech } from '@/composables/useSpeech.js';

const props = defineProps({
  text: { type: String, required: true },
  size: { type: String, default: 'md' }, // sm | md
});
const { speak, hasSpanish, supported } = useSpeech();

function onClick(e) {
  e.stopPropagation();
  speak(props.text);
}
const title = () =>
  !supported ? '이 브라우저는 음성 재생을 지원하지 않습니다'
    : !hasSpanish.value ? '스페인어 음성이 없어 기본 음성으로 재생됩니다'
    : '발음 듣기';
</script>

<template>
  <button
    class="speak" :class="[`is-${size}`, { 'is-weak': supported && !hasSpanish }]"
    :title="title()" aria-label="발음 듣기" @click="onClick"
  >🔊</button>
</template>

<style scoped>
.speak {
  display: grid; place-items: center;
  width: 36px; height: 36px;
  border-radius: var(--r-full);
  background: var(--c-surface-soft);
  font-size: 15px; line-height: 1;
  transition: background .15s var(--ease), transform .12s var(--ease);
  flex-shrink: 0;
}
.speak:hover { background: var(--c-primary-soft); transform: scale(1.06); }
.speak.is-sm { width: 30px; height: 30px; font-size: 13px; }
.speak.is-weak { opacity: .55; }
</style>
