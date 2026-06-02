'use client';

import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';

const SUPPLEMENTS_URL = '#supplements-link'; // TODO: replace with your supplements website URL

const IMAGES = [
  {
    src: 'https://placehold.co/600x800/1a1a1a/E6FF2B?text=PROTEIN',
    alt: 'Protein supplement',
  },
  {
    src: 'https://placehold.co/600x800/111827/ffffff?text=PRE-WORKOUT',
    alt: 'Pre-workout supplement',
  },
  {
    src: 'https://placehold.co/600x800/18181b/E6FF2B?text=CREATINE',
    alt: 'Creatine supplement',
  },
];

const TAGS = ['Protein', 'Creatine', 'Pre Workout', 'Electrolytes', 'Debloat', 'Fish Oil', 'Magnesium', 'Daily Nutrition'];

export default function SupplementsSection() {
  return (
    <section className="font-satoshi w-full bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12 overflow-hidden">
      <div>

        {/* ── Header row ─────────────────────────────────────────────────────── */}
        <div className="mb-10 md:mb-14 flex items-end justify-between gap-6">
          <div>
            <motion.p
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-zinc-400 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Recommended by Brad
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight text-zinc-950"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
              >
                Fuel Your Gains
              </motion.h2>
            </div>

            <motion.p
              className="text-zinc-500 text-sm sm:text-base max-w-xl leading-relaxed mt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              Training hard is only half the equation. Fuel your body with supplements
              Brad personally uses and recommends — quality products for performance,
              recovery, and everyday health.
            </motion.p>
          </div>

          {/* Desktop CTA */}
          <motion.a
            href={SUPPLEMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 overflow-hidden rounded-full border-2 border-zinc-900 px-8 py-3.5 text-sm font-semibold hidden sm:flex items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            whileHover="hover"
            animate="rest"
          >
            <motion.span
              className="absolute inset-0 bg-zinc-900"
              variants={{ rest: { y: '101%' }, hover: { y: 0 } }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            />
            <motion.span
              className="relative z-10 flex items-center gap-2"
              variants={{ rest: { color: '#111827' }, hover: { color: '#ffffff' } }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              Shop Supplements
              <HiArrowUpRight size={14} />
            </motion.span>
          </motion.a>
        </div>

        {/* ── Image grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href={SUPPLEMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-zinc-100"
              style={{ aspectRatio: '3/4' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: i * 0.1 }}
              whileHover="hover"
              animate="rest"
            >
              {/* Image */}
              <motion.img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />

              {/* Dark overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-black"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 0.25 } }}
                transition={{ duration: 0.35 }}
              />

              {/* Category badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {TAGS[i]}
                </span>
              </div>

              {/* Arrow icon on hover */}
              <motion.div
                className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center"
                variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <HiArrowUpRight size={15} className="text-zinc-900" />
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* ── Mobile CTA + tags ───────────────────────────────────────────────── */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Mobile-only button */}
          <a
            href={SUPPLEMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-zinc-950 text-white text-sm font-semibold"
          >
            Shop Supplements
            <HiArrowUpRight size={14} />
          </a>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {TAGS.slice(3).map((tag) => (
              <a
                key={tag}
                href={SUPPLEMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-500 text-xs font-semibold uppercase tracking-widest transition-colors hover:border-zinc-900 hover:text-zinc-900"
              >
                {tag}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
