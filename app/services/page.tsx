import Link from 'next/link'

const services = [
  {
    id: 'coaching',
    title: '바이브코딩 1:1 과외',
    tag: '개인',
    tagColor: 'bg-emerald-50 text-emerald-700',
    desc: '비개발자 대상, 본인이 만들고 싶은 서비스를 직접 만들어가는 과정을 함께합니다.',
    targets: [
      'AI는 쓰지만 바이브코딩을 한 번도 해본 적 없는 분',
      '업무 자동화 툴을 직접 만들고 싶은 분',
      '시도해봤지만 원하는 결과가 안 나와서 포기한 분',
    ],
    process: ['현재 상황 및 목표 파악', 'Claude Code + VS Code 환경 세팅', '직접 서비스 제작 및 배포', '이후 지속 과외 가능'],
  },
  {
    id: 'lecture',
    title: '기업·기관 바이브코딩 강의',
    tag: '기업',
    tagColor: 'bg-amber-50 text-amber-700',
    desc: '임직원 대상 AI 바이브코딩 워크숍. 각자 자기 업무를 자동화하는 툴을 직접 만드는 방식으로 진행합니다.',
    targets: [
      '임직원 AI 역량 강화가 필요한 기업',
      '업무 자동화를 도입하고 싶은 팀',
      '외부 강사가 필요한 교육 기관',
    ],
    process: ['사전 인터뷰 — 조직 업무 파악', '맞춤 커리큘럼 설계', '오프라인 워크숍 진행', '사후 Q&A 지원'],
  },
  {
    id: 'medical_consulting',
    title: '병원 원장님을 위한 AI 자동화',
    tag: '의료 특화',
    tagColor: 'bg-rose-50 text-rose-700',
    desc: '리팅랩스 CHRO로 7개 병원 현장을 직접 운영한 경험 기반. 병원 업무 중 자동화 가능한 영역을 진단하고 직접 구현합니다.',
    targets: [
      '반복 업무가 많아 지쳐있는 로컬 병원 원장님',
      '예약·차트·직원 관리를 자동화하고 싶은 분',
      'IT 없이도 나만의 업무 툴을 갖고 싶은 분',
    ],
    process: ['병원 업무 현황 인터뷰', '자동화 가능 영역 진단', '바이브코딩으로 직접 제작', '사용법 교육 및 유지보수'],
  },
  {
    id: 'ax_consulting',
    title: 'AX 컨설팅 (기업 AI 전환)',
    tag: '컨설팅',
    tagColor: 'bg-blue-50 text-blue-700',
    desc: '삼정KPMG 컨설팅 방법론 + AI 실전 경험. 조직의 업무 프로세스를 분석하고 AI 도입 로드맵을 설계합니다.',
    targets: [
      'AI 도입을 검토 중이지만 어디서부터 시작할지 모르는 기업',
      'PI·RPA·AI 자동화 관련 교육이 필요한 기업',
      '제조·의료·스타트업 등 다업종',
    ],
    process: ['현황 진단 워크숍', '자동화 가능 업무 발굴', 'AI 도입 로드맵 설계', '파일럿 구현 지원'],
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-4">Services</p>
      <h1 className="text-4xl font-black text-stone-900 mb-3 tracking-tight">무엇을 도와드릴 수 있나요</h1>
      <p className="text-stone-500 mb-16 font-medium">현장 경험을 바탕으로 실질적인 변화를 만듭니다.</p>

      <div className="flex flex-col gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-stone-100 rounded-xl p-7">
            <span className={`inline-block text-xs font-bold px-2 py-1 rounded mb-3 ${s.tagColor}`}>
              {s.tag}
            </span>
            <h2 className="text-xl font-black text-stone-900 mb-3 tracking-tight">{s.title}</h2>
            <p className="text-stone-500 mb-6 leading-relaxed font-medium">{s.desc}</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-black text-stone-400 mb-3 tracking-widest uppercase">이런 분께 맞습니다</p>
                <ul className="flex flex-col gap-2">
                  {s.targets.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-stone-600 font-medium">
                      <span className="text-stone-300 flex-shrink-0">—</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-black text-stone-400 mb-3 tracking-widest uppercase">진행 방식</p>
                <ol className="flex flex-col gap-2">
                  {s.process.map((p, i) => (
                    <li key={p} className="flex gap-2 text-sm text-stone-600 font-medium">
                      <span className="text-stone-300 flex-shrink-0 font-mono">{i + 1}.</span>{p}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-stone-50">
              <Link
                href={`/contact?type=${s.id}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
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
