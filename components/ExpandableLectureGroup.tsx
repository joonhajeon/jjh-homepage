'use client'
import { useState } from 'react'
import { Lecture } from '@/types'
import LectureCard from '@/components/LectureCard'

export default function ExpandableLectureGroup({
  items,
  initialCount = 3,
}: {
  items: Lecture[]
  initialCount?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? items : items.slice(0, initialCount)
  const hasMore = items.length > initialCount

  return (
    <div className="flex flex-col gap-3">
      {visible.map((l) => <LectureCard key={l.id} lecture={l} />)}
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="self-start text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors mt-1"
        >
          {expanded ? '접기 ↑' : `전체 ${items.length}건 보기 ↓`}
        </button>
      )}
    </div>
  )
}
