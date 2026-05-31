"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const CTA_BG =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1920/v1780256038/IMG_6574_rrhzzv.jpg';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function CTASection() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  const imageZoom: Variants = {
    hidden: { scale: 1.06 },
    visible: { scale: 1, transition: { duration: 1.8, ease } },
  };

  return (
    <section
      className="font-satoshi relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(460px, 62vh, 780px)' }}
    >
      {/* Background image with subtle zoom-in */}
      <motion.div
        variants={imageZoom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="absolute inset-0"
      >
        <Image
          src={CTA_BG}
          alt="Body By Brad"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Left-side gradient for text legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35" />

      {/* Content — eyebrow top, headline + CTA bottom */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col justify-between px-6 sm:px-10 md:px-16"
        style={{
          minHeight: 'clamp(460px, 62vh, 780px)',
          paddingTop: 'clamp(1.75rem, 3.5vh, 3rem)',
          paddingBottom: 'clamp(2.25rem, 4.5vh, 4rem)',
        }}
      >
        {/* Eyebrow — top-left */}
        <motion.p
          variants={fadeUp}
          className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55"
        >
          {t.ctaLabel}
        </motion.p>

        {/* Headline + CTA — bottom-left */}
        <div>
          <motion.h2
            variants={fadeUp}
            className="font-extrabold uppercase leading-[0.88] tracking-tight text-white mb-7"
            style={{ fontSize: 'clamp(3rem, 8vw, 8.5rem)', fontFamily: 'Unbounded, sans-serif' }}
          >
            <span className="block">{t.ctaL1}</span>
            <span className="block">{t.ctaL2}</span>
          </motion.h2>

          <motion.div variants={fadeUp}>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/70 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-zinc-950 hover:border-white"
            >
              {t.ctaBtn}
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
