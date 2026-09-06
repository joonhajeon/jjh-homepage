export type LectureCategory =
  | 'education'
  | 'ai_advisory'
  | 'consulting'
  | 'medical'
  | 'startup_mentor'
  | 'startup_lecture'
  | 'career_lecture'

export interface Lecture {
  id: string
  title: string
  organization: string
  date: string
  category: LectureCategory
  description: string
  participants?: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  organization?: string
  inquiry_type: 'coaching' | 'ai_advisory' | 'lecture' | 'medical_consulting' | 'ax_consulting' | 'other'
  message: string
  created_at: string
}
