const parts = [
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
]

export default function Curriculum() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 border-t border-stone-100">
      <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase mb-3">Curriculum</p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
            바이브코딩 완성 과정
          </h2>
          <p className="text-stone-500 mt-2 text-sm">
            비개발자가 실제 서비스를 배포까지 완성하는 하루 과정
          </p>
        </div>
        <div className="flex gap-3">
          <div className="text-center bg-stone-50 rounded-xl px-5 py-3">
            <p className="text-lg font-bold text-stone-900">6시간</p>
            <p className="text-xs text-stone-500 mt-0.5">주말 정규</p>
          </div>
          <div className="text-center bg-stone-50 rounded-xl px-5 py-3">
            <p className="text-lg font-bold text-stone-900">4시간</p>
            <p className="text-xs text-stone-500 mt-0.5">평일 압축</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {parts.map((p) => (
          <div key={p.num} className="bg-white border border-stone-100 rounded-xl p-5">
            <p className="text-xs font-semibold text-emerald-600 mb-2">{p.num}</p>
            <h3 className="font-semibold text-stone-900 mb-2 text-sm">{p.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-stone-900 text-sm mb-1">기업·단체 출장 강의 가능</p>
          <p className="text-stone-500 text-sm">팀 규모·목적에 맞춰 커리큘럼 조정. 실습 위주 구성.</p>
        </div>
        <a
          href="/contact?type=lecture"
          className="flex-shrink-0 px-5 py-2.5 bg-emerald-600 text-white rounded-full font-semibold text-sm hover:bg-emerald-700 transition-colors text-center"
        >
          강의 문의하기
        </a>
      </div>
    </section>
  )
}
