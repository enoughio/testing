import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const defaultRecipient = 'hello.bookaman@gmail.com'
const maxLengths = { name: 120, email: 254, message: 4000 }

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const honeypot = typeof body.website === 'string' ? body.website.trim() : ''

    if (honeypot) return NextResponse.json({ ok: true })
    if (!name || name.length > maxLengths.name || !isValidEmail(email) || email.length > maxLengths.email || !message || message.length > maxLengths.message) {
      return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 400 })
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
    const recipient = process.env.CONTACT_RECIPIENT || defaultRecipient
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error('[v0] SMTP configuration is incomplete')
      return NextResponse.json({ error: 'Email service is temporarily unavailable.' }, { status: 503 })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: SMTP_USER,
      to: recipient,
      replyTo: email,
      subject: `New Companios enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h2>New Companios enquiry</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br />')}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] Contact email failed', error)
    return NextResponse.json({ error: 'Unable to send your enquiry right now.' }, { status: 500 })
  }
}
