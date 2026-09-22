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
      <!-- 라우트 컴포넌트가 지연 로딩(async)이라 mode="out-in"을 쓰면
           enter 훅과 마운트 타이밍이 어긋나 화면이 비는 일이 있다. -->
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <footer class="footer">
    <div class="container">
      ¡Vamos! 스페인어 학습 · {{ rangeText }} 통합 단어장
      ({{ vocab.totalLessons }}개 레슨 · {{ vocab.totalCards }}장)
    </div>
  </footer>
</template>

<style scoped>
/* 전환 중 나가는 화면을 absolute로 띄우기 위한 기준점 */
main { position: relative; min-height: calc(100vh - var(--header-h) - 90px); }
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
