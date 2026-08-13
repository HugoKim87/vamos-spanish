<script setup>
import { computed } from 'vue';
import { useProgressStore } from '@/stores/progress.js';

const progress = useProgressStore();
const streakText = computed(() =>
  progress.streak > 0 ? `${progress.streak}일 연속` : '오늘 시작!'
);
</script>

<template>
  <header class="header">
    <div class="container inner">
      <RouterLink to="/" class="logo">
        <span class="dot" />¡Vamos!
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">테마</RouterLink>
        <RouterLink to="/browse" class="nav-link">모든 단어</RouterLink>
      </nav>

      <div class="right">
        <div class="streak" :title="`오늘 학습한 카드 ${progress.dailyCount}장`">
          🔥 <b>{{ streakText }}</b>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255, 255, 255, .88);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--c-border);
}
.inner {
  height: var(--header-h);
  display: flex; align-items: center; gap: var(--sp-5);
}
.logo {
  display: flex; align-items: center; gap: 7px;
  font-size: 20px; font-weight: 900; letter-spacing: -.03em;
  color: var(--c-primary);
}
.dot { width: 9px; height: 9px; border-radius: 50%; background: var(--c-accent); }
.nav { display: flex; gap: var(--sp-1); }
.nav-link {
  padding: 7px 13px; border-radius: var(--r-full);
  font-size: 14px; font-weight: 600; color: var(--c-text-soft);
  transition: background .15s var(--ease), color .15s var(--ease);
}
.nav-link:hover { background: var(--c-surface-soft); color: var(--c-text); }
.nav-link.router-link-active { color: var(--c-primary); background: var(--c-primary-soft); }
.right { margin-left: auto; }
.streak {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 13px; border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--c-gold-soft), var(--c-gold));
  font-size: 13px; color: var(--c-gold-ink); font-weight: 600;
}
@media (max-width: 560px) {
  .inner { gap: var(--sp-3); }
  .nav-link { padding: 6px 10px; font-size: 13px; }
  .streak b { display: none; }
}
</style>
