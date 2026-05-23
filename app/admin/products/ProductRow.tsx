'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

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

type Patch = Partial<Pick<Product, 'name' | 'description' | 'price_cents' | 'original_price_cents' | 'stock' | 'active' | 'image' | 'category'>>;

const CATEGORY_OPTIONS = ['', 'mens', 'womens', 'accessories'] as const;

export default function ProductRow({ product }: { product: Product }) {
  const router = useRouter();
  const [draft, setDraft] = useState(product);
  const [saving, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const dirty =
    draft.name !== product.name ||
    draft.description !== product.description ||
    draft.price_cents !== product.price_cents ||
    draft.original_price_cents !== product.original_price_cents ||
    draft.stock !== product.stock ||
    draft.active !== product.active ||
    draft.image !== product.image ||
    draft.category !== product.category;

  const save = (patch: Patch) => {
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Save failed' }));
        setError(body.error ?? 'Save failed');
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex gap-4">
        {draft.image && (
          <img
            src={draft.image}
            alt={draft.name}
            className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-zinc-100"
          />
        )}

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          <div className="md:col-span-5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Name
            </label>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
            />
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mt-3 block">
              Description
            </label>
            <textarea
              value={draft.description ?? ''}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 resize-none"
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Category
                </label>
                <select
                  value={draft.category ?? ''}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value || null })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 bg-white"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c || '— none —'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Image URL
                </label>
                <input
                  type="url"
                  value={draft.image ?? ''}
                  onChange={(e) => setDraft({ ...draft, image: e.target.value || null })}
                  placeholder="https://…"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={(draft.price_cents / 100).toFixed(2)}
              onChange={(e) =>
                setDraft({ ...draft, price_cents: Math.round(Number(e.target.value) * 100) })
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
            />
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mt-3 block">
              Original ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={((draft.original_price_cents ?? 0) / 100).toFixed(2)}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  original_price_cents: e.target.value ? Math.round(Number(e.target.value) * 100) : null,
                })
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Stock
            </label>
            <div className="flex items-center gap-1 mt-1">
              <button
                type="button"
                onClick={() => setDraft({ ...draft, stock: Math.max(0, draft.stock - 1) })}
                className="w-8 h-9 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              >
                −
              </button>
              <input
                type="number"
                min="0"
                value={draft.stock}
                onChange={(e) =>
                  setDraft({ ...draft, stock: Math.max(0, Number(e.target.value) || 0) })
                }
                className="w-full px-2 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 text-center focus:outline-none focus:border-zinc-900"
              />
              <button
                type="button"
                onClick={() => setDraft({ ...draft, stock: draft.stock + 1 })}
                className="w-8 h-9 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              >
                +
              </button>
            </div>
            {draft.stock === 0 && (
              <p className="text-[10px] text-red-600 font-semibold mt-1">Out of stock</p>
            )}
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Visibility
            </label>
            <button
              type="button"
              onClick={() => setDraft({ ...draft, active: !draft.active })}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                draft.active
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
              }`}
            >
              {draft.active ? '● Active' : '○ Hidden'}
            </button>
            <button
              type="button"
              disabled={!dirty || saving}
              onClick={() =>
                save({
                  name: draft.name,
                  description: draft.description,
                  price_cents: draft.price_cents,
                  original_price_cents: draft.original_price_cents,
                  stock: draft.stock,
                  active: draft.active,
                  image: draft.image,
                  category: draft.category,
                })
              }
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-950 text-white disabled:bg-zinc-300 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
            >
              {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-3 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
      )}
    </div>
  );
}
