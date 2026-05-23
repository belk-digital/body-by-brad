'use client';

import ParagraphReveal from '@/components/ui/ParagraphReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function WhoWeAreSection() {
  const { t } = useLanguage();
  return (
    <section
      id="who-we-are"
      className="font-satoshi relative w-full bg-white py-24 md:py-36 px-4 sm:px-7 md:px-12 flex flex-col justify-center border-t border-black/5 overflow-hidden rounded-b-[28px]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1.1fr_2fr] gap-12 md:gap-16 items-start">

        {/* Left Column: Title sticky on desktop */}
        <div className="flex flex-col gap-6 md:sticky md:top-24">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#007AE5]" />
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              {t.whoLabel}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 leading-tight uppercase">
            {t.whoLine1}
            <br />
            {t.whoLine2}
            <br />
            <span className="text-[#007AE5]">{t.whoLine3}</span>
          </h2>

          <p className="text-zinc-500 text-sm max-w-[280px] leading-relaxed">
            {t.whoTagline}
          </p>
        </div>

        {/* Right Column: Paragraph reveals */}
        <div className="flex flex-col gap-10 md:gap-14 pt-2">
          <ParagraphReveal text={t.whoBio1} />

          <ParagraphReveal text={t.whoBio2} />
        </div>
      </div>
    </section>
  );
}
