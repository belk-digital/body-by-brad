import 'server-only';
import Stripe from 'stripe';

// Constructed on first use, not at module load: Next evaluates every server
// module during `next build`, where STRIPE_SECRET_KEY isn't available.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
    client = new Stripe(key);
  }
  return client;
}
