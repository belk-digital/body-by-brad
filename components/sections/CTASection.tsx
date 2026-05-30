"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { bradImagePool } from "@/lib/constants";

const STATS = [
  { value: "+8",         label: "Years Coaching" },
  { value: "+1.2k",      label: "Sessions Delivered" },
  { value: "Charleston", label: "Based In SC" },
];

const MOSAIC = bradImagePool.slice(0, 4);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="font-satoshi bg-[#111111] overflow-hidden">
      <div className="px-6 sm:px-10 md:px-16 pt-24 pb-14 md:pt-32 md:pb-20">

        {/* ── Main content ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-center mb-16 md:mb-24">

          {/* Left — copy + CTA */}
          <div>

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-2.5 mb-10"
              {...fadeUp(0)}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E6FF2B]">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6FF2B]">
                {t.ctaLabel}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="font-extrabold uppercase leading-[0.88] tracking-tight mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
              {...fadeUp(0.08)}
            >
              <span className="text-white block">{t.ctaL1}</span>
              <span
                className="block"
                style={{ WebkitTextStroke: "2px #E6FF2B", color: "transparent" }}
              >
                {t.ctaL2}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-white/45 text-base md:text-lg leading-relaxed max-w-sm mb-12"
              {...fadeUp(0.16)}
            >
              {t.ctaDesc}
            </motion.p>

            {/* CTA button */}
            <motion.div {...fadeUp(0.24)}>
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 bg-[#E6FF2B] text-zinc-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
              >
                {t.ctaBtn}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* Right — staggered image mosaic */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={MOSAIC[0]} alt="Body By Brad" fill className="object-cover" sizes="22vw" loading="eager" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={MOSAIC[2]} alt="Body By Brad" fill className="object-cover" sizes="22vw" loading="lazy" />
              </div>
            </div>

            {/* Column 2 — offset down for organic feel */}
            <div className="flex flex-col gap-3 mt-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={MOSAIC[1]} alt="Body By Brad" fill className="object-cover" sizes="22vw" loading="lazy" />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={MOSAIC[3]} alt="Body By Brad" fill className="object-cover" sizes="22vw" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats bar ────────────────────────────────────────────────── */}
        <motion.div
          className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6"
          {...fadeUp(0.1)}
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-white font-extrabold text-2xl md:text-4xl tracking-tight tabular-nums leading-none">
                {s.value}
              </span>
              <span className="text-white/35 text-[11px] md:text-sm mt-2 uppercase tracking-wider font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
