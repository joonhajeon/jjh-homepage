const points = [
  {
    title: '삼성전자 반도체 엔지니어 출신',
    desc: '7만 명 규모 제조 현장에서 기술 기반 문제해결 훈련. AI 자동화가 실제 현장 어디에 적용되는지 이론이 아닌 실무로 설명합니다.',
  },
  {
    title: '삼정KPMG 전략 컨설턴트 출신',
    desc: '다업종 조직·프로세스 분석 방법론 보유. 어떤 업무를 자동화할 수 있는지 컨설팅 관점으로 진단합니다.',
  },
  {
    title: '의료업계 3년 내부 경험',
    desc: '리팅랩스 CHRO로 7개 병원, 700명 조직 운영. 병원 원장님의 현장을 직접 아는 AI 강사입니다.',
  },
  {
    title: 'IT 스타트업 창업·운영 경험',
    desc: '야놀자·혜움 등 플랫폼·SaaS 환경에서 직접 일한 경험. 기술과 비즈니스 사이 통역이 가능합니다.',
  },
  {
    title: '10년 창업 강의·멘토링 이력',
    desc: 'KAIST·고려대·현대자동차·KB국민카드 등 창업 강의 및 멘토링. K-Startup 검수평가위원 활동.',
  },
  {
    title: '비개발자 출신 AI 전문가',
    desc: '코딩 없이 직접 서비스를 만들며 터득한 노하우. 수강생이 어디서 막히는지 정확히 압니다.',
  },
]

export default function WhyMe() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 border-t border-stone-100">
      <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase mb-3">왜 전준하인가</p>
      <h2 className="text-3xl font-bold text-stone-900 mb-10 tracking-tight">
        엔지니어에서 AI 컨설턴트까지
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {points.map((p) => (
          <div key={p.title} className="bg-white border border-stone-100 rounded-xl p-6">
            <h3 className="font-semibold text-stone-900 mb-3 text-sm leading-snug">{p.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
