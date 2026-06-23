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
import Link from 'next/link';
import { MapPin, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import { AREAS_DATA, type AreaData } from '@/lib/areas-data';

const AREAS_FAQ = [
  {
    q: 'What areas around Charleston do you serve?',
    a: 'We serve Charleston, Mount Pleasant, North Charleston, Summerville, Goose Creek, Hanahan, Daniel Island, Johns Island, James Island, and West Ashley.',
  },
  {
    q: 'Do you offer online fitness coaching?',
    a: 'Yes. We provide online coaching programs for clients nationwide with customized workout programming, nutrition guidance, weekly check-ins, and accountability coaching.',
  },
  {
    q: 'Can I join from Mount Pleasant?',
    a: 'Absolutely. We work with clients throughout Mount Pleasant and the surrounding Lowcountry with both in-person and online coaching options.',
  },
  {
    q: 'What fitness services do you offer?',
    a: 'We offer personal training, body transformation coaching, nutrition guidance, accountability coaching, fitness challenges, and online coaching.',
  },
  {
    q: 'Can fitness coaching help me lose weight?',
    a: 'Yes. Our coaching programs focus on sustainable weight loss through personalized training and nutrition support.',
  },
  {
    q: 'How often do I receive support?',
    a: 'Most coaching programs include regular check-ins, progress tracking, and ongoing communication to keep you accountable and on track.',
  },
  {
    q: 'Do you provide nutrition coaching?',
    a: 'Yes. Nutrition guidance is integrated into many of our coaching programs to support real-world lifestyles and long-term health.',
  },
  {
    q: 'How do I get started?',
    a: "Schedule a consultation and we'll recommend the best coaching option for your goals. Reach out through the Contact page or DM on Instagram.",
  },
];

// ── Data ─────────────────────────────────────────────────────────────────────

const ACCENT = '#E6FF2B';
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];


const ONLINE_PERKS = [
  'Customized workout programming',
  'Nutrition guidance',
  'Weekly check-ins',
  'Progress monitoring',
  'Accountability coaching',
];

// ── Area Card ─────────────────────────────────────────────────────────────────

function AreaCard({ area, delay }: { area: AreaData; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <Link href={`/areas-we-serve-charleston-sc/${area.slug}`} className="block">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease, delay }}
      className="group flex flex-col gap-4 rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer"
      style={{ backgroundColor: '#191919' }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <MapPin size={16} color={area.inPerson ? ACCENT : '#52525b'} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={
              area.inPerson
                ? { backgroundColor: ACCENT, color: '#1a1a1a' }
                : { backgroundColor: '#2a2a2a', color: '#71717a' }
            }
          >
            {area.inPerson ? 'In-Person' : 'Online Only'}
          </span>

          {area.inPerson && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400" style={{ backgroundColor: '#2a2a2a' }}>
              + Online
            </span>
          )}
        </div>
      </div>

      {/* Name + sub */}
      <div>
        <h3
          className="font-bold uppercase text-white text-[17px] leading-tight"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
        >
          {area.name}
        </h3>
        <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-zinc-500">
          {area.sub}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-[13px] leading-relaxed text-zinc-400"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {area.desc}
      </p>

      {/* Distance chip */}
      <div className="mt-auto pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
          Distance from Charleston
        </span>
        <span
          className="text-[12px] font-bold uppercase tracking-wider"
          style={{ fontFamily: 'Unbounded, sans-serif', color: area.distance === 'Home Base' ? ACCENT : '#71717a' }}
        >
          {area.distance}
        </span>
      </div>
    </motion.div>
    </Link>
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

  const inPerson = AREAS_DATA.filter((a) => a.inPerson);
  const onlineOnly = AREAS_DATA.filter((a) => !a.inPerson);

  return (
    <div className="relative w-full font-satoshi overflow-x-hidden bg-[#F7F7F5]">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-[#F7F7F5]"
        style={{ minHeight: 'clamp(520px, 72vh, 860px)' }}
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
              style={{ fontSize: 'clamp(2.8rem,7.5vw,7rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              <motion.span variants={slideUp} className="block">Personal Training</motion.span>
              <motion.span variants={slideUp} className="block">&amp; Fitness Coaching</motion.span>
              <motion.span variants={slideUp} className="block">Throughout Charleston SC</motion.span>
            </h1>

            <motion.p
              variants={fadeIn}
              className="mt-5 max-w-lg text-base leading-relaxed text-zinc-500 md:text-lg"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Helping Charleston and the Lowcountry get stronger, healthier, and more confident through expert coaching, accountability, and community-driven fitness experiences.
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
              Whether you are looking to lose weight, build muscle, improve athletic performance, or transform your lifestyle, Body By Brad serves clients throughout Charleston and surrounding communities.
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
          Areas We Serve Across The Lowcountry
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

      {/* ── City Coaching Sections ────────────────────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Charleston SC */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-zinc-900 mb-6"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Fitness Coaching In Charleston SC
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-zinc-50 p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-tight text-zinc-950 mb-2">Weight Loss Coaching</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Our Charleston fitness coaching programs help individuals create sustainable habits that support long-term fat loss and improved health.</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-tight text-zinc-950 mb-2">Body Transformation Programs</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Through personalized workouts, accountability systems, and nutrition support, clients achieve lasting body composition changes.</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-tight text-zinc-950 mb-2">Fitness Challenges</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Join Charleston&apos;s growing fitness community through our signature fitness challenges designed to inspire motivation and consistency.</p>
              </div>
            </div>
          </motion.div>

          {/* Mount Pleasant SC */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-zinc-900 mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Fitness Coaching In Mount Pleasant SC
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed mb-6">
              Clients in Mount Pleasant benefit from personalized fitness coaching, transformation programs, and expert accountability support.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Weight loss coaching', 'Strength training', 'Muscle building programs', 'Personalized workout plans', 'Nutrition coaching'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* North Charleston SC */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-zinc-900 mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Fitness Coaching In North Charleston SC
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed mb-6">
              We help North Charleston residents improve fitness, increase strength, and achieve sustainable weight loss through structured coaching systems.
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {['Beginners', 'Busy professionals', 'Athletes', 'Transformation clients'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Summerville SC */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-zinc-900 mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Fitness Coaching In Summerville SC
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed mb-6">
              Our coaching programs help Summerville residents develop healthier habits and achieve long-term fitness success.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Fitness assessments', 'Personalized coaching', 'Weekly accountability', 'Progress tracking', 'Lifestyle coaching'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── Why Charleston Chooses Body By Brad ─────────────────────────────── */}
      <section className="bg-zinc-950 px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E6FF2B] block mb-4"
          >
            Why Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.07 }}
            className="font-extrabold uppercase leading-tight tracking-tight text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontFamily: 'Unbounded, sans-serif' }}
          >
            Why Charleston Chooses Body By Brad
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Personalized Coaching', desc: 'No cookie-cutter plans. Every client receives customized coaching tailored to their goals and lifestyle.' },
              { title: 'Community Support', desc: 'Our fitness challenges and community events help clients stay motivated and connected.' },
              { title: 'Evidence-Based Training', desc: 'Programs built around proven strength and conditioning principles supported by ACSM and NSCA.' },
              { title: 'Sustainable Results', desc: 'We focus on long-term success rather than quick fixes through habit formation and accountability.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 p-6"
              >
                <h3
                  className="font-bold uppercase text-white text-[15px] leading-tight mb-3"
                  style={{ fontFamily: 'Unbounded, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Online Coaching
              <br />
              Available Anywhere
            </motion.h2>

            <motion.p
              className="mb-8 max-w-sm text-base leading-relaxed text-white/55"
              style={{ fontFamily: 'Roboto, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              Not located in Charleston? Our online fitness coaching programs allow clients across
              the country to receive expert support. This flexibility allows you to train anywhere while
              still receiving personalized programming and accountability.
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
              Ready to transform your fitness?
            </p>
            <h2
              className="font-extrabold uppercase leading-tight text-zinc-950"
              style={{ fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Book Your Consultation
            </h2>
          </div>
          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            Book Your Consultation
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
    <ReactLenis root>
      <AreasPageContent />
    </ReactLenis>
  );
}
