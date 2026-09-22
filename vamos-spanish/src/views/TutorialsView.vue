<script setup>
import { tutorials } from '@/data/tutorials.js';
</script>

<template>
  <div class="container">
    <header class="head">
      <h1 class="title">튜토리얼</h1>
      <p class="sub">단어 암기보다 먼저 이해하고 넘어가면 좋은 발음·문법 개념 글이에요</p>
    </header>

    <div class="grid">
      <RouterLink
        v-for="t in tutorials" :key="t.id"
        :to="{ name: 'tutorial', params: { tutorialId: t.id } }"
        class="card"
      >
        <span class="emoji">{{ t.emoji }}</span>
        <h2 class="t-title">{{ t.title }}</h2>
        <p class="t-sub es-text">{{ t.subtitle }}</p>
        <p class="t-summary">{{ t.summary }}</p>
        <span class="t-arrow">읽어보기 →</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.head { padding: var(--sp-5) 0 var(--sp-4); }
.title { font-size: 26px; font-weight: 900; letter-spacing: -.03em; }
.sub { font-size: 13.5px; color: var(--c-text-mute); margin-top: 2px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-4);
  padding-bottom: var(--sp-6);
}
.card {
  display: flex; flex-direction: column;
  padding: var(--sp-5);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  box-shadow: var(--sh-sm);
  transition: transform .18s var(--ease), box-shadow .18s var(--ease), border-color .18s var(--ease);
}
.card:hover { transform: translateY(-4px); box-shadow: var(--sh-md); border-color: var(--c-primary); }
.emoji { font-size: 30px; }
.t-title { margin-top: var(--sp-3); font-size: 18px; font-weight: 800; letter-spacing: -.02em; }
.t-sub { margin-top: 2px; font-size: 13px; color: var(--c-primary); font-weight: 600; }
.t-summary { margin-top: var(--sp-3); font-size: 13.5px; color: var(--c-text-soft); line-height: 1.5; flex: 1; }
.t-arrow { margin-top: var(--sp-4); font-size: 13px; font-weight: 800; color: var(--c-primary); }
</style>
