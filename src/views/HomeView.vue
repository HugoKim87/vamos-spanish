<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVocabularyStore } from '@/stores/vocabulary.js';
import { useProgressStore } from '@/stores/progress.js';
import ProgressBar from '@/components/ProgressBar.vue';

const router = useRouter();
const vocab = useVocabularyStore();
const progress = useProgressStore();

const overallProgress = computed(() => progress.progressOf(vocab.allCards));

/** 최근 레슨 3개 (이어서 학습 추천) */
const recentLessons = computed(() =>
  [...vocab.lessons].sort((a, b) => b.day - a.day).slice(0, 3)
);

/** 어려움 표시한 카드로 바로 복습 */
const hardCount = computed(() => progress.hardCards.length);

/** 어려움 표시한 카드만 걸러 보도록 필터를 켠 뒤 이동 */
function reviewHard() {
  vocab.searchQuery = '';
  vocab.searchTheme = '';
  vocab.searchTypes = [];
  vocab.searchHardOnly = true;
  router.push({ name: 'browse' });
}

function startQuick(mode) {
  router.push({ name: 'study', params: { mode } });
}
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="eyebrow">실비아 Voca LAB 기반</span>
        <h1>
          오늘은 어떤 <em>스페인어</em>를<br />익혀볼까요?
        </h1>
        <p class="lead">
          {{ vocab.totalCards }}개의 단어 · 표현 · 문장을 9가지 생활 테마로 정리했어요.
          관심 있는 테마부터 골라 바로 시작해 보세요.
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" @click="startQuick('flashcards')">
            🃏 바로 학습 시작
          </button>
          <RouterLink to="/browse" class="btn btn-ghost btn-lg">
            🔍 모든 단어 보기
          </RouterLink>
        </div>
      </div>

      <!-- 진도 카드 -->
      <aside class="progress-card card">
        <div class="pc-head">
          <span class="pc-title">나의 진도</span>
          <span class="pc-pct">{{ overallProgress }}%</span>
        </div>
        <ProgressBar :value="overallProgress" />
        <dl class="pc-stats">
          <div><dt>학습한 카드</dt><dd>{{ progress.learnedCount }}</dd></div>
          <div><dt>오늘</dt><dd>{{ progress.dailyCount }}장</dd></div>
          <div><dt>연속</dt><dd>{{ progress.streak }}일</dd></div>
        </dl>
        <button
          v-if="hardCount"
          class="pc-hard"
          @click="reviewHard"
        >😵 어려운 카드 {{ hardCount }}장 복습하기</button>
      </aside>
    </div>
  </section>

  <!-- 테마 그리드 -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <h2 class="section-title">테마로 학습하기</h2>
          <p class="section-sub">배우고 싶은 생활 상황을 골라보세요</p>
        </div>
      </div>

      <div class="theme-grid">
        <RouterLink
          v-for="t in vocab.themeSummaries"
          :key="t.key"
          :to="{ name: 'theme', params: { themeKey: t.key } }"
          class="theme-card"
          :style="{ '--accent': t.color }"
        >
          <span class="tc-emoji">{{ t.emoji }}</span>
          <span class="tc-label">{{ t.label }}</span>
          <span class="tc-hint">{{ t.hint }}</span>
          <span class="tc-meta">{{ t.lessonCount }}개 레슨 · {{ t.cardCount }}장</span>
          <ProgressBar
            class="tc-bar"
            :value="progress.progressOf(t.cards)"
          />
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 카드 유형별 학습 -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <h2 class="section-title">유형으로 골라 학습</h2>
          <p class="section-sub">낱말만, 또는 말하기용 문장만 모아서 연습할 수 있어요</p>
        </div>
      </div>

      <div class="type-row">
        <RouterLink
          v-for="t in vocab.typeSummaries"
          :key="t.key"
          :to="{ name: 'study', params: { mode: 'flashcards' }, query: { types: t.key } }"
          class="type-card"
        >
          <span class="ty-emoji">{{ t.emoji }}</span>
          <span class="ty-label">{{ t.label }}</span>
          <span class="ty-count">{{ t.count }}장</span>
          <span class="ty-hint">{{ t.hint }}</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 최근 레슨 -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <h2 class="section-title">최근 추가된 레슨</h2>
          <p class="section-sub">새로 올라온 워크시트부터 확인해 보세요</p>
        </div>
      </div>

      <div class="recent-row">
        <RouterLink
          v-for="l in recentLessons"
          :key="l.id"
          :to="{ name: 'theme', params: { themeKey: l.theme }, query: { lesson: l.id } }"
          class="recent-card card"
        >
          <div class="rc-top">
            <span class="rc-emoji">{{ l.emoji }}</span>
            <span class="rc-day">Day {{ l.day }}</span>
          </div>
          <h3 class="rc-title">{{ l.title }}</h3>
          <p class="rc-sub es-text">{{ l.subtitle }}</p>
          <ProgressBar :value="progress.progressOf(l.cards)" show-label />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero */
.hero { padding: var(--sp-7) 0 var(--sp-6); }
.hero-inner {
  display: grid;
  grid-template-columns: 1.35fr .9fr;
  gap: var(--sp-6);
  align-items: center;
}
.eyebrow {
  display: inline-block;
  padding: 5px 12px; border-radius: var(--r-full);
  background: var(--c-primary-soft); color: var(--c-primary);
  font-size: 12.5px; font-weight: 800; margin-bottom: var(--sp-3);
}
h1 {
  font-size: clamp(30px, 4.4vw, 46px);
  font-weight: 900; letter-spacing: -.04em; line-height: 1.12;
}
h1 em {
  font-style: normal; color: var(--c-primary);
  background: linear-gradient(180deg, transparent 62%, var(--c-highlight) 62%);
  padding: 0 3px;
}
.lead {
  margin-top: var(--sp-4);
  font-size: 16px; color: var(--c-text-soft); max-width: 46ch;
}
.hero-actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-5); flex-wrap: wrap; }

/* 진도 카드 */
.progress-card { padding: var(--sp-5); }
.pc-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: var(--sp-3); }
.pc-title { font-size: 14px; font-weight: 700; color: var(--c-text-soft); }
.pc-pct { font-size: 26px; font-weight: 900; color: var(--c-primary); letter-spacing: -.03em; }
.pc-stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-2); margin-top: var(--sp-4);
}
.pc-stats div { text-align: center; }
.pc-stats dt { font-size: 11.5px; color: var(--c-text-mute); }
.pc-stats dd { font-size: 17px; font-weight: 800; margin-top: 2px; }
.pc-hard {
  display: block; width: 100%; margin-top: var(--sp-4);
  padding: 9px 12px; border-radius: var(--r-sm);
  background: var(--c-danger-soft); color: var(--c-danger-ink);
  font-size: 13px; font-weight: 700; text-align: center;
  border: none; cursor: pointer;
}

/* 테마 그리드 */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  gap: var(--sp-4);
}
.theme-card {
  --accent: var(--c-primary);
  position: relative;
  display: flex; flex-direction: column;
  padding: var(--sp-5) var(--sp-4) var(--sp-4);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  box-shadow: var(--sh-sm);
  overflow: hidden;
  transition: transform .2s var(--ease), box-shadow .2s var(--ease), border-color .2s var(--ease);
}
.theme-card::before {
  content: ''; position: absolute; inset: 0 0 auto 0;
  height: 3px; background: var(--accent);
}
.theme-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-md);
  border-color: var(--accent);
}
.tc-emoji { font-size: 30px; line-height: 1; }
.tc-label { margin-top: var(--sp-3); font-size: 17px; font-weight: 800; letter-spacing: -.02em; }
.tc-hint { margin-top: 2px; font-size: 12.5px; color: var(--c-text-mute); }
.tc-meta { margin-top: var(--sp-3); font-size: 12px; font-weight: 700; color: var(--accent); }
.tc-bar { margin-top: var(--sp-2); }

/* 유형 */
.type-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--sp-3);
}
.type-card {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: var(--sp-4);
  background: var(--c-surface); border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  transition: border-color .18s var(--ease), transform .18s var(--ease);
}
.type-card:hover { border-color: var(--c-primary); transform: translateY(-2px); }
.ty-emoji { font-size: 20px; }
.ty-label { margin-top: 6px; font-weight: 800; font-size: 15px; }
.ty-count { font-size: 13px; font-weight: 700; color: var(--c-primary); }
.ty-hint { margin-top: 4px; font-size: 12px; color: var(--c-text-mute); }

/* 최근 레슨 */
.recent-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: var(--sp-4);
}
.recent-card {
  padding: var(--sp-4);
  transition: transform .18s var(--ease), box-shadow .18s var(--ease);
}
.recent-card:hover { transform: translateY(-3px); box-shadow: var(--sh-md); }
.rc-top { display: flex; align-items: center; justify-content: space-between; }
.rc-emoji { font-size: 24px; }
.rc-day {
  padding: 3px 9px; border-radius: var(--r-full);
  background: var(--c-primary-soft); color: var(--c-primary);
  font-size: 11.5px; font-weight: 800;
}
.rc-title { margin-top: var(--sp-3); font-size: 16px; font-weight: 800; }
.rc-sub { font-size: 13px; color: var(--c-text-mute); margin: 2px 0 var(--sp-3); }

@media (max-width: 860px) {
  .hero-inner { grid-template-columns: 1fr; }
}
</style>
