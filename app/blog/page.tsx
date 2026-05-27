'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, type Variants } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { LanguageProvider } from '@/lib/LanguageContext';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

// ── Data ─────────────────────────────────────────────────────────────────────

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80';

const FEATURED_POSTS = [
  {
    id: 1,
    date: 'Apr 4, 2026',
    title: 'THE MINDSET BEHIND EVERY TRANSFORMATION',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    date: 'Apr 10, 2026',
    title: "FROM THE GYM TO YOUR GOALS: BRAD'S METHOD",
    image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    date: 'Apr 18, 2026',
    title: 'FITNESS, NUTRITION, AND PEAK PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    date: 'Apr 25, 2026',
    title: 'BUILDING DISCIPLINE: THE BODY BY BRAD APPROACH',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
  },
];

const LATEST_POSTS = [
  {
    id: 5,
    date: 'Apr 29, 2026',
    title: 'LESSONS FROM 500+ CLIENT TRANSFORMATIONS',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    date: 'May 2, 2026',
    title: 'FROM FIRST REP TO FULL ROUTINE: THE BBB MINDSET',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=900&q=80',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function BlogCard({ post, delay = 0 }: { post: typeof FEATURED_POSTS[0]; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden w-full aspect-video">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading="lazy"
          draggable={false}
        />
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#007AE5]">
        {post.date}
      </p>
      <h3 className="mt-1.5 font-bold uppercase leading-snug tracking-tight text-zinc-950 text-base sm:text-lg">
        {post.title}
      </h3>
    </motion.article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function BlogContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  const featuredRef = useRef<HTMLElement>(null);
  const latestRef = useRef<HTMLElement>(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-10% 0px' });
  const latestInView = useInView(latestRef, { once: true, margin: '-10% 0px' });

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

  // Hero animations
  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
  };
  const imageZoom: Variants = {
    hidden: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const headlineLine: Variants = {
    hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  const sectionHead: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="relative w-full font-satoshi overflow-x-hidden bg-white">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-black" style={{ height: 'clamp(380px, 58vh, 680px)' }}>
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="light"
        />

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate={isLoading ? 'hidden' : 'visible'}
          className="relative h-full w-full"
        >
          <motion.img
            variants={imageZoom}
            src={HERO_IMAGE}
            alt="Body By Brad community"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-7 md:px-12 md:pb-12">
            <motion.p
              variants={fadeUp}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#007AE5]"
            >
              Featured Post
            </motion.p>
            <h1 className="font-bold uppercase leading-[0.95] tracking-tight text-white text-[5.5vw] sm:text-[4vw] md:text-[2.8vw] lg:text-[2.2rem] max-w-xl">
              <motion.span variants={headlineLine} className="block">
                THE MINDSET BEHIND
              </motion.span>
              <motion.span variants={headlineLine} className="block">
                EVERY TRANSFORMATION
              </motion.span>
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ── Featured Blog ───────────────────────────────────────────────────── */}
      <section
        ref={featuredRef}
        className="w-full bg-white px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24"
      >
        <motion.h2
          variants={sectionHead}
          initial="hidden"
          animate={featuredInView ? 'visible' : 'hidden'}
          className="mb-10 text-center font-bold uppercase tracking-tight text-zinc-950 text-3xl sm:text-4xl md:text-5xl md:mb-14"
        >
          FEATURED BLOG
        </motion.h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
          {FEATURED_POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── Latest Blog ────────────────────────────────────────────────────── */}
      <section
        ref={latestRef}
        className="w-full bg-[#F9F7F2] px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            variants={sectionHead}
            initial="hidden"
            animate={latestInView ? 'visible' : 'hidden'}
            className="mb-10 font-bold uppercase tracking-tight text-zinc-950 text-3xl sm:text-4xl md:text-5xl md:mb-14"
          >
            LATEST BLOG
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
            {LATEST_POSTS.map((post, i) => (
              <BlogCard key={post.id} post={post} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

export default function BlogPage() {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <BlogContent />
      </ReactLenis>
    </LanguageProvider>
  );
}
