'use client';

import { motion, type Variants } from 'framer-motion';

const PACKAGES_HERO_IMAGE =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85';

type PackagesHeroSectionProps = {
  isLoading: boolean;
};

export default function PackagesHeroSection({ isLoading }: PackagesHeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.45 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headlineLine: Variants = {
    hidden: { opacity: 0, x: -80, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageZoom: Variants = {
    hidden: { scale: 1.12 },
    visible: {
      scale: 1,
      transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoading ? 'hidden' : 'visible'}
      className="relative h-full w-full overflow-hidden bg-black"
    >
      <motion.img
        variants={imageZoom}
        src={PACKAGES_HERO_IMAGE}
        alt="Body By Brad coaching packages"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />

      <div
        className="
          relative z-10 flex h-full w-full flex-col justify-between
          px-4 pt-28 pb-10
          sm:px-7 sm:pt-32
          md:px-12 md:pt-36 md:pb-14
        "
      >
        <motion.p
          variants={fadeUp}
          className="max-w-xs text-[13px] leading-snug text-white/85 sm:max-w-sm sm:text-sm md:max-w-md md:text-base"
        >
          Every plan includes Brad's full coaching attention. Choose the format that fits your life.
        </motion.p>

        <h1
          className="
            font-bold uppercase tracking-tight text-white
            leading-[0.92]
            text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[6vw]
          "
        >
          <motion.span variants={headlineLine} className="block">
            INVEST IN
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            YOURSELF
          </motion.span>
        </h1>
      </div>
    </motion.div>
  );
}
