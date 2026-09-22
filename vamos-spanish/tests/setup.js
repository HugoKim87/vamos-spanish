// 브라우저에만 있는 API 흉내 (jsdom에는 없음)
const spoken = [];
globalThis.__spoken = spoken;
window.speechSynthesis = {
  getVoices: () => [{ lang: 'es-ES', name: 'stub' }],
  speak: u => { spoken.push(u.text); globalThis.__lastUtterance = u; },
  cancel: () => {},
  set onvoiceschanged(fn) {},
};
window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };

/**
 * 무작위성 고정
 * ---------------------------------------------------------------
 * 학습 모드는 카드 섞기·문제 유형 선정에 Math.random을 쓴다.
 * 그대로 두면 "어쩌다 단답형이 한 번도 안 나오는" 실행에서만 테스트가 깨져,
 * 원인을 찾기 어려운 간헐적 실패가 된다.
 *
 * 그래서 테스트에서는 같은 순서가 재현되도록 씨앗값 기반으로 바꾼다.
 * (각 테스트 시작 시 resetRandom()으로 되돌린다)
 */
const REAL_RANDOM = Math.random;
let seed = 1;

globalThis.resetRandom = (s = 1) => { seed = s; };
globalThis.useRealRandom = () => { Math.random = REAL_RANDOM; };

Math.random = () => {
  // 작은 선형 합동 생성기 — 값이 고르게 퍼지고 결과가 항상 같다
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// 테스트마다 같은 지점에서 시작하도록 초기화
if (typeof beforeEach === 'function') beforeEach(() => globalThis.resetRandom(1));
