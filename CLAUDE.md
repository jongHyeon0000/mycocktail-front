# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Style

사용자는 개발자다. 디자인 및 퍼블리싱 작업 시 사용자의 의도와 기존 스타일을 존중하되, 세부 레이아웃·색상·간격·컴포넌트 선택은 자유롭게 판단하여 작업해도 된다. 별도 확인 없이 진행하라.

## Commands

```bash
npm run dev       # 개발 서버 실행 (Vite + MSW 자동 활성화)
npm run build     # TypeScript 컴파일 + Vite 프로덕션 빌드
npm run lint      # ESLint 실행
npm run preview   # 빌드 결과물 미리보기
```

테스트 프레임워크는 현재 설정되어 있지 않음.

## Architecture

### 기술 스택

- React 19 + TypeScript (strict mode) + Vite
- 상태관리: Zustand (`src/store/authStore.ts`)
- UI: MUI + Styled Components
- HTTP: Axios (`src/config/axios/AxiosConfig.ts`)
- API 모킹: MSW v2 (`src/mocks/`)
- 라우팅: React Router DOM v7

### 디렉토리 구조

```
src/
├── app/user/           # 도메인별 페이지 및 컴포넌트
│   ├── auth/           # 인증 로직, RequireAuth, useInitAuth
│   ├── common/         # GNB, 공용 모달, 에디터 등
│   ├── my-page/        # 마이페이지 (중첩 라우팅)
│   ├── cocktail/       # 칵테일 레시피
│   ├── spirit/         # 주류 제품
│   ├── ingredients/    # 재료 (bitters, juice, syrup 등)
│   ├── tool/           # 도구
│   ├── technique/      # 기법
│   ├── glassware/      # 잔
│   └── main/           # 메인 페이지
├── config/
│   ├── axios/          # Axios 인스턴스 및 인터셉터
│   └── route/          # 라우트 정의 (RoutesConfig.tsx, MyPageRoutes.tsx)
├── mocks/
│   ├── browser.ts      # MSW worker 인스턴스
│   └── handlers/       # 도메인별 MSW 핸들러
├── store/authStore.ts  # Zustand 인증 상태
└── utils/cookieUtils.ts # 쿠키 기반 JWT 토큰 관리
```

### 도메인 내부 패턴

각 도메인 폴더(`cocktail`, `spirit` 등)는 동일한 구조를 따름:

```
{domain}/
├── page/         # 라우트 대상 페이지 컴포넌트
├── component/    # 페이지 내 재사용 컴포넌트
├── service/      # API 호출 커스텀 훅 (useRead*, useCreate* 등)
└── interface/    # TypeScript 타입 정의
```

### 인증 흐름

- JWT 토큰은 쿠키에 저장 (`cookieUtils.ts`)
- 유저 정보는 Zustand `authStore`에 보관
- 앱 시작 시 `useInitAuth()` 훅이 토큰으로 유저 정보 복원
- `isAuthenticated()` = 쿠키 토큰 + Zustand user 모두 존재
- 401/403 응답 시 Axios 인터셉터가 자동으로 토큰 삭제 + 로그아웃

### API 및 MSW 모킹

- 개발 환경: `BASE_URL = ''` — MSW가 현재 origin의 모든 `/api/*` 요청을 인터셉트
- 프로덕션: `BASE_URL = 'http://192.168.1.91:8080/'`
- MSW는 `main.tsx`의 `prepareApp()`에서 `DEV` 환경에만 초기화
- 새 API 추가 시: `src/mocks/handlers/`에 핸들러 작성 후 `index.ts`에 등록

### 라우팅

- `src/config/route/RoutesConfig.tsx`: 전체 라우트 정의, `requireAuth` 속성으로 인증 필요 여부 구분
- `App.tsx`에서 `requireAuth: true` 라우트를 `RequireAuth`로 감쌈
- 마이페이지(`/my-page/*`)는 `MyPageLayout` 내부에서 중첩 라우팅으로 처리
