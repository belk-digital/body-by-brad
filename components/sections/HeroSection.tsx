'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { heroBackgroundUrl, heroModelUrl } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';
import CountUp from '@/components/ui/CountUp';

type HeroSectionProps = {
  isLoading: boolean;
};

export default function HeroSection({ isLoading }: HeroSectionProps) {
  const { t } = useLanguage();

  const [modelX] = useState<number>(() => {
    if (typeof window === 'undefined') return 42;
    const w = window.innerWidth;
    if (w < 640) return Math.round(w * 0.22); // ~79px @360, ~86px @390, ~91px @414
    if (w < 768) return 65;
    return 42;
  });

  const [modelY] = useState<number>(() => {
    if (typeof window === 'undefined') return 42;
    if (window.innerWidth < 640) return 20;
    if (window.innerWidth < 768) return 32;
    return 42;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const titleVariants: Variants = {
    hidden: { y: 100, opacity: 0, filter: 'blur(18px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        filter: { duration: 0.9, ease: 'easeOut' },
      },
    },
  };

  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        filter: { duration: 0.7, ease: 'easeOut' },
      },
    },
  };

  return (
    <>
      {/* Background image */}
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={isLoading ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={heroBackgroundUrl}
        alt="Background"
        loading="eager"
        fetchPriority="high"
      />

      {/* Model image */}
      <motion.img
        initial={{ x: 80, y: 42, scale: 1.42, opacity: 0 }}
        animate={
          isLoading
            ? { x: 80, y: 42, scale: 1.42, opacity: 0 }
            : { x: modelX, y: modelY, scale: 1.42, opacity: 1 }
        }
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain object-bottom grayscale"
        src={heroModelUrl}
        alt="Fitness model preparing to train"
        loading="eager"
        fetchPriority="high"
      />

      {/* Foreground content — z-30 so Framer's stacking context sits above the model (z-20) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoading ? 'hidden' : 'visible'}
        className="relative z-30 h-full w-full"
      >
        {/* "built" — mobile: left-aligned stack | sm: staircase | md: desktop diagonal */}
        <motion.h1
          variants={titleVariants}
          className="
            hero-title absolute z-10 text-[#DFF994] leading-none
            text-[25vw] font-semibold left-4       top-[15%]
            sm:text-[14vw] sm:font-bold   sm:left-6    sm:top-[18%]
            md:text-[13vw] md:font-medium md:left-10   md:top-[22%]
          "
        >
          built
        </motion.h1>

        {/* "for" */}
        <motion.h1
          variants={titleVariants}
          className="
            hero-title absolute z-30 text-[#DFF994] leading-none
            text-[25vw] font-semibold left-4       top-[37%]
            sm:text-[14vw] sm:font-bold   sm:left-[28%] sm:top-[36%]
            md:text-[13vw] md:font-medium md:left-[28%] md:top-[62%]
          "
        >
          for
        </motion.h1>

        {/* "more" */}
        <motion.h1
          variants={titleVariants}
          className="
            hero-title absolute z-10 text-[#DFF994] leading-none
            text-[25vw] font-semibold left-4       top-[58%]
            sm:text-[14vw] sm:font-bold   sm:left-[52%] sm:top-[54%]
            md:text-[13vw] md:font-medium md:left-auto  md:right-10 md:top-[48%]
          "
        >
          more
        </motion.h1>

        {/* Subtext top-right — tablet + desktop only */}
        <motion.p
          variants={fadeVariants}
          className="
            hidden
            sm:block sm:absolute sm:right-6 sm:top-[20%] sm:z-30
            sm:max-w-55 sm:text-[13px]
            md:right-10 md:top-[32%] md:max-w-65 md:text-[15px]
            leading-snug text-white/90 text-right
          "
        >
          {t.heroDescRight}
        </motion.p>

        {/* Description paragraph */}
        <motion.p
          variants={fadeVariants}
          className="
            absolute z-30 leading-snug text-white
            left-4    top-[76%]   max-w-[60vw]  text-[13px] font-bold
            sm:left-6 sm:top-[72%] sm:max-w-[44vw] sm:text-[13px] sm:font-semibold
            md:left-10 md:top-[50%] md:max-w-60 md:text-[15px] md:font-normal md:text-white/90
          "
        >
          {t.heroDescLeft}
        </motion.p>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-25 h-48 bg-linear-to-b from-transparent to-black" />

        {/* Stat — bottom-left */}
        <motion.div
          variants={fadeVariants}
          className="absolute left-4 bottom-6 z-30 sm:left-6 md:left-20 md:bottom-24"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight tabular-nums">
              <CountUp end={8} prefix="+" delay={1100} start={!isLoading} />
            </span>
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-white/70 mt-1">{t.yearsLabel}</p>
        </motion.div>

        {/* Stat — bottom-right */}
        <motion.div
          variants={fadeVariants}
          className="absolute right-4 bottom-6 z-30 sm:right-6 md:right-20 md:bottom-20"
        >
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            <span className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight tabular-nums">
              <CountUp end={1.2} prefix="+" suffix="k" decimals={1} delay={1300} start={!isLoading} />
            </span>
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-white/70 mt-1 text-right">{t.sessionsLabel}</p>
        </motion.div>
      </motion.div>
    </>
  );
}
