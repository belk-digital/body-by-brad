'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { logoUrl, socialMenuItems, policyMenuItems } from '@/lib/constants';
import TextRoll from '@/components/ui/TextRoll';

const NAV_COL_1 = ['About', 'Services', 'Packages', 'Events', 'Results'];
const NAV_COL_2 = ['Blog', 'Merchandise', 'Areas We Serve', 'Contact', 'Register'];

const navHref = (item: string): string => {
  switch (item.toLowerCase()) {
    case 'about':         return '/about';
    case 'services':      return '/services';
    case 'packages':      return '/packages';
    case 'events':        return '/events';
    case 'results':       return '/results';
    case 'blog':          return '/blog';
    case 'merchandise':   return '/merchandise';
    case 'contact':       return '/contact';
    case 'register':      return '/register';
    default:              return '#';
  }
};

export default function Footer() {
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
    <footer className="font-satoshi bg-[#191919] px-4 sm:px-7 md:px-12 pt-12 md:pt-20 overflow-x-hidden">

      {/* Top row — tagline + nav */}
      <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] gap-8 pb-10 md:pb-14 border-b border-white/15">

        {/* Left — tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white text-lg sm:text-2xl md:text-3xl font-semibold leading-snug max-w-sm">
            Elite personal training &amp; outdoor fitness events in Charleston, SC.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 md:mt-8">
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
          className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-0 self-start"
        >
          {[NAV_COL_1, NAV_COL_2].map((col, ci) => (
            <div key={ci} className="flex flex-col">
              {col.map((item, i) => (
                <motion.a
                  key={item}
                  href={navHref(item)}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (ci * NAV_COL_1.length + i) * 0.04 }}
                  className="relative flex cursor-pointer overflow-visible text-sm text-white/60 hover:text-white py-2.5 border-b border-white/15 last:border-b-0"
                >
                  <TextRoll className="transition-colors uppercase tracking-wide">{item}</TextRoll>
                </motion.a>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Middle — giant brand name */}
      <div ref={brandRef} className="py-6 md:py-8">
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/15">
        <div className="flex flex-col items-center sm:items-start gap-1 text-xs text-white/50 text-center sm:text-left">
          <p>&copy; {year} Body By Brad. All rights reserved.</p>
          <p>
            Designed and developed by{' '}
            <a
              href="https://belkdigital.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-white hover:text-white/90 underline"
            >
              Belk Digital
            </a>
          </p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
          {policyMenuItems.map((p) => {
            const lower = p.toLowerCase();
            const href =
              lower.includes('privacy')   ? '/privacy-policy' :
              lower.includes('terms')     ? '/terms' :
              lower.includes('agreement') ? '/terms' :
              '#';
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
