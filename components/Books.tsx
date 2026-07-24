const books = [
  {
    title: '국내MBA로 당신의 커리어를 바꿔라',
    year: '2011',
    publisher: '매일경제신문사',
    url: 'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=11169853&srsltid=AfmBOoo7Qp_ManHgFJlVA8cSqmkt-aoDq0ntMKszvkeZ1xHbPhXuZEd1',
  },
  {
    title: '불안과 불만 사이',
    year: '2019',
    publisher: '씨이오메이커',
    url: 'https://product.kyobobook.co.kr/detail/S000001979521',
  },
]

export default function Books() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 border-t border-stone-100">
      <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase mb-3">저서</p>
      <h2 className="text-3xl font-bold text-stone-900 mb-10 tracking-tight">
        책으로 남긴 생각들
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {books.map((b) => (
          <a
            key={b.title}
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-stone-100 rounded-xl p-6 hover:border-emerald-300 transition-colors"
          >
            <h3 className="font-semibold text-stone-900 mb-2 text-base leading-snug">{b.title}</h3>
            <p className="text-stone-500 text-sm">{b.publisher} · {b.year}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
