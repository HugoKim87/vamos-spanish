<script setup>
import AppHeader from '@/components/AppHeader.vue';
import { useVocabularyStore } from '@/stores/vocabulary.js';
import { computed } from 'vue';

const vocab = useVocabularyStore();
const rangeText = computed(() => {
  const r = vocab.dayRange;
  if (!r) return '';
  return r.min === r.max ? `Day ${r.min}` : `Day ${r.min} → Day ${r.max}`;
});
</script>

<template>
  <AppHeader />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <footer class="footer">
    <div class="container">
      ¡Vamos! 스페인어 학습 · {{ rangeText }} 통합 단어장
      ({{ vocab.totalLessons }}개 레슨 · {{ vocab.totalCards }}장) · 실비아 Voca LAB 기반
    </div>
  </footer>
</template>

<style scoped>
main { min-height: calc(100vh - var(--header-h) - 90px); }
.footer {
  margin-top: var(--sp-7);
  padding: var(--sp-6) 0;
  border-top: 1px solid var(--c-border);
  background: var(--c-surface);
  text-align: center;
  font-size: 13px;
  color: var(--c-text-mute);
}
</style>
