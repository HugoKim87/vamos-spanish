import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { supabase } from '@/lib/supabase.js';

/**
 * 인증 스토어 — GitHub 로그인 세션을 관리합니다.
 *  - 로그인하지 않아도 앱은 그대로 동작(로컬 저장만 사용).
 *  - 로그인하면 progress 스토어가 이 스토어의 user를 감지해 클라우드 동기화를 시작합니다.
 */
export const useAuthStore = defineStore('auth', () => {
  const session = ref(null);
  const ready = ref(false); // 최초 세션 확인 완료 여부

  const user = computed(() => session.value?.user ?? null);
  const isLoggedIn = computed(() => !!user.value);
  const avatarUrl = computed(() => user.value?.user_metadata?.avatar_url ?? null);
  const displayName = computed(() =>
    user.value?.user_metadata?.user_name
    || user.value?.user_metadata?.full_name
    || '학습자'
  );

  /** 앱 시작 시 1회 호출 — 기존 세션 복원 + 이후 변경 감지 */
  async function init() {
    const { data } = await supabase.auth.getSession();
    session.value = data.session;
    ready.value = true;

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession;
    });
  }

  /** GitHub OAuth 로그인 — 현재 페이지(해시 라우트)로 돌아오도록 redirect 설정 */
  async function signInWithGithub() {
    const redirectTo = window.location.origin + import.meta.env.BASE_URL;
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return {
    session, user, isLoggedIn, ready, avatarUrl, displayName,
    init, signInWithGithub, signOut,
  };
});
