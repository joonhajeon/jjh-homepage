export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white font-black text-sm mb-1">전준하.</p>
          <p className="text-xs">jiven924@gmail.com · 010-9810-9240</p>
        </div>
        <div className="flex gap-6 text-xs font-bold text-stone-500">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  )
}
