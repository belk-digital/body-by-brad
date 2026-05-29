'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { serviceSlides, POS } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';
import type { PosState } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

export default function OurServicesSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useLenis(() => { ScrollTrigger.update(); });

  useEffect(() => {
    /* Only run GSAP pin on tablet / desktop */
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const imgs    = imgRefs.current as HTMLDivElement[];
      const texts   = textRefs.current as HTMLDivElement[];
      const title   = titleRef.current!;

      gsap.set(section, {
        borderTopLeftRadius: '28px',
        borderTopRightRadius: '28px',
        overflow: 'hidden',
      });
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        animation: gsap.to(section, {
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          ease: 'none',
          duration: 1,
          paused: true,
        }),
      });

      const setPos = (el: HTMLElement, p: PosState) =>
        gsap.set(el, {
          left: `${p.left}%`, top: `${p.top}%`,
          width: `${p.width}%`, height: `${p.height}%`,
          borderRadius: `${p.radius}px`, opacity: p.opacity,
        });

      setPos(imgs[0], POS.BELOW);
      setPos(imgs[1], POS.NEXT);
      setPos(imgs[2], POS.GONE_BEFORE);
      gsap.set(imgs[0], { zIndex: 3 });
      gsap.set(imgs[1], { zIndex: 2 });
      gsap.set(imgs[2], { zIndex: 1 });

      gsap.set(title, { xPercent: -50, yPercent: -50, left: '50%', top: '55%', scale: 1, opacity: 1 });
      gsap.set(texts[0], { opacity: 0, y: 0 });
      gsap.set(texts[1], { opacity: 0, y: 18 });
      gsap.set(texts[2], { opacity: 0, y: 18 });

      const tl = gsap.timeline();
      const toPos = (el: HTMLElement, p: PosState, at: number, dur = 1) =>
        tl.to(el, {
          left: `${p.left}%`, top: `${p.top}%`,
          width: `${p.width}%`, height: `${p.height}%`,
          borderRadius: `${p.radius}px`, opacity: p.opacity,
          duration: dur, ease: 'none',
        }, at);

      tl.to(title, { scale: 2, y: '-35vh', duration: 0.75, ease: 'none' }, 0);
      tl.to(title, { opacity: 0, duration: 0.25, ease: 'none' }, 0.75);
      toPos(imgs[0], POS.MAIN, 0.2, 0.8);
      tl.to(texts[0], { opacity: 1, duration: 0.15, ease: 'none' }, 0.85);

      tl.set(imgs[1], { zIndex: 4 }, 1.5);
      toPos(imgs[0], POS.PREV, 1);
      toPos(imgs[1], POS.MAIN, 1);
      toPos(imgs[2], POS.NEXT, 1);
      tl.to(texts[0], { opacity: 0, y: -14, duration: 0.3, ease: 'none' }, 1.1);
      tl.to(texts[1], { opacity: 1, y: 0,   duration: 0.3, ease: 'none' }, 1.7);

      tl.set(imgs[2], { zIndex: 5 }, 2.5);
      tl.to(imgs[0], { opacity: 0, duration: 0.4, ease: 'none' }, 2);
      toPos(imgs[1], POS.PREV, 2);
      toPos(imgs[2], POS.MAIN, 2);
      tl.to(texts[1], { opacity: 0, y: -14, duration: 0.3, ease: 'none' }, 2.1);
      tl.to(texts[2], { opacity: 1, y: 0,   duration: 0.3, ease: 'none' }, 2.7);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${3 * window.innerHeight}`,
        pin: true,
        scrub: 1.5,
        animation: tl,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Mobile layout — stacked scroll cards ──────────────────────────── */}
      <section className="md:hidden font-satoshi pt-14 pb-16" style={{ backgroundColor: '#E6FF2B' }}>

        {/* Section label */}
        <p className="px-5 mb-3 text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: 'rgba(26,26,26,0.5)' }}>
          {t.servicesHighlights}
        </p>

        {/* Section title */}
        <h2 className="px-5 mb-12 text-3xl sm:text-4xl font-bold leading-tight uppercase" style={{ color: '#1A1A1A' }}>
          {t.servicesTitle}
        </h2>

        {/* Cards */}
        <div className="space-y-14">
          {serviceSlides.map((slide, i) => (
            <div key={i} className="px-5">
              {/* Image */}
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={t.servicesSlides[i].cta}
                  className="w-full aspect-[4/5] object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Number + text */}
              <div className="flex items-start gap-5 mt-5">
                <span className="text-sm font-medium w-5 shrink-0 pt-0.5 tabular-nums" style={{ color: 'rgba(26,26,26,0.4)' }}>
                  {i + 1}
                </span>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-[1.05rem] leading-snug uppercase" style={{ color: '#1A1A1A' }}>
                    {t.servicesSlides[i].heading}
                  </p>
                  <a
                    href="#"
                    className="w-fit text-sm font-semibold underline underline-offset-4 transition-colors uppercase"
                    style={{ color: 'rgba(26,26,26,0.6)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1A1A1A')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(26,26,26,0.6)')}
                  >
                    {t.servicesSlides[i].cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <p className="mt-14 px-5 text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: 'rgba(26,26,26,0.5)' }}>
          {t.servicesJourney}
        </p>
      </section>

      {/* ── Desktop layout — GSAP pinned ──────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="services"
        className="hidden md:block relative h-screen w-full font-satoshi"
        style={{ backgroundColor: '#E6FF2B' }}
      >
        <div
          ref={titleRef}
          className="absolute font-bold whitespace-nowrap pointer-events-none select-none uppercase"
          style={{ fontSize: '6vw', zIndex: 20, color: '#1A1A1A' }}
        >
          {t.servicesTitle}
        </div>

        {serviceSlides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { imgRefs.current[i] = el; }}
            className="absolute overflow-hidden"
          >
            <img
              src={slide.image}
              alt={slide.cta}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}

        {serviceSlides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute flex flex-col gap-5"
            style={{ right: '2%', top: '32%', width: '20%', zIndex: 10 }}
          >
            <p className="text-[1.4rem] lg:text-[1.65rem] font-semibold leading-tight uppercase" style={{ color: '#1A1A1A' }}>
              {t.servicesSlides[i].heading}
            </p>
            <a
              href="#"
              className="w-fit text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-60 uppercase"
              style={{ color: '#1A1A1A' }}
            >
              {t.servicesSlides[i].cta}
            </a>
          </div>
        ))}

        <div className="absolute bottom-5 left-[3%] right-[3%] z-20 flex items-end justify-between pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(26,26,26,0.5)' }}>
            {t.servicesHighlights}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(26,26,26,0.5)' }}>
            {t.servicesJourney}
          </span>
        </div>
      </section>
    </>
  );
}
