import { supabaseAdmin } from '@/lib/supabase/server';
import ProductRow from './ProductRow';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  original_price_cents: number | null;
  image: string | null;
  stock: number;
  active: boolean;
  stripe_price_id: string | null;
  category: string | null;
};

export const dynamic = 'force-dynamic';

export default async function ProductsAdminPage() {
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('id, name, description, price_cents, original_price_cents, image, stock, active, stripe_price_id, category')
    .order('created_at', { ascending: true })
    .returns<Product[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-950">
            Products
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage stock, pricing, and visibility. Changes save instantly.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3">
          {error.message}
        </div>
      )}

      <div className="space-y-3">
        {(products ?? []).map((p) => (
          <ProductRow key={p.id} product={p} />
        ))}
        {(products ?? []).length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center text-sm text-zinc-500">
            No products yet.
          </div>
        )}
      </div>
    </div>
  );
}
