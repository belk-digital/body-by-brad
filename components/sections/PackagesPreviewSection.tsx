'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Dumbbell, Check } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

const ACCENT  = '#E6FF2B';
const CARD_BG = '#252525';

const PLANS = [
  {
    label:   'FOUNDATION',
    price:   50,
    tagline: 'Redefine Your Routine',
    isAccent: false,
    features: [
      '8-Week Training Program',
      'App-Based Delivery',
      'Basic Nutrition Guidance',
      'Monthly Progress Review',
    ],
  },
  {
    label:   'PERFORMANCE',
    price:   250,
    tagline: 'Elevate Your Routine',
    isAccent: true,
    features: [
      'Everything in Foundation',
      'Personalized Program',
      'Weekly Check-In Call',
      'Unlimited Messaging',
    ],
  },
  {
    label:   'ELITE',
    price:   500,
    tagline: 'Life Changing Routine',
    isAccent: false,
    features: [
      'Everything in Performance',
      'Concierge Coaching',
      'Daily Communication',
      'Quarterly In-Person Session',
    ],
  },
];

export default function PackagesPreviewSection() {
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const container: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const cardIn: Variants = {
    hidden:  { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
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
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <motion.div variants={fadeUp} className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                <Dumbbell size={12} className="text-zinc-950" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                Our Pricing
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-extrabold uppercase leading-none tracking-tight text-white
                         text-[clamp(2rem,4.5vw,4.5rem)]"
            >
              EXCLUSIVE GYM
              <br />
              PACKAGES
            </motion.h2>
          </div>

          {/* See All Packages button */}
          <motion.div variants={fadeUp}>
            <motion.a
              href="/packages"
              className="relative flex items-center gap-0 overflow-hidden rounded-full border-2
                         border-[#E6FF2B] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                className="absolute inset-0 bg-[#E6FF2B]"
                style={{ transformOrigin: 'left' }}
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="relative z-10 mr-3"
                variants={{ rest: { color: '#E6FF2B' }, hover: { color: '#09090b' } }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
              >
                See All Packages
              </motion.span>
              <motion.span
                className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
                variants={{
                  rest:  { backgroundColor: '#E6FF2B', color: '#09090b' },
                  hover: { backgroundColor: '#09090b', color: '#E6FF2B' },
                }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
              >
                <IoChevronForward size={11} />
                <IoChevronForward size={11} className="-ml-1.5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* ── Cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isAccent    = plan.isAccent;
            const cardBg      = isAccent ? ACCENT : CARD_BG;
            const textPrimary = isAccent ? '#09090b' : '#ffffff';
            const textMuted   = isAccent ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.45)';
            const accentCol   = isAccent ? '#09090b' : ACCENT;
            const dividerCol  = isAccent ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';

            return (
              <motion.div
                key={plan.label}
                variants={cardIn}
                className="flex flex-col rounded-2xl p-6 lg:p-7"
                style={{ backgroundColor: cardBg }}
              >
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
                    style={{ fontSize: 'clamp(2.4rem,4vw,3.2rem)', color: textPrimary }}
                  >
                    ${plan.price}
                  </span>
                  <span className="mb-1 text-xs font-semibold" style={{ color: textMuted }}>
                    /month
                  </span>
                </div>

                {/* Tagline */}
                <p className="mb-6 text-xs font-medium leading-snug" style={{ color: textMuted }}>
                  {plan.tagline}
                </p>

                {/* Divider */}
                <div className="mb-5 h-px w-full" style={{ backgroundColor: dividerCol }} />

                {/* Key features */}
                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={12} className="mt-0.5 shrink-0" style={{ color: accentCol }} />
                      <span className="text-[11px] leading-snug" style={{ color: textMuted }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
