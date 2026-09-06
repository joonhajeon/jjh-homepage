import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture, LectureCategory } from '@/types'
import LectureCard from '@/components/LectureCard'
import ExpandableLectureGroup from '@/components/ExpandableLectureGroup'
import { sampleLectures } from '@/lib/lectures'

const categoryLabel: Record<LectureCategory, string> = {
  education: '강의·워크숍',
  ai_advisory: 'AI활용 코칭 (Executive)',
  consulting: '컨설팅',
  medical: '병원 AX',
  startup_mentor: '창업 관련 평가위원 및 멘토링 이력',
  startup_lecture: '창업 관련 강의 이력',
  career_lecture: '커리어 관련 강의 이력',
}

export default async function ProjectsPage() {
  let lectures: Lecture[] = []

  if (isSupabaseConfigured) {
    const { data } = await getSupabase()
      .from('lectures')
      .select('*')
      .order('date', { ascending: false })
    lectures = (data as Lecture[]) ?? []
  } else {
    lectures = [...sampleLectures].sort((a, b) => b.date.localeCompare(a.date))
  }

  const categories: LectureCategory[] = [
    'education',
    'ai_advisory',
    'consulting',
    'medical',
    'startup_mentor',
    'startup_lecture',
    'career_lecture',
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase mb-4">Work</p>
      <h1 className="text-3xl font-bold text-stone-900 mb-3 tracking-tight">강의·컨설팅 이력</h1>
      <p className="text-stone-500 mb-12 text-sm">
        바이브코딩 교육부터 기업 AX 컨설팅, 병원 자동화까지 — 진행한 작업들을 기록합니다.
      </p>

      {categories.map((cat) => {
        const items = lectures.filter((l) => l.category === cat)
        if (!items.length) return null
        return (
          <div key={cat} className="mb-14">
            <h2 className="text-sm font-semibold text-stone-500 mb-4 pb-2 border-b border-stone-100 uppercase tracking-wide">
              {categoryLabel[cat]}
            </h2>
            {cat === 'ai_advisory' ? (
              <ExpandableLectureGroup items={items} initialCount={3} />
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((l) => <LectureCard key={l.id} lecture={l} />)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
