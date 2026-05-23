import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';
import MerchDetail from './MerchDetail';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
    .eq('id', id)
    .eq('active', true)
    .maybeSingle<Product>();

  if (!product) notFound();

  return <MerchDetail product={product} />;
}
