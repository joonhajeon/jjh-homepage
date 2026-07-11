import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-white border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            국제인공지능윤리협회 이사
          </span>
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            AX교육위원회 위원장
          </span>
        </div>
        <h1 className="text-4xl font-bold text-stone-900 leading-tight tracking-tight mb-6">
          사람과 조직이<br />
          <span className="text-emerald-600">AI와 함께</span> 성장하도록
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
          삼성전자 엔지니어, 삼정KPMG 컨설턴트 출신.<br />
          현장에서 직접 AI를 다루며 기업과 의료진의 디지털 전환을 돕습니다.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/contact" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold text-sm hover:bg-emerald-700 transition-colors">
            강의·컨설팅 문의 →
          </Link>
          <Link href="/projects" className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-semibold text-sm hover:border-stone-600 transition-colors">
            강의 이력 보기
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {['삼성전자 반도체 엔지니어', '삼정KPMG 컨설턴트', '저서 2권'].map((tag) => (
            <span key={tag} className="bg-stone-100 text-stone-500 text-xs font-medium px-3 py-1.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
