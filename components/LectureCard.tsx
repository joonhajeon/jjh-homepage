import { Lecture, LectureCategory } from '@/types'

const categoryLabel: Record<LectureCategory, string> = {
  education: '강의·워크숍',
  consulting: '컨설팅',
  mentoring: '멘토링',
  medical: '병원 AX',
}

const categoryColor: Record<LectureCategory, string> = {
  education: 'bg-emerald-50 text-emerald-700',
  consulting: 'bg-amber-50 text-amber-700',
  mentoring: 'bg-blue-50 text-blue-700',
  medical: 'bg-rose-50 text-rose-700',
}

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <div className="bg-white border border-stone-100 rounded-xl p-5 flex flex-col sm:flex-row gap-4">
      <div className="sm:w-32 flex-shrink-0">
        <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${categoryColor[lecture.category as LectureCategory]}`}>
          {categoryLabel[lecture.category as LectureCategory]}
        </span>
        <p className="text-stone-400 text-xs mt-2">{lecture.date.slice(0, 7)}</p>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-stone-900 mb-1 text-sm">{lecture.title}</h3>
        <p className="text-stone-500 text-sm mb-1">{lecture.organization}</p>
        <p className="text-stone-400 text-sm leading-relaxed">{lecture.description}</p>
        {lecture.participants && (
          <p className="text-stone-400 text-xs mt-2">{lecture.participants.toLocaleString()}명 참여</p>
        )}
      </div>
    </div>
  )
}
