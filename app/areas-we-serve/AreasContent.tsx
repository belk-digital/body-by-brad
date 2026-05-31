'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { MapPin, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { LanguageProvider } from '@/lib/LanguageContext';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

const AREAS_FAQ = [
  {
    q: 'Which areas do you serve for in-person training?',
    a: "Brad serves 14+ neighborhoods across the Charleston Lowcountry including Downtown Charleston, Mount Pleasant, North Charleston, West Ashley, James Island, Daniel Island, Johns Island, Summerville, Goose Creek, Folly Beach, Isle of Palms, and more.",
  },
  {
    q: 'How far do you travel for in-person sessions?',
    a: "Brad travels approximately 25 miles from downtown Charleston for in-person training. If you are just outside that radius, reach out — he may be able to accommodate depending on your schedule and location.",
  },
  {
    q: 'Can I train with Brad if I am not in the Charleston area?',
    a: "Absolutely. Online coaching is available to clients anywhere in the world. You get the same personalized programming, weekly check-ins, and direct access to Brad — just delivered through your phone.",
  },
  {
    q: 'Is online coaching as effective as training in person?',
    a: "For most clients, yes. Online coaching delivers fully custom programming, regular progress tracking, and consistent accountability. Many BBB clients have achieved their biggest transformations entirely through online coaching.",
  },
  {
    q: 'Do you offer outdoor training sessions?',
    a: "Yes. Outdoor sessions are a big part of the BBB experience — from one-on-one sessions in Charleston parks to the legendary Cooldown community events at Marion Square and Folly Beach.",
  },
  {
    q: 'What if my area is not listed?',
    a: "Reach out through the Contact page or DM on Instagram with your location. If you are within a reasonable distance, Brad will let you know what in-person options are available — and online coaching is always an option regardless of where you are.",
  },
];

// ── Data ─────────────────────────────────────────────────────────────────────

const ACCENT = '#E6FF2B';
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Area = {
  name: string;
  sub: string;
  distance: string;
  inPerson: boolean;
  desc: string;
};

const AREAS: Area[] = [
  {
    name: 'Charleston',
    sub: 'Downtown & Peninsula',
    distance: 'Home Base',
    inPerson: true,
    desc: "Brad's primary training location. All services — elite 1-on-1, group classes, and full online coaching — are available.",
  },
  {
    name: 'Mount Pleasant',
    sub: 'East Cooper',
    distance: '7 mi',
    inPerson: true,
    desc: 'One of Charleston\'s fastest-growing communities. In-person sessions and online coaching both available.',
  },
  {
    name: 'North Charleston',
    sub: 'Greater Charleston',
    distance: '5 mi',
    inPerson: true,
    desc: 'In-person training and all online programs fully available to North Charleston residents.',
  },
  {
    name: 'West Ashley',
    sub: 'West of the Ashley River',
    distance: '5 mi',
    inPerson: true,
    desc: 'Just across the Ashley River from downtown. In-person sessions and online coaching available.',
  },
  {
    name: 'James Island',
    sub: 'Greater Charleston',
    distance: '6 mi',
    inPerson: true,
    desc: 'In-person and online programs fully available to James Island residents and surrounding areas.',
  },
  {
    name: 'Daniel Island',
    sub: 'Berkeley County',
    distance: '9 mi',
    inPerson: true,
    desc: 'In-person training sessions and complete online coaching programs available.',
  },
  {
    name: 'Johns Island',
    sub: 'Greater Charleston',
    distance: '12 mi',
    inPerson: true,
    desc: 'In-person training and full online coaching available to Johns Island residents.',
  },
  {
    name: 'Summerville',
    sub: 'Dorchester County',
    distance: '24 mi',
    inPerson: true,
    desc: 'In-person training by arrangement. Full online coaching programs available to all Summerville residents.',
  },
  {
    name: 'Goose Creek',
    sub: 'Berkeley County',
    distance: '18 mi',
    inPerson: false,
    desc: 'Complete online coaching and remote training programs available to Goose Creek residents.',
  },
  {
    name: 'Hanahan',
    sub: 'Berkeley County',
    distance: '12 mi',
    inPerson: true,
    desc: 'In-person training and full online programs available to Hanahan residents.',
  },
  {
    name: 'Isle of Palms',
    sub: 'Barrier Islands',
    distance: '18 mi',
    inPerson: false,
    desc: 'Online coaching and complete remote training programs available to IOP residents.',
  },
  {
    name: "Sullivan's Island",
    sub: 'Barrier Islands',
    distance: '15 mi',
    inPerson: false,
    desc: 'Full online coaching and remote program delivery available.',
  },
  {
    name: 'Folly Beach',
    sub: 'Greater Charleston',
    distance: '12 mi',
    inPerson: true,
    desc: 'In-person training and online coaching available to Folly Beach residents.',
  },
  {
    name: 'Ladson',
    sub: 'Berkeley & Dorchester',
    distance: '20 mi',
    inPerson: false,
    desc: 'Full online coaching and remote training programs available.',
  },
];

const ONLINE_PERKS = [
  'Custom program built for your schedule and equipment',
  'Weekly check-ins and progress tracking',
  'Unlimited messaging with Brad',
  'Nutrition guidance included',
  'Works at any gym or from home',
];

// ── Area Card ─────────────────────────────────────────────────────────────────

function AreaCard({ area, delay }: { area: Area; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease, delay }}
      className="group flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-50">
          <MapPin size={16} color={area.inPerson ? '#1a1a1a' : '#a1a1aa'} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={
              area.inPerson
                ? { backgroundColor: ACCENT, color: '#1a1a1a' }
                : { backgroundColor: '#f4f4f5', color: '#71717a' }
            }
          >
            {area.inPerson ? 'In-Person' : 'Online Only'}
          </span>

          {area.inPerson && (
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              + Online
            </span>
          )}
        </div>
      </div>

      {/* Name + sub */}
      <div>
        <h3
          className="font-bold uppercase text-zinc-900 text-[17px] leading-tight"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
        >
          {area.name}
        </h3>
        <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-zinc-400">
          {area.sub}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-[13px] leading-relaxed text-zinc-500"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {area.desc}
      </p>

      {/* Distance chip */}
      <div className="mt-auto pt-2 border-t border-zinc-50 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
          Distance from Charleston
        </span>
        <span
          className="text-[12px] font-bold uppercase tracking-wider"
          style={{ fontFamily: 'Unbounded, sans-serif', color: area.distance === 'Home Base' ? '#1a1a1a' : '#a1a1aa' }}
        >
          {area.distance}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

function AreasPageContent() {
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

  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
  };
  const slideUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  };

  const inPerson = AREAS.filter((a) => a.inPerson);
  const onlineOnly = AREAS.filter((a) => !a.inPerson);

  return (
    <div className="relative w-full font-satoshi overflow-x-hidden bg-[#F7F7F5]">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-[#F7F7F5]"
        style={{ minHeight: 'clamp(380px, 58vh, 660px)' }}
      >
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="dark"
        />

        {/* Decorative large background text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4 select-none"
          aria-hidden
        >
          <span
            className="font-extrabold uppercase leading-none tracking-tighter text-zinc-200 opacity-40"
            style={{
              fontSize: 'clamp(6rem,18vw,18rem)',
              fontFamily: 'Unbounded, sans-serif',
            }}
          >
            SC
          </span>
        </div>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate={isLoading ? 'hidden' : 'visible'}
          className="absolute inset-0 flex flex-col justify-between px-4 pb-12 pt-28 sm:px-7 md:px-12 md:pb-16"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeIn} className="flex items-center gap-2">
            <MapPin size={13} color={ACCENT} style={{ filter: 'drop-shadow(0 0 4px #E6FF2B66)' }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.26em]"
              style={{ color: '#1a1a1a' }}
            >
              Charleston, SC — Lowcountry
            </span>
          </motion.div>

          {/* Heading */}
          <div>
            <h1
              className="font-extrabold uppercase leading-[0.9] tracking-tight text-zinc-900"
              style={{ fontSize: 'clamp(3.4rem,9vw,8.5rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              <motion.span variants={slideUp} className="block">AREAS</motion.span>
              <motion.span variants={slideUp} className="block">WE SERVE</motion.span>
            </h1>

            <motion.p
              variants={fadeIn}
              className="mt-5 max-w-md text-base leading-relaxed text-zinc-500 md:text-lg"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              In-person training across the greater Lowcountry.
              Online coaching available anywhere in the world.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── Intro strip ─────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-10 sm:px-7 md:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 border-y border-zinc-100 py-10">
          {[
            { value: '14+', label: 'Areas Served' },
            { value: '25 mi', label: 'In-Person Radius' },
            { value: 'Worldwide', label: 'Online Coaching' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
            >
              <span
                className="font-extrabold leading-none text-zinc-900 text-[clamp(2.2rem,5vw,3.5rem)]"
                style={{ fontFamily: 'Unbounded, sans-serif' }}
              >
                {stat.value}
              </span>
              <span className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                {stat.label}
              </span>
            </motion.div>
          ))}

          <motion.div
            className="sm:max-w-xs"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.3 }}
          >
            <p
              className="text-[14px] leading-relaxed text-zinc-500"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Based in Charleston and serving clients across the entire Lowcountry — in the gym, at home, or through fully remote online coaching.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── In-Person Areas ─────────────────────────────────────────────────── */}
      <section className="bg-white px-4 pb-16 pt-10 sm:px-7 sm:pb-20 md:px-12 md:pb-24 md:pt-14">
        <motion.div
          className="mb-10 flex items-center gap-2.5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full"
            style={{ backgroundColor: ACCENT }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
            In-Person Training Areas
          </span>
        </motion.div>

        <motion.h2
          className="mb-10 font-extrabold uppercase leading-tight tracking-tight text-zinc-900"
          style={{ fontSize: 'clamp(1.6rem,4vw,3.2rem)', fontFamily: 'Unbounded, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
        >
          Greater Charleston &amp; Lowcountry
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inPerson.map((area, i) => (
            <AreaCard key={area.name} area={area} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </section>

      {/* ── Online-Only Areas ───────────────────────────────────────────────── */}
      {onlineOnly.length > 0 && (
        <section className="bg-[#F7F7F5] px-4 pb-16 pt-10 sm:px-7 sm:pb-20 md:px-12 md:pb-24 md:pt-14">
          <motion.div
            className="mb-10 flex items-center gap-2.5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Online Coaching — Outer Areas
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {onlineOnly.map((area, i) => (
              <AreaCard key={area.name} area={area} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </section>
      )}

      {/* ── Online Coaching — Anywhere ──────────────────────────────────────── */}
      <section className="bg-[#111111] px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Left */}
          <div>
            <motion.div
              className="mb-8 flex items-center gap-2.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: ACCENT }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.28em]"
                style={{ color: ACCENT }}
              >
                Online Coaching
              </span>
            </motion.div>

            <motion.h2
              className="mb-6 font-extrabold uppercase leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(1.8rem,4.5vw,4rem)', fontFamily: 'Unbounded, sans-serif' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
            >
              Not in Charleston?
              <br />
              No Problem.
            </motion.h2>

            <motion.p
              className="mb-8 max-w-sm text-base leading-relaxed text-white/55"
              style={{ fontFamily: 'Roboto, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              Online coaching brings the full BBB experience wherever you are —
              custom programming, daily accountability, and real results delivered
              entirely through your phone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.22 }}
            >
              <a
                href="/services/online-coaching"
                className="group inline-flex items-center gap-3 rounded-full bg-[#E6FF2B] px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 transition-colors duration-300 hover:bg-white"
              >
                Learn About Online Coaching
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* Right — perks list */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <Globe size={20} color={ACCENT} />
              <span
                className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50"
              >
                Available Everywhere
              </span>
            </div>

            {ONLINE_PERKS.map((perk, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white/5 px-5 py-4"
              >
                <CheckCircle2 size={16} color={ACCENT} className="mt-0.5 shrink-0" />
                <span
                  className="text-[14px] leading-relaxed text-white/70"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {perk}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Contact CTA band ────────────────────────────────────────────────── */}
      <section
        className="px-4 py-12 sm:px-7 md:px-12"
        style={{ backgroundColor: ACCENT }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">
              Not sure which option fits you?
            </p>
            <h2
              className="font-extrabold uppercase leading-tight text-zinc-950"
              style={{ fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Let&apos;s Figure It Out Together
            </h2>
          </div>
          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            Get in Touch
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>

      <FAQSection items={AREAS_FAQ} />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function AreasContent() {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <AreasPageContent />
      </ReactLenis>
    </LanguageProvider>
  );
}
