'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, Dumbbell } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

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

const MASONRY_IMAGES = [
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg', alt: 'Cooldown Event Charleston', ratio: '3/4' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779141500/IMG_3056_fvrulw.jpg',        alt: 'BBB Group Training',       ratio: '1/1' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139531/IMG_3076_zziehi.jpg',        alt: 'Community Workout',        ratio: '4/5' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg',        alt: 'Training Session',         ratio: '3/4' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779233545/IMG_0593_nbc9pi.jpg',        alt: 'Client Results',           ratio: '5/4' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779233552/IMG_0591_cyzuem.jpg',        alt: 'BBB Results',              ratio: '1/1' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',     alt: 'BBB Merch Drop',           ratio: '3/4' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779378587/New_Project_2_zimcoc.webp',  alt: 'Body By Brad Event',       ratio: '4/5' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779378588/New_Project_7_z0buwe.webp',  alt: 'BBB Community',            ratio: '5/4' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779378587/New_Project_4_jikyyg.webp',  alt: 'BBB Training',             ratio: '1/1' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779378588/New_Project_3_yd6ba6.webp',  alt: 'BBB Workout',              ratio: '3/4' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779378587/New_Project_1_svqowp.webp',  alt: 'BBB Lifestyle',            ratio: '4/3' },
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
  const [visibleCount, setVisibleCount] = useState(4);
  const [heroSlide, setHeroSlide]   = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    if (heroPaused) return;
    const id = setInterval(() => {
      setHeroSlide((s) => (s + 1) % EVENT_IMAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [heroPaused]);
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
          <section className="relative min-h-screen w-full overflow-hidden bg-[#1A1A1A] flex items-center">

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
                <div className="bg-[#E6FF2B] rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-80 md:min-h-0">
                  {/* Top: title + description */}
                  <div>
                    <h2 className="text-zinc-950 font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-3 uppercase">
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
                    className="relative mt-6 flex w-full items-center justify-between overflow-hidden rounded-full border-2 border-[#1A1A1A] py-3 pl-5 pr-2 cursor-pointer"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#1A1A1A]"
                      style={{ transformOrigin: 'left' }}
                      variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.span
                      className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest"
                      variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                    >
                      Register Here
                    </motion.span>
                    <motion.span
                      className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      variants={{
                        rest:  { backgroundColor: '#1A1A1A', color: '#E6FF2B' },
                        hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' },
                      }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                    >
                      <IoChevronForward size={11} />
                      <IoChevronForward size={11} className="-ml-1.5" />
                    </motion.span>
                  </motion.a>
                </div>

                {/* Card 2 — Auto-sliding images, spans both rows */}
                <div className="md:row-span-2 relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-auto">
                  {EVENT_IMAGES.map((img, i) => (
                    <img
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                        i === heroSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}

                  {/* Pause / Resume button */}
                  <button
                    onClick={() => setHeroPaused((p) => !p)}
                    className="absolute top-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-zinc-800 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm hover:bg-white transition-colors cursor-pointer"
                  >
                    {heroPaused
                      ? <><PlayIcon className="w-3 h-3" /> Resume slide</>
                      : <><PauseIcon className="w-3 h-3" /> Pause slide</>
                    }
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5">
                    {EVENT_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroSlide(i)}
                        className="rounded-full transition-all cursor-pointer"
                        style={{
                          width:  i === heroSlide ? 18 : 7,
                          height: 7,
                          backgroundColor: i === heroSlide ? '#E6FF2B' : 'rgba(255,255,255,0.65)',
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
          <section className="bg-[#1a1a1a] py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="mb-10 md:mb-14">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-3 flex items-center gap-2"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                    <Dumbbell size={12} className="text-zinc-950" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                    Highlights
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="font-extrabold uppercase leading-none tracking-tight text-white text-[clamp(2rem,4.5vw,4.5rem)]"
                >
                  EVENT HIGHLIGHTS
                </motion.h2>
              </div>
              <EventsCarousel images={EVENT_IMAGES} showPagination showNavigation loop autoplay />
          </section>

          {/* Upcoming Events */}
          <section id="register" className="bg-[#1a1a1a] py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-3 flex items-center gap-2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                      <Dumbbell size={12} className="text-zinc-950" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                      Don&apos;t miss out
                    </span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="font-extrabold uppercase leading-none tracking-tight text-white text-[clamp(2rem,4.5vw,4.5rem)]"
                  >
                    UPCOMING
                    <br />
                    EVENTS
                  </motion.h2>
                </div>

                {/* Register button */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <motion.a
                    href="/register"
                    className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-[#E6FF2B] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#E6FF2B]"
                      style={{ transformOrigin: 'left' }}
                      variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.span
                      className="relative z-10 mr-3"
                      variants={{ rest: { color: '#E6FF2B' }, hover: { color: '#09090b' } }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                    >
                      Register Now
                    </motion.span>
                    <motion.span
                      className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      variants={{
                        rest:  { backgroundColor: '#E6FF2B', color: '#09090b' },
                        hover: { backgroundColor: '#09090b', color: '#E6FF2B' },
                      }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                    >
                      <IoChevronForward size={11} />
                      <IoChevronForward size={11} className="-ml-1.5" />
                    </motion.span>
                  </motion.a>
                </motion.div>
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
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B] mb-2">
                      BBB Community
                    </p>
                    <h3 className="text-white font-extrabold uppercase text-2xl md:text-3xl leading-tight mb-3">
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
                      className="flex items-start justify-between gap-4 rounded-2xl px-6 py-5 group transition-opacity hover:opacity-90"
                      style={{ backgroundColor: i === 0 ? '#E6FF2B' : '#252525' }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-extrabold uppercase text-sm md:text-base leading-snug mb-1.5 tracking-tight"
                          style={{ color: i === 0 ? '#09090b' : '#ffffff' }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed line-clamp-2"
                          style={{ color: i === 0 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.5)' }}
                        >
                          {event.desc}
                        </p>
                      </div>
                      <div
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: i === 0 ? '#09090b' : '#E6FF2B',
                          color:           i === 0 ? '#E6FF2B' : '#09090b',
                        }}
                      >
                        <IoChevronForward size={11} />
                        <IoChevronForward size={11} className="-ml-1.5" />
                      </div>
                    </motion.a>
                  ))}
                </div>

              </div>
          </section>

          {/* Gallery */}
          <section className="bg-[#1a1a1a] py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="mb-10 md:mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-3 flex items-center gap-2"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                    <Dumbbell size={12} className="text-zinc-950" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                    Our Gallery
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="font-extrabold uppercase leading-none tracking-tight text-white text-[clamp(2rem,4.5vw,4.5rem)]"
                >
                  MOMENTS &amp;
                  <br />
                  MEMORIES
                </motion.h2>
              </div>
            </div>

            {/* Masonry grid */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
              <AnimatePresence>
                {MASONRY_IMAGES.slice(0, visibleCount).map((img, i) => (
                  <motion.div
                    key={img.src}
                    className="break-inside-avoid mb-3 overflow-hidden rounded-2xl group cursor-pointer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ aspectRatio: img.ratio }}
                      />
                      <div className="absolute inset-0 bg-[#E6FF2B]/0 group-hover:bg-[#E6FF2B]/10 transition-colors duration-300" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More button */}
            {visibleCount < MASONRY_IMAGES.length && (
              <div className="mt-10 flex justify-center">
                <motion.button
                  onClick={() => setVisibleCount((c) => Math.min(c + 4, MASONRY_IMAGES.length))}
                  className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-[#E6FF2B] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest cursor-pointer"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.span
                    className="absolute inset-0 bg-[#E6FF2B]"
                    style={{ transformOrigin: 'left' }}
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span
                    className="relative z-10 mr-3"
                    variants={{ rest: { color: '#E6FF2B' }, hover: { color: '#09090b' } }}
                    transition={{ duration: 0.32, ease: 'easeInOut' }}
                  >
                    Show More
                  </motion.span>
                  <motion.span
                    className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    variants={{
                      rest:  { backgroundColor: '#E6FF2B', color: '#09090b' },
                      hover: { backgroundColor: '#09090b', color: '#E6FF2B' },
                    }}
                    transition={{ duration: 0.32, ease: 'easeInOut' }}
                  >
                    <IoChevronForward size={11} />
                    <IoChevronForward size={11} className="-ml-1.5" />
                  </motion.span>
                </motion.button>
              </div>
            )}
          </section>

          {/* Follow Us On Social Media */}
          <section className="bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

              {/* Left — heading + social links */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-3 flex items-center gap-2"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]">
                    <Dumbbell size={12} className="text-[#E6FF2B]" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: 'rgba(26,26,26,0.5)' }}>
                    Stay Connected
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A] text-[clamp(2rem,4.5vw,4.5rem)] mb-10"
                >
                  FOLLOW US ON
                  <br />
                  SOCIAL MEDIA
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
                      className="flex items-center justify-between py-4 border-b border-zinc-200 group"
                    >
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-950 group-hover:text-[#1A1A1A] transition-colors duration-200">
                        {item}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 group-hover:bg-[#1A1A1A] transition-all duration-200">
                        <IoChevronForward size={11} className="text-zinc-950 group-hover:text-[#E6FF2B] transition-colors duration-200" />
                        <IoChevronForward size={11} className="-ml-1.5 text-zinc-950 group-hover:text-[#E6FF2B] transition-colors duration-200" />
                      </div>
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
                className="rounded-2xl overflow-hidden aspect-4/3 w-full"
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
