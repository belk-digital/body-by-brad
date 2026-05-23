'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { IoCartOutline } from 'react-icons/io5';

import { LanguageProvider } from '@/lib/LanguageContext';
import { supabaseBrowser } from '@/lib/supabase/browser';
import type { Product } from '@/lib/types';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const fmtUsd = (cents: number) => (cents / 100).toFixed(0);

function MerchandiseContent() {
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
    supabaseBrowser
      .from('products')
      .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
      .eq('active', true)
      .order('category', { ascending: true })
      .order('created_at', { ascending: true })
      .returns<Product[]>()
      .then(({ data }) => setProducts(data ?? []));
  }, []);

  return (
    <div className="relative w-full bg-[#f5f0e1] overflow-x-hidden">
      <section className="relative w-full bg-black overflow-hidden">
        <img
          src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779379374/IMG_3076_llkeme.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/55" />

        <Navbar
          isLoading={false}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />

        <div className="relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-7 md:px-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="font-satoshi text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                Merchandise
              </motion.h1>
            </div>
            <motion.p
              className="font-satoshi text-zinc-200 text-sm sm:text-base max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              Built for the gym. Made for everywhere else.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="font-satoshi w-full bg-[#f5f0e1] py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">
          {products === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                  <div className="rounded-2xl bg-zinc-200/60 aspect-[4/5]" />
                  <div className="h-8 bg-zinc-200/60 rounded w-2/3" />
                  <div className="h-4 bg-zinc-200/60 rounded w-full" />
                  <div className="h-12 bg-zinc-200/60 rounded-full" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-zinc-500 py-20">
              No merchandise available yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {products.map((product, i) => {
                const soldOut = product.stock <= 0;
                return (
                  <motion.div
                    key={product.id}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5% 0px' }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.15 }}
                  >
                    <Link
                      href={`/merchandise/${product.id}`}
                      className="block group"
                    >
                      <motion.div
                        className="relative rounded-2xl overflow-hidden bg-zinc-100 aspect-[4/5] mb-6"
                        whileHover={!soldOut ? { scale: 1.01 } : undefined}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        {product.category && (
                          <span className="absolute top-4 left-4 z-10 bg-white text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {product.category}
                          </span>
                        )}
                        <span
                          className={`absolute top-4 right-4 z-10 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                            soldOut ? 'bg-red-600 text-white' : 'bg-zinc-900 text-white'
                          }`}
                        >
                          {soldOut ? 'Sold out' : 'New'}
                        </span>
                        {product.image && (
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className={`absolute inset-0 h-full w-full object-cover ${
                              soldOut ? 'opacity-50' : ''
                            }`}
                            whileHover={!soldOut ? { scale: 1.05 } : undefined}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />
                        )}
                      </motion.div>
                    </Link>

                    <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-zinc-950 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-zinc-500 text-base leading-relaxed mb-5 max-w-md">
                      {product.description}
                    </p>
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-2xl font-bold text-zinc-950">
                        ${fmtUsd(product.price_cents)}
                      </span>
                      {product.original_price_cents &&
                        product.original_price_cents > product.price_cents && (
                          <span className="text-base text-zinc-400 line-through">
                            ${fmtUsd(product.original_price_cents)}
                          </span>
                        )}
                    </div>

                    <Link
                      href={`/merchandise/${product.id}`}
                      aria-disabled={soldOut}
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-full text-sm font-semibold transition-colors ${
                        soldOut
                          ? 'bg-zinc-300 text-zinc-500 pointer-events-none'
                          : 'bg-zinc-950 text-white hover:bg-zinc-700'
                      }`}
                    >
                      {soldOut ? (
                        <span>Sold out</span>
                      ) : (
                        <>
                          <IoCartOutline size={18} />
                          <span>Buy Now</span>
                        </>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function MerchandisePage() {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <MerchandiseContent />
      </ReactLenis>
    </LanguageProvider>
  );
}
