import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductForm from '../../ProductForm';

export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  original_price_cents: number | null;
  image: string | null;
  stock: number;
  active: boolean;
  category: string | null;
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
    .eq('id', id)
    .single<Product>();

  if (!product) notFound();

  return <ProductForm product={product} />;
}
