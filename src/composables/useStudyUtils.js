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

/**
 * 정답 + 무작위 오답들로 보기 만들기.
 * ⚠️ 데이터에 뜻이 같은 카드가 여럿 있어(예: '운동하다' 3개) 그대로 뽑으면
 *    같은 보기가 두 번 나오고, v-for의 key도 중복된다. 텍스트 기준으로 걸러낸다.
 */
export function makeOptions(correct, pool, key, distractors = 3) {
  const seen = new Set([correct]);
  const others = [];

  for (const c of shuffle(pool)) {
    const text = c[key];
    if (seen.has(text)) continue;
    seen.add(text);
    others.push(text);
    if (others.length === distractors) break;
  }
  return shuffle([correct, ...others]);
}
