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
import { Dumbbell, Phone, ClipboardList, Zap } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Book a Free Call',
    desc: "15 minutes with Brad to talk goals, history, and which plan fits your life. Zero pressure — it's just a conversation.",
    Icon: Phone,
  },
  {
    number: '02',
    title: 'Get Your Plan',
    desc: 'Within 48 hours you receive a fully custom program built specifically for your body, schedule, and equipment.',
    Icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Start Training',
    desc: "Execute the plan, track progress, and check in weekly. Brad stays with you every step of the way until you hit your goals.",
    Icon: Zap,
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
      <section className="font-satoshi bg-[#1a1a1a] py-20 md:py-28 px-4 sm:px-7 md:px-12">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.div
              className="mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                <Dumbbell size={12} className="text-zinc-950" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                The Process
              </span>
            </motion.div>
            <motion.h2
              className="font-extrabold uppercase leading-none tracking-tight text-white text-[clamp(2rem,4.5vw,4.5rem)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 }}
            >
              HOW IT
              <br />
              WORKS
            </motion.h2>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
              className="relative bg-[#252525] rounded-2xl p-7 flex flex-col gap-5 overflow-hidden group hover:bg-[#2c2c2c] transition-colors"
            >
              {/* Watermark number */}
              <span
                className="pointer-events-none absolute -bottom-4 -right-2 font-black text-[7rem] leading-none text-white/[0.04] select-none"
              >
                {step.number}
              </span>

              {/* Icon + step badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <step.Icon size={20} color="#E6FF2B" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6FF2B] bg-[#E6FF2B]/10 px-2.5 py-1 rounded-full">
                  {step.number}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/8" />

              {/* Text */}
              <div className="flex flex-col gap-2.5 relative z-10">
                <h3 className="text-white font-extrabold text-lg uppercase leading-snug tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Lime bottom accent bar — grows on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#E6FF2B]"
                initial={{ width: '0%' }}
                whileInView={{ width: '35%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.4, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
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
