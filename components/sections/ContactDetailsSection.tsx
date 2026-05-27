'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactDetailsSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const cardReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#005BB5] px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-6xl"
      >
        <motion.div
          variants={cardReveal}
          className="
            grid grid-cols-1 gap-10 rounded-sm bg-[#F9F7F2]
            px-6 py-10
            sm:px-10 sm:py-14
            md:grid-cols-[1fr_1fr] md:gap-16 md:px-14 md:py-20
            lg:px-20 lg:py-24
          "
        >
          <div className="flex items-end md:items-end">
            <h2 className="font-bold uppercase leading-[0.95] tracking-tight text-[#684556] text-[10vw] sm:text-[7vw] md:text-[4vw] lg:text-[3.2rem]">
              {t.contactDetailsTitle}
            </h2>
          </div>

          <div className="md:border-l md:border-[#898A8D]/30 md:pl-12">
            <motion.div variants={itemReveal} className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#684556]">
                {t.contactStudioLabel}
              </p>
              {t.contactStudioAddress.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-[#898A8D] md:text-base">
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.div variants={itemReveal} className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#684556]">
                {t.contactPhoneLabel}
              </p>
              <a
                href={`tel:${t.contactPhoneNumber.replace(/\s|\(|\)|-/g, '')}`}
                className="text-sm text-[#898A8D] transition-colors hover:text-[#684556] md:text-base"
              >
                {t.contactPhoneNumber}
              </a>
              <p className="mt-1 text-xs text-[#898A8D]/80 md:text-sm">
                {t.contactPhoneNote}
              </p>
            </motion.div>

            <motion.div variants={itemReveal}>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#684556]">
                {t.contactEmailLabel}
              </p>
              <a
                href={`mailto:${t.contactEmailValue}`}
                className="text-sm font-medium text-[#007AE5] underline-offset-4 transition-all hover:underline md:text-base"
              >
                {t.contactEmailValue}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
