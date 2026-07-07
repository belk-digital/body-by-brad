import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { registrationNotificationEmail, registrationConfirmationEmail } from '@/lib/emails';
import { rateLimit } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

const resend = new Resend(process.env.RESEND_API_KEY!);
const TO_EMAIL = process.env.NOTIFICATION_EMAIL ?? 'bradley@bodybybradfitness.com';
const FROM_EMAIL = 'Body By Brad <onboarding@resend.dev>';

export async function POST(req: Request) {
  const limited = rateLimit(req, { limit: 5, windowMs: 60_000 });
  if (limited) return limited;
  let body: {
    registrantName?: string;
    registrantEmail?: string;
    event?: string;
    fitnessLevel?: string;
    heardFrom?: string;
    emergencyName?: string;
    notes?: string;
    turnstileToken?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { registrantName, registrantEmail, event, fitnessLevel, heardFrom, emergencyName, notes, turnstileToken } = body;

  if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
    return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 403 });
  }

  if (!registrantName || !registrantEmail || !event) {
    return NextResponse.json({ error: 'Name, email, and event are required' }, { status: 400 });
  }

  const firstName = registrantName.split(' ')[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  try {
    const [notification, confirmation] = await Promise.all([
      registrationNotificationEmail({
        registrantName, registrantEmail, event, fitnessLevel, heardFrom, emergencyName, notes,
      }),
      registrationConfirmationEmail({ firstName, event, siteUrl }),
    ]);

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: registrantEmail,
        subject: notification.subject,
        html: notification.html,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: registrantEmail,
        subject: confirmation.subject,
        html: confirmation.html,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
