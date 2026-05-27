'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Dumbbell, Trophy, Home, Flame } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

const CARD_BG = '#252525';
const ACCENT  = '#E6FF2B';

const CARD_IMAGE =
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80';

export default function ServicesGridSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const container: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const cardIn: Variants = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  const iconBox = (Icon: React.ElementType) => (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
      <Icon size={22} color={ACCENT} />
    </div>
  );

  return (
    <section
      ref={ref}
      className="font-satoshi w-full bg-[#1a1a1a] px-4 py-20 sm:px-7 md:px-12 md:py-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <motion.div variants={fadeUp} className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                <Dumbbell size={12} className="text-zinc-950" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#E6FF2B]">
                Our Services
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-extrabold uppercase leading-[1.0] tracking-tight text-white
                         text-[clamp(2rem,4.5vw,4.5rem)]"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              WHERE STRENGTH
              <br />
              MEETS POWER
            </motion.h2>
          </div>

          <motion.div variants={fadeUp}>
            <motion.a
              href="/services"
              className="relative flex items-center gap-0 overflow-hidden rounded-full border-2
                         border-[#E6FF2B] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Left-to-right fill */}
              <motion.span
                className="absolute inset-0 bg-[#E6FF2B]"
                style={{ transformOrigin: 'left' }}
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Label */}
              <motion.span
                className="relative z-10 mr-3"
                variants={{ rest: { color: '#E6FF2B' }, hover: { color: '#09090b' } }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
              >
                More Services
              </motion.span>

              {/* Chevron circle — inverts on hover */}
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

        {/* ── Cards Grid ─────────────────────────────────────────────────── */}
        {/* Desktop: explicit 3-col × 2-row placement via inline styles      */}
        {/* Mobile:  simple vertical stack via flex-col                       */}

        {/* Mobile stack */}
        <div className="flex flex-col gap-3 md:hidden">
          {[
            { Icon: Dumbbell, title: 'ONLINE FITNESS TRAINING',
              desc: 'Train smarter from anywhere with fully custom programs built around your schedule and goals.',
              link: true },
            { Icon: Trophy,   title: 'ELITE PERSONAL TRAINING',
              desc: 'The highest level of 1-on-1 coaching — personalized programming and concierge-level attention.' },
            { Icon: Home,     title: 'AT HOME TRAINING',
              desc: 'No gym needed. A complete training experience designed around your home setup and schedule.' },
            { Icon: Flame,    title: 'FITNESS CLASSES',
              desc: 'Our fitness classes combine strength training, community energy, and good vibes in Charleston, SC.' },
          ].map(({ Icon, title, desc, link }) => (
            <motion.div
              key={title}
              variants={cardIn}
              className="flex flex-col rounded-2xl p-6"
              style={{ backgroundColor: CARD_BG }}
            >
              {iconBox(Icon)}
              <h3 className="mb-2 mt-5 font-bold uppercase text-white text-[20px]" style={{ fontFamily: 'Unbounded, sans-serif' }}>{title}</h3>
              <p className="text-[16px] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>{desc}</p>
              {link && (
                <motion.a
                  href="/services"
                  className="relative mt-4 w-fit text-xs font-bold uppercase tracking-widest text-[#E6FF2B]"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  View Details
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] bg-[#E6FF2B]"
                    variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Desktop grid */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: '1fr 1fr 2fr',
            gridTemplateRows:    '1fr 1fr',
            height:              '540px',
          }}
        >
          {/* ── Col 1: Online Fitness Training — full height ── */}
          <motion.div
            variants={cardIn}
            className="flex flex-col rounded-2xl p-6"
            style={{ backgroundColor: CARD_BG, gridColumn: '1', gridRow: '1 / span 2' }}
          >
            {iconBox(Dumbbell)}
            <div className="flex-1" />
            <h3 className="mb-2 font-bold uppercase text-white text-[20px]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              ONLINE FITNESS TRAINING
            </h3>
            <p className="mb-5 text-[16px] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>
              Train smarter from anywhere with fully custom programs built
              around your schedule, goals, and equipment.
            </p>
            <motion.a
              href="/services"
              className="relative w-fit text-xs font-bold uppercase tracking-widest text-[#E6FF2B]"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              View Details
              <motion.span
                className="absolute -bottom-0.5 left-0 h-[1.5px] bg-[#E6FF2B]"
                variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.a>
          </motion.div>

          {/* ── Col 2 Row 1: Elite Personal Training ── */}
          <motion.div
            variants={cardIn}
            className="flex flex-col rounded-2xl p-6"
            style={{ backgroundColor: CARD_BG, gridColumn: '2', gridRow: '1' }}
          >
            {iconBox(Trophy)}
            <h3 className="mb-2 mt-5 font-bold uppercase text-white text-[20px]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              ELITE PERSONAL TRAINING
            </h3>
            <p className="text-[16px] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>
              The highest level of 1-on-1 coaching with personalized programming and concierge-level attention.
            </p>
          </motion.div>

          {/* ── Col 2 Row 2: At Home Training ── */}
          <motion.div
            variants={cardIn}
            className="flex flex-col rounded-2xl p-6"
            style={{ backgroundColor: CARD_BG, gridColumn: '2', gridRow: '2' }}
          >
            {iconBox(Home)}
            <h3 className="mb-2 mt-5 font-bold uppercase text-white text-[20px]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              AT HOME TRAINING
            </h3>
            <p className="text-[16px] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>
              No gym needed. A complete training experience designed around your home setup and schedule.
            </p>
          </motion.div>

          {/* ── Col 3: Fitness Classes — full height, text left + image right ── */}
          <motion.div
            variants={cardIn}
            className="flex overflow-hidden rounded-2xl"
            style={{ backgroundColor: CARD_BG, gridColumn: '3', gridRow: '1 / span 2' }}
          >
            {/* Text side */}
            <div className="flex flex-1 flex-col p-6">
              {iconBox(Flame)}
              <div className="flex-1" />
              <h3 className="mb-2 font-bold uppercase text-white text-[20px]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                FITNESS CLASSES
              </h3>
              <p className="text-[16px] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>
                Our body fitness classes combine strength training, movements,
                and community energy built around real results.
              </p>
            </div>

            {/* Image side */}
            <div className="w-[52%] shrink-0 p-4">
              <div className="h-full w-full overflow-hidden rounded-xl">
                <img
                  src={CARD_IMAGE}
                  alt="Fitness Classes"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
