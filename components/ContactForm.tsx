'use client'
import { useState } from 'react'

const inquiryTypes = [
  { value: 'coaching', label: '바이브코딩 1:1 코칭', desc: '개인 맞춤 코칭' },
  { value: 'lecture', label: '기업·기관 강의 요청', desc: '사내 교육·외부 워크숍' },
  { value: 'medical_consulting', label: '병원 AX 컨설팅', desc: '병원 업무 자동화' },
  { value: 'ax_consulting', label: 'AX 컨설팅', desc: '기업 AI 전환 컨설팅' },
  { value: 'other', label: '기타 협업·제안', desc: '위 항목에 해당 없는 경우' },
]

export default function ContactForm({ defaultType }: { defaultType?: string }) {
  const [selected, setSelected] = useState(defaultType || 'coaching')
  const [form, setForm] = useState({ name: '', email: '', phone: '', organization: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, inquiry_type: selected }),
    })
    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">✅</p>
        <h2 className="text-xl font-black text-stone-800 mb-2">문의가 접수됐습니다</h2>
        <p className="text-stone-500 font-medium">영업일 기준 2~3일 안에 답변드리겠습니다.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-bold text-stone-700 mb-3">무엇을 도와드릴까요? *</p>
        <div className="flex flex-col gap-2">
          {inquiryTypes.map((t) => (
            <label
              key={t.value}
              className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                selected === t.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={selected === t.value}
                onChange={() => setSelected(t.value)}
                className="mt-0.5"
              />
              <div>
                <p className="font-bold text-stone-800 text-sm">{t.label}</p>
                <p className="text-stone-400 text-xs font-medium">{t.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-stone-700 block mb-1">이름 *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="홍길동"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-stone-700 block mb-1">이메일 *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-bold text-stone-700 block mb-1">휴대폰 번호 *</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="010-1234-5678"
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>
      <div>
        <label className="text-sm font-bold text-stone-700 block mb-1">소속 (선택)</label>
        <input
          value={form.organization}
          onChange={(e) => setForm({ ...form, organization: e.target.value })}
          placeholder="회사·병원·기관명"
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>
      <div>
        <label className="text-sm font-bold text-stone-700 block mb-1">메시지 *</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="어떤 상황인지, 원하시는 것이 무엇인지 간단히 적어주세요. 아직 정리 안 되어도 괜찮습니다."
          rows={5}
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-sm font-medium">오류가 발생했습니다. 다시 시도해주세요.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-emerald-600 text-white rounded-full font-black hover:bg-emerald-700 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '전송 중...' : '문의 보내기 →'}
      </button>
    </form>
  )
}
