type CurriculumPart = {
  num: string
  title: string
  desc: string
}

type CurriculumBadge = {
  value: string
  label: string
}

type CurriculumProps = {
  eyebrow?: string
  title: string
  subtitle: string
  badges: CurriculumBadge[]
  parts: CurriculumPart[]
  footerTitle: string
  footerDesc: string
  footerHref?: string
  footerLabel?: string
  bordered?: boolean
}

export default function Curriculum({
  eyebrow = 'Curriculum',
  title,
  subtitle,
  badges,
  parts,
  footerTitle,
  footerDesc,
  footerHref = '/contact?type=lecture',
  footerLabel = '강의 문의하기',
  bordered = true,
}: CurriculumProps) {
  return (
    <section className={`max-w-5xl mx-auto px-6 py-16 ${bordered ? 'border-t border-stone-100' : ''}`}>
      <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase mb-3">{eyebrow}</p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{title}</h2>
          <p className="text-stone-500 mt-2 text-sm">{subtitle}</p>
        </div>
        <div className="flex gap-3">
          {badges.map((b) => (
            <div key={b.label} className="text-center bg-stone-50 rounded-xl px-5 py-3">
              <p className="text-lg font-bold text-stone-900">{b.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{b.label}</p>
            </div>
          ))}
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
          <p className="font-semibold text-stone-900 text-sm mb-1">{footerTitle}</p>
          <p className="text-stone-500 text-sm">{footerDesc}</p>
        </div>
        <a
          href={footerHref}
          className="flex-shrink-0 px-5 py-2.5 bg-emerald-600 text-white rounded-full font-semibold text-sm hover:bg-emerald-700 transition-colors text-center"
        >
          {footerLabel}
        </a>
      </div>
    </section>
  )
}
