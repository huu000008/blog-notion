---

## 주요 기술 스택

- **Next.js 15+** (App Router, Server/Client Component, Suspense)
- **React 19**
- **shadcn/ui** (Radix UI 기반, 커스텀 가능)
- **Tailwind CSS 4**
- **React Query** (데이터 패칭/캐싱/무한 스크롤)
- **Zod** (스키마/타입 검증)
- **React Hook Form** (폼 상태 관리)
- **Notion API** (`@notionhq/client`)
- **next-themes** (다크/라이트 모드)
- **Lucide Icons**

---

## 주요 기능

### 1. 블로그 메인/목록/검색

- 태그/정렬/검색/무한스크롤 지원
- `src/components/features/blog/PostList.tsx`  
  → React Query + Intersection Observer로 무한 스크롤 구현

### 2. 포스트 상세

- Notion DB에서 실시간 fetch, 목차 자동 추출, 코드 하이라이트, 반응형 레이아웃
- `src/app/blog/[slug]/page.tsx`  
  → Notion recordMap fetch, 목차/본문 분리 렌더

### 3. UI/UX

- shadcn/ui 기반 Skeleton, Card, Dialog, Command 등 활용
- 다크/라이트 모드 완벽 지원 (next-themes, CSS 변수)
- 접근성(A11y) 및 반응형 최적화

### 4. Notion 연동

- `src/lib/notion.ts`  
  → 게시글/태그/검색/목차 등 Notion DB와 완전 연동  
  → unstable_cache로 SSR/ISR/CSR 모두 최적화

---

## 개발 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

- 기본 주소: [http://localhost:3000](http://localhost:3000)
- 환경변수: `.env`에 Notion API 키, DB ID 등 필요

---

## 커스텀/확장 가이드

- **UI 커스텀**: `components/ui/` 및 Tailwind 유틸리티 활용
- **글/태그/검색 로직**: `lib/notion.ts` 참고
- **다크모드/테마**: `components/theme/ThemeProvider.tsx`, `globals.css`, `variables.css`
- **SEO/메타데이터**: 각 라우트의 `metadata`/`generateMetadata` 활용

---

## 라이선스

MIT

---

**문의/기여**

- [조혁래 GitHub](https://github.com/huu000008)
