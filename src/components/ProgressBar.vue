<script setup>
defineProps({
  value: { type: Number, default: 0 },   // 0~100
  showLabel: { type: Boolean, default: false },
});
</script>

<template>
  <div class="wrap">
    <div class="track" role="progressbar" :aria-valuenow="Math.round(value)" aria-valuemin="0" aria-valuemax="100">
      <div class="fill" :style="{ width: Math.min(100, Math.max(0, value)) + '%' }" />
    </div>
    <span v-if="showLabel" class="label">{{ Math.round(value) }}%</span>
  </div>
</template>

<style scoped>
.wrap { display: flex; align-items: center; gap: var(--sp-2); width: 100%; }
.track {
  flex: 1; height: 6px; border-radius: var(--r-full);
  background: var(--c-surface-soft); overflow: hidden;
}
.fill {
  height: 100%; border-radius: var(--r-full);
  background: var(--c-primary);
  transition: width .35s var(--ease);
}
.label { font-size: 12px; font-weight: 700; color: var(--c-text-mute); font-variant-numeric: tabular-nums; }
</style>
