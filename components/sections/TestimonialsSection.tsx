'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonialsData, CARD_POSITIONS } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';
import type { TestimonialItem } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

// ─── TCard helper ────────────────────────────────────────────────────────────

function TCard({ t }: { t: TestimonialItem }) {
  return (
    <div style={{ width: 300 }}>
      {/* iMessage bubble */}
      <div className="relative">
        <div
          style={{
            backgroundColor: '#e9e9eb',
            borderRadius: 20,
            borderBottomLeftRadius: 6,
            padding: '14px 16px 16px',
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#1c1c1e' }}>
            {t.quote}
          </p>
        </div>

        {/* Reaction pill — overlaps bottom edge of bubble */}
        <div
          className="absolute flex items-center gap-1"
          style={{
            bottom: -13,
            left: 10,
            backgroundColor: '#ffffff',
            border: '1.5px solid #e5e5ea',
            borderRadius: 100,
            padding: '3px 9px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
            fontSize: 13,
          }}
        >
          {t.reactions.map((r, ri) => (
            <span key={ri}>{r}</span>
          ))}
        </div>
      </div>

      {/* Tapback below bubble */}
      <div className="mt-6 ml-2 text-xl leading-none">{t.tapback}</div>

      {/* Sender attribution */}
      <p className="mt-1 ml-2 text-xs font-medium" style={{ color: '#8e8e93' }}>
        — {t.sender}
      </p>
    </div>
  );
}

// ─── TestimonialsSection ──────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // Phase 1: heading slides in from opposite sides
      tl.from(line1Ref.current, { x: -220, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0);
      tl.from(line2Ref.current, { x: 220, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0);

      // Phase 2: cards rise from below (staggered)
      const cardDelays = [0.9, 1.2, 1.8, 2.4, 2.8];
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tl.from(card, { y: '110vh', opacity: 0, duration: 1.4, ease: 'power2.out' }, cardDelays[i]);
      });

      // Phase 3: heading slides back out on opposite sides
      tl.to(line1Ref.current, { x: -220, opacity: 0, duration: 1.0, ease: 'power2.in' }, 4.6);
      tl.to(line2Ref.current, { x: 220, opacity: 0, duration: 1.0, ease: 'power2.in' }, 4.6);
      tl.to({}, { duration: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="relative font-satoshi bg-white">
      {/* ── Mobile (< 768px): normal scroll layout ── */}
      <div className="md:hidden px-4 sm:px-7 md:px-12 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-bold leading-[0.88] mb-14 select-none"
          style={{ fontSize: 'clamp(32px, 8vw, 72px)', color: '#2d2d2a', letterSpacing: '-0.02em' }}
        >
          {t.testimonialsL1}
          <br />
          {t.testimonialsL2}
        </motion.h2>
        <div className="flex flex-col gap-5">
          {testimonialsData.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <TCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Desktop (≥ 768px): GSAP-pinned floating cards ── */}
      <div
        className="hidden md:block h-screen relative overflow-hidden"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 0 }}
        />

        {/* Background heading — z-index 1, sits behind cards */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <h2
            className="font-bold leading-[0.88] text-center"
            style={{
              fontSize: 'clamp(36px, 7vw, 100px)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            <div ref={line1Ref}>{t.testimonialsL1}</div>
            <div ref={line2Ref}>{t.testimonialsL2}</div>
          </h2>
        </div>

        {/* Floating cards — z-index 10, animate up from below */}
        {testimonialsData.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute"
            style={{ zIndex: 10, ...CARD_POSITIONS[i] }}
          >
            <TCard t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}
