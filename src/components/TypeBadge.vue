<script setup>
import { CARD_TYPES } from '@/data/taxonomy.js';
defineProps({ type: { type: String, required: true } });
</script>

<template>
  <span class="badge" :class="`t-${type}`">
    {{ CARD_TYPES[type]?.emoji }} {{ CARD_TYPES[type]?.label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex; align-items: center; gap: 3px;
  padding: 2px 8px; border-radius: var(--r-full);
  font-size: 11px; font-weight: 800;
  background: var(--c-surface-soft); color: var(--c-text-mute);
  white-space: nowrap;
}
/* 유형별 색 — CARD_TYPES의 키와 반드시 일치해야 한다 */
.t-noun { background: var(--c-primary-soft); color: var(--c-primary); }
.t-verb { background: var(--c-success-soft); color: var(--c-success-ink); }
.t-adj { background: var(--c-gold-soft); color: var(--c-gold-ink); }
.t-phrase { background: var(--c-surface-soft); color: var(--c-text-soft); }
.t-pattern { background: var(--c-warn-soft); color: var(--c-warn-ink); }
</style>
