import Hero from '@/components/Hero'
import WhyMe from '@/components/WhyMe'
import Curriculum from '@/components/Curriculum'
import LectureCard from '@/components/LectureCard'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture } from '@/types'
import Link from 'next/link'

const sampleLectures: Lecture[] = [
  {
    id: '1',
    title: 'AI 바이브코딩 실전 워크숍',
    organization: '자체 개최 (강남)',
    date: '2026-07-10',
    category: 'education',
    description: '비개발자 대상 Claude Code + VS Code 환경 세팅부터 실제 서비스 배포까지',
    participants: 4,
    created_at: '',
  },
  {
    id: '2',
    title: '바이브코딩 1:1 과외',
    organization: '국제인공지능윤리협회 이사장',
    date: '2026-06-15',
    category: 'education',
    description: '협회 이사장 대상 바이브코딩 개인 과외 진행. Claude Code + VS Code 실습 중심',
    participants: 1,
    created_at: '',
  },
  {
    id: '3',
    title: '바이브코딩 1:1 과외 (스타트업 대표)',
    organization: '스타트업 대표',
    date: '2026-05-20',
    category: 'education',
    description: '스타트업 대표 대상 바이브코딩 1:1 과외. 업무 자동화 툴 직접 제작',
    participants: 1,
    created_at: '',
  },
]

const stats = [
  { num: '17년', label: '총 경력' },
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
    lectures = sampleLectures
  }

  return (
    <>
      <Hero />

      <div className="bg-stone-900">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-emerald-400 tracking-tight">{s.num}</p>
              <p className="text-stone-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <WhyMe />

      <Curriculum />

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
