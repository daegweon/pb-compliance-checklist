# 고객 상담 컴플라이언스 체크리스트 & 메모장

증권사 영업점 직원(PB/RM)이 고객 상담 시 상품별 필수 고지사항을 빠짐없이 안내하고, 상담 내용을 기록·보관할 수 있도록 돕는 웹 앱입니다. 상품별 고지 스크립트는 정적 데이터로 내장하고, 상담 세션(체크리스트·메모)은 Supabase에 저장합니다.

> ⚠️ **보안 주의**: 로그인 기능이 없어 클라이언트에 노출된 Supabase publishable(anon) 키를 아는 사람은 누구나 모든 상담 데이터를 읽고 쓸 수 있습니다. 실제 고객 개인정보를 다루려면 Supabase Auth + RLS(사용자별 접근 제어)를 먼저 추가해야 합니다.

## 주요 기능

- **상담 체크리스트**: 상품유형(펀드/ELS·ELB/채권/신탁)별 필수 확인·고지 항목을 체크리스트로 안내
- **상담 메모장**: 고객별 상담 세션을 만들어 별칭, 상품유형, 메모를 기록하고 언제든 다시 열람
- **고지 스크립트 라이브러리**: 상품유형별 필수 고지 문구 전문을 상담 중이나 별도 화면에서 열람
- **검색**: 대시보드에서 고객명(별칭)으로 상담 세션 검색

## 화면 구성

| 화면 | 설명 |
|---|---|
| 랜딩페이지 | 서비스 소개, 핵심 기능 3가지 하이라이트, 상담 목록으로 진입하는 CTA |
| 상담 목록(대시보드) | 저장된 상담 세션 목록, 검색, 새 상담 시작 |
| 상담 진행 | 고객명 입력, 상품유형 선택, 체크리스트, 고지 스크립트, 메모 작성 |
| 스크립트 라이브러리 | 상품유형별 고지 스크립트 전체 열람 |

## 기술 스택

- 순수 HTML / CSS / JS — 빌드 도구, npm 패키지 없음. 예외적으로 Supabase JS 클라이언트만 CDN `<script>`로 로드
- 데이터 저장: [Supabase](https://supabase.com) (Postgres) `consultation_sessions` 테이블
- 화면 전환: URL 해시 기반 라우팅(`#dashboard`, `#consultation/:id` 등)으로 브라우저 뒤로가기/앞으로가기 지원
- 랜딩페이지 이미지·폰트는 로컬에 자체 호스팅되어 있으나, 상담 데이터 조회·저장에는 인터넷 연결이 필요합니다

## 실행 방법

빌드 과정 없이 바로 열립니다. 다만 상담 데이터는 Supabase에서 불러오므로 인터넷 연결이 필요합니다.

```bash
# 저장소 클론 후
cd project
```

`index.html`을 브라우저로 더블클릭해서 열면 됩니다 (`file://` 직접 실행 가능).

Supabase를 직접 연결하려면 `js/app.js` 상단의 `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`를 본인 프로젝트 값으로 바꾸고, 아래 스키마로 테이블을 생성하세요.

```sql
create table public.consultation_sessions (
  id text primary key,
  customer_alias text not null default '',
  product_type_id text,
  checklist jsonb not null default '{}'::jsonb,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.consultation_sessions enable row level security;

create policy "anon can select sessions" on public.consultation_sessions for select to anon using (true);
create policy "anon can insert sessions" on public.consultation_sessions for insert to anon with check (true);
create policy "anon can update sessions" on public.consultation_sessions for update to anon using (true) with check (true);
```

## 폴더 구조

```
project/
├─ index.html          # 전체 화면(랜딩/대시보드/상담/라이브러리)을 담은 단일 페이지
├─ css/style.css        # Airbnb 스타일 기반 디자인 시스템
├─ js/app.js            # 정적 데이터, 상태관리, 렌더링, Supabase 연동 로직
├─ image/               # 랜딩페이지용 사진 (Unsplash, 무료 라이선스)
├─ font/                # Inter 가변 폰트 (SIL Open Font License, 자체 호스팅)
├─ PRD.md               # 제품 요구사항 정의서
├─ DESIGN.md            # 디자인 시스템(Airbnb 스타일) 토큰 정의
└─ CLAUDE.md            # 이 프로젝트의 기술/작업 규칙
```

## 제외 범위

실제 증권사 시스템(CRM) 연동, 전자서명, 실시간 시세, 로그인/사용자별 권한 관리는 포함하지 않습니다. 체크리스트와 고지 스크립트는 참고용 예시이며, 실제 컴플라이언스 규정 문구가 아닙니다.

## 출처 및 라이선스

- 폰트: [Inter](https://rsms.me/inter/) (SIL Open Font License 1.1)
- 이미지: [Unsplash](https://unsplash.com) (Unsplash License, 무료 사용 가능)
- 디자인 시스템: Airbnb 웹사이트 분석 기반 참고 자료(`DESIGN.md`), Airbnb의 실제 상표·폰트(Cereal/Circular)는 포함하지 않음
