import 'server-only';
import { Resend } from 'resend';

// Constructed on first use, not at module load: Next evaluates every server
// module during `next build`, where RESEND_API_KEY isn't available.
let client: Resend | null = null;

export function getResend(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('Missing RESEND_API_KEY');
    client = new Resend(key);
  }
  return client;
}
