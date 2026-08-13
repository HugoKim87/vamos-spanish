<script setup>
import { computed } from 'vue';
import { useProgressStore } from '@/stores/progress.js';
import { useAuthStore } from '@/stores/auth.js';

const progress = useProgressStore();
const auth = useAuthStore();
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

        <button
          v-if="!auth.isLoggedIn"
          class="auth-btn login"
          :disabled="!auth.ready"
          @click="auth.signInWithGithub()"
        >
          <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
              .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
              .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
              0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
          </svg>
          GitHub 로그인
        </button>

        <button
          v-else
          class="auth-btn user"
          :title="`${auth.displayName} · 클릭하면 로그아웃`"
          @click="auth.signOut()"
        >
          <img v-if="auth.avatarUrl" :src="auth.avatarUrl" class="avatar" alt="" />
          <span class="uname">{{ auth.displayName }}</span>
        </button>
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
.right { margin-left: auto; display: flex; align-items: center; gap: var(--sp-2); }
.streak {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 13px; border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--c-gold-soft), var(--c-gold));
  font-size: 13px; color: var(--c-gold-ink); font-weight: 600;
}

.auth-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 7px 13px; border-radius: var(--r-full);
  font-size: 13px; font-weight: 700;
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  transition: background .15s var(--ease), border-color .15s var(--ease);
}
.auth-btn.login:hover:not(:disabled) { border-color: var(--c-primary); }
.auth-btn.login:disabled { opacity: .5; cursor: default; }
.auth-btn.user:hover { border-color: var(--c-danger); }
.avatar { width: 20px; height: 20px; border-radius: 50%; }
.uname { max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

@media (max-width: 560px) {
  .inner { gap: var(--sp-3); }
  .nav-link { padding: 6px 10px; font-size: 13px; }
  .streak b { display: none; }
  .auth-btn .uname { display: none; }
  .auth-btn.login { padding: 7px 9px; }
  .auth-btn.login span:not(.uname) { display: none; }
}
</style>
