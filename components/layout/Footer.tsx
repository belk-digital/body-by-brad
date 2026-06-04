'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { logoUrl, socialMenuItems } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';
import TextRoll from '@/components/ui/TextRoll';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const brandRef = useRef<HTMLDivElement>(null);
  const [fitnessFontSize, setFitnessFontSize] = useState<number>(120);
  useEffect(() => {
    const measure = () => {
      const container = brandRef.current;
      if (!container) return;
      const containerWidth = container.clientWidth;

      const probe = document.createElement('span');
      probe.textContent = 'FITNESS';
      Object.assign(probe.style, {
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '100px',
        fontWeight: '600',
        fontFamily: getComputedStyle(container).fontFamily,
        textTransform: 'uppercase',
      });
      document.body.appendChild(probe);
      const ratio = probe.offsetWidth / 100;
      document.body.removeChild(probe);

      setFitnessFontSize(containerWidth / ratio);
    };

    document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (brandRef.current) ro.observe(brandRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="font-satoshi bg-[#191919] px-4 sm:px-7 md:px-12 pt-10 sm:pt-14 md:pt-20 overflow-x-hidden">

      {/* Top row — logo/tagline/social/newsletter + nav */}
      <div className="grid grid-cols-1 md:grid-cols-[44%_1fr] gap-10 md:gap-8 pb-10 md:pb-14 border-b border-white/15">

        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="self-start flex flex-col gap-6"
        >
          {/* Logo + divider + tagline */}
          <div className="flex items-center gap-4 sm:gap-6 mb-auto">
            <a href="/" aria-label="Body By Brad home" className="shrink-0">
              <img
                src={logoUrl}
                alt="Body By Brad logo"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </a>
            <div className="w-px self-stretch bg-white/25" />
            <p className="text-white text-base sm:text-lg md:text-xl font-semibold leading-snug max-w-[12rem] sm:max-w-xs">
              {t.footerTagline}
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {socialMenuItems.map((s, i) => (
              <motion.a
                key={s}
                href="#"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="relative flex cursor-pointer overflow-visible text-xs font-semibold text-white/60 hover:text-white uppercase tracking-widest"
              >
                <TextRoll className="transition-colors">{s}</TextRoll>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — two-column nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-0 self-start pt-2 md:pt-0 border-t border-white/15 md:border-t-0"
        >
          {[t.footerNavCol1, t.footerNavCol2].map((col, ci) => (
            <div key={ci} className="flex flex-col">
              {col.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (ci * t.footerNavCol1.length + i) * 0.04 }}
                  className="relative flex cursor-pointer overflow-visible text-sm text-white/60 hover:text-white py-2.5 border-b border-white/15 last:border-b-0"
                >
                  <TextRoll className="transition-colors uppercase tracking-wide">{item.label}</TextRoll>
                </motion.a>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Middle — giant brand name */}
      <div ref={brandRef} className="py-5 md:py-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.1 }}
          className="text-[#CCFF00] font-semibold uppercase leading-[0.88] tracking-tight"
        >
          <span className="block" style={{ fontSize: 'clamp(1rem, 4.5vw, 5rem)' }}>BBB</span>
          <span className="block" style={{ fontSize: fitnessFontSize }}>Fitness</span>
        </motion.h2>
      </div>

      {/* Bottom bar — copyright + policy */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-white/15">
        <p className="text-xs text-white/50 text-center sm:text-left">
          &copy; {year} Body By Brad. {t.footerAllRights}
        </p>
        <p className="text-xs text-white/50 text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          {t.footerDesignedBy}{' '}
          <a
            href="https://belkdigital.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[#CCFF00] hover:text-[#CCFF00]/80 underline"
          >
            Belk Digital
          </a>
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
          {t.policyItems.map((p, i) => {
            const href = i === 0 ? '/privacy-policy' : '/terms';
            return (
              <a key={p} href={href} className="text-white/50 text-xs hover:text-white transition-colors">
                {p}
              </a>
            );
          })}
        </div>
      </div>

    </footer>
  );
}
