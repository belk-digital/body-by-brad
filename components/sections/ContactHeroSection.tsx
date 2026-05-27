'use client';

import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const CONTACT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2400&q=80';

type ContactHeroSectionProps = {
  isLoading: boolean;
};

export default function ContactHeroSection({ isLoading }: ContactHeroSectionProps) {
  const { t } = useLanguage();

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
        src={CONTACT_HERO_IMAGE}
        alt="Body By Brad training studio"
        className="absolute inset-0 h-full w-full object-cover"
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
          {t.contactHeroDesc}
        </motion.p>

        <h1
          className="
            font-bold uppercase tracking-tight text-white
            leading-[0.92]
            text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[6vw]
          "
        >
          <motion.span variants={headlineLine} className="block">
            {t.contactHeroL1}
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            {t.contactHeroL2}
          </motion.span>
        </h1>
      </div>
    </motion.div>
  );
}
