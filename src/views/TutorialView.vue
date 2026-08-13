<script setup>
import { computed } from 'vue';
import { tutorials } from '@/data/tutorials.js';
import SpeakButton from '@/components/SpeakButton.vue';

const props = defineProps({ tutorialId: { type: String, required: true } });

const tutorial = computed(() => tutorials.find(t => t.id === props.tutorialId));
</script>

<template>
  <div v-if="tutorial" class="container">
    <RouterLink :to="{ name: 'tutorials' }" class="back">← 튜토리얼 목록</RouterLink>

    <header class="head">
      <span class="emoji">{{ tutorial.emoji }}</span>
      <h1 class="title">{{ tutorial.title }}</h1>
      <p class="sub es-text">{{ tutorial.subtitle }}</p>
    </header>

    <article class="body">
      <section v-for="(s, i) in tutorial.sections" :key="i" class="section">
        <h2 v-if="s.heading" class="s-heading">{{ s.heading }}</h2>

        <p v-for="(p, pi) in s.paragraphs" :key="pi" class="s-p">{{ p }}</p>

        <ul v-if="s.list" class="s-list">
          <li v-for="(li, li_i) in s.list" :key="li_i">{{ li }}</li>
        </ul>

        <div v-if="s.table" class="s-table-wrap">
          <table class="s-table">
            <thead>
              <tr>
                <th v-for="(h, hi) in s.table.headers" :key="hi">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in s.table.rows" :key="ri">
                <td v-for="(cell, ci) in row" :key="ci" :class="{ 'es-text': ci === 0 }">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="s.examples" class="s-examples">
          <div v-for="(ex, ei) in s.examples" :key="ei" class="ex-row">
            <SpeakButton :text="ex.es" size="sm" />
            <span class="ex-es es-text">{{ ex.es }}</span>
            <span class="ex-note">{{ ex.note }}</span>
          </div>
        </div>

        <div v-if="s.links" class="s-links">
          <a
            v-for="(l, li_i) in s.links" :key="li_i"
            :href="l.url" target="_blank" rel="noopener noreferrer"
            class="s-link"
          >{{ l.label }}</a>
        </div>
      </section>
    </article>
  </div>

  <div v-else class="container empty">
    <p>존재하지 않는 튜토리얼입니다.</p>
    <RouterLink :to="{ name: 'tutorials' }" class="btn btn-primary">튜토리얼 목록으로</RouterLink>
  </div>
</template>

<style scoped>
.back { font-size: 13px; font-weight: 700; color: var(--c-text-mute); }
.back:hover { color: var(--c-primary); }

.head { padding: var(--sp-4) 0 var(--sp-5); text-align: center; }
.emoji { font-size: 40px; }
.title { margin-top: var(--sp-2); font-size: 28px; font-weight: 900; letter-spacing: -.03em; }
.sub { margin-top: 4px; font-size: 14px; color: var(--c-primary); font-weight: 600; }

.body { max-width: 760px; margin: 0 auto; padding-bottom: var(--sp-7); }
.section { margin-bottom: var(--sp-6); }
.s-heading {
  font-size: 19px; font-weight: 800; letter-spacing: -.02em;
  margin-bottom: var(--sp-3);
  padding-bottom: var(--sp-2);
  border-bottom: 2px solid var(--c-border);
}
.s-p { font-size: 15px; line-height: 1.7; color: var(--c-text-soft); margin-bottom: var(--sp-3); }

.s-list { display: flex; flex-direction: column; gap: 8px; margin: var(--sp-3) 0; }
.s-list li {
  font-size: 14.5px; line-height: 1.6; color: var(--c-text);
  padding-left: var(--sp-4); position: relative;
}
.s-list li::before {
  content: ''; position: absolute; left: 2px; top: 9px;
  width: 5px; height: 5px; border-radius: 50%; background: var(--c-primary);
}

.s-table-wrap { overflow-x: auto; margin: var(--sp-3) 0; }
.s-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.s-table th, .s-table td {
  padding: 9px 12px; text-align: left;
  border-bottom: 1px solid var(--c-border);
}
.s-table th { font-weight: 800; color: var(--c-text-mute); font-size: 12.5px; }
.s-table td:first-child { font-weight: 700; white-space: nowrap; }

.s-examples { display: flex; flex-direction: column; gap: 6px; margin: var(--sp-3) 0; }
.ex-row {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 10px var(--sp-3); border-radius: var(--r-sm);
  background: var(--c-surface); border: 1px solid var(--c-border);
}
.ex-es { font-weight: 700; font-size: 14.5px; min-width: 100px; }
.ex-note { font-size: 13px; color: var(--c-text-mute); }

.s-links { display: flex; flex-direction: column; gap: 6px; margin-top: var(--sp-3); }
.s-link {
  font-size: 14px; font-weight: 700; color: var(--c-primary);
  text-decoration: underline; width: fit-content;
}

.empty { padding: var(--sp-7) 0; text-align: center; }
.empty p { margin-bottom: var(--sp-4); color: var(--c-text-mute); }

@media (max-width: 560px) {
  .ex-row { flex-wrap: wrap; }
  .ex-es { min-width: unset; }
}
</style>
