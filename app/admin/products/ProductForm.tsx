'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Check, Plus, X, Upload, ChevronDown, Save } from 'lucide-react';

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

type Props = { product?: Product };

const SIZES = ['XS', 'S', 'M', 'XL', 'XXL'] as const;
const GENDERS = ['Men', 'Women', 'Unisex'] as const;
const CATEGORIES = ['', 'mens', 'womens', 'accessories'] as const;
const DISCOUNT_TYPES = [
  'No Discount',
  'Seasonal Sale',
  'Holiday Deal',
  'Clearance',
  'Member Exclusive',
] as const;

const label = 'block text-xs font-semibold text-zinc-500 mb-1.5';
const input =
  'w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100 transition-all bg-white';

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [saving, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Core fields
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [category, setCategory] = useState(product?.category ?? '');

  // Pricing — base = original price, user sets discount %, sale price is computed
  const [baseCents, setBaseCents] = useState(product?.original_price_cents ?? product?.price_cents ?? 0);
  const [discountPct, setDiscountPct] = useState(() => {
    if (product?.original_price_cents && product.original_price_cents > 0) {
      return Math.round((1 - product.price_cents / product.original_price_cents) * 100);
    }
    return 0;
  });
  const [discountType, setDiscountType] = useState('No Discount');
  const saleCents = Math.round(baseCents * (1 - discountPct / 100));

  // Size + gender (UI state — saved to DB when schema supports it)
  const [sizes, setSizes] = useState<string[]>([]);
  const [gender, setGender] = useState('');

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  // Images
  const [images, setImages] = useState<string[]>(product?.image ? [product.image] : []);
  const [activeImg, setActiveImg] = useState(0);
  const [urlInput, setUrlInput] = useState('');

  const addImage = () => {
    const url = urlInput.trim();
    if (url && !images.includes(url)) {
      setImages((prev) => [...prev, url]);
      setActiveImg(images.length);
    }
    setUrlInput('');
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setActiveImg((prev) => Math.max(0, prev > i ? prev - 1 : prev === i ? 0 : prev));
  };

  const submit = (active: boolean) => {
    if (!name.trim()) { setError('Product name is required'); return; }
    setError(null);
    startTransition(async () => {
      const body = {
        name: name.trim(),
        description: description.trim() || null,
        price_cents: saleCents,
        original_price_cents: discountPct > 0 ? baseCents : null,
        stock,
        image: images[0] ?? null,
        category: category || null,
        active,
      };

      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = product ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const b = await res.json().catch(() => ({ error: 'Save failed' }));
        setError(b.error ?? 'Save failed');
        return;
      }
      router.push('/admin/products');
      router.refresh();
    });
  };

  return (
    <div className="space-y-5">
      {/* Page title + action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-950 rounded-xl flex items-center justify-center shrink-0">
            <Package size={17} className="text-lime-400" />
          </div>
          <h2 className="text-lg font-black text-zinc-950 uppercase tracking-wide">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => submit(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
          >
            <Save size={14} />
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving || !name.trim()}
            onClick={() => submit(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 text-zinc-950 text-sm font-bold hover:bg-lime-300 disabled:opacity-40 transition-colors"
          >
            <Check size={14} strokeWidth={2.5} />
            {saving ? 'Saving…' : product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-3 gap-5">
        {/* ─── LEFT COLUMN (2/3) ─── */}
        <div className="col-span-2 space-y-4">
          {/* General Information */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <h3 className="font-bold text-zinc-950 mb-4">General Information</h3>
            <div className="space-y-4">
              <div>
                <label className={label}>Name Product</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Body By Brad Hoodie"
                  className={input}
                />
              </div>
              <div>
                <label className={label}>Description Product</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe your product…"
                  className={`${input} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Size + Gender */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Size */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-bold text-zinc-950">Size</h3>
                  <span className="text-[10px] text-zinc-400 font-medium">Pick Available Size</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold border-2 transition-all ${
                        sizes.includes(s)
                          ? 'bg-lime-400 border-lime-400 text-zinc-950 shadow-sm'
                          : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-bold text-zinc-950">Gender</h3>
                  <span className="text-[10px] text-zinc-400 font-medium">Pick Available Gender</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {GENDERS.map((g) => (
                    <label key={g} className="flex items-center gap-2.5 cursor-pointer select-none">
                      <button
                        type="button"
                        onClick={() => setGender(g)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          gender === g ? 'border-lime-500 bg-white' : 'border-zinc-300 bg-white'
                        }`}
                      >
                        {gender === g && (
                          <span className="w-2 h-2 rounded-full bg-lime-500 block" />
                        )}
                      </button>
                      <span className="text-sm text-zinc-700 font-medium">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Stock */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <h3 className="font-bold text-zinc-950 mb-4">Pricing And Stock</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Base Price */}
              <div>
                <label className={label}>Base Pricing</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={(baseCents / 100).toFixed(2)}
                    onChange={(e) =>
                      setBaseCents(Math.round(Number(e.target.value) * 100))
                    }
                    className={`${input} pl-8`}
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className={label}>Stock</label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) =>
                    setStock(Math.max(0, Number(e.target.value) || 0))
                  }
                  className={input}
                />
              </div>

              {/* Discount */}
              <div>
                <label className={label}>Discount</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPct}
                    onChange={(e) =>
                      setDiscountPct(
                        Math.min(100, Math.max(0, Number(e.target.value) || 0))
                      )
                    }
                    className={input}
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-semibold">
                    %
                  </span>
                </div>
                {discountPct > 0 && (
                  <p className="text-[10px] text-lime-600 font-semibold mt-1">
                    Sale price: ${(saleCents / 100).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Discount Type */}
              <div>
                <label className={label}>Discount Type</label>
                <div className="relative">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className={`${input} appearance-none pr-10`}
                  >
                    {DISCOUNT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN (1/3) ─── */}
        <div className="col-span-1 space-y-4">
          {/* Upload Images */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
            <h3 className="font-bold text-zinc-950 mb-4">Upload Img</h3>

            {/* Main preview */}
            <div className="w-full aspect-square rounded-xl bg-zinc-100 overflow-hidden mb-3 flex items-center justify-center">
              {images[activeImg] ? (
                <img
                  src={images[activeImg]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center px-4">
                  <Upload size={28} className="text-zinc-300 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">Paste an image URL below</p>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <button
                      type="button"
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all block ${
                        activeImg === i
                          ? 'border-lime-400'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <div className="w-14 h-14 rounded-xl border-2 border-dashed border-zinc-300 flex items-center justify-center text-zinc-400">
                    <Plus size={18} />
                  </div>
                )}
              </div>
            )}

            {/* URL input */}
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                placeholder="Paste image URL…"
                className="flex-1 px-3 py-2.5 rounded-xl border border-zinc-200 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100 font-mono bg-white transition-all"
              />
              <button
                type="button"
                onClick={addImage}
                disabled={!urlInput.trim()}
                className="px-3 py-2.5 rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 disabled:opacity-50 transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
            <h3 className="font-bold text-zinc-950 mb-4">Category</h3>
            <div className="space-y-3">
              <div>
                <label className={label}>Product Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`${input} appearance-none pr-10`}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c || '— Select category —'}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
              </div>
              <button
                type="button"
                className="w-full px-4 py-3 rounded-xl bg-lime-400 text-zinc-950 text-sm font-bold hover:bg-lime-300 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={15} strokeWidth={2.5} />
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
