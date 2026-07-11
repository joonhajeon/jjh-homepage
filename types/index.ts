export type LectureCategory = 'education' | 'consulting' | 'mentoring' | 'medical'

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
  inquiry_type: 'coaching' | 'lecture' | 'medical_consulting' | 'ax_consulting' | 'other'
  message: string
  created_at: string
}
