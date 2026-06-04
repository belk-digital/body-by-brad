'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ChevronRight, ShoppingBag } from 'lucide-react';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import type { Product } from '@/lib/types';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import MerchandiseHeroSection from '@/components/sections/MerchandiseHeroSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';

const MERCH_FAQ = [
  {
    q: 'What sizes does BBB merchandise come in?',
    a: "Most items are available in sizes S through XXL. Size availability varies by product and drop — check the individual product page for specific sizing info before ordering.",
  },
  {
    q: 'How long does shipping take?',
    a: "Standard shipping takes 5–7 business days within the US. You will receive a tracking number by email once your order ships.",
  },
  {
    q: 'What is your return and exchange policy?',
    a: "Unworn items in original condition can be returned or exchanged within 30 days of delivery. Items marked as final sale are not eligible. To start a return, reach out through the Contact page.",
  },
  {
    q: 'Do you ship internationally?',
    a: "Currently we ship within the United States only. International shipping is something we are actively working on — follow @bradnboujee_ on Instagram for updates.",
  },
  {
    q: 'Are some items limited edition or limited stock?',
    a: "Yes. Certain drops are limited run and will not be restocked once sold out. When you see something you like, grab it — these move fast.",
  },
  {
    q: 'How do I know which size to order?',
    a: "Each product page includes a size guide with measurements. When in doubt, size up — BBB gear is designed with an athletic, fitted feel and runs true to size.",
  },
];

const fmtUsd = (cents: number) => `$${(cents / 100).toFixed(0)}`;

function ProductCard({ product, index }: { product: Product; index: number }) {
  const soldOut = product.stock <= 0;
  const hasDiscount =
    product.original_price_cents != null &&
    product.original_price_cents > product.price_cents;

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: index * 0.1 }}
    >
      {/* Image */}
      <Link href={`/merchandise/${product.id}`} className="block group mb-5">
        <div className="relative bg-[#f0f0f0] aspect-[4/5] overflow-hidden">
          {/* Category badge */}
          {product.category && (
            <span className="absolute top-4 left-4 z-10 bg-white text-gray-900 text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
              {product.category}
            </span>
          )}

          {/* Status badge */}
          <span
            className={`absolute top-4 right-4 z-10 text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 ${
              soldOut ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
            }`}
          >
            {soldOut ? 'Sold Out' : 'New'}
          </span>

          {/* Discount ribbon */}
          {hasDiscount && !soldOut && (
            <span className="absolute bottom-4 left-4 z-10 bg-[#CBFF00] text-gray-900 text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1.5">
              Sale
            </span>
          )}

          {/* Product image */}
          {product.image ? (
            <motion.img
              src={product.image}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity ${
                soldOut ? 'opacity-40' : ''
              }`}
              whileHover={!soldOut ? { scale: 1.06 } : undefined}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h3 className="font-bold uppercase tracking-tight text-gray-900 leading-tight mb-1.5
          text-xl sm:text-2xl">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="font-bold text-gray-900 text-xl">
            {fmtUsd(product.price_cents)}
          </span>
          {hasDiscount && (
            <span className="text-gray-400 text-sm line-through">
              {fmtUsd(product.original_price_cents!)}
            </span>
          )}
        </div>

        {/* CTA */}
        {soldOut ? (
          <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gray-100 text-gray-400 text-sm font-bold uppercase tracking-wider">
            Sold Out
          </div>
        ) : (
          <Link
            href={`/merchandise/${product.id}`}
            className="inline-flex items-center justify-center gap-2.5 w-full
              pl-6 pr-2 py-2 rounded-full bg-gray-900 text-white
              font-bold uppercase text-sm tracking-wider
              hover:bg-black transition-colors"
          >
            <span className="flex-1 text-center">Buy Now</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 flex-shrink-0">
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="bg-gray-100 aspect-[4/5]" />
      <div className="h-7 bg-gray-100 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="h-6 bg-gray-100 rounded w-1/4" />
      <div className="h-12 bg-gray-100 rounded-full" />
    </div>
  );
}

function MerchandiseContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const prevScrollY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const up = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && up) setIsScrolled(true);
    else if (!up || latest <= 100) setIsScrolled(false);
  });

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    createSupabaseBrowserClient()
      .from('products')
      .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
      .eq('active', true)
      .order('category', { ascending: true })
      .order('created_at', { ascending: true })
      .returns<Product[]>()
      .then(({ data }) => setProducts(data ?? []));
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden font-satoshi">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* Hero — half height */}
      <section className="relative h-[50dvh] min-h-[340px] w-full overflow-hidden bg-black">
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />
        <MerchandiseHeroSection isLoading={isLoading} />
      </section>

      {/* Products */}
      <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBFF00] flex-shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
                Merchandise
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="font-bold uppercase tracking-tight text-gray-900 leading-none mb-3
                  text-[10vw] sm:text-[6vw] md:text-[4.5vw] lg:text-5xl">
                  OUR COLLECTION
                </h2>
                <p className="text-gray-500 text-sm sm:text-base max-w-md leading-relaxed">
                  Premium fitness apparel built for performance and made for the streets.
                </p>
              </div>

              {products && products.length > 0 && (
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 whitespace-nowrap">
                  {products.length} {products.length === 1 ? 'item' : 'items'}
                </p>
              )}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 mb-12 md:mb-16" />

          {/* Grid */}
          {products === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
              <p className="font-bold uppercase tracking-widest text-gray-400 text-sm">
                No items available yet
              </p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for new drops.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FAQSection items={MERCH_FAQ} />
      <Footer />
    </div>
  );
}

export default function MerchandisePage() {
  return (
    <ReactLenis root>
      <MerchandiseContent />
    </ReactLenis>
  );
}
