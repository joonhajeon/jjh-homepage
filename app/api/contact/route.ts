import { NextRequest, NextResponse } from 'next/server'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { sendDiscordNotification } from '@/lib/discord'
import { sendContactEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, organization, inquiry_type, message } = body

  if (!name || !email || !phone || !inquiry_type || !message) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
  }

  if (isSupabaseConfigured) {
    const { error } = await getSupabase().from('contacts').insert([
      { name, email, phone, organization, inquiry_type, message }
    ])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  const typeLabel: Record<string, string> = {
    coaching: '1:1 코칭',
    lecture: '기업/기관 강의',
    medical_consulting: '병원 AX 컨설팅',
    ax_consulting: 'AX 컨설팅',
    other: '기타',
  }

  await sendDiscordNotification(
    `📩 **새 문의가 접수됐습니다!**\n` +
    `👤 이름: ${name}\n` +
    `📧 이메일: ${email}\n` +
    `📱 휴대폰: ${phone}\n` +
    `🏢 소속: ${organization || '미입력'}\n` +
    `📋 유형: ${typeLabel[inquiry_type]}\n` +
    `💬 메시지: ${message}`
  )

  await sendContactEmail(
    `[홈페이지 문의] ${typeLabel[inquiry_type]} - ${name}`,
    `<h2>새 문의가 접수됐습니다</h2>
     <p><b>이름:</b> ${name}</p>
     <p><b>이메일:</b> ${email}</p>
     <p><b>휴대폰:</b> ${phone}</p>
     <p><b>소속:</b> ${organization || '미입력'}</p>
     <p><b>유형:</b> ${typeLabel[inquiry_type]}</p>
     <p><b>메시지:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
  )

  return NextResponse.json({ success: true })
}
