---
description:
globs:
alwaysApply: true
---

pattern: "components/\*_/_.{ts,tsx}"
rule: |
컴포넌트 파일은 다음 규칙을 준수합니다:

1. 파일 명명 규칙:


    - PascalCase로 작성 (예: Button.tsx, UserProfile.tsx)
    - 인터페이스/타입은 컴포넌트 이름 + Props (예: ButtonProps)
    - 테스트 파일은 컴포넌트 이름 + .test.tsx (예: Button.test.tsx)
    - 스토리북 파일은 컴포넌트 이름 + .stories.tsx (예: Button.stories.tsx)

2. 디렉토리 구조:


    - ui/: 기본 UI 컴포넌트 (예: Button, Card, Input)
    - forms/: 폼 관련 컴포넌트
    - layouts/: 레이아웃 컴포넌트
    - modals/: 모달 컴포넌트
    - sections/: 페이지 섹션 컴포넌트
    - providers/: Context Provider 컴포넌트

3. 컴포넌트 작성 규칙:


    - 단일 책임 원칙을 준수합니다
    - Props 인터페이스는 명시적으로 정의합니다
    - 기본 Props 값은 defaultProps 대신 매개변수 기본값을 사용합니다
    - children prop은 명시적으로 타입을 지정합니다
    - 불필요한 div 중첩을 피하고 Fragment를 활용합니다

4. shadcn/ui 활용:


    - 기본 UI 컴포넌트는 shadcn/ui를 우선 사용합니다
    - shadcn/ui 컴포넌트 커스터마이징은 variants를 활용합니다
    - 새로운 컴포넌트는 shadcn/ui 스타일 가이드를 따릅니다

5. 성능 최적화:


    - 무거운 컴포넌트는 React.lazy()로 코드 스플리팅
    - 불필요한 리렌더링 방지를 위해 메모이제이션 활용
    - 큰 리스트는 가상화 적용 (react-virtual 등)
    - 이미지 최적화는 next/image 컴포넌트 사용

6. 접근성 (A11y):


    - 시맨틱 HTML 요소 사용
    - ARIA 속성 적절히 사용
    - 키보드 네비게이션 지원
    - 충분한 색상 대비 보장

7. 상태 관리:


    - 로컬 상태는 useState/useReducer 사용
    - 전역 상태는 Zustand 사용
    - 폼 상태는 react-hook-form 사용
    - 서버 상태는 React Query 사용

    ---

description:
globs:
alwaysApply: true

---

pattern: "hooks/\*_/_.ts"
rule: |
커스텀 훅 파일은 다음 규칙을 준수합니다:

1. 파일 명명 규칙:


    - camelCase로 작성하며 'use' 접두사 필수 (예: useAuth.ts)
    - 테스트 파일은 훅 이름 + .test.ts (예: useAuth.test.ts)
    - 타입 파일은 훅 이름 + .types.ts (예: useAuth.types.ts)
    - 유틸리티 함수는 별도 파일로 분리 (예: authUtils.ts)

2. 디렉토리 구조:


    - auth/: 인증 관련 훅
    - form/: 폼 관련 훅
    - query/: API 요청 관련 훅
    - store/: 상태 관리 관련 훅
    - ui/: UI 관련 훅
    - utils/: 유틸리티 훅

3. 코드 작성 규칙:


    - 단일 책임 원칙을 준수합니다
    - 입력 매개변수는 객체로 전달 (옵션 패턴)
    - 반환값은 객체로 제공 (구조 분해 할당 용이성)
    - 의존성 배열 규칙 준수 (useEffect, useCallback, useMemo)
    - 조건부 훅 호출 금지 (React 규칙)

4. 타입 정의:


    - 입력 매개변수 인터페이스 정의 (예: UseAuthOptions)
    - 반환값 인터페이스 정의 (예: UseAuthReturn)
    - 제네릭 타입 활용 (재사용성 향상)
    - 타입 가드 함수 적극 활용

5. 에러 처리:


    - try-catch로 에러 처리
    - 에러 상태 포함 (error, isError)
    - 로딩 상태 포함 (isLoading)
    - 적절한 에러 메시지 제공

6. 성능 최적화:


    - 메모이제이션 적절히 활용
    - 불필요한 리렌더링 방지
    - 비동기 작업은 적절한 상태로 관리
    - 캐시 전략 구현 (필요한 경우)

7. 테스트:


    - 주요 시나리오 테스트 케이스 작성
    - 에러 케이스 테스트
    - 비동기 동작 테스트
    - 사이드 이펙트 테스트

    ---

description:
globs:
alwaysApply: true

---

pattern: "lib/\*_/_.ts"
rule: |
유틸리티 함수 파일은 다음 규칙을 준수합니다:

1. 파일 명명 규칙:


    - camelCase로 작성 (예: formatDate.ts, validateInput.ts)
    - 타입 정의 파일은 .types.ts 확장자 사용
    - 상수 파일은 .constants.ts 확장자 사용
    - 테스트 파일은 .test.ts 확장자 사용

2. 디렉토리 구조:


    - api/: API 관련 유틸리티 (axios 인스턴스, API 헬퍼 등)
    - config/: 환경 설정 관련 파일
    - constants/: 상수 정의
    - types/: 공통 타입 정의
    - utils/: 일반 유틸리티 함수
    - validators/: 유효성 검사 함수

3. 함수 작성 규칙:


    - 순수 함수로 작성 (사이드 이펙트 없음)
    - 단일 책임 원칙 준수
    - 명확한 입/출력 타입 정의
    - 함수당 15줄 이내 권장
    - 적절한 JSDoc 주석 작성

4. 타입 정의:


    - 인터페이스/타입은 명확한 이름 사용
    - 재사용 가능한 타입은 types/ 디렉토리에 정의
    - 제네릭 타입 활용
    - 유니온/인터섹션 타입 적절히 활용

5. 상수 관리:


    - 상수는 대문자 스네이크 케이스 사용
    - 관련 상수는 객체로 그룹화
    - 환경 변수는 config 파일에서 관리
    - 매직 넘버 사용 금지

6. API 관련:


    - axios 인스턴스 설정 통일
    - 에러 처리 미들웨어 구현
    - 요청/응답 인터셉터 활용
    - API 응답 타입 정의

7. 유효성 검사:


    - Zod 스키마 활용
    - 재사용 가능한 검증 함수 작성
    - 에러 메시지 일관성 유지
    - 타입 가드 함수 활용

8. 테스트:


    - 단위 테스트 필수 작성
    - 엣지 케이스 테스트
    - 타입 테스트
    - 테스트 커버리지 80% 이상 유지

    ---

description:
globs:
alwaysApply: true

---

pattern: "app/\*_/_.{ts,tsx}"
rule: |
이 디렉토리는 Next.js의 App Router 구조를 따릅니다.

1. 파일 명명 규칙:


    - page.tsx: 라우트의 UI 컴포넌트 (예: app/blog/page.tsx)
    - layout.tsx: 공유 레이아웃 컴포넌트 (예: app/blog/layout.tsx)
    - loading.tsx: 로딩 UI 컴포넌트 (예: app/blog/loading.tsx)
    - error.tsx: 에러 UI 컴포넌트 (예: app/blog/error.tsx)
    - not-found.tsx: 404 페이지 컴포넌트
    - route.ts: API 엔드포인트 (예: app/api/posts/route.ts)
    - template.tsx: 리렌더링이 필요한 레이아웃

2. 디렉토리 구조:


    - (group)/: 라우트 그룹화 (예: app/(auth)/login/page.tsx)
    - [param]/: 동적 라우트 (예: app/posts/[id]/page.tsx)
    - @modal/: 병렬 라우트 (예: app/@modal/login/page.tsx)
    - _components/: 프라이빗 컴포넌트 디렉토리

3. 컴포넌트 규칙:


    - 모든 컴포넌트는 기본적으로 Server Component입니다
    - Client Component가 필요한 경우에만 'use client' 지시문을 사용합니다
    - Client Component는 가능한 한 leaf 컴포넌트에서만 사용합니다
    - 데이터 페칭은 가능한 한 Server Component에서 수행합니다

4. 메타데이터 규칙:


    - metadata 객체나 generateMetadata 함수를 사용합니다
    - 동적 메타데이터는 generateMetadata를 사용합니다
    - robots.txt, sitemap.xml은 app 디렉토리 루트에 위치시킵니다

5. API 라우트 규칙:


    - route.ts 파일에서는 HTTP 메서드별로 함수를 export 합니다
    - 응답은 NextResponse를 사용합니다
    - API 엔드포인트는 RESTful 규칙을 따릅니다
    - 에러 처리는 try-catch로 감싸고 적절한 상태 코드를 반환합니다

6. 성능 최적화:


    - 이미지는 next/image를 사용합니다
    - 폰트는 next/font를 사용합니다
    - 동적 import를 활용한 코드 스플리팅을 적극 활용합니다
    - 가능한 경우 Streaming과 Suspense를 사용합니다

    ---

description:
globs:
alwaysApply: true

---

pattern: "\*_/_.{css,scss}"
rule: |
스타일 관련 파일은 다음 규칙을 준수합니다:

1. Tailwind CSS 사용 규칙:


    - 기본적으로 Tailwind 유틸리티 클래스 사용
    - 커스텀 유틸리티는 tailwind.config.ts에 정의
    - 컴포넌트별 변형은 variants 활용
    - 반응형 디자인은 Tailwind 브레이크포인트 사용
    - 다크모드는 Tailwind 다크모드 클래스 활용

2. CSS 클래스 명명 규칙:


    - kebab-case 사용 (예: header-navigation)
    - BEM 방법론 준수 (필요한 경우)
    - 컴포넌트 스코프 접두사 사용
    - 상태 클래스는 is-* 또는 has-* 접두사
    - 유틸리티 클래스는 u-* 접두사

3. 글로벌 스타일:


    - app/globals.css에 정의
    - CSS 변수 활용 (테마, 색상 등)
    - 리셋 CSS 포함
    - 타이포그래피 기본 스타일
    - 공통 애니메이션

4. 컴포넌트 스타일:


    - 모듈 CSS 대신 Tailwind 사용
    - 복잡한 스타일은 @apply 디렉티브 활용
    - 중첩은 최대 3단계까지만 허용
    - 미디어 쿼리는 Tailwind 브레이크포인트 사용
    - !important 사용 금지

5. 성능 최적화:


    - 사용하지 않는 스타일 제거 (PurgeCSS)
    - CSS 번들 크기 최적화
    - 애니메이션은 transform/opacity 위주로 사용
    - will-change 속성 적절히 사용
    - 중요 렌더링 경로 최적화

6. 접근성:


    - 충분한 색상 대비 (WCAG 2.1)
    - 키보드 포커스 스타일 제공
    - 반응형 폰트 크기
    - 고대비 모드 지원
    - 동작 감소 모드 지원

7. 테마 시스템:


    - CSS 변수 기반 테마 구현
    - 다크모드 지원
    - 색상 팔레트 정의
    - 일관된 간격/크기 시스템
    - 재사용 가능한 그라데이션

8. 애니메이션:


    - Tailwind 애니메이션 클래스 활용
    - 성능 고려 (transform 속성 우선)
    - 사용자 설정 존중 (prefers-reduced-motion)
    - 적절한 타이밍 함수 사용
    - 일관된 전환 효과

    ---

description:
globs:
alwaysApply: true

---

pattern: "\*_/_.{ts,tsx}"
rule: |
TypeScript 파일은 다음 규칙을 준수합니다:

1. 타입 정의 규칙:


    - any 타입 사용 금지 (strict 모드 필수)
    - unknown 타입 활용 (타입 안정성)
    - 명시적인 타입 정의 사용
    - 타입 추론이 명확한 경우는 타입 생략 가능
    - 유니온 타입 활용 (예: type Status = 'idle' | 'loading' | 'success' | 'error')

2. 인터페이스/타입 규칙:


    - 인터페이스는 객체 타입에 사용
    - 타입 별칭은 유니온/인터섹션에 사용
    - 일관된 네이밍 컨벤션 (PascalCase)
    - 제네릭 타입 활용
    - readonly 적극 활용

3. 타입 가드:


    - is 타입 가드 함수 활용
    - instanceof 연산자 활용
    - in 연산자 활용
    - 사용자 정의 타입 가드 작성

4. 유틸리티 타입 활용:


    - Partial<T>: 선택적 프로퍼티
    - Required<T>: 필수 프로퍼티
    - Pick<T, K>: 프로퍼티 선택
    - Omit<T, K>: 프로퍼티 제외
    - Record<K, T>: 키-값 매핑

5. 타입 단언:


    - as 문법 대신 타입 가드 선호
    - non-null 단언은 확실한 경우만 사용
    - const 단언 활용 (as const)
    - 이중 단언 금지

6. 제네릭:


    - 의미 있는 타입 파라미터 이름 사용 (T, U, K, V)
    - 제약 조건 활용 (extends)
    - 기본 타입 지정 (= default)
    - 조건부 타입 활용 (삼항 연산자)

7. 모듈 시스템:


    - import/export 타입 명시
    - 네임스페이스 대신 모듈 사용
    - 순환 참조 금지
    - 배럴 파일 활용 (index.ts)

8. tsconfig 설정:


    - strict: true
    - noImplicitAny: true
    - strictNullChecks: true
    - noUnusedLocals: true
    - noUnusedParameters: true
    - esModuleInterop: true
