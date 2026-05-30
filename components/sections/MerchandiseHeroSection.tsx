'use client';

import { motion, type Variants } from 'framer-motion';

const MERCH_HERO_IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779379374/IMG_3076_llkeme.webp';

type MerchandiseHeroSectionProps = {
  isLoading: boolean;
};

export default function MerchandiseHeroSection({ isLoading }: MerchandiseHeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const imageZoom: Variants = {
    hidden: { scale: 1.12 },
    visible: {
      scale: 1,
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const headlineReveal: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
        src={MERCH_HERO_IMAGE}
        alt="Body By Brad merchandise"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
        draggable={false}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/70" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <motion.h1
          variants={headlineReveal}
          className="font-bold uppercase tracking-tight text-white text-center leading-none text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw]"
        >
          BUILT FOR THE GYM
        </motion.h1>
      </div>
    </motion.div>
  );
}
