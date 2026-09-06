import Hero from '@/components/Hero'
import WhyMe from '@/components/WhyMe'
import Curriculum from '@/components/Curriculum'
import Books from '@/components/Books'
import LectureCard from '@/components/LectureCard'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture } from '@/types'
import { sampleLectures as allLectures } from '@/lib/lectures'
import Link from 'next/link'

const aiAdvisoryCount = allLectures.filter((l) => l.category === 'ai_advisory').length

const vibeCodingCurriculum = {
  title: '바이브코딩 완성 과정',
  subtitle: '비개발자가 실제 서비스를 배포까지 완성하는 하루 과정',
  badges: [
    { value: '6시간', label: '주말 정규' },
    { value: '4시간', label: '평일 압축' },
  ],
  parts: [
    {
      num: 'Part 1–2',
      title: '바이브코딩이란?',
      desc: '비개발자가 왜 막히는지 진짜 이유 3가지 진단. AI로 서비스를 만드는 개발 생태계 전체 지도 이해.',
    },
    {
      num: 'Part 3',
      title: '첫 서비스 만들기',
      desc: '구글 AI 스튜디오로 업무 타이머 직접 제작. 브라우저 기반 바이브코딩 체험 및 한계 확인.',
    },
    {
      num: 'Part 4–5',
      title: '개발 환경 구축',
      desc: 'VS Code, Claude Code, GitHub 전체 세팅. "한 번만 세팅하면 평생 쓴다" — 실습 완료 후 즉시 활용 가능.',
    },
    {
      num: 'Part 6',
      title: '터미널 바이브코딩',
      desc: 'Claude Code로 같은 서비스 재제작. AI가 내 컴퓨터 폴더에 직접 접근해 파일을 만들고 수정하는 방식 체험.',
    },
    {
      num: 'Part 7',
      title: '하네스 엔지니어링',
      desc: '슈퍼파워 스킬 적용 — 같은 프롬프트, 같은 AI인데 결과가 달라지는 이유 직접 비교. PRD 자동 작성 포함.',
    },
    {
      num: 'Part 8',
      title: '실전 서비스 완성',
      desc: '랜딩페이지 → 멀티페이지 → 백엔드 → DB(Supabase) → 어드민까지 5단계 완주. API 키 발급·연동 실습.',
    },
  ],
  footerTitle: '기업·단체 출장 강의 가능',
  footerDesc: '팀 규모·목적에 맞춰 커리큘럼 조정. 실습 위주 구성.',
}

const aiCoachingCurriculum = {
  eyebrow: 'Executive AI Advisory',
  title: 'AI활용 코칭',
  subtitle: '지금 하는 업무에 AI를 실제로 붙이는 1:1 맞춤 코칭',
  badges: [
    { value: '3시간', label: '스탠다드' },
    { value: '6시간', label: '심화 확장' },
  ],
  parts: [
    {
      num: 'Part 1',
      title: 'AI 활용 레벨 진단',
      desc: '지금 내 AI 사용은 6단계 중 몇 단계인지 진단. 실제 업무·니즈 사전 인터뷰로 코칭 방향을 설계.',
    },
    {
      num: 'Part 2',
      title: '왜 아직 복붙만 하고 있을까',
      desc: '비개발자가 AI를 내 컴퓨터에 못 붙이는 이유 3가지. 서비스·자동화의 4요소(프론트엔드·백엔드·DB·어드민) 개념 정리.',
    },
    {
      num: 'Part 3',
      title: '나만의 AI 업무환경 세팅',
      desc: '음성입력, VS Code, Git, Claude Code·Gemini, 지메일·캘린더 커넥터까지 한 번에 설치. 한 번 세팅하면 계속 쓰는 개인 워크스테이션.',
    },
    {
      num: 'Part 4',
      title: '흩어진 파일, AI에게 맡기기',
      desc: '다운로드·업무 폴더를 AI가 분석해 정리안을 제안하고 실행까지. 로컬 연동을 몸으로 체감하는 첫 실습.',
    },
    {
      num: 'Part 5',
      title: '내 데이터로 보고서·대시보드 자동화',
      desc: '재무·강의·연구 등 실제 업무 파일을 폴더째 연결해 분석. 구글 문서·스프레드시트·프레젠테이션으로 바로 산출.',
    },
    {
      num: 'Part 6',
      title: '나만의 말투를 학습시키다',
      desc: '직접 쓴 글 10~20개를 AI에게 학습시켜 내 스타일 그대로 써주는 개인화 스킬(.md) 제작.',
    },
    {
      num: 'Part 7',
      title: '서비스 아이디어 미리 만들어보기',
      desc: '업무 아이디어를 실제 프로토타입으로 구체화하는 바이브코딩 맛보기. 더 깊이 원하면 [바이브코딩 완성 과정]으로 연결.',
    },
    {
      num: 'Part 8',
      title: '다음 스텝 로드맵',
      desc: '세팅한 체계를 실제로 써본 뒤 다음 우선순위를 함께 정하는 후속 코칭 설계.',
    },
  ],
  footerTitle: '임원·대표·교수 등 1:1 맞춤 진행',
  footerDesc: '업무 데이터와 니즈에 맞춰 파트 순서·비중 조정. 실제 업무 폴더로 직접 실습.',
  footerHref: '/contact?type=ai_advisory',
  footerLabel: '코칭 문의하기',
}

const stats = [
  { num: '17년', label: '총 경력' },
  { num: `${aiAdvisoryCount}+`, label: 'Executive AI 코칭' },
  { num: '700+', label: '컨설팅·상담' },
  { num: '7개', label: '병원 현장 경험' },
  { num: '5개+', label: '주요 대학 강의' },
]

export default async function HomePage() {
  let lectures: Lecture[] = []

  if (isSupabaseConfigured) {
    const { data } = await getSupabase()
      .from('lectures')
      .select('*')
      .order('date', { ascending: false })
      .limit(3)
    lectures = (data as Lecture[]) ?? []
  } else {
    lectures = [...allLectures].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  }

  return (
    <>
      <Hero />

      <div className="bg-stone-900">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-emerald-400 tracking-tight">{s.num}</p>
              <p className="text-stone-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <WhyMe />

      <Curriculum {...vibeCodingCurriculum} />

      <Curriculum {...aiCoachingCurriculum} />

      <Books />

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-stone-100">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase mb-2">Recent Work</p>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">최근 강의·컨설팅</h2>
          </div>
          <Link href="/projects" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            전체 보기 →
          </Link>
        </div>
        {lectures.length > 0 ? (
          <div className="flex flex-col gap-3">
            {lectures.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>
        ) : (
          <p className="text-stone-400 text-sm">Supabase 연결 후 강의 이력이 표시됩니다.</p>
        )}
      </section>
    </>
  )
}
