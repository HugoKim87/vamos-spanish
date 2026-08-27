/**
 * 동사 형태 사전
 * ---------------------------------------------------------------
 * "이 카드에 동사가 들어있는가?"를 판별하는 데 씁니다.
 * (동사가 있으면 '표현', 명사들만 이어진 것이면 '명사'로 분류)
 *
 * 두 갈래로 만듭니다.
 *  1) lessons.js에 있는 동사원형 → conjugation.js로 현재형 6인칭 자동 생성
 *  2) 아래 EXTRA_FORMS → 원형 카드로는 없지만 문장 속에 자주 나오는 형태
 *     (과거·미래형, hay, 무인칭 se 구문 등)
 *
 * ⚠️ 여기 없는 형태는 동사로 인식되지 않아 '명사'로 잘못 분류됩니다.
 *    scripts/validate-data.mjs가 의심 사례를 뽑아 주니 그때 보강하세요.
 */

/**
 * 원형 카드에 없지만 문장 속에서 쓰이는 동사 형태들.
 * 시제를 가리지 않고 "동사다"라고만 알려주면 되므로 형태만 나열합니다.
 */
export const EXTRA_FORMS = new Set([
  // 2글자라 동사원형 정규식([a-z]+ar/er/ir)에 걸리지 않는 원형
  'ir',
  // ser / estar / haber
  'soy', 'eres', 'es', 'somos', 'sois', 'son', 'era', 'eran', 'fue', 'fueron', 'será',
  'estoy', 'estás', 'está', 'estamos', 'estáis', 'están', 'estaba', 'estuve',
  'hay', 'he', 'has', 'ha', 'hemos', 'han', 'había',
  // tener
  'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen', 'tenía', 'tuve', 'tendré',
  // ir
  'voy', 'vas', 'va', 'vamos', 'vais', 'van', 'iba', 'fui', 'iré',
  // hacer
  'hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen', 'hacía', 'hice', 'haré', 'harás', 'hará',
  // decir
  'digo', 'dices', 'dice', 'decimos', 'decís', 'dicen', 'dije', 'decir',
  // dar
  'doy', 'das', 'da', 'damos', 'dais', 'dan', 'daré', 'darás', 'dará', 'di',
  // saber / conocer
  'sé', 'sabes', 'sabe', 'sabemos', 'saben', 'conozco', 'conoces', 'conoce',
  // venir / salir / llevar / traer
  'vengo', 'vienes', 'viene', 'venimos', 'vienen',
  'salgo', 'sales', 'sale', 'salimos', 'salen',
  'llevo', 'llevas', 'lleva', 'llevamos', 'llevan',
  // querer / poder / gustar / doler / encantar / parecer
  'quiero', 'quieres', 'quiere', 'queremos', 'quieren', 'quería', 'quisiera',
  'puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden', 'podría',
  'gusta', 'gustan', 'gustaría', 'gustaba', 'encanta', 'encantan',
  'duele', 'duelen', 'parece', 'parecen',
  // 자주 쓰이는 규칙 동사의 과거·미래형 (워크시트 문항에 등장)
  'compré', 'compraste', 'compró', 'compraron',
  'reservaba', 'reservé', 'reservó',
  'llegué', 'llegó', 'llego', 'llegas', 'llega', 'llegan',
  'necesito', 'necesitas', 'necesita', 'necesitan',
  'trabajo', 'trabajas', 'trabaja', 'trabajamos', 'trabajan',
  'vivo', 'vives', 'vive', 'vivimos', 'viven',
  'como', 'comes', 'come', 'comemos', 'comen',
  'bebo', 'bebes', 'bebe', 'bebemos', 'beben',
  'creo', 'crees', 'cree', 'creemos', 'creen',
  'espero', 'esperas', 'espera', 'esperan',
  'busco', 'buscas', 'busca', 'buscan',
  'pago', 'pagas', 'paga', 'pagan',
  'deme', 'dame', 'ponme', 'perdone', 'disculpe', 'oiga', 'mire',
  // 무인칭·수동 se 구문
  'reserva', 'reservan', 'llama', 'llaman', 'usa', 'usan', 'dice',

  // ↓ 실제 카드 데이터를 훑어 보강한 형태들 (원형 카드가 없어 자동 생성이 안 되는 것)
  // hablar / escuchar / tomar / funcionar
  'hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan',
  'escucho', 'escuchas', 'escucha', 'escuchamos', 'escuchan', 'escucharás',
  'tomo', 'tomas', 'toma', 'tomamos', 'toman',
  'funciona', 'funcionan',
  // 명령형 (길 안내·주문)
  'siga', 'gire', 'sigue', 'gira', 'tome', 'ponga', 'traiga',
  // 과거·미래형 (워크시트 PRÁCTICA 문항)
  'usaste', 'hiciste', 'comprarás', 'escuchaste', 'cuesta', 'cuestan',
  'estabas', 'estaba', 'maquillarte', 'recuperarme', 'relajarme', 'cuidarlas',
  'riego', 'riegas', 'riega', 'regamos', 'riegan',
  'empiezo', 'empiezas', 'empieza', 'empezamos', 'empiezan',
  'termino', 'terminas', 'termina', 'terminamos', 'terminan',
]);

/** 동사원형인지 (원형은 그 자체로 동사) */
export const INFINITIVE_RE = /^[a-záéíóúñü]+(ar|er|ir)(se)?$/i;

/** 비교용 정규화 — 대소문자·문장부호 제거 */
export function normalizeToken(token) {
  return token
    .toLowerCase()
    .replace(/[¿?¡!.,;:"'()]/g, '')
    .trim();
}

/**
 * 동사처럼 생겼지만 동사가 아닌 단어들 — 항상 명사·형용사로만 쓰인다.
 *
 *  solar : -ar로 끝나 동사원형처럼 보이지만 형용사('태양의')
 *  lugar : 마찬가지로 명사('장소')
 * 여기 넣은 단어는 어느 위치에 있든 동사로 세지 않는다.
 */
export const NOT_VERBS = new Set([
  'solar', 'lugar', 'militar', 'popular', 'particular', 'familiar', 'escolar',
  'collar', 'mar', 'bar', 'azucar', 'azúcar', 'hogar',
]);

/**
 * 명사로도 동사로도 쓰이는 단어 — 위치로 판단해야 한다.
 *
 *  Trabajo en una oficina.(나는 일한다 · 동사)  vs  el trabajo(일 · 명사)
 *  Bajo al tercer piso.(나는 내려간다 · 동사)   vs  la planta baja(낮은 · 형용사)
 *
 * 관사·전치사 뒤에 오면 명사, 그 밖(특히 문장 첫머리)이면 동사로 본다.
 * 앞 단어 검사는 containsVerb가 이미 하므로 여기서는 목록만 관리한다.
 */
export const AMBIGUOUS = new Set([
  'trabajo', 'bajo', 'baja', 'cocina', 'reserva', 'regalo',
  'ducha', 'receta', 'recibo', 'archivo', 'desayuno', 'lista', 'llama',
]);
