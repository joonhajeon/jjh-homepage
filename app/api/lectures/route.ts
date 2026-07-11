import { NextResponse } from 'next/server'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { Lecture } from '@/types'

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json([])
  }

  const { data, error } = await getSupabase()
    .from('lectures')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data as Lecture[])
}
