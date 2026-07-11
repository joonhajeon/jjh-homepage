'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: '홈' },
  { href: '/projects', label: '강의·이력' },
  { href: '/services', label: '서비스' },
  { href: '/contact', label: '문의' },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-base font-black text-stone-900 tracking-tight">
          전준하<span className="text-emerald-600">.</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === href
                  ? 'text-emerald-700 font-bold'
                  : 'text-stone-500 font-medium hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 px-4 py-1.5 bg-stone-900 text-white rounded-full text-sm font-bold hover:bg-stone-700 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </div>
    </nav>
  )
}
