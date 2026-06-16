import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth/isAdmin';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = (await req.json()) as Record<string, unknown>;

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }

  const price_cents = typeof body.price_cents === 'number' ? body.price_cents : 0;
  const stock = typeof body.stock === 'number' ? body.stock : 0;

  if (price_cents < 0) {
    return NextResponse.json({ error: 'price_cents must be non-negative' }, { status: 400 });
  }
  if (stock < 0) {
    return NextResponse.json({ error: 'stock must be non-negative' }, { status: 400 });
  }

  const insert = {
    name,
    description: typeof body.description === 'string' ? body.description || null : null,
    price_cents,
    original_price_cents:
      typeof body.original_price_cents === 'number' ? body.original_price_cents : null,
    stock,
    image: typeof body.image === 'string' ? body.image || null : null,
    category: typeof body.category === 'string' ? body.category || null : null,
    active: typeof body.active === 'boolean' ? body.active : false,
  };

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(insert)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data }, { status: 201 });
}
