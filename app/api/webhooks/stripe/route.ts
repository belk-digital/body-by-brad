import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Retrieve line items with expanded product metadata so we can recover
  // product_id and size from the price.product.metadata we set at checkout creation.
  const lineItemsPage = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ['data.price.product'],
    limit: 100,
  });

  const orderItems = lineItemsPage.data.map((item) => {
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

  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      stripe_session_id: session.id,
      payment_status: session.payment_status,
      fulfillment_status: 'unfulfilled',
      total_cents: session.amount_total ?? 0,
      customer_email: session.customer_details?.email ?? null,
      shipping_address: session.shipping_details?.address
        ? JSON.stringify(session.shipping_details.address)
        : null,
      user_id: null,
    })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('[stripe-webhook] Failed to insert order:', orderError);
    return;
  }

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
      console.error('[stripe-webhook] Failed to insert order_items:', itemsError);
    }
  }

  // Decrement stock for each product. Fetch-then-update is safe here because
  // Stripe delivers webhooks sequentially and retries on failure.
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
}
