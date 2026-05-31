'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import Image from 'next/image';
import {
  bradImagePool,
  heroBackgroundUrl,
  heroModelUrl,
} from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

type HeroSectionProps = {
  isLoading: boolean;
};

export default function HeroSection({ isLoading }: HeroSectionProps) {
  const { t } = useLanguage();

  const modelMaskRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springX = useSpring(cursorX, { damping: 24, stiffness: 220, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 24, stiffness: 220, mass: 0.5 });
  const maskImage = useMotionTemplate`radial-gradient(circle 180px at ${springX}px ${springY}px, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)`;

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 220]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modelMaskRef.current) return;
    const rect = modelMaskRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    cursorX.set(-400);
    cursorY.set(-400);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.35 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const headlineLine: Variants = {
    hidden: { opacity: 0, x: -120, filter: 'blur(14px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const [thumbnailTick, setThumbnailTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setThumbnailTick((value) => value + 1),
      1200,
    );
    return () => window.clearInterval(id);
  }, []);
  const thumbnailImage = bradImagePool[thumbnailTick % bradImagePool.length];

  return (
    <>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={isLoading ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroBackgroundUrl}
          alt="Body By Brad"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-black/45 via-black/15 to-black/75" />

      <div
        className="pointer-events-none absolute inset-0 z-15"
        style={{
          background:
            'radial-gradient(ellipse 52% 68% at 50% 58%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 1.06 }}
        animate={
          isLoading
            ? { opacity: 0, y: 60, scale: 1.06 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.25 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[82%] w-full"
      >
        <motion.div
          ref={modelMaskRef}
          style={{ y: parallaxY }}
          className="relative h-full w-full"
        >
          <Image
            src={heroModelUrl}
            alt="Body By Brad model"
            fill
            priority
            className="object-cover object-bottom grayscale select-none sm:object-contain"
            sizes="(max-width: 640px) 100vw, 60vw"
          />
          <motion.img
            src={heroModelUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 mx-auto h-full w-full object-cover object-bottom select-none sm:object-contain"
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
            }}
            loading="eager"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={containerVariants}
        initial="hidden"
        animate={isLoading ? 'hidden' : 'visible'}
        className="relative z-30 h-full w-full"
      >
        <motion.p
          variants={fadeUp}
          className="
            absolute left-4 top-[18%] max-w-[78vw] text-[13px] leading-snug text-white
            sm:left-6 sm:top-[18%] sm:max-w-[44vw] sm:text-[14px]
            md:left-10 md:top-[20%] md:max-w-sm md:text-[15px]
          "
        >
          {t.heroDescRight}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="
            hidden sm:flex sm:absolute sm:right-6 sm:top-[18%]
            md:right-10 md:top-[20%]
            flex-col items-end text-white
          "
        >
          <AnimatedCounter
            endValue={1.2}
            prefix="+"
            suffix="k"
            decimals={1}
            duration={2}
            delay={1.1}
            easing="easeOut"
            start={!isLoading}
            className="text-[42px] md:text-[64px] font-bold leading-none tracking-tight tabular-nums"
          />
          <span className="mt-1 text-[12px] md:text-sm text-white/80">{t.sessionsLabel}</span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="
            hidden sm:flex sm:absolute sm:right-6 sm:top-[40%]
            md:right-10 md:top-[42%]
            flex-col items-end text-white
          "
        >
          <AnimatedCounter
            endValue={8}
            prefix="+"
            decimals={0}
            duration={2}
            delay={1.3}
            easing="easeOut"
            start={!isLoading}
            className="text-[42px] md:text-[64px] font-bold leading-none tracking-tight tabular-nums"
          />
          <span className="mt-1 text-[12px] md:text-sm text-white/80">{t.yearsLabel}</span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="
            hidden md:block absolute right-10 bottom-14 z-30
            w-55 lg:w-65 aspect-16/10 overflow-hidden rounded-md
            shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]
          "
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={thumbnailImage}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={thumbnailImage}
                alt="Body By Brad"
                fill
                className="object-cover"
                sizes="20vw"
                priority={thumbnailTick === 0}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <h1
          className="
            absolute left-4 bottom-8 z-30 max-w-[88vw] font-bold uppercase leading-[0.95] tracking-tight text-white
            text-[7.5vw] sm:left-6 sm:bottom-10 sm:max-w-[52vw] sm:text-[5.8vw]
            md:left-10 md:bottom-14 md:max-w-[44vw] md:text-[4.4vw]
          "
        >
          <motion.span variants={headlineLine} className="block">
            {t.heroHeadline1}
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            {t.heroHeadline2}
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            {t.heroHeadline3}
          </motion.span>
        </h1>
      </motion.div>
    </>
  );
}
