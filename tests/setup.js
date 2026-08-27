// 브라우저에만 있는 API 흉내 (jsdom에는 없음)
const spoken = [];
globalThis.__spoken = spoken;
window.speechSynthesis = {
  getVoices: () => [{ lang: 'es-ES', name: 'stub' }],
  speak: u => spoken.push(u.text),
  cancel: () => {},
  set onvoiceschanged(fn) {},
};
window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
