'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const SUPPLEMENTS_URL = 'https://shopmy.us/shop/bcarter123';

const IMAGES = [
  { src: 'https://placehold.co/600x800/1a1a1a/E6FF2B?text=PROTEIN',        alt: 'Protein supplement' },
  { src: 'https://placehold.co/600x800/111827/ffffff?text=PRE-WORKOUT',     alt: 'Pre-workout supplement' },
  { src: 'https://placehold.co/600x800/18181b/E6FF2B?text=CREATINE',        alt: 'Creatine supplement' },
  { src: 'https://placehold.co/600x800/0f172a/7dd3fc?text=ELECTROLYTES',    alt: 'Electrolytes supplement' },
  { src: 'https://placehold.co/600x800/14532d/86efac?text=DEBLOAT',         alt: 'Debloat supplement' },
  { src: 'https://placehold.co/600x800/1e1b4b/a5b4fc?text=FISH+OIL',        alt: 'Fish Oil supplement' },
  { src: 'https://placehold.co/600x800/292524/fcd34d?text=MAGNESIUM',       alt: 'Magnesium supplement' },
  { src: 'https://placehold.co/600x800/042f2e/5eead4?text=DAILY+NUTRITION', alt: 'Daily Nutrition supplement' },
];

export default function SupplementsSection() {
  const { t } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const desktopRef   = useRef<HTMLDivElement>(null);
  const mobileRef    = useRef<HTMLDivElement>(null);
  const inView       = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const activeRef = () => {
    // prefer whichever container is currently scrollable (i.e. not display:none)
    const d = desktopRef.current;
    const m = mobileRef.current;
    if (d && d.offsetParent !== null) return d;
    if (m && m.offsetParent !== null) return m;
    return d ?? m;
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = activeRef();
    if (!el) return;
    // scroll by exactly one full visible page → N cards slide at once
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth : el.clientWidth, behavior: 'smooth' });
  };

  const onScroll = (el: HTMLDivElement) => {
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const container = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };

  const cardAnim = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
  };

  const NavBtn = ({ dir }: { dir: 'left' | 'right' }) => (
    <button
      onClick={() => scroll(dir)}
      disabled={dir === 'left' ? !canLeft : !canRight}
      aria-label={dir === 'left' ? 'Previous' : 'Next'}
      className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300
                 text-zinc-600 transition-all duration-200
                 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white
                 disabled:cursor-not-allowed disabled:opacity-25"
    >
      {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );

  return (
    <section
      ref={sectionRef}
      className="font-satoshi w-full bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-7 md:px-12 mb-10 md:mb-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <motion.p
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-zinc-400 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {t.supplementsTagline}
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight text-zinc-950"
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
              >
                {t.supplementsHeading}
              </motion.h2>
            </div>

            <motion.p
              className="text-zinc-500 text-sm sm:text-base max-w-xl leading-relaxed mt-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              {t.supplementsDesc}
            </motion.p>
          </div>

          {/* Desktop CTA */}
          <motion.a
            href={SUPPLEMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 overflow-hidden rounded-full border-2 border-zinc-900 px-8 py-3.5
                       text-sm font-semibold hidden sm:flex items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            whileHover="hover"
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
              {t.shopSupplements}
              <HiArrowUpRight size={14} />
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* ── Slider ─────────────────────────────────────────────────────── */}

      {/* Desktop (md+): [<]  4 cards per page  [>] */}
      <div className="hidden md:flex items-center gap-4 px-12">
        <NavBtn dir="left" />

        <motion.div
          ref={desktopRef}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          onScroll={(e) => onScroll(e.currentTarget)}
          className="no-scrollbar flex flex-1 gap-4 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href={SUPPLEMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardAnim}
              className="relative shrink-0 snap-start rounded-2xl overflow-hidden bg-zinc-100
                         w-[calc((100%-48px)/4)]"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {t.supplementsTags[i]}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <NavBtn dir="right" />
      </div>

      {/* Mobile / Tablet (< md):  2 cards on mobile · 3 on tablet */}
      {/* Padding lives on the wrapper so card % widths resolve correctly */}
      <div className="md:hidden px-4 sm:px-7">
        <motion.div
          ref={mobileRef}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          onScroll={(e) => onScroll(e.currentTarget)}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href={SUPPLEMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardAnim}
              className="relative shrink-0 snap-start rounded-2xl overflow-hidden bg-zinc-100
                         w-full sm:w-[calc((100%-32px)/3)]"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {t.supplementsTags[i]}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Nav row: CTA left, arrows right */}
        <div className="flex items-center justify-between mt-5">
          <a
            href={SUPPLEMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 px-6 rounded-full bg-zinc-950 text-white text-sm font-semibold"
          >
            {t.shopSupplements}
            <HiArrowUpRight size={14} />
          </a>
          <div className="flex gap-2">
            <NavBtn dir="left" />
            <NavBtn dir="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
