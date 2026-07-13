create table lectures (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organization text not null,
  date date not null,
  category text not null check (category in ('education', 'consulting', 'medical', 'startup_mentor', 'startup_lecture', 'career_lecture')),
  description text not null,
  participants integer,
  created_at timestamptz default now()
);

create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  organization text,
  inquiry_type text not null check (inquiry_type in ('coaching', 'lecture', 'medical_consulting', 'ax_consulting', 'other')),
  message text not null,
  created_at timestamptz default now()
);

insert into lectures (title, organization, date, category, description, participants) values
('업무자동화 바이브코딩 워크숍', '외부 업체와 연계하여 개최 (강남)', '2026-07-10', 'education', '직장인 대상 업무자동화를 위한 바이브코딩 실습. 최적의 환경 세팅부터 실제 자동화 툴 배포까지', null),
('바이브코딩 1:1 과외', '인공지능 관련 협회 임원진', '2026-06-15', 'education', '협회 임원진 대상 바이브코딩 개인 과외 진행', null),
('고려대 진로 특강', '고려대학교', '2026-03-01', 'career_lecture', '고려대 학생 대상 AI 시대 커리어 전략 특강', null),
('바이브코딩 1:1 과외 (스타트업 대표)', '스타트업 대표', '2026-07-20', 'education', '스타트업 대표 대상 바이브코딩 1:1 과외. 주요 데이터 대시보드로 구현', null),
('바이브코딩 1:1 과외 (대기업 임원)', '대기업 임원', '2026-07-25', 'education', '대기업 임원 대상 바이브코딩 1:1 과외. 실무 자동화 툴 직접 제작 및 조직 내 AI 도입 방향 논의', null),
('기업 대표 대상 바이브코딩 워크숍', '중소기업 대표 모임', '2026-07-28', 'education', '중소기업 대표님들 대상 바이브코딩 워크숍. AI 활용 경영 인사이트 공유 및 업무 자동화 툴 직접 제작 실습', null);
