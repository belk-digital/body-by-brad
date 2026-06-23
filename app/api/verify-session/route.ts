import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  // Check if we already processed this session (idempotency)
  const { data: existingOrder } = await supabaseAdmin
    .from('orders')
    .select('id, created_at')
    .eq('stripe_session_id', sessionId)
    .single();

  if (existingOrder) {
    return NextResponse.json({ success: true, order_id: existingOrder.id });
  }

  // Retrieve the Stripe session
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
  }

  // Build order items from the session's line items
  const orderItems = (session.line_items?.data ?? []).map((item) => {
    const prod = item.price?.product;
    const product =
      typeof prod === 'object' && prod !== null && !('deleted' in prod)
        ? (prod as Stripe.Product)
        : null;
    return {
      product_id: product?.metadata?.product_id ?? null,
      size: product?.metadata?.size || null,
      product_name: product?.name ?? item.description ?? '',
      quantity: item.quantity ?? 1,
      price_cents: item.price?.unit_amount ?? 0,
    };
  });

  // Create the order
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      stripe_session_id: session.id,
      payment_status: session.payment_status,
      fulfillment_status: 'unfulfilled',
      total_cents: session.amount_total ?? 0,
      customer_email: session.customer_details?.email ?? null,
      shipping_address: session.metadata?.shipping_address
        ? JSON.stringify({
            line1: session.metadata.shipping_address,
            city: session.metadata.shipping_city ?? '',
            state: session.metadata.shipping_state ?? '',
            postal_code: session.metadata.shipping_zip ?? '',
            country: session.metadata.shipping_country ?? 'US',
            name: session.metadata.shipping_name ?? '',
            phone: session.metadata.shipping_phone ?? '',
          })
        : null,
      user_id: session.metadata?.user_id || null,
    })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('[verify-session] Failed to insert order:', orderError);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }

  // Insert order items
  if (orderItems.length > 0) {
    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(
      orderItems.map((oi) => ({
        order_id: order.id,
        product_id: oi.product_id,
        product_name: oi.product_name,
        size: oi.size,
        quantity: oi.quantity,
        price_cents: oi.price_cents,
      }))
    );
    if (itemsError) {
      console.error('[verify-session] Failed to insert order_items:', itemsError);
    }
  }

  // Decrement stock
  for (const oi of orderItems) {
    if (!oi.product_id) continue;
    const { data: prod } = await supabaseAdmin
      .from('products')
      .select('stock')
      .eq('id', oi.product_id)
      .single();
    if (prod) {
      await supabaseAdmin
        .from('products')
        .update({ stock: Math.max(0, prod.stock - oi.quantity) })
        .eq('id', oi.product_id);
    }
  }

  return NextResponse.json({ success: true, order_id: order.id });
}
