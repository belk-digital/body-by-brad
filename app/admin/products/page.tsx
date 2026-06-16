import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Plus, Package, Eye, EyeOff, AlertTriangle, Pencil } from 'lucide-react';

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

const fmtUsd = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

export const dynamic = 'force-dynamic';

export default async function ProductsAdminPage() {
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
    .order('created_at', { ascending: true })
    .returns<Product[]>();

  const list = products ?? [];
  const activeCount = list.filter((p) => p.active).length;
  const hiddenCount = list.filter((p) => !p.active).length;
  const outOfStock = list.filter((p) => p.stock === 0).length;

  const stats = [
    { label: 'Total Products', value: list.length, icon: Package, lime: false },
    { label: 'Active', value: activeCount, icon: Eye, lime: true },
    { label: 'Hidden', value: hiddenCount, icon: EyeOff, lime: false },
    { label: 'Out of Stock', value: outOfStock, icon: AlertTriangle, lime: false },
  ];

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl p-5 flex items-start justify-between ${
              s.lime ? 'bg-lime-400' : 'bg-white border border-zinc-100 shadow-sm'
            }`}
          >
            <div>
              <p className={`text-[9px] uppercase tracking-widest font-bold ${s.lime ? 'text-zinc-900/60' : 'text-zinc-400'}`}>
                {s.label}
              </p>
              <p className="text-3xl font-black mt-1 text-zinc-950">{s.value}</p>
            </div>
            <div className={`p-2 rounded-xl ${s.lime ? 'bg-zinc-950/10' : 'bg-zinc-100'}`}>
              <s.icon size={18} className={s.lime ? 'text-zinc-950' : 'text-zinc-500'} />
            </div>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
          All Products ({list.length})
        </h2>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 text-zinc-950 text-sm font-bold hover:bg-lime-300 transition-colors"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3 border border-red-100">
          {error.message}
        </div>
      )}

      {/* Product grid */}
      {list.length === 0 && !error ? (
        <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-white px-6 py-20 text-center">
          <Package size={32} className="text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500 font-medium">No products yet.</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl bg-lime-400 text-zinc-950 text-sm font-bold hover:bg-lime-300 transition-colors"
          >
            <Plus size={14} />
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((p) => {
            const discount =
              p.original_price_cents && p.original_price_cents > 0
                ? Math.round((1 - p.price_cents / p.original_price_cents) * 100)
                : 0;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden group"
              >
                {/* Image */}
                <div className="aspect-square bg-zinc-100 overflow-hidden relative">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={32} className="text-zinc-300" />
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {!p.active && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-zinc-900 text-white px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-lime-400 text-zinc-950 px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}
                    {p.stock === 0 && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-red-500 text-white px-2 py-0.5 rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  {p.category && (
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                      {p.category}
                    </p>
                  )}
                  <p className="text-sm font-bold text-zinc-950 leading-snug line-clamp-2 mb-2">
                    {p.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-zinc-950">
                        {fmtUsd(p.price_cents)}
                      </span>
                      {p.original_price_cents && p.original_price_cents > p.price_cents && (
                        <span className="text-xs text-zinc-400 line-through ml-1.5">
                          {fmtUsd(p.original_price_cents)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-semibold">
                      {p.stock} left
                    </span>
                  </div>
                </div>

                {/* Edit button */}
                <div className="px-4 pb-4">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-lime-400 hover:border-lime-400 hover:text-zinc-950 transition-all"
                  >
                    <Pencil size={12} />
                    Edit Product
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
