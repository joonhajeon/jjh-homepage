import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: '전준하 | AI 강의·컨설팅',
  description: '엔지니어·컨설턴트 출신이 가르치는 AI 바이브코딩. 기업 강의, 병원 AX 컨설팅, 1:1 코칭.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} bg-stone-50 text-stone-800`}>
        <Nav />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
