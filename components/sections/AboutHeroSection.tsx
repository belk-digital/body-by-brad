'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const ABOUT_HERO_IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1200/v1779735223/DSC00643_onxic2.webp';

type AboutHeroSectionProps = {
  isLoading: boolean;
};

export default function AboutHeroSection({ isLoading }: AboutHeroSectionProps) {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.4 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const headlineLine: Variants = {
    hidden: { opacity: 0, x: -120, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.06, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 },
    },
  };

  const heroImage = ABOUT_HERO_IMAGE;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoading ? 'hidden' : 'visible'}
      className="
        relative grid h-full w-full grid-cols-1 gap-10 px-4 pt-32 pb-10
        sm:px-7 sm:pt-36
        md:grid-cols-[1fr_1.1fr] md:items-stretch md:gap-12 md:px-12 md:pt-36 md:pb-12
        lg:gap-16
      "
    >
      <div className="flex flex-col justify-between gap-12 md:h-full">
        <motion.p
          variants={fadeUp}
          className="max-w-sm text-[15px] leading-snug text-zinc-700 md:text-base"
        >
          {t.aboutHeroDesc}
        </motion.p>

        <h1
          className="
            font-bold uppercase leading-[0.92] tracking-tight text-zinc-950
            text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[5.2vw]
          "
        >
          <motion.span variants={headlineLine} className="block">
            {t.aboutHeroL1}
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            {t.aboutHeroL2}
          </motion.span>
        </h1>
      </div>

      <motion.div
        variants={imageReveal}
        className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] min-h-[55vh] md:h-full md:min-h-0"
      >
        <Image
          src={heroImage}
          alt="Body By Brad community"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </motion.div>
    </motion.div>
  );
}
