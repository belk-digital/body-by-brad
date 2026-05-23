import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/isAdmin';
import { supabaseAdmin } from '@/lib/supabase/server';

const ALLOWED_FIELDS = new Set([
  'name',
  'description',
  'price_cents',
  'original_price_cents',
  'image',
  'stock',
  'active',
  'category',
]);

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

  if ('price_cents' in patch && (typeof patch.price_cents !== 'number' || patch.price_cents < 0)) {
    return NextResponse.json({ error: 'price_cents must be a non-negative integer' }, { status: 400 });
  }
  if ('stock' in patch && (typeof patch.stock !== 'number' || patch.stock < 0)) {
    return NextResponse.json({ error: 'stock must be a non-negative integer' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ product: data });
}
