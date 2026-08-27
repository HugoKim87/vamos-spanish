# AGENTS.md

¡Vamos! — 스페인어 학습 웹앱(Vue 3 + Vite + Pinia)의 코딩 에이전트 안내서입니다.
사람용 소개는 `README.md`, 데이터 추가 방법은 아래 **"새 Day 추가"** 절을 보세요.

## Project overview

- **무엇**: 실비아 Voca LAB 워크시트 기반 스페인어 단어·표현·문장 학습 SPA.
- **스택**: Vue 3 (`<script setup>`) · Vite · Pinia · vue-router(해시 모드). 순수 프런트엔드, 백엔드 없음.
- **규모**: 54개 레슨 · 1,036장 (수치는 코드가 자동 계산하므로 문서·화면에 하드코딩 금지).
- **핵심 아이디어**: 데이터는 **Day 단위로 누적**하고, 화면 구성(테마·유형·통계)은 **전부 자동 파생**한다.

## Setup commands

```bash
npm install          # 최초 1회
npm run dev          # 개발 서버 (http://localhost:5173)
npm run build        # 프로덕션 빌드 → dist/
npm run preview      # 빌드 결과 미리보기
npm run validate     # ★ 데이터 검증 (lessons.js 수정 후 필수)
```

## Validation (작업 후 필수)

1. `npm run validate` — 오류 0건이어야 함. 실패 시 종료 코드 1.
2. `npm run build` — 컴파일 에러 없이 성공해야 함.
3. UI를 수정했다면 `npm run dev`로 홈 → 테마 → 학습 4개 모드 → 모든 단어 흐름을 눈으로 확인.

> `validate`의 "레슨 간 중복"은 **경고**이지 오류가 아니다. 서로 다른 맥락에서의 반복 학습은 의도된 것이다.
> 다만 **같은 레슨 내부 중복은 오류**이며 반드시 고쳐야 한다.

## Architecture

```
src/
├─ data/
│  ├─ lessons.js      원본 학습 데이터 (Day 단위) ★ 데이터 추가는 여기만
│  └─ taxonomy.js     테마 정의 + 카드 유형 자동 분류기 ★ 분류 규칙은 여기만
├─ stores/
│  ├─ vocabulary.js   lessons를 읽어 모든 파생 데이터 계산 (읽기 전용 성격)
│  └─ progress.js     학습 진도·표시·최고기록 (localStorage 자동 저장)
├─ composables/
│  ├─ useSpeech.js    Web Speech API 발음 (음성 캐싱 포함)
│  └─ useStudyUtils.js shuffle / normalize / isCorrect / makeOptions
├─ components/
│  ├─ modes/          FlashcardMode · LearnMode · TestMode · MatchMode
│  └─ ...             AppHeader · ProgressBar · SpeakButton · TypeBadge
├─ views/             HomeView · ThemeView · BrowseView · StudyView
├─ styles/main.css    디자인 토큰(CSS 변수) + 공통 클래스
└─ router.js
```

**데이터 흐름 (한 방향)**

```
lessons.js ──▶ taxonomy.classifyCard() ──▶ vocabulary store ──▶ views
                                                    ▲
                                          progress store (학습 상태)
```

## 새 Day 추가 (가장 흔한 작업)

`src/data/lessons.js` 배열 끝에 객체 하나만 추가한다. **다른 파일은 건드리지 않는다.**

```js
{
  id: 'day55',
  day: 55,
  theme: 'food',                    // taxonomy.js의 THEMES 키 중 하나
  emoji: '🥗',
  title: '샐러드 가게',              // "Day 55 · " 접두어 없이 주제명만
  subtitle: '¿Qué pido en la ensaladería?',  // ¿...? 스페인어 질문형
  cards: [
    { es: 'la ensalada', ko: '샐러드' },
    // ...
  ],
},
```

규칙:

- `id`는 `day` + 숫자, `day`는 같은 숫자. **중복 금지**(validate가 잡는다).
- `theme`은 `basics · home · food · shopping · travel · work · people · health · leisure` 중 하나.
  애매하면 "학습자가 이 표현을 어떤 상황에서 쓸까?"를 기준으로 고른다.
- `subtitle`은 `¿...?` 형식으로 통일한다.
- 카드는 **10장 이상** 권장. 워크시트 분량이 많으면 더 넣어도 된다.
- **같은 레슨 안에 `es` 중복 금지.** 다른 레슨과 겹치는 것은 허용(맥락별 반복 학습).
- 1·2부로 나뉜 워크시트(예: Day 35/36)는 2부에서 1부와 **정확히 겹치는 카드가 0장**이 되게 구성한다.
- 카드 유형(단어/표현/문장/패턴)은 **적지 않는다.** `classifyCard()`가 자동 판별한다.

추가 후 `npm run validate`를 실행하면 테마 분포·유형 분포·중복이 한 번에 보고된다.

## 자동으로 계산되는 것 (하드코딩 금지)

`vocabulary` 스토어가 `lessons.js`에서 계산하므로 **화면 코드나 문서에 숫자를 직접 쓰지 않는다**:

- 전체 카드 수 · 레슨 수 (`totalCards`, `totalLessons`)
- Day 범위 문구 (`dayRange` → 푸터의 "Day 1 → Day N")
- 테마별 레슨/카드 수 (`themeSummaries`) — 홈 테마 카드
- 카드 유형별 개수 (`typeSummaries`)
- 검색·필터 결과 (`buildSet()`)

## Code style

- **Vue 3 `<script setup>` + Composition API**만 사용. Options API 금지.
- 컴포넌트 파일명은 PascalCase, 컴포저블은 `useXxx.js`.
- 스타일은 각 컴포넌트의 `<style scoped>`에. **전역 오염 금지.**
- 색·간격·반경·그림자는 `styles/main.css`의 CSS 변수(`var(--c-primary)` 등)를 쓴다. 새 색상값 하드코딩 금지.
- 매직넘버는 컴포넌트 상단에 상수로 선언(`const PAIRS = 6` 등).
- 들여쓰기 2칸, 세미콜론 사용, 작은따옴표.
- 사용자에게 보이는 텍스트는 한국어. 스페인어는 학습 콘텐츠에만.
- 주석은 한국어로, "왜"를 설명한다.

## 상태 관리 규칙

- **`vocabulary` 스토어는 읽기 전용**으로 취급한다. 학습 데이터를 런타임에 변형하지 않는다.
- 학습 진행 상태(학습함/어려움/최고기록)는 전부 **`progress` 스토어**를 통한다.
  컴포넌트가 localStorage를 직접 만지지 않는다.
- 카드 식별은 항상 `card.uid`(= `lessonId:index`)를 쓴다. `es` 문자열을 키로 쓰지 않는다.

## 학습 모드 컴포넌트 계약

`components/modes/*.vue`는 모두 동일한 인터페이스를 지킨다:

- **props**: `cards` (필수, 카드 배열), `setKey` (선택, 기록 저장용 문자열)
- **emits**: `progress`(0~100 숫자), `finish`(완료 시)
- 진행률 표시와 완료 화면은 `StudyView`가 담당한다. 모드 컴포넌트는 자기 로직만 신경 쓴다.

새 모드를 추가하려면 이 계약을 지키고 `StudyView.vue`의 `MODE_MAP`에 등록하면 된다.

## 충돌 시 우선순위

1. 사용자의 직접 지시
2. 이 문서
3. 기존 코드의 패턴

## 하지 말 것

- `lessons.js` 외의 곳에 학습 데이터 하드코딩
- 카드 유형을 데이터에 직접 적기 (분류기가 하는 일)
- 전체 카드 수·Day 범위 등 자동 계산값을 화면에 직접 쓰기
- 컴포넌트에서 localStorage 직접 접근
- CSS 변수 대신 색상값 직접 입력
- Options API, 전역 스타일 추가
- 무거운 의존성 추가 (현재 런타임 의존성은 vue · pinia · vue-router 3개뿐)

## ⚠️ 코드를 고친 뒤 반드시 할 것

`npm run verify` 를 실행하고 **전부 통과한 뒤에만** 결과물을 전달한다.
하나라도 실패하면 원인을 고칠 때까지 전달하지 않는다.

```bash
npm run verify   # validate(데이터) → test(동작) → build(빌드)
```

### 왜 빌드만으로는 부족한가
빌드는 "문법이 맞는지"만 본다. 화면이 뜨는지, 버튼이 눌리는지는 확인하지 않는다.
실제로 다음 버그들이 빌드를 통과한 채 배포된 적이 있다.

- 테마 페이지가 전부 "존재하지 않는 테마입니다"로 뜸 (`key`가 Vue 예약어)
- 모든 단어 화면이 Day 12까지만 보임 (정렬보다 자르기가 먼저)
- 퀴즈 보기에 같은 답이 두 번 나옴
- 낱말카드를 넘길 때 다음 카드의 뜻이 0.55초간 먼저 보임 (회전 애니메이션)

### 테스트를 추가했으면 "일부러 되돌려" 확인한다
고친 코드를 잠깐 원래대로 돌려놓고 테스트가 **실패하는지** 본다.
실패하지 않으면 그 테스트는 아무것도 지켜 주지 않는다.

### 테스트가 덮는 범위 (`tests/`)
| 파일 | 확인하는 것 |
|---|---|
| `usability.test.js` | 모드 버튼 6개 렌더링·클릭 이동, 칩 조합이 항상 1장 이상 |
| `modes.test.js` | 각 모드 안에서 실제 조작 (카드 넘기기·채점·타일 매칭·활용 입력·받아쓰기) |
| `theme-flow.test.js` | 레슨+유형으로 좁힌 상태에서 6개 모드 실행 |
| `app-flow.test.js` | 앱 전체를 실제 라우터로 띄워 화면 이동 |
| `regression.test.js` | 정답이 먼저 노출되지 않는지, 주관식 자동 포커스 |

### 테스트 작성 시 주의
- 화면은 지연 로딩(별도 청크)이라 **이동 완료를 기다려야 한다**. 고정 시간(`setTimeout`)으로 판정하면
  느린 환경에서 헛되이 실패한다. `waitRoute()`처럼 조건이 만족될 때까지 기다린다.
- 앱을 여러 번 마운트하며 라우터 하나를 공유하면 앞 테스트의 이동이 남아 첫 클릭이 취소된다.
  테스트마다 라우터를 새로 만들거나 앱 인스턴스를 하나만 쓴다.
