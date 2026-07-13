import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture, LectureCategory } from '@/types'
import LectureCard from '@/components/LectureCard'

const categoryLabel: Record<LectureCategory, string> = {
  education: '강의·워크숍',
  consulting: '컨설팅',
  medical: '병원 AX',
  startup_mentor: '창업 관련 평가위원 및 멘토링 이력',
  startup_lecture: '창업 관련 강의 이력',
  career_lecture: '커리어 관련 강의 이력',
}

const sampleLectures: Lecture[] = [
  {
    id: '1',
    title: '업무자동화 바이브코딩 워크숍',
    organization: '외부 업체와 연계하여 개최 (강남)',
    date: '2026-07-10',
    category: 'education',
    description: '직장인 대상 업무자동화를 위한 바이브코딩 실습. 최적의 환경 세팅부터 실제 자동화 툴 배포까지',
    created_at: '',
  },
  {
    id: '2',
    title: '바이브코딩 1:1 과외',
    organization: '인공지능 관련 협회 임원진',
    date: '2026-06-15',
    category: 'education',
    description: '협회 임원진 대상 바이브코딩 개인 과외 진행. Claude Code + VS Code 실습 중심',
    created_at: '',
  },
  {
    id: '3',
    title: 'AX 전환 컨설팅',
    organization: '협력 기업',
    date: '2026-06-01',
    category: 'consulting',
    description: 'AI 도입 로드맵 설계 및 업무 자동화 가능 영역 진단',
    created_at: '',
  },
  {
    id: '4',
    title: '바이브코딩 1:1 과외 (스타트업 대표)',
    organization: '스타트업 대표',
    date: '2026-07-20',
    category: 'education',
    description: '스타트업 대표 대상 바이브코딩 1:1 과외. 주요 데이터 대시보드로 구현',
    created_at: '',
  },
  {
    id: '27',
    title: '기업 대표 대상 바이브코딩 워크숍',
    organization: '중소기업 대표 모임',
    date: '2026-07-28',
    category: 'education',
    description: '중소기업 대표님들 대상 바이브코딩 워크숍. AI 활용 경영 인사이트 공유 및 업무 자동화 툴 직접 제작 실습',
    created_at: '',
  },
  {
    id: '26',
    title: '바이브코딩 1:1 과외 (대기업 임원)',
    organization: '대기업 임원',
    date: '2026-07-25',
    category: 'education',
    description: '대기업 임원 대상 바이브코딩 1:1 과외. 실무 자동화 툴 직접 제작 및 조직 내 AI 도입 방향 논의',
    created_at: '',
  },
  {
    id: '5',
    title: '병원 원장 AI 자동화 1:1 과외',
    organization: '로컬 병원',
    date: '2026-05-01',
    category: 'medical',
    description: '병원 원장 대상 반복 업무 자동화 니즈 파악 및 바이브코딩 1:1 코칭',
    created_at: '',
  },
  {
    id: '9',
    title: '업무자동화 컨설팅',
    organization: '논술 학원',
    date: '2026-07-15',
    category: 'consulting',
    description: '워크플로우 분석 및 업무자동화 영역 도출, 바이브코딩 교육',
    created_at: '',
  },
  {
    id: '10',
    title: '경영컨설팅 (조직·전략·HR)',
    organization: '삼정KPMG (Human Consulting Group)',
    date: '2011-08-01',
    category: 'consulting',
    description: '항공·정유·건설·이동통신 등 다산업 조직·전략·성과관리 컨설팅 수행 (EIS 설계, 임금피크제 검토, 신사업 조직개편 등)',
    created_at: '',
  },
  {
    id: '11',
    title: '조직 및 전략 컨설팅',
    organization: '피플앤매니지먼트 (컨설팅&교육 본부)',
    date: '2014-09-01',
    category: 'consulting',
    description: '공유오피스 시장진입 전략, 울산시 홍보·마케팅 전략, 중소기업 조직운영체계 정립 등 조직·전략 컨설팅 수행',
    created_at: '',
  },
  {
    id: '7',
    title: 'K-Startup 검수평가위원',
    organization: '중소벤처기업부',
    date: '2021-01-01',
    category: 'startup_mentor',
    description: '스타트업 사업계획서 검토 및 평가 활동',
    created_at: '',
  },
  {
    id: '12',
    title: '한-아세안 AI 개발·창업 경진대회 결과평가',
    organization: '한-아세안 AI 개발·창업 경진대회',
    date: '2025-09-01',
    category: 'startup_mentor',
    description: 'AI 개발·창업 경진대회 개최·운영 대행 용역 결과평가 (연차평가·비R&D)',
    created_at: '',
  },
  {
    id: '13',
    title: '사내벤처 육성 과정 전문위원',
    organization: '현대자동차',
    date: '2018-03-01',
    category: 'startup_mentor',
    description: '사내벤처 육성 프로그램 전문위원으로 사업성 검토 및 멘토링',
    created_at: '',
  },
  {
    id: '14',
    title: '신사업팀 멘토링',
    organization: 'KB국민카드',
    date: '2020-05-01',
    category: 'startup_mentor',
    description: '신사업팀 대상 3개 프로젝트 멘토링 수행',
    created_at: '',
  },
  {
    id: '15',
    title: '고려대 캠퍼스 CEO 기업가정신 특강',
    organization: '고려대학교',
    date: '2014-10-24',
    category: 'startup_lecture',
    description: '기업가정신·창업사례 특강 (90분)',
    created_at: '',
  },
  {
    id: '16',
    title: '창업 교육',
    organization: '서울과학기술대학교',
    date: '2017-01-01',
    category: 'startup_lecture',
    description: '팀빌딩과 기업가치 / 창업 교육',
    created_at: '',
  },
  {
    id: '17',
    title: '사회적기업MBA 특강',
    organization: 'KAIST 경영대학',
    date: '2014-01-01',
    category: 'startup_lecture',
    description: '사회적기업MBA 학생 대상 자기개발·동기부여·창업 특강',
    created_at: '',
  },
  {
    id: '18',
    title: 'Start-up NEST 프로그램 강의',
    organization: '신용보증기금',
    date: '2018-01-01',
    category: 'startup_lecture',
    description: '스타트업 경영에 대한 이해 강의',
    created_at: '',
  },
  {
    id: '19',
    title: '오픈이노베이션 강의',
    organization: '인천광역시',
    date: '2020-01-01',
    category: 'startup_lecture',
    description: '스타트업 운영 네비게이션 주제 강의',
    created_at: '',
  },
  {
    id: '6',
    title: '고려대 진로 특강',
    organization: '고려대학교',
    date: '2026-03-01',
    category: 'career_lecture',
    description: 'AI 시대 커리어 전략 — 어떻게 포지셔닝할 것인가',
    created_at: '',
  },
  {
    id: '20',
    title: '경력개발센터 취업컨설턴트',
    organization: '서울대학교 경력개발센터',
    date: '2018-09-01',
    category: 'career_lecture',
    description: '취업컨설턴트로 2년간 정규 활동 (주 2회, 회당 3명 상담)',
    created_at: '',
  },
  {
    id: '21',
    title: '대학원생 취업캠프 특강',
    organization: '서울대학교 공과대학',
    date: '2018-06-01',
    category: 'career_lecture',
    description: '스스로 그려보는 커리어 디자인 — 대학원생 취업캠프 특강',
    created_at: '',
  },
  {
    id: '22',
    title: '취업지원센터 특강',
    organization: '차의과학대학교',
    date: '2019-05-01',
    category: 'career_lecture',
    description: '4차산업과 진로에 대한 이해 (4회 연속 특강)',
    created_at: '',
  },
  {
    id: '23',
    title: 'SKK GSB 진로 상담 특강',
    organization: '성균관대학교 SKK GSB',
    date: '2015-10-30',
    category: 'career_lecture',
    description: '직장인 진로 상담 특강',
    created_at: '',
  },
  {
    id: '24',
    title: '진로·산업 강의',
    organization: '인하대학교',
    date: '2018-12-08',
    category: 'career_lecture',
    description: '취업공부(자기소개서·면접 준비)',
    created_at: '',
  },
  {
    id: '25',
    title: '직장인 커리어 특강',
    organization: '한국커리어코치협회',
    date: '2019-01-01',
    category: 'career_lecture',
    description: '직장인 직업·퇴사 생각정리',
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

  const categories: LectureCategory[] = [
    'education',
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
            <div className="flex flex-col gap-3">
              {items.map((l) => <LectureCard key={l.id} lecture={l} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
