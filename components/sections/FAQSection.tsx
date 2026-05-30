'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dumbbell, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const MODEL_URL =
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779245941/IMG_3056_3_rihkbp.png';

type FAQItem = { q: string; a: string };

export default function FAQSection({ items }: { items?: FAQItem[] }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = items ?? t.faqItems;

  return (
    <section
      id="faq"
      className="font-satoshi relative w-full bg-[#1a1a1a] overflow-hidden"
    >
      {/* Coach Brad image — bleeds from bottom left */}
      <img
        src={MODEL_URL}
        alt="Coach Brad"
        className="hidden md:block absolute bottom-0 left-0 pointer-events-none select-none"
        style={{
          height: '72%',
          width: 'auto',
          maxWidth: '26%',
          objectFit: 'contain',
          objectPosition: 'bottom left',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-7 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[42%_58%] gap-12 md:gap-16">

          {/* ── Left — heading ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-start">

            <motion.div
              className="mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                <Dumbbell size={12} className="text-zinc-950" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                {t.faqLabel}
              </span>
            </motion.div>

            <motion.h2
              className="font-extrabold uppercase leading-none tracking-tight text-white text-[clamp(2rem,4.5vw,4.5rem)] mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            >
              {t.faqHeadingL1}
              <br />
              {t.faqHeadingL2}
            </motion.h2>

            <motion.p
              className="text-white/40 text-sm leading-relaxed max-w-xs"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.faqSubtitle}
            </motion.p>
          </div>

          {/* ── Right — accordion ───────────────────────────────────────── */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`border-b transition-colors duration-200 ${
                    i === 0 ? 'border-t' : ''
                  } ${isOpen ? 'border-white/15' : 'border-white/8'}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {/* Number + question */}
                    <div className="flex items-start gap-4 min-w-0">
                      <span className="shrink-0 text-[10px] font-bold tabular-nums text-[#E6FF2B]/60 mt-0.5 w-5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm md:text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                          isOpen ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                        }`}
                      >
                        {item.q}
                      </span>
                    </div>

                    {/* Toggle icon */}
                    <motion.div
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200"
                      style={{
                        backgroundColor: isOpen ? '#E6FF2B' : 'rgba(255,255,255,0.06)',
                      }}
                      animate={{ rotate: isOpen ? 0 : 0 }}
                    >
                      {isOpen
                        ? <Minus size={13} className="text-[#1A1A1A]" />
                        : <Plus size={13} className="text-white/60" />
                      }
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/45 text-sm leading-relaxed pb-5 pl-9 pr-4">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
