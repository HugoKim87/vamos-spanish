import { ref } from 'vue';

/**
 * 스페인어 발음 재생 (Web Speech API)
 * - 음성 목록을 캐싱해 첫 클릭부터 스페인어 음성을 보장
 * - 우선순위: es-ES > 기타 es-* > 시스템 기본
 */
const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
const spanishVoice = ref(null);
const hasSpanish = ref(false);
const ready = ref(false);

function pickVoice(voices) {
  if (!voices?.length) return null;
  return (
    voices.find(v => v.lang?.toLowerCase() === 'es-es') ||
    voices.find(v => v.lang?.toLowerCase().startsWith('es')) ||
    null
  );
}

function loadVoices() {
  if (!supported) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices?.length) {
    spanishVoice.value = pickVoice(voices);
    hasSpanish.value = !!spanishVoice.value;
    ready.value = true;
  }
}

if (supported) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  // 크롬은 getVoices()가 처음엔 비어 있어 지연 재시도
  [250, 1000].forEach(ms => setTimeout(loadVoices, ms));
}

export function useSpeech() {
  /** @param {string} text 읽을 스페인어 텍스트 */
  function speak(text, { rate = 0.92 } = {}) {
    if (!supported || !text) return;
    if (!ready.value) loadVoices();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = rate;
    if (spanishVoice.value) u.voice = spanishVoice.value;
    window.speechSynthesis.speak(u);
  }

  function stop() {
    if (supported) window.speechSynthesis.cancel();
  }

  return { speak, stop, supported, hasSpanish, ready };
}
