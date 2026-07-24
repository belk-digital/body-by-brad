'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, type Variants } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/lib/blog-data';
import { bradImagePool } from '@/lib/constants';

const BLOG_FAQ = [
  {
    q: 'What topics does the BBB blog cover?',
    a: "The blog covers what actually drives results — training plans, how to prepare for Charleston running events like the Cooper River Bridge Run, and straight answers to common coaching questions.",
  },
  {
    q: 'How often is new content published?',
    a: "New posts go up as they're written — no fixed schedule. Follow @bradnboujee_ on Instagram to get notified when a new article drops.",
  },
  {
    q: 'Who writes the blog posts?',
    a: "Articles are written by Coach Brad, ISSA Certified Personal Trainer and founder of Body By Brad.",
  },
  {
    q: 'Can I apply the blog advice to my own training?',
    a: "Yes — the content is written to be immediately actionable. For guidance tailored specifically to your body and goals, a coaching program will always get you there faster than a general guide.",
  },
  {
    q: 'Is there a way to suggest a blog topic?',
    a: "Yes. Reach out through the Contact page or DM on Instagram with a question or topic idea.",
  },
];

const HERO_IMAGE = BLOG_POSTS[0]?.heroImage;
const featuredPost = BLOG_POSTS[0];
const restPosts = BLOG_POSTS.slice(1);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

function BlogCard({ post, delay = 0 }: { post: (typeof BLOG_POSTS)[0]; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-4/3">
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            draggable={false}
          />
          {/* Category / date bar */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3"
            style={{ background: 'rgba(0,0,0,0.65)' }}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#E6FF2B' }}>
              {post.category}
            </span>
            <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
              / {formatDate(post.datePublished)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="mt-4 font-extrabold uppercase leading-tight"
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: '#1A1A1A', letterSpacing: '0.01em' }}
        >
          {post.title}
        </h3>

        <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-2">{post.excerpt}</p>

        {/* Author */}
        <div className="mt-3 flex items-center gap-2.5">
          <img
            src={bradImagePool[0]}
            alt={post.author.name}
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#1A1A1A' }}>
            {post.author.name}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function BlogContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  const latestRef = useRef<HTMLElement>(null);
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
    visible: { scale: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };
  const headlineLine: Variants = {
    hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const sectionHead: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <div className="relative w-full font-satoshi overflow-x-hidden bg-white">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero — featured post ─────────────────────────────────────────── */}
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
            alt={featuredPost?.heroImageAlt ?? 'Body By Brad'}
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
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6FF2B]"
            >
              Featured Post
            </motion.p>
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`}>
                <motion.h1
                  variants={headlineLine}
                  className="font-bold uppercase leading-[0.95] tracking-tight text-white text-[5.5vw] sm:text-[4vw] md:text-[2.8vw] lg:text-[2.2rem] max-w-xl hover:text-[#E6FF2B] transition-colors"
                >
                  {featuredPost.title}
                </motion.h1>
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Latest Blog ────────────────────────────────────────────────────── */}
      <section
        ref={latestRef}
        className="w-full bg-white px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24"
      >
        <motion.h2
          variants={sectionHead}
          initial="hidden"
          animate={latestInView ? 'visible' : 'hidden'}
          className="mb-10 text-center font-bold uppercase tracking-tight text-zinc-950 text-3xl sm:text-4xl md:text-5xl md:mb-14"
        >
          Latest Articles
        </motion.h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
          {(restPosts.length > 0 ? restPosts : BLOG_POSTS).map((post, i) => (
            <BlogCard key={post.slug} post={post} delay={i * 0.1} />
          ))}
        </div>
      </section>

      <FAQSection items={BLOG_FAQ} />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function BlogPage() {
  return (
    <ReactLenis root>
      <BlogContent />
    </ReactLenis>
  );
}
