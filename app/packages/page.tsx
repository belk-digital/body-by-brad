'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { LanguageProvider } from '@/lib/LanguageContext';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import PackagesHeroSection from '@/components/sections/PackagesHeroSection';
import PackagesPricingSection from '@/components/sections/PackagesPricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Book a Free Call',
    desc: "15 minutes with Brad to talk goals, history, and which plan fits your life. Zero pressure — it's just a conversation.",
  },
  {
    number: '02',
    title: 'Get Your Plan',
    desc: 'Within 48 hours you receive a fully custom program built specifically for your body, schedule, and equipment.',
  },
  {
    number: '03',
    title: 'Start Training',
    desc: "Execute the plan, track progress, and check in weekly. Brad stays with you every step of the way until you hit your goals.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

function PricingContent() {
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
    <div className="relative w-full bg-black overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-dvh min-h-screen w-full overflow-hidden bg-black">
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />
        <PackagesHeroSection isLoading={isLoading} />
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────────────── */}
      <PackagesPricingSection />

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="font-satoshi bg-[#007AE5] py-20 md:py-28 px-4 sm:px-7 md:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-14 md:mb-16 max-w-xl">
            <motion.p
              className="text-white/50 text-[11px] uppercase tracking-[0.25em] font-semibold mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              The Process
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="text-white text-3xl sm:text-4xl md:text-[2.75rem] font-bold uppercase tracking-tight leading-tight"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                How it works
              </motion.h2>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 }}
                className="flex flex-col gap-4"
              >
                <span className="text-[#DFF994] text-xs font-bold tracking-[0.2em] uppercase">
                  {step.number}
                </span>
                <div className="h-px bg-white/20" />
                <h3 className="text-white text-xl font-bold leading-snug">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── CTA + Footer ──────────────────────────────────────────────────── */}
      <CTASection />
      <Footer />
    </div>
  );
}

export default function PricingPage() {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <PricingContent />
      </ReactLenis>
    </LanguageProvider>
  );
}
