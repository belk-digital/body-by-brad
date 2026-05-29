'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoCartOutline } from 'react-icons/io5';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useLanguage } from '@/lib/LanguageContext';
import type { Product } from '@/lib/types';

const fmtUsd = (cents: number) => (cents / 100).toFixed(0);

export default function MerchSection() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    supabaseBrowser
      .from('products')
      .select('id, name, description, price_cents, original_price_cents, image, stock, active, category')
      .eq('active', true)
      .order('created_at', { ascending: true })
      .returns<Product[]>()
      .then(({ data }) => setProducts(data ?? []));
  }, []);

  return (
    <section
      id="merchandise"
      className="font-satoshi w-full bg-[#f5f0e1] py-20 md:py-28 px-4 sm:px-7 md:px-12"
    >
      <div>
        <div className="mb-10 md:mb-14 flex items-end justify-between gap-6">
          <div>
            <div className="overflow-hidden mb-4">
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-950"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                {t.newDropsHeading}
              </motion.h2>
            </div>
            <motion.p
              className="text-zinc-500 text-sm sm:text-base max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              {t.newDropsDesc}
            </motion.p>
          </div>

          <motion.a
            href="/merchandise"
            className="relative flex-shrink-0 overflow-hidden rounded-full border-2 border-zinc-900 px-8 py-3.5 text-sm font-semibold hidden sm:block"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            whileHover="hover"
            animate="rest"
          >
            <motion.span
              className="absolute inset-0 bg-zinc-900"
              variants={{ rest: { y: '101%' }, hover: { y: 0 } }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="relative z-10"
              variants={{ rest: { color: '#111827' }, hover: { color: '#f5f0e1' } }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {t.shopNowBtn}
            </motion.span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {products === null
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                  <div className="rounded-xl bg-zinc-200/60 aspect-[3/4]" />
                  <div className="h-6 bg-zinc-200/60 rounded w-2/3" />
                  <div className="h-4 bg-zinc-200/60 rounded w-full" />
                  <div className="h-10 bg-zinc-200/60 rounded-full" />
                </div>
              ))
            : products.map((product, i) => {
                const soldOut = product.stock <= 0;
                return (
                  <motion.div
                    key={product.id}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5% 0px' }}
                    transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 }}
                  >
                    <Link href={`/merchandise/${product.id}`} className="block">
                      <motion.div
                        className="relative rounded-xl overflow-hidden bg-zinc-100 aspect-[3/4]"
                        whileHover={!soldOut ? { scale: 1.02 } : undefined}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        <span
                          className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                            soldOut ? 'bg-red-600 text-white' : 'bg-zinc-900 text-white'
                          }`}
                        >
                          {soldOut ? 'Sold out' : t.newBadge}
                        </span>
                        {product.image && (
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className={`absolute inset-0 h-full w-full object-cover ${
                              soldOut ? 'opacity-50' : ''
                            }`}
                            whileHover={!soldOut ? { scale: 1.06 } : undefined}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          />
                        )}
                      </motion.div>
                    </Link>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-950 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-zinc-950">
                          ${fmtUsd(product.price_cents)}
                        </span>
                        {product.original_price_cents && product.original_price_cents > product.price_cents && (
                          <span className="text-sm text-zinc-400 line-through">
                            ${fmtUsd(product.original_price_cents)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/merchandise/${product.id}`}
                        aria-disabled={soldOut}
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-colors ${
                          soldOut
                            ? 'bg-zinc-300 text-zinc-500 pointer-events-none'
                            : 'bg-zinc-950 text-white hover:bg-zinc-700'
                        }`}
                      >
                        {soldOut ? (
                          <span>Sold out</span>
                        ) : (
                          <>
                            <IoCartOutline size={16} />
                            <span>Buy Now</span>
                          </>
                        )}
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
