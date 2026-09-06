# 전준하 AI 전문가 홈페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** AI 강사·컨설턴트 전준하의 개인 브랜딩 홈페이지를 Next.js + Supabase로 구축하여 강의/컨설팅 문의 유입과 이력 자동 축적이 가능하도록 한다.

**Architecture:** Next.js 14 App Router 기반 정적+동적 하이브리드 사이트. 강의 이력은 Supabase에 저장되어 디스코드 에이전트가 추가/수정 가능. 문의 폼 제출 시 Supabase에 저장되고 Discord Webhook으로 알림 전송. Vercel에 배포.

**Tech Stack:** Next.js 14, Tailwind CSS, Supabase (PostgreSQL + Realtime), Discord Webhook, Vercel

## Global Constraints

- 언어: 한국어 (UI 전체)
- 디자인: 라이트 톤, 따뜻한 색감 — 에밀리 사이트(다크)와 차별화
- 모바일 우선 반응형
- Node.js 20+
- next: 14.x, tailwindcss: 3.x
- Supabase 무료 플랜 기준 설계
- 환경변수: `.env.local` 사용, `.gitignore`에 포함
- 프로젝트 루트: `C:\Users\전준하\personal_plan_jjh\04_ax_consultant\jjh-homepage\`

---

## 파일 구조 전체 맵

```
jjh-homepage/
├── app/
│   ├── layout.tsx              # 전체 레이아웃, 네비게이션
│   ├── page.tsx                # 홈 (Hero + WhyMe + 최근 강의 이력)
│   ├── projects/
│   │   └── page.tsx            # 강의·컨설팅 이력 전체 목록
│   ├── services/
│   │   └── page.tsx            # 서비스 소개 (탭 형식)
│   ├── contact/
│   │   └── page.tsx            # 문의 폼
│   └── api/
│       ├── lectures/
│       │   └── route.ts        # GET /api/lectures (Supabase 조회)
│       └── contact/
│           └── route.ts        # POST /api/contact (저장 + Discord 알림)
├── components/
│   ├── Nav.tsx                 # 상단 네비게이션
│   ├── Footer.tsx              # 하단 푸터
│   ├── Hero.tsx                # 히어로 섹션
│   ├── WhyMe.tsx               # 차별화 포인트 카드
│   ├── LectureCard.tsx         # 강의 이력 카드 (재사용)
│   ├── ServiceTab.tsx          # 서비스 탭 컴포넌트
│   └── ContactForm.tsx         # 문의 폼 (클라이언트 컴포넌트)
├── lib/
│   ├── supabase.ts             # Supabase 클라이언트 초기화
│   └── discord.ts              # Discord Webhook 전송 함수
├── types/
│   └── index.ts                # Lecture, ContactSubmission 타입 정의
├── .env.local                  # 환경변수 (gitignore)
├── .env.example                # 환경변수 템플릿
└── supabase/
    └── schema.sql              # DB 스키마 (lectures, contacts 테이블)
```

---

## Task 1: 프로젝트 초기화 및 환경 설정

**Files:**
- Create: `jjh-homepage/` (프로젝트 루트)
- Create: `jjh-homepage/.env.example`
- Create: `jjh-homepage/supabase/schema.sql`
- Create: `jjh-homepage/types/index.ts`

**Interfaces:**
- Produces: `Lecture` 타입, `ContactSubmission` 타입, DB 스키마

- [ ] **Step 1: Next.js 프로젝트 생성**

```bash
cd "C:\Users\전준하\personal_plan_jjh\04_ax_consultant"
npx create-next-app@14 jjh-homepage --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
cd jjh-homepage
```

- [ ] **Step 2: 추가 패키지 설치**

```bash
npm install @supabase/supabase-js
```

- [ ] **Step 3: 타입 정의 파일 작성**

`types/index.ts`:
```typescript
export type LectureCategory = 'education' | 'consulting' | 'mentoring' | 'medical'

export interface Lecture {
  id: string
  title: string
  organization: string
  date: string        // "2026-07-10" 형식
  category: LectureCategory
  description: string
  participants?: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  organization?: string
  inquiry_type: 'coaching' | 'lecture' | 'medical_consulting' | 'ax_consulting' | 'other'
  message: string
  created_at: string
}
```

- [ ] **Step 4: Supabase 스키마 작성**

`supabase/schema.sql`:
```sql
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
  organization text,
  inquiry_type text not null check (inquiry_type in ('coaching', 'lecture', 'medical_consulting', 'ax_consulting', 'other')),
  message text not null,
  created_at timestamptz default now()
);

-- 강의 이력 샘플 데이터
insert into lectures (title, organization, date, category, description, participants) values
('AI 바이브코딩 실전 워크숍', '자체 개최 (강남)', '2026-07-10', 'education', '비개발자 대상 Claude Code + VS Code 환경 세팅부터 실제 서비스 배포까지', 4),
('바이브코딩 1:1 과외', '국제인공지능윤리협회 이사장', '2026-06-15', 'coaching', '협회 이사장 대상 바이브코딩 개인 과외 진행', 1);
```

- [ ] **Step 5: 환경변수 템플릿 작성**

`.env.example`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

- [ ] **Step 6: .env.local 생성 및 gitignore 확인**

```bash
cp .env.example .env.local
# .env.local에 실제 값 입력 (Supabase 대시보드에서 복사)
```

`.gitignore`에 `.env.local`이 있는지 확인 (create-next-app이 자동 추가함).

- [ ] **Step 7: 커밋**

```bash
git add .
git commit -m "feat: init Next.js project with types and DB schema"
```

---

## Task 2: Supabase 연결 및 API Route 구현

**Files:**
- Create: `lib/supabase.ts`
- Create: `lib/discord.ts`
- Create: `app/api/lectures/route.ts`
- Create: `app/api/contact/route.ts`

**Interfaces:**
- Consumes: `Lecture`, `ContactSubmission` (types/index.ts)
- Produces:
  - `GET /api/lectures` → `Lecture[]`
  - `POST /api/contact` body: `{name, email, organization?, inquiry_type, message}` → `{success: boolean}`

- [ ] **Step 1: Supabase 클라이언트 초기화**

`lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

- [ ] **Step 2: Discord Webhook 함수 작성**

`lib/discord.ts`:
```typescript
export async function sendDiscordNotification(content: string): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
}
```

- [ ] **Step 3: 강의 이력 API Route 작성**

`app/api/lectures/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Lecture } from '@/types'

export async function GET() {
  const { data, error } = await supabase
    .from('lectures')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data as Lecture[])
}
```

- [ ] **Step 4: 문의 폼 API Route 작성**

`app/api/contact/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendDiscordNotification } from '@/lib/discord'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, organization, inquiry_type, message } = body

  if (!name || !email || !inquiry_type || !message) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
  }

  const { error } = await supabase.from('contacts').insert([
    { name, email, organization, inquiry_type, message }
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const typeLabel: Record<string, string> = {
    coaching: '1:1 과외',
    lecture: '기업/기관 강의',
    medical_consulting: '병원 AX 컨설팅',
    ax_consulting: 'AX 컨설팅',
    other: '기타',
  }

  await sendDiscordNotification(
    `📩 **새 문의가 접수됐습니다!**\n` +
    `👤 이름: ${name}\n` +
    `📧 이메일: ${email}\n` +
    `🏢 소속: ${organization || '미입력'}\n` +
    `📋 유형: ${typeLabel[inquiry_type]}\n` +
    `💬 메시지: ${message}`
  )

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 5: 개발 서버로 API 동작 확인**

```bash
npm run dev
# 브라우저에서 http://localhost:3000/api/lectures 접속
# Supabase에 넣은 샘플 데이터 JSON으로 보이면 성공
```

- [ ] **Step 6: 커밋**

```bash
git add lib/ app/api/
git commit -m "feat: add Supabase client and API routes for lectures and contact"
```

---

## Task 3: 공통 레이아웃 (Nav + Footer)

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/Nav.tsx`
- Create: `components/Footer.tsx`

**Interfaces:**
- Produces: 전체 페이지에서 공유하는 상단 네비게이션, 하단 푸터

- [ ] **Step 1: Nav 컴포넌트 작성**

`components/Nav.tsx`:
```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: '홈' },
  { href: '/projects', label: '강의·이력' },
  { href: '/services', label: '서비스' },
  { href: '/contact', label: '문의' },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-stone-800 text-lg tracking-tight">
          전준하
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-stone-100 text-stone-900'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-4 py-1.5 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Footer 컴포넌트 작성**

`components/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className="border-t border-stone-100 mt-24">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-stone-400 text-sm">
          © 2026 전준하. AI 강의·컨설팅 문의환영.
        </div>
        <div className="flex gap-4 text-sm text-stone-400">
          <a href="mailto:jiven924@gmail.com" className="hover:text-stone-700 transition-colors">
            jiven924@gmail.com
          </a>
          <a
            href="https://open.kakao.com/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-700 transition-colors"
          >
            카카오톡 문의
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: layout.tsx 수정**

`app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '전준하 | AI 강의·컨설팅',
  description: '엔지니어·컨설턴트 출신이 가르치는 AI 바이브코딩. 기업 강의, 병원 AX 컨설팅, 1:1 과외.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-stone-50 text-stone-800`}>
        <Nav />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: 브라우저에서 확인**

```bash
npm run dev
# http://localhost:3000 접속
# 상단 Nav, 하단 Footer 보이면 성공
```

- [ ] **Step 5: 커밋**

```bash
git add components/Nav.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: add Nav and Footer layout components"
```

---

## Task 4: Hero + WhyMe 컴포넌트 및 홈 페이지

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/WhyMe.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: 홈페이지 Hero 섹션, WhyMe 카드 6개

- [ ] **Step 1: Hero 컴포넌트 작성**

`components/Hero.tsx`:
```tsx
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
        국제인공지능윤리협회 이사 · AX교육위원회 위원장
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight mb-5">
        현장을 아는 사람이<br />
        <span className="text-amber-600">AI를 가르칩니다</span>
      </h1>
      <p className="text-lg text-stone-500 leading-relaxed mb-8 max-w-2xl">
        삼성전자 엔지니어, 삼정KPMG 컨설턴트, 스타트업 창업자, 병원 조직 운영까지 —
        다양한 현장 경험을 바탕으로 비개발자도 AI로 실제 서비스를 만들 수 있도록 돕습니다.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="px-6 py-3 bg-stone-800 text-white rounded-full font-semibold hover:bg-stone-700 transition-colors"
        >
          강의·컨설팅 문의
        </Link>
        <Link
          href="/projects"
          className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-semibold hover:bg-stone-100 transition-colors"
        >
          강의 이력 보기
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: WhyMe 컴포넌트 작성**

`components/WhyMe.tsx`:
```tsx
const points = [
  {
    icon: '🏭',
    title: '삼성전자 반도체 엔지니어 출신',
    desc: '제조·대기업 현장 프로세스를 몸으로 이해. AI 자동화가 실제로 어디에 적용되는지 이론이 아닌 실무로 설명합니다.',
  },
  {
    icon: '📊',
    title: '삼정KPMG 전략 컨설턴트 출신',
    desc: '다업종 조직·프로세스 분석 방법론 보유. 어떤 업무를 자동화할 수 있는지 컨설팅 관점으로 진단합니다.',
  },
  {
    icon: '🏥',
    title: '의료업계 3년 내부 경험',
    desc: '리팅랩스 CHRO로 7개 병원, 700명 조직 운영. 병원 원장님의 현장을 아는 유일한 AI 강사입니다.',
  },
  {
    icon: '🚀',
    title: 'IT 스타트업 공동창업 경험',
    desc: '야놀자·혜움 등 플랫폼·SaaS 환경에서 직접 일한 경험. 기술과 비즈니스 사이 통역이 가능합니다.',
  },
  {
    icon: '🎓',
    title: '10년 창업 강의·멘토링',
    desc: 'KAIST·고려대·현대자동차·KB국민카드 등 창업 강의 및 멘토링. K-Startup 검수평가위원 활동.',
  },
  {
    icon: '🤖',
    title: '비개발자 출신 AI 전문가',
    desc: '코딩 없이 직접 서비스를 만들며 터득한 노하우. 수강생이 어디서 막히는지 정확히 압니다.',
  },
]

export default function WhyMe() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-100">
      <p className="text-xs font-bold text-stone-400 tracking-widest mb-4">WHY ME</p>
      <h2 className="text-2xl font-black text-stone-900 mb-10">
        왜 전준하에게 배워야 하나요
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {points.map((p) => (
          <div key={p.title} className="bg-white border border-stone-100 rounded-2xl p-5">
            <div className="text-2xl mb-3">{p.icon}</div>
            <h3 className="font-bold text-stone-800 mb-2 text-sm leading-snug">{p.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: 홈 페이지 작성**

`app/page.tsx`:
```tsx
import Hero from '@/components/Hero'
import WhyMe from '@/components/WhyMe'
import { supabase } from '@/lib/supabase'
import { Lecture } from '@/types'
import LectureCard from '@/components/LectureCard'
import Link from 'next/link'

export default async function HomePage() {
  const { data: lectures } = await supabase
    .from('lectures')
    .select('*')
    .order('date', { ascending: false })
    .limit(3)

  return (
    <>
      <Hero />
      <WhyMe />
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-stone-400 tracking-widest mb-2">RECENT WORK</p>
            <h2 className="text-2xl font-black text-stone-900">최근 강의·컨설팅</h2>
          </div>
          <Link href="/projects" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">
            전체 보기 →
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {(lectures as Lecture[])?.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: 브라우저에서 확인**

```bash
npm run dev
# http://localhost:3000
# Hero 섹션, WhyMe 카드 6개, 최근 강의 3개 보이면 성공
```

- [ ] **Step 5: 커밋**

```bash
git add components/Hero.tsx components/WhyMe.tsx app/page.tsx
git commit -m "feat: add Hero, WhyMe sections and home page"
```

---

## Task 5: LectureCard 컴포넌트 및 강의 이력 페이지

**Files:**
- Create: `components/LectureCard.tsx`
- Create: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `Lecture` (types/index.ts)
- Produces: 재사용 가능한 강의 카드, 전체 이력 목록 페이지

- [ ] **Step 1: LectureCard 컴포넌트 작성**

`components/LectureCard.tsx`:
```tsx
import { Lecture, LectureCategory } from '@/types'

const categoryLabel: Record<LectureCategory, string> = {
  education: '강의·워크숍',
  consulting: '컨설팅',
  mentoring: '멘토링',
  medical: '병원 AX',
}

const categoryColor: Record<LectureCategory, string> = {
  education: 'bg-blue-50 text-blue-700',
  consulting: 'bg-amber-50 text-amber-700',
  mentoring: 'bg-green-50 text-green-700',
  medical: 'bg-rose-50 text-rose-700',
}

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-4">
      <div className="sm:w-28 flex-shrink-0">
        <span className={`inline-block text-xs font-bold px-2 py-1 rounded-md ${categoryColor[lecture.category as LectureCategory]}`}>
          {categoryLabel[lecture.category as LectureCategory]}
        </span>
        <p className="text-stone-400 text-xs mt-2">{lecture.date.slice(0, 7)}</p>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-stone-800 mb-1">{lecture.title}</h3>
        <p className="text-stone-500 text-sm mb-1">{lecture.organization}</p>
        <p className="text-stone-400 text-sm leading-relaxed">{lecture.description}</p>
        {lecture.participants && (
          <p className="text-stone-300 text-xs mt-2">{lecture.participants}명 참여</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 강의 이력 전체 페이지 작성**

`app/projects/page.tsx`:
```tsx
import { supabase } from '@/lib/supabase'
import { Lecture, LectureCategory } from '@/types'
import LectureCard from '@/components/LectureCard'

const categoryLabel: Record<LectureCategory, string> = {
  education: '강의·워크숍',
  consulting: '컨설팅',
  mentoring: '멘토링',
  medical: '병원 AX',
}

export default async function ProjectsPage() {
  const { data: lectures } = await supabase
    .from('lectures')
    .select('*')
    .order('date', { ascending: false })

  const categories: LectureCategory[] = ['education', 'consulting', 'mentoring', 'medical']

  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-stone-400 tracking-widest mb-4">WORK</p>
      <h1 className="text-3xl font-black text-stone-900 mb-3">강의·컨설팅 이력</h1>
      <p className="text-stone-500 mb-12">
        바이브코딩 교육부터 기업 AX 컨설팅, 병원 자동화까지 — 진행한 작업들을 기록합니다.
      </p>

      {categories.map((cat) => {
        const items = (lectures as Lecture[])?.filter((l) => l.category === cat)
        if (!items?.length) return null
        return (
          <div key={cat} className="mb-12">
            <h2 className="text-sm font-bold text-stone-400 mb-4 tracking-wide">
              {categoryLabel[cat]}
            </h2>
            <div className="flex flex-col gap-3">
              {items.map((l) => <LectureCard key={l.id} lecture={l} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: 브라우저에서 확인**

```bash
# http://localhost:3000/projects
# 카테고리별로 강의 카드 보이면 성공
```

- [ ] **Step 4: 커밋**

```bash
git add components/LectureCard.tsx app/projects/page.tsx
git commit -m "feat: add LectureCard component and projects page"
```

---

## Task 6: 서비스 페이지

**Files:**
- Create: `components/ServiceTab.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 1: 서비스 페이지 작성 (탭 없이 섹션으로)**

`app/services/page.tsx`:
```tsx
import Link from 'next/link'

const services = [
  {
    id: 'coaching',
    title: '바이브코딩 1:1 과외',
    tag: '개인',
    tagColor: 'bg-blue-50 text-blue-700',
    desc: '비개발자 대상, 본인이 만들고 싶은 서비스를 직접 만들어가는 과정을 함께합니다.',
    targets: ['AI는 쓰지만 바이브코딩을 한 번도 해본 적 없는 분', '업무 자동화 툴을 직접 만들고 싶은 분', '시도해봤지만 원하는 결과가 안 나와서 포기한 분'],
    process: ['현재 상황 및 목표 파악', 'Claude Code + VS Code 환경 세팅', '직접 서비스 제작 및 배포', '이후 지속 과외 가능'],
  },
  {
    id: 'lecture',
    title: '기업·기관 바이브코딩 강의',
    tag: '기업',
    tagColor: 'bg-amber-50 text-amber-700',
    desc: '임직원 대상 AI 바이브코딩 워크숍. 각자 자기 업무를 자동화하는 툴을 직접 만드는 방식으로 진행합니다.',
    targets: ['임직원 AI 역량 강화가 필요한 기업', '업무 자동화를 도입하고 싶은 팀', '외부 강사가 필요한 교육 기관'],
    process: ['사전 인터뷰 — 조직 업무 파악', '맞춤 커리큘럼 설계', '오프라인 워크숍 진행', '사후 Q&A 지원'],
  },
  {
    id: 'medical',
    title: '병원 원장님을 위한 AI 자동화',
    tag: '의료 특화',
    tagColor: 'bg-rose-50 text-rose-700',
    desc: '리팅랩스 CHRO로 7개 병원 현장을 직접 운영한 경험 기반. 병원 업무 중 자동화 가능한 영역을 진단하고 직접 구현합니다.',
    targets: ['반복 업무가 많아 지쳐있는 로컬 병원 원장님', '예약·차트·직원 관리를 자동화하고 싶은 분', 'IT 없이도 나만의 업무 툴을 갖고 싶은 분'],
    process: ['병원 업무 현황 인터뷰', '자동화 가능 영역 진단', '바이브코딩으로 직접 제작', '사용법 교육 및 유지보수'],
  },
  {
    id: 'ax',
    title: 'AX 컨설팅 (기업 AI 전환)',
    tag: '컨설팅',
    tagColor: 'bg-green-50 text-green-700',
    desc: '삼정KPMG 컨설팅 방법론 + AI 실전 경험. 조직의 업무 프로세스를 분석하고 AI 도입 로드맵을 설계합니다.',
    targets: ['AI 도입을 검토 중이지만 어디서부터 시작할지 모르는 기업', 'PI·RPA·AI 자동화 관련 교육이 필요한 기업', '제조·의료·스타트업 등 다업종'],
    process: ['현황 진단 워크숍', '자동화 가능 업무 발굴', 'AI 도입 로드맵 설계', '파일럿 구현 지원'],
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-stone-400 tracking-widest mb-4">SERVICES</p>
      <h1 className="text-3xl font-black text-stone-900 mb-3">무엇을 도와드릴 수 있나요</h1>
      <p className="text-stone-500 mb-16">현장 경험을 바탕으로 실질적인 변화를 만듭니다.</p>

      <div className="flex flex-col gap-8">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-stone-100 rounded-2xl p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className={`inline-block text-xs font-bold px-2 py-1 rounded-md mb-3 ${s.tagColor}`}>
                  {s.tag}
                </span>
                <h2 className="text-xl font-black text-stone-900">{s.title}</h2>
              </div>
            </div>
            <p className="text-stone-500 mb-6 leading-relaxed">{s.desc}</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-stone-400 mb-3 tracking-wide">이런 분께 맞습니다</p>
                <ul className="flex flex-col gap-2">
                  {s.targets.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-stone-600">
                      <span className="text-stone-300 flex-shrink-0">—</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 mb-3 tracking-wide">진행 방식</p>
                <ol className="flex flex-col gap-2">
                  {s.process.map((p, i) => (
                    <li key={p} className="flex gap-2 text-sm text-stone-600">
                      <span className="text-stone-300 flex-shrink-0 font-mono">{i + 1}.</span>{p}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-stone-50">
              <Link
                href={`/contact?type=${s.id}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors"
              >
                문의하기 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 브라우저에서 확인**

```bash
# http://localhost:3000/services
# 4개 서비스 카드 보이면 성공
```

- [ ] **Step 3: 커밋**

```bash
git add app/services/page.tsx
git commit -m "feat: add services page with 4 service cards"
```

---

## Task 7: 문의 폼 페이지

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: ContactForm 클라이언트 컴포넌트 작성**

`components/ContactForm.tsx`:
```tsx
'use client'
import { useState } from 'react'

const inquiryTypes = [
  { value: 'coaching', label: '바이브코딩 1:1 과외', desc: '개인 맞춤 과외' },
  { value: 'lecture', label: '기업·기관 강의 요청', desc: '사내 교육·외부 워크숍' },
  { value: 'medical_consulting', label: '병원 AX 컨설팅', desc: '병원 업무 자동화' },
  { value: 'ax_consulting', label: 'AX 컨설팅', desc: '기업 AI 전환 컨설팅' },
  { value: 'other', label: '기타 협업·제안', desc: '위 항목에 해당 없는 경우' },
]

export default function ContactForm({ defaultType }: { defaultType?: string }) {
  const [selected, setSelected] = useState(defaultType || 'coaching')
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, inquiry_type: selected }),
    })
    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-stone-800 mb-2">문의가 접수됐습니다</h2>
        <p className="text-stone-500">영업일 기준 2~3일 안에 답변드리겠습니다.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold text-stone-700 mb-3">무엇을 도와드릴까요? *</p>
        <div className="flex flex-col gap-2">
          {inquiryTypes.map((t) => (
            <label key={t.value} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${selected === t.value ? 'border-stone-800 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
              <input type="radio" name="type" value={t.value} checked={selected === t.value} onChange={() => setSelected(t.value)} className="mt-0.5" />
              <div>
                <p className="font-semibold text-stone-800 text-sm">{t.label}</p>
                <p className="text-stone-400 text-xs">{t.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-stone-700 block mb-1">이름 *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="홍길동" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400" />
        </div>
        <div>
          <label className="text-sm font-semibold text-stone-700 block mb-1">이메일 *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400" />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-stone-700 block mb-1">소속 (선택)</label>
        <input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="회사·병원·기관명" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400" />
      </div>
      <div>
        <label className="text-sm font-semibold text-stone-700 block mb-1">메시지 *</label>
        <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="어떤 상황인지, 원하시는 것이 무엇인지 간단히 적어주세요. 아직 정리 안 되어도 괜찮습니다." rows={5} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 resize-none" />
      </div>
      {status === 'error' && <p className="text-red-500 text-sm">오류가 발생했습니다. 다시 시도해주세요.</p>}
      <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-700 transition-colors disabled:opacity-50">
        {status === 'loading' ? '전송 중...' : '문의 보내기 →'}
      </button>
      <p className="text-center text-stone-400 text-xs">
        또는 카카오톡으로 빠르게 문의하세요 →{' '}
        <a href="https://open.kakao.com/PLACEHOLDER" className="underline hover:text-stone-600">오픈채팅 바로가기</a>
      </p>
    </form>
  )
}
```

- [ ] **Step 2: 문의 페이지 작성**

`app/contact/page.tsx`:
```tsx
import ContactForm from '@/components/ContactForm'

export default function ContactPage({ searchParams }: { searchParams: { type?: string } }) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-stone-400 tracking-widest mb-4">CONTACT</p>
      <h1 className="text-3xl font-black text-stone-900 mb-3">무엇을 도와드릴까요?</h1>
      <p className="text-stone-500 mb-10">
        강의·컨설팅·과외·협업 제안 모두 환영합니다.<br />
        영업일 기준 2~3일 안에 답변드립니다.
      </p>
      <ContactForm defaultType={searchParams.type} />
    </div>
  )
}
```

- [ ] **Step 3: 브라우저에서 확인**

```bash
# http://localhost:3000/contact
# 유형 선택 → 폼 입력 → 제출 → 완료 메시지 보이면 성공
# Supabase 대시보드에서 contacts 테이블에 데이터 들어왔는지 확인
# Discord 채널에 알림 왔는지 확인
```

- [ ] **Step 4: 커밋**

```bash
git add components/ContactForm.tsx app/contact/page.tsx
git commit -m "feat: add contact form with Supabase storage and Discord webhook"
```

---

## Task 8: Vercel 배포

**Files:**
- Modify: `next.config.js` (필요 시)

- [ ] **Step 1: GitHub 리포지토리 생성 및 푸시**

```bash
git remote add origin https://github.com/joonhajeon/jjh-homepage.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Vercel 프로젝트 연결**

1. vercel.com 접속 → Add New Project
2. GitHub 리포지토리 선택
3. Framework Preset: Next.js (자동 감지)

- [ ] **Step 3: 환경변수 등록**

Vercel 대시보드 → Settings → Environment Variables에 추가:
```
NEXT_PUBLIC_SUPABASE_URL=실제값
NEXT_PUBLIC_SUPABASE_ANON_KEY=실제값
DISCORD_WEBHOOK_URL=실제값
```

- [ ] **Step 4: 배포 확인**

```bash
# Vercel이 자동 빌드 완료 후 제공된 URL 접속
# 모든 페이지 (홈, 강의이력, 서비스, 문의) 정상 동작 확인
```

- [ ] **Step 5: 커스텀 도메인 연결 (선택)**

Vercel → Domains → 원하는 도메인 추가

---

## Self-Review

**Spec coverage 체크:**
- ✅ Hero + WhyMe (Task 4)
- ✅ 강의 이력 — Supabase 기반 동적 (Task 2, 5)
- ✅ 서비스 4종 (Task 6)
- ✅ 문의 폼 + Discord 알림 (Task 7)
- ✅ 병원 특화 서비스 (Task 6)
- ✅ 모바일 반응형 Tailwind (전 Task)
- ✅ 디스코드 에이전트 연동 고려한 Supabase 구조 (Task 2)
- ✅ Vercel 배포 (Task 8)

**미포함 — 추후 개발:**
- 카카오 오픈채팅 실제 링크 (URL 확정 후 Footer·ContactForm에 교체)
- 디스코드 에이전트가 Supabase lectures 테이블에 직접 INSERT하는 봇 (별도 플랜)
- 인사이트/블로그 섹션
