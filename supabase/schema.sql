create table lectures (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organization text not null,
  date date not null,
  category text not null check (category in ('education', 'consulting', 'mentoring', 'medical')),
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
('AI 바이브코딩 실전 워크숍', '자체 개최 (강남)', '2026-07-10', 'education', '비개발자 대상 Claude Code + VS Code 환경 세팅부터 실제 서비스 배포까지', 4),
('바이브코딩 1:1 과외', '국제인공지능윤리협회 이사장', '2026-06-15', 'education', '협회 이사장 대상 바이브코딩 개인 과외 진행', 1),
('고려대 진로 특강', '고려대학교', '2026-03-01', 'education', '고려대 학생 대상 AI 시대 커리어 전략 특강', 80),
('바이브코딩 1:1 과외 (경영진)', '스타트업 대표', '2026-05-20', 'education', '스타트업 대표 대상 바이브코딩 1:1 과외', 1);
