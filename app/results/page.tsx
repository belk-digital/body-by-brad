'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { testimonialsData } from '@/lib/constants';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

const RESULTS_FAQ = [
  {
    q: 'Are these real client results?',
    a: "Every transformation on this page is from a real Body By Brad client. No filters, no staging — just the results of consistent training and coaching. Names and photos are shared with client permission.",
  },
  {
    q: 'How long does it take to see real results?',
    a: "Most clients notice meaningful changes within 4–8 weeks of consistent training and nutrition. Bigger transformations — the ones you see here — typically reflect 3–6 months of committed work. Your timeline depends on your starting point and how consistently you execute the plan.",
  },
  {
    q: 'What do I need to commit to on my end?',
    a: "Consistency is everything. Brad builds the plan and holds you accountable, but you have to show up and execute. That means training as scheduled, dialing in your nutrition, and communicating openly during weekly check-ins.",
  },
  {
    q: 'Do you work with people of all fitness levels?',
    a: "Yes — from people who have never worked out before to competitive athletes looking to level up. Brad meets you where you are and builds a progressive plan that challenges you without overwhelming you.",
  },
  {
    q: 'Can I submit my own transformation?',
    a: "Absolutely. Brad loves celebrating client wins. If you have completed a program and want to share your results, reach out via Instagram DM or the Contact page.",
  },
  {
    q: 'How do I start my own transformation?',
    a: "Hit the button below, reach out through the Contact page, or DM @bradnboujee_ on Instagram. Brad will schedule a free 15-minute call to talk goals and map out your plan.",
  },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const TRANSFORMATIONS = [
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233545/IMG_0593_nbc9pi.jpg',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233550/Untitled_design_5_rbsa0t.png',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233552/IMG_0591_cyzuem.jpg',
];

const STATS = [
  { value: '200+', label: 'Clients Transformed' },
  { value: '4.9★', label: 'Average Rating'       },
  { value: '5+',   label: 'Years Coaching'        },
  { value: '98%',  label: 'Client Retention'      },
];

// ── Star rating ───────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E6FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────
function ReviewCard({
  quote, sender, reactions, index,
}: { quote: string; sender: string; reactions: string[]; index: number }) {
  return (
    <motion.div
      className="break-inside-avoid bg-white border border-zinc-100 rounded-2xl p-6 mb-5"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: index * 0.07 }}
    >
      <Stars />
      <p
        className="mt-4 mb-5 text-[15px] leading-relaxed text-zinc-700"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
            <span className="text-[11px] font-bold text-zinc-500 uppercase">
              {sender.charAt(0)}
            </span>
          </div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-950">
            {sender}
          </span>
        </div>
        {reactions.length > 0 && (
          <div className="flex items-center gap-1">
            {reactions.map((r, i) => (
              <span key={i} className="text-base leading-none">{r}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function ResultsPageContent() {
  const [isLoading,  setIsLoading]  = useState(true);
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
    <div className="relative w-full bg-white overflow-x-hidden font-satoshi">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[50dvh] min-h-85 w-full overflow-hidden bg-black">
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="light"
        />

        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-7 md:px-12 pb-10 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6FF2B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                Body By Brad
              </span>
            </div>
            <h1
              className="font-extrabold uppercase text-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 6rem)' }}
            >
              CLIENT<br />RESULTS
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Stat strip ───────────────────────────────────────────────────── */}
      <section className="w-full bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-7 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="py-7 px-4 sm:px-6 first:pl-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.07 }}
              >
                <p className="font-extrabold text-zinc-950 leading-none text-3xl sm:text-4xl mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transformations ──────────────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6FF2B] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                Transformations
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2
                  className="font-bold uppercase tracking-tight text-zinc-950 leading-none mb-3"
                  style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
                >
                  REAL PEOPLE.<br />REAL RESULTS.
                </h2>
                <p
                  className="text-zinc-500 text-sm sm:text-base max-w-md leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Slide to reveal each transformation. Every result is built on
                  consistency, coaching, and commitment.
                </p>
              </div>
              <a
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-zinc-950 text-white font-bold uppercase text-sm tracking-wider hover:bg-black transition-colors"
              >
                <span>Start Your Journey</span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-zinc-100 mb-12 md:mb-16" />

          {/* Before/After grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {TRANSFORMATIONS.map((src, i) => (
              <motion.div
                key={i}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-3/4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
              >
                <BeforeAfterSlider
                  before={src}
                  beforeAlt={`Client transformation ${i + 1} — Before`}
                  afterContent={
                    <div className="h-full w-full bg-zinc-50 flex items-center justify-center pb-8">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 text-center leading-relaxed">
                        Slide right<br />to see<br />the results
                      </span>
                    </div>
                  }
                  initialPos={42}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="w-full bg-zinc-50 py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6FF2B] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                Client Reviews
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="font-bold uppercase tracking-tight text-zinc-950 leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                WHAT CLIENTS<br />SAY ABOUT US
              </h2>
              <div className="flex items-center gap-3">
                <Stars />
                <span
                  className="text-sm text-zinc-500"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  4.9 average · {testimonialsData.length} reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* Masonry review grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {testimonialsData.map((item, i) => (
              <ReviewCard
                key={item.id}
                quote={item.quote}
                sender={item.sender}
                reactions={item.reactions}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={RESULTS_FAQ} />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ReactLenis root>
      <ResultsPageContent />
    </ReactLenis>
  );
}
