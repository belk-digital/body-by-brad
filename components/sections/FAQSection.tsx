'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      className="font-satoshi relative w-full bg-[#E6FF2B] overflow-hidden"
    >
      {/* Coach Brad image — only lg+, avoids overlapping heading on tablet */}
      <div
        className="hidden lg:block absolute bottom-0 left-0 pointer-events-none select-none"
        style={{ height: '70%', width: '24%' }}
      >
        <Image
          src={MODEL_URL}
          alt="Coach Brad"
          fill
          className="object-contain object-bottom"
          sizes="(min-width: 1024px) 24vw, 0vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-7 md:px-12 py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[42fr_58fr] gap-8 sm:gap-10 md:gap-12 lg:gap-16">

          {/* ── Left — heading ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-start">

            <motion.div
              className="mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a]">
                <Dumbbell size={12} className="text-[#E6FF2B]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1a1a1a]">
                {t.faqLabel}
              </span>
            </motion.div>

            <motion.h2
              className="font-extrabold uppercase leading-none tracking-tight text-[#1a1a1a] text-[clamp(2rem,4.5vw,4.5rem)] mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 }}
            >
              {t.faqHeadingL1}
              <br />
              {t.faqHeadingL2}
            </motion.h2>

            <motion.p
              className="text-black/50 text-sm leading-relaxed max-w-xs"
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
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`border-b transition-colors duration-200 ${
                    i === 0 ? 'border-t' : ''
                  } ${isOpen ? 'border-black/15' : 'border-black/10'}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-3 sm:gap-6 py-4 sm:py-5 text-left cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {/* Number + question */}
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      <span className="shrink-0 text-[10px] font-bold tabular-nums text-black/40 mt-0.5 w-5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[13px] sm:text-sm md:text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                          isOpen ? 'text-[#1a1a1a]' : 'text-black/55 group-hover:text-black/90'
                        }`}
                      >
                        {item.q}
                      </span>
                    </div>

                    {/* Toggle icon */}
                    <motion.div
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200"
                      style={{
                        backgroundColor: isOpen ? '#1a1a1a' : 'rgba(0,0,0,0.08)',
                      }}
                      animate={{ rotate: isOpen ? 0 : 0 }}
                    >
                      {isOpen
                        ? <Minus size={13} className="text-[#E6FF2B]" />
                        : <Plus size={13} className="text-black/60" />
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
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <p className="text-black/55 text-[13px] sm:text-sm leading-relaxed pb-4 sm:pb-5 pl-8 sm:pl-9 pr-2 sm:pr-4">
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
