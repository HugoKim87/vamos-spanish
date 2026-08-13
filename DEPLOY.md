# 배포 가이드

Git 저장소에 올리고 실제 웹사이트로 공개하는 방법입니다.
터미널(맥: 터미널 / 윈도우: Git Bash 또는 PowerShell)에서 진행합니다.

---

## 0. 준비물 (최초 1회)

- **Git 설치** — https://git-scm.com/downloads
- **Node.js 20 이상** — https://nodejs.org
- **GitHub 계정** — https://github.com

설치 확인:

```bash
git --version
node --version
```

---

## 1. GitHub에 빈 저장소 만들기

1. https://github.com/new 접속
2. **Repository name**: `vamos-spanish` (원하는 이름)
3. **Public** 선택 (GitHub Pages 무료 배포를 쓰려면 Public이 편합니다)
4. README·.gitignore·license는 **체크하지 않음** (이미 프로젝트에 있음)
5. **Create repository** 클릭

---

## 2. 내 컴퓨터에서 올리기

프로젝트 폴더로 이동한 뒤:

```bash
cd vamos-spanish          # 프로젝트 폴더로 이동

git init                  # Git 저장소 초기화
git add .                 # 모든 파일 추가 (.gitignore 규칙 자동 적용)
git commit -m "¡Vamos! 스페인어 학습 앱 초기 커밋"

git branch -M main
git remote add origin https://github.com/내아이디/vamos-spanish.git
git push -u origin main
```

> `내아이디` 부분을 본인 GitHub 아이디로 바꾸세요.
> 비밀번호를 물으면 GitHub 비밀번호가 아니라 **Personal Access Token**이 필요합니다.
> 발급: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
> → Generate new token → `repo` 권한 체크 → 생성된 토큰을 비밀번호 자리에 붙여넣기

`node_modules`와 `dist`는 `.gitignore`에 있어서 자동으로 제외됩니다. (용량이 크고 다시 만들 수 있는 파일이라 올리지 않는 게 맞습니다.)

---

## 3. GitHub Pages로 자동 배포 켜기

이 프로젝트에는 이미 자동 배포 설정(`.github/workflows/deploy.yml`)이 들어 있습니다.
저장소 설정에서 Pages만 켜주면 됩니다.

1. GitHub 저장소 페이지 → **Settings** 탭
2. 왼쪽 메뉴에서 **Pages**
3. **Source**를 `Deploy from a branch`가 아니라 **`GitHub Actions`** 로 변경
4. 저장

이제 `main` 브랜치에 push할 때마다 자동으로:
`npm install` → `npm run validate`(데이터 검증) → `npm run build` → 배포

진행 상황은 저장소의 **Actions** 탭에서 볼 수 있습니다.
1~2분 뒤 아래 주소로 접속하면 사이트가 뜹니다:

```
https://내아이디.github.io/vamos-spanish/
```

휴대폰에서도 이 주소로 접속됩니다.

---

## 4. 앞으로 단어를 추가할 때

`src/data/lessons.js`를 수정한 뒤:

```bash
npm run validate          # 데이터 검증 (오류 0건 확인)
git add .
git commit -m "Day 55 추가"
git push
```

push하면 GitHub Actions가 알아서 다시 빌드·배포합니다. **사이트는 1~2분 뒤 자동 갱신됩니다.**

> 검증에 실패하면 배포가 중단되므로, 잘못된 데이터가 사이트에 올라가지 않습니다.

---

## 자주 겪는 문제

**Q. push할 때 인증 오류가 나요**
→ 비밀번호 대신 Personal Access Token을 써야 합니다 (2단계 참고).
GitHub Desktop(https://desktop.github.com) 같은 GUI 도구를 쓰면 로그인만으로 해결됩니다.

**Q. 사이트에 접속했는데 화면이 하얘요**
→ Actions 탭에서 배포가 성공했는지 먼저 확인하세요.
성공했는데도 하얗다면 base 경로 문제인데, 이 프로젝트는 저장소 이름을 자동 감지하도록
`vite.config.js`에 처리해 두었습니다. 저장소 이름을 바꿨다면 다시 push하면 해결됩니다.

**Q. Actions가 실패해요**
→ 실패한 단계를 클릭해 로그를 보세요. 대부분 `npm run validate` 단계에서
데이터 오류(카드 필드 누락, id 중복)가 잡힌 경우입니다. 로그에 어떤 레슨인지 나옵니다.

**Q. Private 저장소로 하고 싶어요**
→ GitHub Pages는 무료 플랜에서 Private 저장소 배포가 제한됩니다.
대신 **Netlify**나 **Vercel**을 쓰면 Private도 무료로 배포됩니다
(GitHub 계정으로 로그인 → 저장소 선택 → 빌드 명령 `npm run build`, 배포 폴더 `dist` 입력).

---

## 다른 배포 방법 (선택)

### Netlify — 드래그앤드롭으로 가장 간단

1. `npm run build` 실행 → `dist` 폴더 생성
2. https://app.netlify.com/drop 에 `dist` 폴더를 그대로 끌어다 놓기
3. 즉시 주소가 생성됨

### Vercel

1. https://vercel.com → GitHub 계정으로 로그인
2. 저장소 선택 → Framework Preset: **Vite** 자동 인식
3. Deploy 클릭
