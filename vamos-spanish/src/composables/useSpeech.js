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

/**
 * 읽어주는 속도
 * ---------------------------------------------------------------
 * 원어민 기준 속도(1.0)는 초급자에게 너무 빠르다.
 * 사람마다 편한 속도가 달라 고정하지 않고 고를 수 있게 했다.
 * 고른 값은 브라우저에 저장돼 다음에 들어와도 유지된다.
 */
const RATE_KEY = 'vamos.speechRate';

export const SPEECH_RATES = [
  { value: 0.6, label: '아주 느리게', icon: '🐌' },
  { value: 0.8, label: '느리게', icon: '🐢' },
  { value: 1.0, label: '보통', icon: '🗣️' },
];

/** 기본값은 '느리게' — 처음 배우는 사람 기준 */
const DEFAULT_RATE = 0.8;

function loadRate() {
  try {
    const saved = Number(localStorage.getItem(RATE_KEY));
    return SPEECH_RATES.some(r => r.value === saved) ? saved : DEFAULT_RATE;
  } catch {
    return DEFAULT_RATE;
  }
}

/** 화면 전체가 같은 값을 쓰도록 모듈 수준에 둔다 */
export const speechRate = ref(loadRate());

export function setSpeechRate(value) {
  speechRate.value = value;
  try { localStorage.setItem(RATE_KEY, String(value)); } catch { /* 무시 */ }
}

/** 다음 속도로 넘기기 (버튼 한 번에 순환) */
export function cycleSpeechRate() {
  const i = SPEECH_RATES.findIndex(r => r.value === speechRate.value);
  setSpeechRate(SPEECH_RATES[(i + 1) % SPEECH_RATES.length].value);
}

export function useSpeech() {
  /** @param {string} text 읽을 스페인어 텍스트 */
  function speak(text, { rate = speechRate.value } = {}) {
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
