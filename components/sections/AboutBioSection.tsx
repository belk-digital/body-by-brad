'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function AboutBioSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.15 },
    },
  };

  const paragraphReveal: Variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const attribReveal: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 },
    },
  };

  const paragraphs = t.aboutBioParagraphs;
  const lastIndex = paragraphs.length - 1;

  return (
    <section
      ref={ref}
      className="relative w-full bg-white px-4 py-24 sm:px-8 sm:py-32 md:px-16 md:py-40"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-6xl text-center"
      >
        <blockquote className="font-bold uppercase leading-[1.15] tracking-tight text-zinc-950 text-xl sm:text-2xl md:text-3xl lg:text-[2.4rem]">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={paragraphReveal}
              className="mb-6 last:mb-0 md:mb-8"
            >
              {i === 0 ? '“' : ''}
              {paragraph}
              {i === lastIndex ? '”' : ''}
            </motion.p>
          ))}
        </blockquote>

        <motion.div
          variants={attribReveal}
          className="mt-14 flex flex-col items-center gap-5 md:mt-20"
        >
          <div className="h-px w-48 bg-zinc-300" />
          <p className="text-base text-zinc-950 md:text-lg">
            <span className="font-bold">{t.aboutBioName},</span>{' '}
            <span className="text-zinc-500">{t.aboutBioRole}</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
