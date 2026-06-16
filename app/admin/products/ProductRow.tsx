'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Image } from 'lucide-react';

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

const fieldLabel = 'text-[9px] uppercase tracking-widest text-zinc-400 font-bold block mb-1';
const fieldInput = 'w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100 transition-all bg-white';

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
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
      <div className="p-5 flex gap-5">
        <div className="w-24 h-24 rounded-xl bg-zinc-100 shrink-0 overflow-hidden flex items-center justify-center">
          {draft.image ? (
            <img src={draft.image} alt={draft.name} className="w-full h-full object-cover" />
          ) : (
            <Image size={22} className="text-zinc-400" />
          )}
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4 items-start min-w-0">
          {/* Name + description + category + image url */}
          <div className="col-span-5 space-y-3">
            <div>
              <label className={fieldLabel}>Name</label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Description</label>
              <textarea
                value={draft.description ?? ''}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={2}
                className={`${fieldInput} resize-none`}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>Category</label>
                <select
                  value={draft.category ?? ''}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value || null })}
                  className={fieldInput}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c || '— none —'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={fieldLabel}>Image URL</label>
                <input
                  type="url"
                  value={draft.image ?? ''}
                  onChange={(e) => setDraft({ ...draft, image: e.target.value || null })}
                  placeholder="https://…"
                  className={`${fieldInput} font-mono text-xs`}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="col-span-2 space-y-3">
            <div>
              <label className={fieldLabel}>Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={(draft.price_cents / 100).toFixed(2)}
                onChange={(e) =>
                  setDraft({ ...draft, price_cents: Math.round(Number(e.target.value) * 100) })
                }
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Original ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={((draft.original_price_cents ?? 0) / 100).toFixed(2)}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    original_price_cents: e.target.value
                      ? Math.round(Number(e.target.value) * 100)
                      : null,
                  })
                }
                className={fieldInput}
              />
            </div>
          </div>

          {/* Stock */}
          <div className="col-span-2">
            <label className={fieldLabel}>Stock</label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDraft({ ...draft, stock: Math.max(0, draft.stock - 1) })}
                className="w-8 h-9 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-mono text-lg leading-none transition-colors"
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
                className="w-full px-2 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-900 text-center focus:outline-none focus:border-lime-400 bg-white"
              />
              <button
                type="button"
                onClick={() => setDraft({ ...draft, stock: draft.stock + 1 })}
                className="w-8 h-9 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-mono text-lg leading-none transition-colors"
              >
                +
              </button>
            </div>
            {draft.stock === 0 && (
              <p className="text-[9px] text-red-600 font-bold uppercase tracking-wider mt-1.5">
                Out of stock
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="col-span-3 flex flex-col gap-2">
            <label className={fieldLabel}>Visibility</label>
            <button
              type="button"
              onClick={() => setDraft({ ...draft, active: !draft.active })}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                draft.active
                  ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300'
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
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
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                dirty && !saving
                  ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved ✓'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-5 mb-4 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
          {error}
        </div>
      )}
    </div>
  );
}
