/**
 * 데이터 검증 스크립트 — `npm run validate`
 * -------------------------------------------------------------
 * lessons.js를 수정한 뒤 반드시 실행하세요.
 * 실패 항목이 있으면 종료 코드 1로 끝나 CI에서도 잡을 수 있습니다.
 */
import { lessons } from '../src/data/lessons.js';
import { THEMES, CARD_TYPES, classifyCard } from '../src/data/taxonomy.js';

let errors = 0;
let warnings = 0;
const err = m => { console.error('  ❌', m); errors++; };
const warn = m => { console.warn('  ⚠️ ', m); warnings++; };

console.log('🔍 데이터 검증 시작\n');

/* 1. 필수 필드 --------------------------------------------------- */
console.log('[1] 필수 필드');
const ids = new Set();
const days = new Set();
for (const l of lessons) {
  const where = l.id || '(id 없음)';
  if (!l.id) err('id 없는 레슨이 있습니다');
  else if (ids.has(l.id)) err(`id 중복: ${l.id}`);
  else ids.add(l.id);

  if (!Number.isFinite(l.day)) err(`${where}: day가 숫자가 아닙니다`);
  else if (days.has(l.day)) err(`day 중복: Day ${l.day}`);
  else days.add(l.day);

  if (!l.emoji) err(`${where}: emoji 없음`);
  if (!l.title) err(`${where}: title 없음`);
  if (!l.subtitle) err(`${where}: subtitle 없음`);
  if (!THEMES[l.theme]) err(`${where}: 알 수 없는 theme "${l.theme}"`);
  if (!Array.isArray(l.cards) || l.cards.length === 0) err(`${where}: cards 비어 있음`);
  if (l.cards?.length && l.cards.length < 10) warn(`${where}: 카드가 ${l.cards.length}장 (10장 이상 권장)`);

  l.cards?.forEach((c, i) => {
    if (!c.es) err(`${where}[${i}]: es 없음`);
    if (!c.ko) err(`${where}[${i}]: ko 없음`);
  });
}
if (!errors) console.log('  ✅ 통과');

/* 2. subtitle 형식 ---------------------------------------------- */
console.log('\n[2] subtitle 형식 (¿...? 스페인어 질문형)');
let subBad = 0;
for (const l of lessons) {
  if (!/^¿.*\?/.test(l.subtitle)) { warn(`${l.id}: "${l.subtitle}" — ¿...? 형식 권장`); subBad++; }
}
if (!subBad) console.log('  ✅ 통과');

/* 3. 카드 중복 --------------------------------------------------- */
console.log('\n[3] 카드 중복');
const seen = new Map();
let dupIn = 0, dupCross = 0;
for (const l of lessons) {
  const local = new Set();
  for (const c of l.cards) {
    if (local.has(c.es)) { err(`${l.id} 내부 중복: "${c.es}"`); dupIn++; }
    local.add(c.es);
    if (seen.has(c.es)) { warn(`레슨 간 중복: "${c.es}" (${seen.get(c.es)} ↔ ${l.id})`); dupCross++; }
    else seen.set(c.es, l.id);
  }
}
if (!dupIn && !dupCross) console.log('  ✅ 통과');
else console.log(`  내부 중복 ${dupIn}건(오류) / 레슨 간 중복 ${dupCross}건(경고)`);

/* 4. Day 연속성 -------------------------------------------------- */
console.log('\n[4] Day 연속성');
const sorted = [...days].sort((a, b) => a - b);
const missing = [];
for (let i = sorted[0]; i <= sorted[sorted.length - 1]; i++) {
  if (!days.has(i)) missing.push(i);
}
if (missing.length) warn(`비어 있는 Day: ${missing.join(', ')}`);
else console.log('  ✅ 연속');

/* 5. 자동 분류 결과 ---------------------------------------------- */
console.log('\n[5] 카드 유형 자동 분류');
const typeDist = {};
let cardTotal = 0;
for (const l of lessons) {
  for (const c of l.cards) {
    const t = classifyCard(c);
    typeDist[t] = (typeDist[t] || 0) + 1;
    cardTotal++;
  }
}
for (const [k, v] of Object.entries(typeDist)) {
  console.log(`  ${CARD_TYPES[k].emoji} ${CARD_TYPES[k].label}: ${v}장 (${((v / cardTotal) * 100).toFixed(1)}%)`);
}

/* 6. 테마 분포 --------------------------------------------------- */
console.log('\n[6] 테마 분포');
const themeDist = {};
for (const l of lessons) {
  themeDist[l.theme] = themeDist[l.theme] || { lessons: 0, cards: 0 };
  themeDist[l.theme].lessons++;
  themeDist[l.theme].cards += l.cards.length;
}
for (const key of Object.keys(THEMES)) {
  const d = themeDist[key];
  if (!d) { warn(`테마 "${THEMES[key].label}"에 레슨이 없습니다`); continue; }
  console.log(`  ${THEMES[key].emoji} ${THEMES[key].label}: ${d.lessons}개 레슨 · ${d.cards}장`);
}

/* 요약 ----------------------------------------------------------- */
console.log('\n' + '─'.repeat(46));
console.log(`레슨 ${lessons.length}개 · 카드 ${cardTotal}장`);
console.log(`오류 ${errors}건 · 경고 ${warnings}건`);
if (errors) {
  console.error('\n❌ 검증 실패 — 위 오류를 수정하세요.');
  process.exit(1);
}
console.log('\n✅ 검증 통과');
