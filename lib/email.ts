import { Resend } from 'resend'

const isResendConfigured =
  !!process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('your_resend')

export async function sendContactEmail(subject: string, html: string): Promise<void> {
  if (!isResendConfigured) return

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'jiven924@gmail.com',
    subject,
    html,
  })

  if (error) {
    console.error('Resend email failed:', error)
  } else {
    console.log('Resend email sent:', data?.id)
  }
}
