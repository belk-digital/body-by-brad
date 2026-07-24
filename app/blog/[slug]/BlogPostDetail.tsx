'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ArrowLeft } from 'lucide-react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import type { BlogPost } from '@/lib/blog-data';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <ReactLenis root>
      <div className="relative w-full font-satoshi overflow-x-hidden bg-white">
        <AnimatePresence>{isLoading && <StairsPreloader />}</AnimatePresence>

        {/* ── Hero ── */}
        <section className="relative w-full overflow-hidden bg-black" style={{ height: 'clamp(360px, 52vh, 620px)' }}>
          <Navbar isLoading={isLoading} isMenuOpen={isMenuOpen} isScrolled={isScrolled} onMenuToggle={setIsMenuOpen} theme="light" />
          <Image src={post.heroImage} alt={post.heroImageAlt} fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/75" />
          <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 pt-28 sm:px-7 md:px-12 md:pb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6FF2B]">{post.category}</p>
            <h1 className="max-w-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-white text-[clamp(1.8rem,5vw,3.5rem)]">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-white/70 text-xs sm:text-sm">
              <span className="font-semibold text-white">{post.author.name}</span>
              <span>·</span>
              <span>{post.author.title}</span>
              <span>·</span>
              <span>{formatDate(post.datePublished)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <article className="w-full bg-white px-4 py-14 sm:px-7 sm:py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="mb-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft size={13} /> Back to Blog
            </Link>

            {post.body.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={i}
                    className="mt-10 mb-4 font-extrabold uppercase tracking-tight text-zinc-950 text-xl sm:text-2xl"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={i} className="mb-5 flex flex-col gap-2.5">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-zinc-600 text-[15px] leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CCFF00]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mb-5 text-zinc-600 text-[15px] sm:text-base leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>
        </article>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <CTASection />
        </motion.div>
        <Footer />
      </div>
    </ReactLenis>
  );
}
