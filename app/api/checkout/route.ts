import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { CartItem } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  let body: {
    items?: CartItem[];
    userId?: string | null;
    customerEmail?: string | null;
    shippingAddress?: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    } | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const items = body.items;
  const userId = body.userId ?? null;
  const customerEmail = body.customerEmail ?? null;
  const shipping = body.shippingAddress ?? null;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  // Cart item IDs are formatted as "productId|size"
  const productIds = [...new Set(items.map((item) => item.id.split('|')[0]))];

  const { data: products, error: dbError } = await supabaseAdmin
    .from('products')
    .select('id, name, price_cents, stock, active, image')
    .in('id', productIds);

  if (dbError) {
    return NextResponse.json({ error: 'Failed to validate products' }, { status: 500 });
  }

  const productMap = new Map((products ?? []).map((p) => [p.id, p]));

  for (const item of items) {
    const productId = item.id.split('|')[0];
    const product = productMap.get(productId);
    if (!product || !product.active) {
      return NextResponse.json(
        { error: `"${item.name}" is no longer available` },
        { status: 400 }
      );
    }
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Not enough stock for "${item.name}"` },
        { status: 400 }
      );
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      metadata: {
        user_id: userId ?? '',
        shipping_name: shipping ? `${shipping.firstName ?? ''} ${shipping.lastName ?? ''}`.trim() : '',
        shipping_phone: shipping?.phone ?? '',
        shipping_address: shipping?.address ?? '',
        shipping_city: shipping?.city ?? '',
        shipping_state: shipping?.state ?? '',
        shipping_zip: shipping?.zip ?? '',
        shipping_country: shipping?.country ?? 'US',
      },
      line_items: items.map((item) => {
        const productId = item.id.split('|')[0];
        const product = productMap.get(productId)!;
        // Stripe only accepts absolute HTTPS image URLs
        const images =
          product.image && product.image.startsWith('https://') ? [product.image] : [];
        return {
          quantity: item.quantity,
          price_data: {
            currency: 'usd',
            unit_amount: product.price_cents,
            product_data: {
              name: item.size ? `${item.name} – Size ${item.size}` : item.name,
              images,
              metadata: {
                product_id: productId,
                size: item.size ?? '',
              },
            },
          },
        };
      }),
      success_url: `${siteUrl}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/merchandise`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
