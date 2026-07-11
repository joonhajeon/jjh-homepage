import ContactForm from '@/components/ContactForm'

export default function ContactPage({ searchParams }: { searchParams: { type?: string } }) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-4">Contact</p>
      <h1 className="text-4xl font-black text-stone-900 mb-3 tracking-tight">무엇을 도와드릴까요?</h1>
      <p className="text-stone-500 mb-10 font-medium leading-relaxed">
        강의·컨설팅·과외·협업 제안 모두 환영합니다.<br />
        영업일 기준 2~3일 안에 답변드립니다.
      </p>
      <ContactForm defaultType={searchParams.type} />
    </div>
  )
}
