'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
      className="font-satoshi relative w-full bg-[#007AE5] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Person image — starts at ~36% from top, bleeds off bottom */}
      <img
        src={MODEL_URL}
        alt="Coach Brad"
        className="hidden md:block absolute bottom-0 left-0 pointer-events-none select-none"
        style={{
          height: '52%',
          width: 'auto',
          maxWidth: '28%',
          objectFit: 'contain',
          objectPosition: 'bottom left',
        }}
      />

      {/* Content — sits above the image */}
      <div className="relative z-10 px-4 sm:px-7 md:px-12">
        <div
          className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-12"
          style={{ minHeight: '100vh' }}
        >
          {/* Left — heading pinned to top */}
          <div className="flex flex-col justify-start pt-16 md:pt-20">
            <h2
              className="font-bold text-white leading-none mb-5"
              style={{ fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)' }}
            >
              {t.faqHeadingL1}
              <br />
              {t.faqHeadingL2}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-55">
              {t.faqSubtitle}
            </p>
          </div>

          {/* Right — accordion card, vertically centered */}
          <div className="flex flex-col justify-center py-14 md:py-20">
            <div
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ backgroundColor: 'rgb(236,239,245)' }}
            >
              {faqItems.map((item, i) => (
                <div key={i} className="border-b border-zinc-300/60 last:border-b-0">
                  <button
                    className="w-full flex items-start gap-5 px-6 py-5 text-left cursor-pointer group"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="mt-0.5 shrink-0 w-4 text-zinc-400 text-sm select-none leading-none">
                      {openIndex === i ? '—' : '+'}
                    </span>
                    <span
                      className={`text-[15px] font-semibold leading-snug transition-colors duration-150 ${
                        openIndex === i
                          ? 'text-zinc-950'
                          : 'text-zinc-600 group-hover:text-zinc-950'
                      }`}
                    >
                      {item.q}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-zinc-500 text-sm leading-relaxed pb-5 pl-13 pr-6">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
