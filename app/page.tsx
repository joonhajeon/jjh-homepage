import Hero from '@/components/Hero'
import WhyMe from '@/components/WhyMe'
import Curriculum from '@/components/Curriculum'
import Books from '@/components/Books'
import LectureCard from '@/components/LectureCard'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture } from '@/types'
import Link from 'next/link'

const sampleLectures: Lecture[] = [
  {
    id: '26',
    title: '업무자동화를 위한 바이브코딩 강의',
    organization: '대기업 임원',
    date: '2026-07-25',
    category: 'education',
    description: '대기업 임원 대상 바이브코딩 1:1 코칭. 실무 자동화 툴 직접 제작 및 조직 내 AI 도입 방향 논의',
    created_at: '',
  },
  {
    id: '4',
    title: '업무자동화를 위한 바이브코딩 강의',
    organization: '스타트업 대표',
    date: '2026-07-20',
    category: 'education',
    description: '스타트업 대표 대상 바이브코딩 1:1 코칭. 주요 데이터 대시보드로 구현',
    created_at: '',
  },
  {
    id: '1',
    title: '업무자동화 바이브코딩 워크숍',
    organization: '직장인 대상',
    date: '2026-07-10',
    category: 'education',
    description: '직장인 대상 업무자동화를 위한 바이브코딩 실습. 최적의 환경 세팅부터 실제 자동화 툴 배포까지',
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
