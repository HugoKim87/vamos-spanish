/** 학습 모드 공통 유틸 */

/** 배열 셔플 (새 배열 반환) */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 채점용 정규화: 악센트/대소문자/구두점/공백 무시 */
export function normalize(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[¿?¡!.,]/g, '')
    .replace(/\s+/g, ' ');
}

/** 두 답이 같은지 */
export function isCorrect(a, b) {
  return normalize(a) === normalize(b);
}

/** 정답 + 무작위 오답들로 보기 만들기 */
export function makeOptions(correct, pool, key, distractors = 3) {
  const others = shuffle(pool.filter(c => c[key] !== correct)).slice(0, distractors);
  return shuffle([correct, ...others.map(c => c[key])]);
}
