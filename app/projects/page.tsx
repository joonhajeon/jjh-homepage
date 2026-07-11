import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture, LectureCategory } from '@/types'
import LectureCard from '@/components/LectureCard'

const categoryLabel: Record<LectureCategory, string> = {
  education: '강의·워크숍',
  consulting: '컨설팅',
  mentoring: '멘토링',
  medical: '병원 AX',
}

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
    title: 'AX 전환 컨설팅',
    organization: '협력 기업',
    date: '2026-04-01',
    category: 'consulting',
    description: 'AI 도입 로드맵 설계 및 업무 자동화 가능 영역 진단',
    created_at: '',
  },
  {
    id: '4',
    title: '바이브코딩 1:1 과외 (스타트업 대표)',
    organization: '스타트업 대표',
    date: '2026-05-20',
    category: 'education',
    description: '스타트업 대표 대상 바이브코딩 1:1 과외. 업무 자동화 툴 직접 제작',
    participants: 1,
    created_at: '',
  },
  {
    id: '5',
    title: '병원 원장 AI 자동화 1:1 과외',
    organization: '로컬 병원',
    date: '2026-05-01',
    category: 'medical',
    description: '병원 원장 대상 반복 업무 자동화 니즈 파악 및 바이브코딩 1:1 코칭',
    participants: 1,
    created_at: '',
  },
  {
    id: '6',
    title: '고려대 진로 특강',
    organization: '고려대학교',
    date: '2026-03-01',
    category: 'education',
    description: 'AI 시대 커리어 전략 — 어떻게 포지셔닝할 것인가',
    participants: 80,
    created_at: '',
  },
  {
    id: '7',
    title: 'K-Startup 검수평가위원',
    organization: '중소벤처기업부',
    date: '2021-01-01',
    category: 'mentoring',
    description: '스타트업 사업계획서 검토 및 평가 활동',
    created_at: '',
  },
  {
    id: '8',
    title: '리팅랩스 HR·조직 컨설팅',
    organization: '리팅랩스 (메디컬 헬스케어 그룹)',
    date: '2020-08-01',
    category: 'consulting',
    description: '7개 병원 포함 700명 규모 조직 HR 체계 구축 및 운영. 채용·평가·보상 시스템 설계',
    created_at: '',
  },
]

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

  const categories: LectureCategory[] = ['education', 'consulting', 'mentoring', 'medical']

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
            <div className="flex flex-col gap-3">
              {items.map((l) => <LectureCard key={l.id} lecture={l} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
