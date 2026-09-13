'use client'
import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        })
      }}
      className="absolute top-2 right-2 text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/10 text-stone-200 border border-white/15 hover:bg-white/20 transition-colors"
    >
      {copied ? '복사됨' : '복사'}
    </button>
  )
}
