create table lectures (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organization text not null,
  date date not null,
  category text not null check (category in ('education', 'ai_advisory', 'consulting', 'medical', 'startup_mentor', 'startup_lecture', 'career_lecture')),
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
  inquiry_type text not null check (inquiry_type in ('coaching', 'ai_advisory', 'lecture', 'medical_consulting', 'ax_consulting', 'other')),
  message text not null,
  created_at timestamptz default now()
);

insert into lectures (title, organization, date, category, description, participants) values
('업무자동화 바이브코딩 워크숍', '직장인 대상', '2026-07-10', 'education', '직장인 대상 업무자동화를 위한 바이브코딩 실습. 최적의 환경 세팅부터 실제 자동화 툴 배포까지', null),
('AI활용 능력 고도화 강의', '직장인 대상', '2026-08-01', 'education', '직장인 대상 AI활용 능력을 1단계에서 3단계로 높이는 강의 및 실습. AI활용 고도화를 위한 환경 셋팅', null),
('바이브코딩 강의, 개발에 대한 이해', '인공지능 관련 협회 임원진', '2026-06-15', 'ai_advisory', '협회 임원진 대상 바이브코딩 개인 코칭 진행', null),
('고려대 진로 특강', '고려대학교', '2026-03-01', 'career_lecture', '고려대 학생 대상 AI 시대 커리어 전략 특강', null),
('업무자동화를 위한 바이브코딩 강의', '스타트업 대표', '2026-07-20', 'ai_advisory', '스타트업 대표 대상 바이브코딩 1:1 코칭. 주요 데이터 대시보드로 구현', null),
('업무자동화를 위한 바이브코딩 강의', '대기업 임원', '2026-07-25', 'ai_advisory', '대기업 임원 대상 바이브코딩 1:1 코칭. 실무 자동화 툴 직접 제작 및 조직 내 AI 도입 방향 논의', null);
