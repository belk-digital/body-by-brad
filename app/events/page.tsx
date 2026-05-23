'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { PauseIcon } from 'lucide-react';

import { LanguageProvider } from '@/lib/LanguageContext';
import { socialMenuItems } from '@/lib/constants';
import { EventsCarousel } from '@/components/ui/EventsCarousel';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

const NEXT_EVENT = new Date('2026-08-15T08:45:00');

function useCountdown(target: Date) {
  const calc = () => {
    const d = Math.max(0, target.getTime() - Date.now());
    return {
      days:  Math.floor(d / 86400000),
      hours: Math.floor((d / 3600000) % 24),
      mins:  Math.floor((d / 60000) % 60),
      secs:  Math.floor((d / 1000) % 60),
    };
  };
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const EVENT_IMAGES = [
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg', alt: 'Cooldown Event Charleston' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779141500/IMG_3056_fvrulw.jpg',        alt: 'BBB Group Training Event' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139531/IMG_3076_zziehi.jpg',        alt: 'Community Workout' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg',        alt: 'Training Session' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779233545/IMG_0593_nbc9pi.jpg',        alt: 'Client Transformation' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779233552/IMG_0591_cyzuem.jpg',        alt: 'BBB Results' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',       alt: 'BBB Merch Drop' },
];

const UPCOMING_EVENTS = [
  { title: 'Summer Cooldown 2026 Now Open',  desc: 'Join us at Marion Square for a free outdoor workout open to all fitness levels — no equipment needed.', href: '#' },
  { title: 'BBB Outdoor HIIT – July Edition', desc: 'High-intensity interval training on the waterfront. Push your limits with Coach Brad and the BBB community.', href: '#' },
  { title: 'Sunset Bootcamp at Folly Beach',  desc: 'End your summer with an unforgettable beachside bootcamp. Register early — spots are limited.', href: '#' },
];

export default function EventsPage() {
  const [isLoading, setIsLoading]   = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);
  const cd = useCountdown(NEXT_EVENT);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrollingUp = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && scrollingUp) setIsScrolled(true);
    else if (!scrollingUp || latest <= 100) setIsScrolled(false);
  });

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <LanguageProvider>
      <ReactLenis root>
        <div className="relative w-full font-satoshi overflow-x-hidden">

          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          {/* Full-screen hero — dark bg so white navbar is legible */}
          <section className="relative min-h-screen w-full overflow-hidden bg-[#007AE5] flex items-center">

            <Navbar
              isLoading={isLoading}
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              onMenuToggle={setIsMenuOpen}
            />

            {/* Bento grid — vertically centered */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isLoading ? { opacity: 0, y: 32 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.45 }}
              className="w-full px-4 sm:px-7 md:px-12 pt-28 pb-10 md:pt-32 md:pb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] md:grid-rows-[1fr_auto] gap-3 md:h-[calc(100vh-11rem)]">

                {/* Card 1 — Cream info */}
                <div className="bg-[#f5f0e1] rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-80 md:min-h-0">
                  {/* Top: title + description */}
                  <div>
                    <h2 className="text-zinc-950 font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-3">
                      Charleston Cooldown
                      <br />
                      2026
                    </h2>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs">
                      Embark on the ultimate outdoor fitness experience — where every rep
                      is a journey of community and self&#8209;discovery.
                    </p>
                  </div>

                  {/* Bottom: button pinned by justify-between */}
                  <motion.a
                    href="/register"
                    className="mt-6 inline-flex items-center gap-2.5 relative overflow-hidden rounded-full border-2 border-zinc-950 px-5 py-2.5 text-sm font-semibold w-fit cursor-pointer"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.span
                      className="absolute inset-0 bg-zinc-950"
                      variants={{ rest: { y: '101%' }, hover: { y: 0 } }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.span
                      className="relative z-10"
                      variants={{ rest: { color: '#09090b' }, hover: { color: '#f5f0e1' } }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      Register Here
                    </motion.span>
                    <motion.span
                      className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold leading-none"
                      variants={{
                        rest: { backgroundColor: 'rgba(0,0,0,0.08)', color: '#09090b' },
                        hover: { backgroundColor: '#f5f0e1', color: '#09090b' },
                      }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      &#8599;
                    </motion.span>
                  </motion.a>
                </div>

                {/* Card 2 — Full-bleed image, spans both rows */}
                <div className="md:row-span-2 relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-auto">
                  <img
                    src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg"
                    alt="Cooldown Event"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  {/* Pause badge */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-zinc-800 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    <PauseIcon className="w-3 h-3" />
                    Pause slide
                  </div>
                  {/* Carousel dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-full transition-all"
                        style={{
                          width:  i === 2 ? 18 : 7,
                          height: 7,
                          backgroundColor: i === 2 ? '#007AE5' : 'rgba(255,255,255,0.65)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Cards 3 & 4 — bottom-left row */}
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[110px_1fr] gap-3">

                  {/* Card 3 — Video thumbnail */}
                  <div className="relative rounded-2xl overflow-hidden min-h-22">
                    <img
                      src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779141500/IMG_3056_fvrulw.jpg"
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-[10px] text-zinc-800 ml-0.5">&#9654;</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 — Countdown + date */}
                  <div className="rounded-2xl bg-white px-4 sm:px-5 py-4 flex flex-col justify-center">
                    <div className="flex items-end gap-3 sm:gap-4 md:gap-6 mb-2.5">
                      {([
                        { v: cd.days,  l: 'Days'  },
                        { v: cd.hours, l: 'Hours' },
                        { v: cd.mins,  l: 'Mins'  },
                        { v: cd.secs,  l: 'Secs'  },
                      ] as const).map(({ v, l }) => (
                        <div key={l} className="flex flex-col items-center">
                          <span className="text-zinc-950 font-extrabold text-xl md:text-2xl tabular-nums leading-none">
                            {String(v).padStart(2, '0')}
                          </span>
                          <span className="text-zinc-400 text-[8px] font-bold uppercase tracking-widest mt-1">
                            {l}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-zinc-400 text-[11px] font-medium leading-relaxed">
                      August 15th, 2026
                      <br />
                      At 8:45 AM
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          </section>

          {/* Event Highlights */}
          <section className="bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 md:mb-14">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-xs uppercase tracking-[0.25em] text-[#007AE5] font-semibold"
                >
                  Highlights
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 mt-2 leading-tight uppercase"
                >
                  Event Highlights
                </motion.h2>
              </div>
              <EventsCarousel images={EVENT_IMAGES} showPagination showNavigation loop autoplay />
            </div>
          </section>

          {/* Upcoming Events */}
          <section id="register" className="bg-[#f5f4f3] py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="max-w-7xl mx-auto">

              <div className="mb-10 md:mb-14">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-xs uppercase tracking-[0.25em] text-[#007AE5] font-semibold"
                >
                  Don&apos;t miss out
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 mt-2 leading-tight uppercase"
                >
                  Upcoming
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-4">

                {/* Left — image card */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="relative rounded-2xl overflow-hidden min-h-72 md:min-h-0"
                >
                  <img
                    src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779139531/IMG_3076_zziehi.jpg"
                    alt="BBB Events"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white font-extrabold text-2xl md:text-3xl leading-tight mb-3">
                      Our Programs &amp;
                      <br />
                      Events
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                      Embark on the ultimate outdoor fitness experience — where every rep
                      is a journey of community and self&#8209;discovery.
                    </p>
                  </div>
                </motion.div>

                {/* Right — stacked event cards */}
                <div className="flex flex-col gap-3">
                  {UPCOMING_EVENTS.map((event, i) => (
                    <motion.a
                      key={i}
                      href={event.href}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-start justify-between gap-4 rounded-2xl px-6 py-5 group transition-shadow hover:shadow-md"
                      style={{ backgroundColor: i === 0 ? '#6B6FCE' : '#ffffff' }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold text-base md:text-lg leading-snug mb-1.5"
                          style={{ color: i === 0 ? '#ffffff' : '#09090b' }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed line-clamp-2"
                          style={{ color: i === 0 ? 'rgba(255,255,255,0.65)' : '#71717a' }}
                        >
                          {event.desc}
                        </p>
                      </div>
                      <div
                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: i === 0 ? 'rgba(255,255,255,0.2)' : '#f4f4f5',
                          color: i === 0 ? '#ffffff' : '#09090b',
                        }}
                      >
                        &#8599;
                      </div>
                    </motion.a>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Follow Us On Social Media */}
          <section className="bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

              {/* Left — heading + social links */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-zinc-950 leading-tight mb-10"
                >
                  Follow Us On
                  <br />
                  Social Media
                </motion.h2>

                <div className="flex flex-col">
                  {socialMenuItems.map((item, i) => (
                    <motion.a
                      key={item}
                      href="#"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="flex items-center justify-between py-5 border-b border-zinc-200 group"
                    >
                      <span className="text-zinc-500 text-sm font-medium group-hover:text-zinc-950 transition-colors duration-200">
                        {item}
                      </span>
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-zinc-400 group-hover:text-zinc-950 group-hover:bg-zinc-100 transition-all duration-200">
                        &#8599;
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Right — image */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                className="rounded-2xl overflow-hidden aspect-[4/3] w-full"
              >
                <img
                  src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779139531/IMG_3076_zziehi.jpg"
                  alt="Body By Brad Community"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

            </div>
          </section>

          <FAQSection />

          <CTASection />
          <Footer />

        </div>
      </ReactLenis>
    </LanguageProvider>
  );
}
