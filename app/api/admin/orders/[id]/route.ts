import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/isAdmin';
import { supabaseAdmin } from '@/lib/supabase/server';

const ALLOWED_FIELDS = new Set([
  'fulfillment_status',
  'tracking_number',
  'tracking_carrier',
  'shipped_at',
]);

const VALID_FULFILLMENT = new Set(['unfulfilled', 'shipped', 'delivered', 'cancelled']);

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await context.params;
  const body = (await req.json()) as Record<string, unknown>;

  const patch: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(k)) patch[k] = v;
  }
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  if ('fulfillment_status' in patch && !VALID_FULFILLMENT.has(patch.fulfillment_status as string)) {
    return NextResponse.json({ error: 'Invalid fulfillment_status' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ order: data });
}
