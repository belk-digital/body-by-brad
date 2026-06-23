'use client';

import { useState, useRef, useEffect } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Image from 'next/image';
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Dumbbell,
  Target,
  Smartphone,
  Zap,
  Calendar,
  TrendingUp,
  Award,
  MessageCircle,
  Clock,
  Heart,
  Users,
  Home,
  Plus,
  Minus,
  type LucideIcon,
} from 'lucide-react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import type { AreaData } from '@/lib/areas-data';

// ── Constants ──────────────────────────────────────────────────────────────────

const ACCENT = '#E6FF2B';
const CARD_BG = '#252525';
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin,
  Dumbbell,
  Target,
  Smartphone,
  Zap,
  Calendar,
  TrendingUp,
  Award,
  MessageCircle,
  Clock,
  Heart,
  Users,
  Home,
};

// ── Animation helpers ──────────────────────────────────────────────────────────

const inViewFade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease, delay },
});

// ── Benefit Card ───────────────────────────────────────────────────────────────

function BenefitCard({
  iconName,
  title,
  desc,
  delay,
}: {
  iconName: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const Icon = ICON_MAP[iconName] ?? Dumbbell;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease, delay }}
      className="flex flex-col gap-4 rounded-2xl p-6"
      style={{ backgroundColor: CARD_BG }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
        <Icon size={20} color={ACCENT} />
      </div>
      <h3
        className="font-bold uppercase text-white text-[16px] leading-tight"
        style={{ fontFamily: 'Unbounded, sans-serif' }}
      >
        {title}
      </h3>
      <p
        className="text-[14px] leading-relaxed"
        style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

// ── FAQ Item ───────────────────────────────────────────────────────────────────

function FaqItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-b transition-colors duration-200 ${
        index === 0 ? 'border-t' : ''
      } ${isOpen ? 'border-black/15' : 'border-black/10'}`}
    >
      <button
        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 w-5 shrink-0 text-[10px] font-bold tabular-nums text-black/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`text-sm leading-snug font-semibold transition-colors duration-200 md:text-[15px] ${
              isOpen ? 'text-[#1a1a1a]' : 'text-black/55 group-hover:text-black/90'
            }`}
          >
            {question}
          </span>
        </div>

        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
          style={{ backgroundColor: isOpen ? '#1a1a1a' : 'rgba(0,0,0,0.08)' }}
        >
          {isOpen ? (
            <Minus size={13} className="text-[#E6FF2B]" />
          ) : (
            <Plus size={13} className="text-black/60" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-9 pr-4 text-sm leading-relaxed text-black/55">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Content ───────────────────────────────────────────────────────────────

function AreaLocationPageContent({ area }: { area: AreaData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
  };
  const imageZoom: Variants = {
    hidden: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 1.6, ease } },
  };
  const headlineLine: Variants = {
    hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
  };
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  };

  const nameParts = area.name.toUpperCase().split(' ');
  const titleLines: string[] =
    nameParts.length === 1
      ? [nameParts[0]]
      : [
          nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' '),
          nameParts.slice(Math.ceil(nameParts.length / 2)).join(' '),
        ];

  return (
    <div className="relative w-full font-satoshi overflow-x-hidden bg-white">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-black"
        style={{ height: 'clamp(360px, 55vh, 640px)' }}
      >
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
          <motion.div variants={imageZoom} className="absolute inset-0">
            <Image
              src={area.heroImage}
              alt={`Personal trainer in ${area.name}, SC`}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between px-4 pb-10 pt-28 sm:px-7 md:px-12 md:pb-14">
            <motion.div variants={fadeUpVariant} className="flex items-center gap-2">
              <MapPin size={12} color={ACCENT} />
              <p
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: ACCENT }}
              >
                {area.sub} — Charleston, SC
              </p>
            </motion.div>

            <h1
              className="font-extrabold uppercase leading-[0.93] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.2rem,8.5vw,8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              {titleLines.map((line, i) => (
                <motion.span key={i} variants={headlineLine} className="block">
                  {line}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ── Breadcrumb + badge strip ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-100 px-4 py-4 sm:px-7 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <a href="/areas-we-serve-charleston-sc" className="hover:text-zinc-700 transition-colors">Areas We Serve</a>
            <span>/</span>
            <span className="text-zinc-700">{area.name}</span>
          </nav>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={
                area.inPerson
                  ? { backgroundColor: ACCENT, color: '#1a1a1a' }
                  : { backgroundColor: '#f4f4f5', color: '#71717a' }
              }
            >
              {area.inPerson ? 'In-Person' : 'Online Only'}
            </span>
            {area.inPerson && (
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                + Online
              </span>
            )}
            {area.distance !== 'Home Base' && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {area.distance} from Charleston
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Overview ──────────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <div className="max-w-4xl">
          <motion.div className="mb-8 flex items-center gap-2.5" {...inViewFade(0)}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E6FF2B]">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Personal Training in {area.name}
            </span>
          </motion.div>

          <motion.h2
            className="mb-6 font-extrabold uppercase leading-tight tracking-tight text-zinc-950"
            style={{ fontSize: 'clamp(1.8rem,4.5vw,4rem)', fontFamily: 'Unbounded, sans-serif' }}
            {...inViewFade(0.08)}
          >
            {area.tagline}
          </motion.h2>

          <motion.p
            className="max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl"
            style={{ fontFamily: 'Roboto, sans-serif' }}
            {...inViewFade(0.16)}
          >
            {area.overview}
          </motion.p>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#111111] px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <motion.p
          className="mb-12 text-[10px] font-bold uppercase tracking-[0.28em]"
          style={{ color: ACCENT }}
          {...inViewFade(0)}
        >
          Why Train with Brad in {area.name}
        </motion.p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {area.benefits.map((benefit, i) => (
            <BenefitCard
              key={benefit.title}
              iconName={benefit.iconName}
              title={benefit.title}
              desc={benefit.desc}
              delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* ── What's Included ───────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              What&apos;s Included
            </p>
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-zinc-950"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,3rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Everything You Need to Succeed
            </h2>
          </motion.div>

          <motion.ul
            className="flex flex-col gap-3.5"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            {area.included.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} color={ACCENT} className="mt-0.5 shrink-0" />
                <span
                  className="text-[15px] leading-relaxed text-zinc-700"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <motion.p
          className="mb-12 text-[10px] font-bold uppercase tracking-[0.28em]"
          style={{ color: ACCENT }}
          {...inViewFade(0)}
        >
          How It Works
        </motion.p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {area.process.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <span
                className="mb-4 font-extrabold leading-none"
                style={{
                  fontSize: 'clamp(3.5rem,6vw,5.5rem)',
                  color: ACCENT,
                  fontFamily: 'Unbounded, sans-serif',
                  opacity: 0.18,
                }}
              >
                {step.number}
              </span>
              <h3
                className="mb-3 font-bold uppercase text-white text-[15px] leading-tight"
                style={{ fontFamily: 'Unbounded, sans-serif' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[13px] leading-relaxed"
                style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFF99' }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="relative w-full overflow-hidden px-4 py-20 sm:px-7 md:px-12 md:py-28"
        style={{ backgroundColor: ACCENT }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[42%_58%] md:gap-16">
          <div className="flex flex-col justify-start">
            <motion.div
              className="mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a]">
                <MapPin size={12} className="text-[#E6FF2B]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1a1a1a]">
                FAQ — {area.name}
              </span>
            </motion.div>

            <motion.h2
              className="mb-5 font-extrabold uppercase leading-none tracking-tight text-[#1a1a1a]"
              style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)', fontFamily: 'Unbounded, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 }}
            >
              Common
              <br />
              Questions
            </motion.h2>

            <motion.p
              className="max-w-xs text-sm leading-relaxed text-black/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Questions about training in {area.name}? Can&apos;t find what you need?{' '}
              <a
                href="/contact"
                className="font-semibold underline underline-offset-2 text-black/70 hover:text-black transition-colors"
              >
                Get in touch.
              </a>
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {area.faq.map((item, i) => (
              <FaqItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Band ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#111111] px-4 py-12 sm:px-7 md:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
              Ready to train in {area.name}?
            </p>
            <h2
              className="font-extrabold uppercase leading-tight text-white"
              style={{ fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Start Your Program Today
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#E6FF2B] px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 transition-colors duration-300 hover:bg-white"
            >
              Get in Touch
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="/fitness-coaching-packages"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:border-white/40"
            >
              View Packages
            </a>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────────

export default function AreaLocationContent({ area }: { area: AreaData }) {
  return (
    <ReactLenis root>
      <AreaLocationPageContent area={area} />
    </ReactLenis>
  );
}
