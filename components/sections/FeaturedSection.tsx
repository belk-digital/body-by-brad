'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const features = [
  'Premium quality fabrics',
  'Street-ready & gym-approved',
  'Limited edition drops',
];

export default function FeaturedSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  const leftSlide: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
  };

  const rightSlide: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease, delay: 0.15 } },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease } },
  };

  return (
    <section
      ref={ref}
      id="featured"
      className="font-satoshi w-full bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-4 min-h-[480px] md:min-h-[560px]">

        {/* Left: lime green info panel */}
        <motion.div
          variants={leftSlide}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="rounded-2xl overflow-hidden bg-[#E6FF2B] p-8 sm:p-10 md:p-12 flex flex-col justify-between gap-8"
        >
          {/* Staggered top content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-zinc-900 rounded-full pl-1 pr-4 py-1 mb-6">
              <span className="w-6 h-6 rounded-full bg-[#E6FF2B] flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={12} className="text-zinc-900" />
              </span>
              <span className="text-[#E6FF2B] text-[11px] font-bold uppercase tracking-widest">
                New Collection
              </span>
            </motion.span>
            <motion.h3 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-950 leading-[1.05]">
              {t.merchCardTitleL1}
              <br />
              {t.merchCardTitleL2}
            </motion.h3>
            <motion.p variants={fadeUp} className="text-zinc-700 text-sm sm:text-base leading-relaxed mt-4 max-w-xs">
              {t.merchCardDesc}
            </motion.p>
          </motion.div>

          {/* Button — delayed separately so it trails the stagger */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.65, ease, delay: 0.65 }}
          >
            <motion.a
              href="/merchandise"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-950 text-white px-8 py-4 text-sm font-bold uppercase tracking-wide w-fit"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                className="absolute inset-0 bg-zinc-700"
                variants={{ rest: { x: '-101%' }, hover: { x: 0 } }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              />
              <span className="relative z-10">{t.merchCardBtn}</span>
              <span className="relative z-10">→</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: image with overlay feature card */}
        <motion.div
          variants={rightSlide}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="rounded-2xl overflow-hidden relative min-h-[340px] md:min-h-0"
        >
          <img
            src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779379374/IMG_3076_llkeme.webp"
            alt="Body By Brad Merchandise"
            className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-700"
          />

          <motion.div
            className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl p-5 max-w-[260px] sm:max-w-[280px] shadow-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
          >
            <p className="text-zinc-950 font-bold text-sm sm:text-base leading-snug mb-3">
              Built for the gym. Made for the streets.
            </p>
            <ul className="flex flex-col gap-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-zinc-700 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#DFF994] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#111827"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
