# ¡Vamos! · 스페인어 학습

스페인어 단어·표현·문장 학습 웹앱.

## 실행

```bash
npm install     # 최초 1회
npm run dev     # 개발 서버 → http://localhost:5173
```

배포용 정적 파일이 필요하면:

```bash
npm run build   # dist/ 생성
npm run preview # 빌드 결과 확인
```

> `dist/`는 정적 서버(또는 Netlify·Vercel·GitHub Pages)에 그대로 올리면 됩니다.
> 해시 라우터를 쓰기 때문에 서버 rewrite 설정이 필요 없습니다.

## 배포하기

Git에 올리고 실제 웹사이트로 공개하는 방법은 **[DEPLOY.md](./DEPLOY.md)** 를 참고하세요.
`main` 브랜치에 push하면 GitHub Actions가 자동으로 검증·빌드·배포합니다.

## 무엇을 할 수 있나

- **테마별 학습** — 9가지 생활 테마(기초/집/음식/쇼핑/이동/일/사람/건강/취미)
- **학습 세트 직접 구성** — 테마 전체 · 특정 Day · 카드 유형(단어/표현/문장/패턴)을 조합
- **4가지 학습 모드** — 낱말카드 · 학습하기(오답 반복) · 테스트(채점+리뷰) · 카드 맞추기(타임어택)
- **모든 단어 보기** — 스페인어·한국어 통합 검색 + 테마/유형 필터
- **발음 듣기** — Web Speech API (es-ES 우선)
- **진도 자동 저장** — 학습한 카드·어려움 표시·최고 기록·연속 학습일

## 단어 추가하기

`src/data/lessons.js`에 객체 하나만 추가하면 끝입니다.
테마 분류·카드 유형·통계·화면 문구는 **자동으로 갱신**됩니다.

```bash
npm run validate   # 추가 후 검증
```

자세한 규칙은 `AGENTS.md`를 참고하세요.

## 구조

| 경로 | 역할 |
|---|---|
| `src/data/lessons.js` | 원본 학습 데이터 (여기만 편집) |
| `src/data/taxonomy.js` | 테마 정의 + 카드 유형 자동 분류기 |
| `src/stores/` | vocabulary(파생 데이터) · progress(진도) |
| `src/views/` | Home · Theme · Browse · Study |
| `src/components/modes/` | 4가지 학습 모드 |
| `src/styles/main.css` | 디자인 토큰 |
