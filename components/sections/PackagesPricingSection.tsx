'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Dumbbell, Check } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

const ACCENT = '#E6FF2B';
const CARD_BG = '#252525';

const PLANS = [
  {
    label: 'FOUNDATION',
    price: 50,
    tagline: 'Redefine Your Routine',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
    isAccent: false,
    features: [
      '8-Week Training Program',
      'App-Based Delivery',
      'Exercise Demos Included',
      'Weekly Habit Tracking',
      'Basic Nutrition Guidance',
      'Monthly Progress Review',
      'Lifestyle Guidance',
    ],
  },
  {
    label: 'PERFORMANCE',
    price: 250,
    tagline: 'Elevate Your Routine',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80',
    isAccent: true,
    features: [
      'Everything in Foundation',
      'Personalized Program',
      'Custom Macro Targets',
      'Cardio & Recovery Plans',
      'Weekly Check-In Call',
      'Form Review & Feedback',
      'Unlimited Messaging',
      'Travel Modifications',
      'Monthly Analytics',
      'Bonus Event Access',
    ],
  },
  {
    label: 'ELITE',
    price: 500,
    tagline: 'Life Changing Routine',
    image:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80',
    isAccent: false,
    features: [
      'Everything in Performance',
      'Concierge Coaching',
      'Daily Communication',
      'Same-Day Modifications',
      'Mobility Protocols',
      'Supplement Guidance',
      'Meal Strategy Planning',
      'Mindset Coaching',
      'VIP Event Access',
      'Quarterly In-Person',
    ],
  },
];

type Plan = (typeof PLANS)[0];

function PlanCard({ plan, delay = 0 }: { plan: Plan; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { isAccent } = plan;

  const cardBg       = isAccent ? ACCENT : CARD_BG;
  const textPrimary  = isAccent ? '#09090b' : '#ffffff';
  const textMuted    = isAccent ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.45)';
  const accentCol    = isAccent ? '#09090b' : ACCENT;
  const dividerCol   = isAccent ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';

  // Button: rest state uses accent color as border + text, fill on hover
  const btnBorder    = accentCol;
  const btnFill      = accentCol;
  const labelRest    = accentCol;
  const labelHover   = isAccent ? ACCENT : '#09090b';
  const circRest     = { bg: accentCol, text: isAccent ? ACCENT : '#09090b' };
  const circHover    = { bg: isAccent ? ACCENT : '#09090b', text: accentCol };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay }}
      className="flex overflow-hidden rounded-2xl"
      style={{ backgroundColor: cardBg }}
    >
      {/* ── Text side ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {/* Plan label */}
        <p
          className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: accentCol }}
        >
          {plan.label}
        </p>

        {/* Price */}
        <div className="mb-1 flex items-end gap-1.5">
          <span
            className="font-extrabold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem,4vw,3.5rem)', color: textPrimary }}
          >
            ${plan.price}
          </span>
          <span className="mb-1 text-xs font-semibold" style={{ color: textMuted }}>
            /month
          </span>
        </div>

        {/* Tagline */}
        <p className="mb-5 text-xs font-medium leading-snug" style={{ color: textMuted }}>
          {plan.tagline}
        </p>

        {/* JOIN NOW button */}
        <motion.a
          href="/contact"
          className="relative mb-5 flex w-full items-center justify-between overflow-hidden rounded-full border-2 py-3 pl-5 pr-2"
          style={{ borderColor: btnBorder }}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Left-to-right fill */}
          <motion.span
            className="absolute inset-0"
            style={{ backgroundColor: btnFill, transformOrigin: 'left' }}
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          />
          {/* Label */}
          <motion.span
            className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest"
            variants={{ rest: { color: labelRest }, hover: { color: labelHover } }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            Join Now
          </motion.span>
          {/* Chevron circle */}
          <motion.span
            className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            variants={{
              rest:  { backgroundColor: circRest.bg,  color: circRest.text  },
              hover: { backgroundColor: circHover.bg, color: circHover.text },
            }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <IoChevronForward size={11} />
            <IoChevronForward size={11} className="-ml-1.5" />
          </motion.span>
        </motion.a>

        {/* Divider */}
        <div className="mb-5 h-px w-full" style={{ backgroundColor: dividerCol }} />

        {/* Features */}
        <p
          className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{ color: textPrimary }}
        >
          Features:
        </p>
        <ul className="flex flex-col gap-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check size={12} className="mt-0.5 shrink-0" style={{ color: accentCol }} />
              <span
                className="text-[11px] leading-snug"
                style={{ color: textMuted }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Portrait image (desktop only) ─────────────── */}
      <div className="hidden w-[38%] shrink-0 p-4 lg:flex lg:items-stretch">
        <div
          className="w-full overflow-hidden rounded-xl"
        >
          <img
            src={plan.image}
            alt={plan.label}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const container: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={ref}
      className="font-satoshi w-full bg-[#1a1a1a] px-4 py-20 sm:px-7 md:px-12 md:py-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-7xl"
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-12 text-center md:mb-16">
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
              <Dumbbell size={12} className="text-zinc-950" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
              Our Pricing
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-extrabold uppercase leading-[1.0] tracking-tight text-white
                       text-[clamp(2rem,4.5vw,4.5rem)]"
          >
            EXCLUSIVE GYM
            <br />
            PACKAGES
          </motion.h2>
        </div>

        {/* ── Mobile stack ────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 md:hidden">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.label} plan={plan} delay={i * 0.1} />
          ))}
        </div>

        {/* ── Desktop grid ─────────────────────────────────────────── */}
        {/* Row 1: Foundation | Performance side-by-side               */}
        {/* Row 2: Elite — full width                                  */}
        <div className="hidden gap-4 md:grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Foundation */}
          <PlanCard plan={PLANS[0]} delay={0} />

          {/* Performance */}
          <PlanCard plan={PLANS[1]} delay={0.1} />

          {/* Elite — spans both columns */}
          <div style={{ gridColumn: '1 / span 2' }}>
            <EliteCard plan={PLANS[2]} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Elite full-width card ───────────────────────────────────────────────── */

function EliteCard({ plan }: { plan: Plan }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const textMuted  = 'rgba(255,255,255,0.45)';
  const dividerCol = 'rgba(255,255,255,0.08)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
      className="flex overflow-hidden rounded-2xl"
      style={{ backgroundColor: CARD_BG }}
    >
      {/* Text area — vertical stack, no dead space */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        {/* Label */}
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
          {plan.label}
        </p>

        {/* Price */}
        <div className="mb-1 flex items-end gap-1.5">
          <span
            className="font-extrabold leading-none tracking-tight text-white"
            style={{ fontSize: 'clamp(2.4rem,4vw,3.5rem)' }}
          >
            ${plan.price}
          </span>
          <span className="mb-1 text-xs font-semibold" style={{ color: textMuted }}>
            /month
          </span>
        </div>

        {/* Tagline */}
        <p className="mb-5 text-xs font-medium leading-snug" style={{ color: textMuted }}>
          {plan.tagline}
        </p>

        {/* JOIN NOW — capped width to match Foundation / Performance */}
        <motion.a
          href="/contact"
          className="relative mb-5 flex w-full max-w-[320px] items-center justify-between overflow-hidden rounded-full border-2 py-3 pl-5 pr-2"
          style={{ borderColor: ACCENT }}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.span
            className="absolute inset-0"
            style={{ backgroundColor: ACCENT, transformOrigin: 'left' }}
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          />
          <motion.span
            className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest"
            variants={{ rest: { color: ACCENT }, hover: { color: '#09090b' } }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            Join Now
          </motion.span>
          <motion.span
            className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            variants={{
              rest:  { backgroundColor: ACCENT, color: '#09090b' },
              hover: { backgroundColor: '#09090b', color: ACCENT },
            }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <IoChevronForward size={11} />
            <IoChevronForward size={11} className="-ml-1.5" />
          </motion.span>
        </motion.a>

        {/* Divider */}
        <div className="mb-5 h-px w-full" style={{ backgroundColor: dividerCol }} />

        {/* Features — 2-col grid fills remaining space */}
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
          Features:
        </p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check size={12} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span className="text-[11px] leading-snug" style={{ color: textMuted }}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Portrait image */}
      <div className="hidden w-[35%] shrink-0 p-4 lg:flex lg:items-stretch">
        <div className="w-full overflow-hidden rounded-xl">
          <img
            src={plan.image}
            alt={plan.label}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}
