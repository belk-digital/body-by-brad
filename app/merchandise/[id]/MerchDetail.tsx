'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { IoCartOutline, IoChevronBack } from 'react-icons/io5';

import { LanguageProvider } from '@/lib/LanguageContext';
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

const fmtUsd = (cents: number) => (cents / 100).toFixed(0);

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
    setTimeout(() => setAdded(false), 1500);
    open();
  };

  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      <section className="relative w-full bg-black">
        <Navbar
          isLoading={false}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />
        <div className="h-24 sm:h-28" aria-hidden />
      </section>

      <section className="font-satoshi w-full bg-white py-10 md:py-16 px-4 sm:px-7 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/merchandise"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
          >
            <IoChevronBack size={14} /> Back to merchandise
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Image gallery */}
            <div className="space-y-4">
              {product.image && (
                <motion.div
                  className="relative rounded-2xl overflow-hidden bg-[#fdf6ec] aspect-square"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </motion.div>
              )}
              {product.image && (
                <motion.div
                  className="relative rounded-2xl overflow-hidden bg-[#fdf6ec] aspect-square hidden md:block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} back view`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </motion.div>
              )}
            </div>

            {/* Details */}
            <motion.div
              className="md:sticky md:top-28 self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            >
              {product.category && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold mb-3">
                  {product.category}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-bold text-zinc-950">
                  ${fmtUsd(product.price_cents)} USD
                </span>
                {product.original_price_cents &&
                  product.original_price_cents > product.price_cents && (
                    <span className="text-base text-zinc-400 line-through">
                      ${fmtUsd(product.original_price_cents)} USD
                    </span>
                  )}
              </div>

              <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                    Size
                  </label>
                  <span className="text-xs text-zinc-400">
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
                      className={`py-3 rounded-lg text-sm font-semibold border transition-colors ${
                        size === s
                          ? 'border-zinc-950 bg-zinc-950 text-white'
                          : 'border-zinc-200 text-zinc-700 hover:border-zinc-900'
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center gap-1 border border-zinc-200 rounded-lg px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 text-lg"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-zinc-950">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 text-lg"
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
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-full text-sm font-semibold transition-colors ${
                  soldOut
                    ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                    : 'bg-zinc-950 text-white hover:bg-zinc-700'
                }`}
                animate={added ? { backgroundColor: '#10b981' } : undefined}
                whileTap={!soldOut ? { scale: 0.98 } : undefined}
              >
                {soldOut ? (
                  <span>Sold out</span>
                ) : added ? (
                  <span>✓ Added to Cart</span>
                ) : (
                  <>
                    <IoCartOutline size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </motion.button>

              <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold text-center mt-4">
                Free shipping on orders over ${FREE_SHIPPING_THRESHOLD} USD
              </p>

              {/* Tabs */}
              <div className="mt-10">
                <div className="flex gap-2 mb-4">
                  {(['info', 'description'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        tab === t
                          ? 'bg-zinc-950 text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {tab === 'info' ? (
                  <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed list-disc pl-5">
                    {FIT_INFO.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {product.description ?? 'No additional description available.'}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function MerchDetail({ product }: { product: Product }) {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <DetailContent product={product} />
      </ReactLenis>
    </LanguageProvider>
  );
}
