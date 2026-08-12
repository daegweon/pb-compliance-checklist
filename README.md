# 고객 상담 컴플라이언스 체크리스트 & 메모장

증권사 영업점 직원(PB/RM)이 고객 상담 시 상품별 필수 고지사항을 빠짐없이 안내하고, 상담 내용을 기록·보관할 수 있도록 돕는 웹 앱입니다. 상품별 고지 스크립트는 정적 데이터로 내장하고, 상담 세션(체크리스트·메모)은 Supabase에 저장합니다. Google 계정으로 로그인하며, 상담 세션은 작성한 본인만 조회·수정할 수 있습니다.

> ℹ️ **참고**: Google 로그인만 지원합니다(이메일/비밀번호 가입은 비활성화). 관리자용 사용자 관리 기능은 없으며, 계정 관련 문의는 Supabase 대시보드에서 직접 확인해야 합니다.

## 주요 기능

- **Google 로그인**: Google 계정으로 로그인. 로그인하지 않은 상태에서 상담 목록/진행/라이브러리 화면에 접근하면 로그인 화면으로 이동
- **사용자별 데이터 격리**: 상담 세션은 작성한 본인만 조회·수정·삭제 가능 (Supabase RLS로 DB 단에서 강제). 고지 스크립트 라이브러리는 로그인한 모든 사용자가 함께 쓰는 공용 자료
- **상담 체크리스트**: 상품유형(펀드/ELS·ELB/채권/신탁)별 필수 확인·고지 항목을 체크리스트로 안내
- **상담 메모장**: 고객별 상담 세션을 만들어 별칭, 상품유형, 메모를 기록하고 언제든 다시 열람
- **고지 스크립트 라이브러리**: 상품유형별 필수 고지 문구 전문을 상담 중이나 별도 화면에서 열람
- **PB 커스텀 스크립트**: 로그인한 사용자가 상품유형별로 자신만의 고지 스크립트를 등록·삭제 (라이브러리 화면 + 상담 화면 스크립트 패널에 함께 노출, 모든 사용자에게 공유됨)
- **상담 상태 관리**: 상담 화면 하단의 "완료" 버튼으로 작성 내용 저장 후 상태를 완료 처리하고 목록으로 이동, "취소" 버튼은 저장 없이 목록으로 이동. 대시보드 목록에서도 체크박스로 완료 여부를 바로 토글 가능하며, 상태뱃지·체크리스트 완료율로도 표시
- **변경 이력(감사 로그)**: 체크리스트 체크/해제, 상태 변경, 세션 생성 이력을 상담 화면의 "변경 이력" 패널에서 확인
- **상담 요약 인쇄**: 상담 화면에서 고객명·상품유형·체크리스트·메모를 인쇄(브라우저 인쇄 기능으로 PDF 저장 겸용)
- **검색/필터**: 대시보드에서 고객명(별칭) 검색 + 상태(진행중/완료/취소) 필터
- **상담 내역 삭제**: 대시보드 각 세션 행에서 확인 절차를 거쳐 완전 삭제 (연결된 변경 이력도 함께 삭제됨)
- **스크롤 애니메이션**: 랜딩페이지의 기능 카드·클로징 섹션이 스크롤로 화면에 들어올 때 서서히 나타남 (라이브러리 없이 IntersectionObserver로 구현)
- **다크모드**: 헤더의 토글 버튼으로 랜딩·대시보드·상담·라이브러리 전 화면에서 라이트/다크 테마 전환, 최초 접속 시 시스템 설정을 따르고 이후 선택은 기기에 저장되어 유지됨
- **대시보드 요약 통계**: 오늘 상담 건수, 이번 주 완료율, 진행중 상담 건수, 상품유형별 분포를 목록 상단 카드로 표시
- **CSV 내보내기**: 현재 검색/상태 필터가 적용된 상담 목록을 엑셀에서 바로 열리는 CSV 파일로 다운로드

## 화면 구성

| 화면 | 설명 |
|---|---|
| 랜딩페이지 | 서비스 소개, 핵심 기능 3가지 하이라이트, 상담 목록으로 진입하는 CTA (로그인 여부와 무관하게 열람 가능) |
| 로그인 | "Google로 로그인" 버튼, 오류 메시지 |
| 상담 목록(대시보드) | 요약 통계 카드(오늘 상담·이번 주 완료율·진행중 건수·상품유형별 분포), 본인이 작성한 상담 세션 목록(상태뱃지·완료율·완료 체크박스 포함), 검색, 상태 필터, 새 상담 시작, 상담 내역 삭제, CSV 내보내기 |
| 상담 진행 | 고객명 입력, 상품유형 선택, 체크리스트, 고지 스크립트, 메모 작성, 변경 이력 조회, 요약 인쇄, 화면 하단의 취소/완료 버튼 |
| 스크립트 라이브러리 | 상품유형별 고지 스크립트 전체 열람 + 로그인 사용자 공용 커스텀 스크립트 등록/삭제 |

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

Supabase를 직접 연결하려면 `js/app.js` 상단의 `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`를 본인 프로젝트 값으로 바꾸고, Authentication → Providers에서 **Google** provider를 켜고 Google Cloud Console에서 발급한 Client ID/Secret을 등록한 뒤(Authorized redirect URI는 `https://<project-ref>.supabase.co/auth/v1/callback`), Authentication → URL Configuration의 Redirect URLs에 실제 배포 도메인을 추가하세요. 그다음 아래 스키마로 테이블을 생성하세요.

```sql
create table public.consultation_sessions (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  customer_alias text not null default '',
  product_type_id text,
  checklist jsonb not null default '{}'::jsonb,
  notes text not null default '',
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.consultation_sessions enable row level security;

-- 로그인한 본인이 작성한 세션만 조회/수정/삭제 가능
create policy "users can select own sessions" on public.consultation_sessions for select to authenticated using (user_id = auth.uid());
create policy "users can insert own sessions" on public.consultation_sessions for insert to authenticated with check (user_id = auth.uid());
create policy "users can update own sessions" on public.consultation_sessions for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users can delete own sessions" on public.consultation_sessions for delete to authenticated using (user_id = auth.uid());

-- 감사 로그: 체크리스트 변경, 상태 변경, 세션 생성 이력
create table public.session_audit_log (
  id bigint generated always as identity primary key,
  session_id text not null references public.consultation_sessions(id) on delete cascade,
  event_type text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.session_audit_log enable row level security;

-- 세션 소유권을 통해 간접적으로 접근을 제한 (본인 세션의 로그만 조회/기록 가능)
create policy "users can select own session audit log" on public.session_audit_log for select to authenticated
  using (exists (select 1 from public.consultation_sessions cs where cs.id = session_audit_log.session_id and cs.user_id = auth.uid()));
create policy "users can insert own session audit log" on public.session_audit_log for insert to authenticated
  with check (exists (select 1 from public.consultation_sessions cs where cs.id = session_audit_log.session_id and cs.user_id = auth.uid()));

-- 로그인 사용자가 함께 쓰는 공용 커스텀 고지 스크립트 (소유자 구분 없음)
create table public.custom_scripts (
  id text primary key,
  product_type_id text not null,
  title text not null,
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.custom_scripts enable row level security;

create policy "authenticated can select custom scripts" on public.custom_scripts for select to authenticated using (true);
create policy "authenticated can insert custom scripts" on public.custom_scripts for insert to authenticated with check (true);
create policy "authenticated can update custom scripts" on public.custom_scripts for update to authenticated using (true) with check (true);
create policy "authenticated can delete custom scripts" on public.custom_scripts for delete to authenticated using (true);
```

> 참고: 상담 세션을 삭제하면 `session_audit_log`의 관련 이력도 `on delete cascade`로 함께 삭제되어 복구할 수 없습니다. 감사 이력을 남기고 싶다면 삭제 대신 상태를 "취소"로 변경하는 방법도 있습니다. 로그인 도입 이전에 만들어진 데이터는 `user_id`가 없어 어떤 계정으로도 조회되지 않습니다.

## 폴더 구조

```
project/
├─ index.html          # 전체 화면(랜딩/대시보드/상담/라이브러리)을 담은 단일 페이지
├─ css/style.css        # Airbnb 스타일 기반 디자인 시스템
├─ js/app.js            # 정적 데이터, 상태관리, 렌더링, Supabase 연동 로직
├─ image/               # 랜딩페이지용 사진 (Unsplash, 무료 라이선스)
├─ font/                # Pretendard 가변 폰트 (SIL Open Font License, 자체 호스팅)
├─ PRD.md               # 제품 요구사항 정의서
├─ DESIGN.md            # 디자인 시스템(Airbnb 스타일) 토큰 정의
└─ CLAUDE.md            # 이 프로젝트의 기술/작업 규칙
```

## 제외 범위

실제 증권사 시스템(CRM) 연동, 전자서명, 실시간 시세는 포함하지 않습니다. 로그인은 Google 계정 방식만 지원하며 이메일/비밀번호 가입, 다른 소셜 로그인, 관리자용 사용자 관리 기능은 없습니다. 체크리스트와 고지 스크립트는 참고용 예시이며, 실제 컴플라이언스 규정 문구가 아닙니다.

## 출처 및 라이선스

- 폰트: [Pretendard](https://github.com/orioncactus/pretendard) (SIL Open Font License 1.1) — 한글·영문을 함께 깔끔하게 지원하기 위해 Inter에서 교체
- 이미지: [Unsplash](https://unsplash.com) (Unsplash License, 무료 사용 가능)
- 디자인 시스템: Airbnb 웹사이트 분석 기반 참고 자료(`DESIGN.md`), Airbnb의 실제 상표·폰트(Cereal/Circular)는 포함하지 않음
