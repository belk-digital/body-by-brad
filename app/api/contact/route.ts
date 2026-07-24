import { NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { contactNotificationEmail, contactConfirmationEmail } from '@/lib/emails';
import { rateLimit } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

const TO_EMAIL = process.env.NOTIFICATION_EMAIL ?? 'bradley@bodybybradfitness.com';
const FROM_EMAIL = 'Body By Brad <onboarding@resend.dev>';

export async function POST(req: Request) {
  const limited = rateLimit(req, { limit: 5, windowMs: 60_000 });
  if (limited) return limited;
  let body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    plan?: string;
    location?: string;
    date?: string;
    turnstileToken?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { firstName, lastName, email, plan, location, date, turnstileToken } = body;

  if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
    return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 403 });
  }

  if (!firstName || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  try {
    const [notification, confirmation] = await Promise.all([
      contactNotificationEmail({ firstName, lastName, email, plan, location, date }),
      contactConfirmationEmail({ firstName, siteUrl }),
    ]);

    const resend = getResend();
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: email,
        subject: notification.subject,
        html: notification.html,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: confirmation.subject,
        html: confirmation.html,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
