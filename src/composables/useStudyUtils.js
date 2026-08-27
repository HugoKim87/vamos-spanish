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

/**
 * 학습 세트에서 같은 스페인어 카드를 하나만 남긴다.
 *
 * 테마 단위로 학습하면 여러 Day에 걸쳐 같은 단어가 들어온다
 * (예: 쇼핑 테마에 'comprar'가 Day13·47·55 세 번).
 * 그대로 두면 "comprar → 사다"와 "comprar → 사다 (1인칭: compro)"가
 * 한 문제의 보기로 동시에 나와 둘 다 맞는데 하나만 정답이 되는 일이 생긴다.
 *
 * 나중 Day의 카드를 남긴다 — 대개 1인칭 등 설명이 더 붙어 있어 정보가 많다.
 * (모든 단어 보기 화면은 이 함수를 쓰지 않고 전부 그대로 보여준다)
 */
export function dedupeByEs(cards) {
  const byEs = new Map();
  for (const c of cards) byEs.set(c.es, c); // 같은 키면 뒤엣것이 덮어씀
  return [...byEs.values()];
}
