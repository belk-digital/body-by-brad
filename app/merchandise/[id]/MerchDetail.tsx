'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ShoppingCart, ChevronLeft, Check } from 'lucide-react';

import { useCart } from '@/lib/cart/CartContext';
import type { Product } from '@/lib/types';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const;
const FREE_SHIPPING_THRESHOLD = 299;

const FIT_INFO = [
  'True-to-size, regular relaxed fit.',
  'Heavyweight 380 gsm cotton-blend fleece.',
  'Ribbed cuffs and hem with double-needle stitching.',
  'Drawcord hood with metal eyelets.',
  'Pre-shrunk — machine wash cold, tumble dry low.',
  'Designed and printed in the USA.',
];

const fmtUsd = (cents: number) => `$${(cents / 100).toFixed(0)}`;

type Tab = 'info' | 'description';

function DetailContent({ product }: { product: Product }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [size, setSize] = useState<(typeof SIZES)[number]>('M');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>('info');
  const [added, setAdded] = useState(false);
  const prevScrollY = useRef(0);

  const { addItem, open } = useCart();
  const soldOut = product.stock <= 0;
  const hasDiscount =
    product.original_price_cents != null &&
    product.original_price_cents > product.price_cents;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const up = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && up) setIsScrolled(true);
    else if (!up || latest <= 100) setIsScrolled(false);
  });

  const onAdd = () => {
    if (soldOut) return;
    addItem({
      id: `${product.id}|${size}`,
      name: product.name,
      size,
      price: product.price_cents / 100,
      image: product.image ?? '',
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    open();
  };

  return (
    <div className="relative w-full bg-white overflow-x-hidden font-satoshi">

      {/* Navbar */}
      <div className="relative w-full bg-black">
        <Navbar
          isLoading={false}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />
        <div className="h-24 sm:h-28" aria-hidden />
      </div>

      {/* Back link bar */}
      <div className="w-full border-b border-gray-100 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/merchandise"
            className="inline-flex items-center gap-1.5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            Back to Merchandise
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-7 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 lg:gap-20">

          {/* ── Left: images ───────────────────────────────────────── */}
          <div className="space-y-3">
            {product.image && (
              <motion.div
                className="relative bg-[#f5f5f5] aspect-square overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            )}

            {/* Second image (back view) */}
            {product.image && (
              <motion.div
                className="relative bg-[#f5f5f5] aspect-square overflow-hidden hidden md:block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <img
                  src={product.image}
                  alt={`${product.name} detail`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            )}
          </div>

          {/* ── Right: details ─────────────────────────────────────── */}
          <motion.div
            className="md:sticky md:top-28 self-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Category */}
            {product.category && (
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 mb-3">
                {product.category}
              </p>
            )}

            {/* Name */}
            <h1 className="font-bold tracking-tight text-gray-900 leading-tight mb-5
              text-4xl sm:text-5xl md:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-bold text-gray-900">
                {fmtUsd(product.price_cents)} USD
              </span>
              {hasDiscount && (
                <span className="text-base text-gray-400 line-through">
                  {fmtUsd(product.original_price_cents!)} USD
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                  SIZE
                </span>
                <span className="text-xs text-gray-400">
                  {product.stock} in stock
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    disabled={soldOut}
                    className={`py-3.5 text-sm font-semibold border transition-all duration-150 ${
                      size === s
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-600 hover:text-gray-900'
                    } disabled:opacity-30 disabled:cursor-not-allowed`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-7">
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-3">
                QUANTITY
              </span>
              <div className="inline-flex items-center border border-gray-200">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-lg transition-colors select-none"
                >
                  −
                </button>
                <span className="w-11 text-center text-sm font-semibold text-gray-900 border-x border-gray-200">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-lg transition-colors select-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              type="button"
              onClick={onAdd}
              disabled={soldOut}
              whileTap={!soldOut ? { scale: 0.98 } : undefined}
              className={`relative flex items-center justify-center gap-2.5 w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider overflow-hidden transition-colors ${
                soldOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-black cursor-pointer'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    Added to Cart
                  </motion.span>
                ) : soldOut ? (
                  <motion.span key="soldout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Sold Out
                  </motion.span>
                ) : (
                  <motion.span
                    key="buy"
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingCart className="w-4 h-4" strokeWidth={2} />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Free shipping */}
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 text-center mt-4">
              Free shipping on orders over ${FREE_SHIPPING_THRESHOLD} USD
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100 mt-10 mb-8" />

            {/* Tabs */}
            <div>
              <div className="flex gap-0 mb-6 border-b border-gray-100">
                {(['info', 'description'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`relative px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                      tab === t ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {tab === 'info' ? (
                  <motion.ul
                    key="info"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-2.5"
                  >
                    {FIT_INFO.map((line) => (
                      <li key={line} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CBFF00] mt-2 flex-shrink-0" />
                        {line}
                      </li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.p
                    key="desc"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    {product.description ?? 'No additional description available.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function MerchDetail({ product }: { product: Product }) {
  return (
    <ReactLenis root>
      <DetailContent product={product} />
    </ReactLenis>
  );
}
