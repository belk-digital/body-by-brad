'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { memo, useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, Dumbbell, Calendar } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

import { LanguageProvider } from '@/lib/LanguageContext';
import { socialMenuItems } from '@/lib/constants';
import type { CalendarEvent } from '@/components/ui/EventCalendar';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';

// Code-split below-fold sections — not needed for initial paint
const EventCalendar = dynamic(() => import('@/components/ui/EventCalendar'), { ssr: false });
const FAQSection    = dynamic(() => import('@/components/sections/FAQSection'));
const CTASection    = dynamic(() => import('@/components/sections/CTASection'));
const Footer        = dynamic(() => import('@/components/layout/Footer'));

// ─── Data ────────────────────────────────────────────────────────────────────

const NEXT_EVENT = new Date('2026-08-15T08:45:00');

const HERO_IMAGES = [
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780311283/Photo_Apr_28_2026_7_45_53_PM_slhtpk.webp', alt: 'BBB Event 1' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780311282/Photo_Apr_28_2026_6_50_48_PM_dpg8o8.webp', alt: 'BBB Event 2' },
];

const EVENT_IMAGES = [
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779141500/IMG_3056_fvrulw.jpg' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139531/IMG_3076_zziehi.jpg' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779233545/IMG_0593_nbc9pi.jpg' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779233552/IMG_0591_cyzuem.jpg' },
  { src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp' },
];

type MasonryItem =
  | { type: 'image'; src: string; alt: string; ratio: string }
  | { type: 'video'; src: string; alt: string; ratio: string };

const MASONRY_ITEMS: MasonryItem[] = [
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg', alt: 'Cooldown Event Charleston', ratio: '3/4' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318161/everywhere_you_run_LRC_is_there_to_carry_you_home_Thank_you_thedropin___for_hosting_us_this_1_zoecku.jpg', alt: 'LRC Carry You Home', ratio: '1/1' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318163/singles_couples_run_sponsored_by_good_views_tequila___Big_thank_you_to_saltymikesdeckbar_l4z9fv.jpg', alt: 'Singles Couples Run', ratio: '4/5' },
  { type: 'video', src: 'https://res.cloudinary.com/dgrrovta3/video/upload/v1780318171/you_know_the_vibes_out_here_on_LRC_x_cooldownrunning_Tuesdays___Big_shoutout_to_sfvqqn.mp4', alt: 'LRC x Cooldown Running Vibes', ratio: '9/16' },
  { type: 'video', src: 'https://res.cloudinary.com/dgrrovta3/video/upload/v1780318163/singles_couples_run_sponsored_by_good_views_tequila___Big_thank_you_to_saltymikesdeckbar_fpknfq.mp4', alt: 'Singles Couples Run Event', ratio: '9/16' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318162/singles_couples_run_sponsored_by_good_views_tequila___Big_thank_you_to_saltymikesdeckbar_1_n6ofkx.jpg', alt: 'Singles Couples Run 2', ratio: '3/4' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318162/everywhere_you_run_LRC_is_there_to_carry_you_home_Thank_you_thedropin___for_hosting_us_this_arcnmf.jpg', alt: 'LRC Community Event', ratio: '4/5' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318161/everywhere_you_run_LRC_is_there_to_carry_you_home_Thank_you_thedropin___for_hosting_us_this_2_aq3be7.jpg', alt: 'LRC Carry You Home 2', ratio: '1/1' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318161/anyone_else_feeling_the_post_bridge_run_blues_3_wii1rg.jpg', alt: 'Post Bridge Run Blues', ratio: '3/4' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318161/anyone_else_feeling_the_post_bridge_run_blues_1_ckfhx4.jpg', alt: 'Post Bridge Run Blues 1', ratio: '4/5' },
  { type: 'image', src: 'https://res.cloudinary.com/dgrrovta3/image/upload/v1780318161/anyone_else_feeling_the_post_bridge_run_blues_2_ungwji.jpg', alt: 'Post Bridge Run Blues 2', ratio: '1/1' },
];
// Pre-sliced so we never create a new array on render
const MASONRY_INITIAL = MASONRY_ITEMS.slice(0, 4);

// Pre-doubled so the ticker never allocates on render
const TICKER_ITEMS = ['HIGHLIGHTS', 'PUSHING LIMITS', 'CHASING GOALS', 'BBB EVENTS', 'COMMUNITY FIRST', 'SHOW UP'];
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

const UPCOMING_EVENTS = [
  { title: 'Summer Cooldown 2026 Now Open',   desc: 'Join us at Marion Square for a free outdoor workout open to all fitness levels — no equipment needed.',       href: '#' },
  { title: 'BBB Outdoor HIIT – July Edition', desc: 'High-intensity interval training on the waterfront. Push your limits with Coach Brad and the BBB community.', href: '#' },
  { title: 'Sunset Bootcamp at Folly Beach',  desc: 'End your summer with an unforgettable beachside bootcamp. Register early — spots are limited.',                href: '#' },
];

const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ce-1', title: 'Summer Cooldown 2026',        date: '2026-08-15', time: '8:45 AM',  endTime: '10:30 AM', location: 'Marion Square, Charleston SC',    description: 'Join us at Marion Square for a free outdoor workout open to all fitness levels — no equipment needed. Bring water and a great attitude.', type: 'workout',   href: '/register',     spots: 80, spotsLeft: 23 },
  { id: 'ce-2', title: 'BBB Outdoor HIIT – July',     date: '2026-07-12', time: '7:00 AM',  endTime: '8:15 AM',  location: 'Waterfront Park, Charleston SC', description: 'High-intensity interval training on the waterfront. Push your limits with Coach Brad and the BBB community.',                            type: 'hiit',      href: '/register',     spots: 40, spotsLeft: 11 },
  { id: 'ce-3', title: 'Sunset Bootcamp at Folly',    date: '2026-09-06', time: '6:00 PM',  endTime: '7:30 PM',  location: 'Folly Beach, SC',                description: 'End your summer with an unforgettable beachside bootcamp. Register early — spots are very limited.',                                       type: 'bootcamp',  href: '/register',     spots: 30, spotsLeft: 7  },
  { id: 'ce-4', title: 'BBB Community Run Club',      date: '2026-07-26', time: '6:30 AM',                       location: 'Battery Park, Charleston SC',     description: 'A laid-back group run through the historic streets of Charleston. All paces welcome — finish with coffee on us.',                         type: 'community', href: '/register',     spots: 60, spotsLeft: 34 },
  { id: 'ce-5', title: 'BBB Merch Drop — Summer',     date: '2026-08-01', time: '12:00 PM',                      location: 'Online & In-Person Pop-Up',       description: 'Limited summer merch drop. In-person pop-up at the studio plus simultaneous online release. Quantities strictly limited.',               type: 'merch',     href: '/merchandise'                       },
  { id: 'ce-6', title: 'Morning Mobility & Stretch',  date: '2026-06-21', time: '8:00 AM',  endTime: '9:00 AM',  location: 'Hampton Park, Charleston SC',     description: 'Kickstart your summer solstice with a deep stretch and mobility flow led by Coach Brad. Free and open to all.',                         type: 'workout',   href: '/register',     spots: 50, spotsLeft: 38 },
  { id: 'ce-7', title: 'BBB HIIT & Chill – August',   date: '2026-08-15', time: '11:00 AM', endTime: '12:00 PM', location: 'Marion Square, Charleston SC',    description: 'Second session of the day — a shorter, high-energy HIIT block after the morning Cooldown event.',                                      type: 'hiit',      href: '/register',     spots: 40, spotsLeft: 18 },
];

// ─── Isolated components ─────────────────────────────────────────────────────

// Extracted so its 1-second setInterval never re-renders EventsPage
function CountdownCard() {
  const calc = () => {
    const d = Math.max(0, NEXT_EVENT.getTime() - Date.now());
    return {
      days:  Math.floor(d / 86400000),
      hours: Math.floor((d / 3600000) % 24),
      mins:  Math.floor((d / 60000) % 60),
      secs:  Math.floor((d / 1000) % 60),
    };
  };
  const [cd, setCd] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    setCd(calc());
    const id = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-2xl bg-[#191919] px-4 sm:px-5 py-4 flex flex-col justify-center">
      <div className="flex items-end gap-3 sm:gap-4 md:gap-6 mb-2.5">
        {([
          { v: cd.days,  l: 'Days'  },
          { v: cd.hours, l: 'Hours' },
          { v: cd.mins,  l: 'Mins'  },
          { v: cd.secs,  l: 'Secs'  },
        ] as const).map(({ v, l }) => (
          <div key={l} className="flex flex-col items-center">
            <span className="text-white font-extrabold text-xl md:text-2xl tabular-nums leading-none">
              {String(v).padStart(2, '0')}
            </span>
            <span className="text-zinc-400 text-[8px] font-bold uppercase tracking-widest mt-1">{l}</span>
          </div>
        ))}
      </div>
      <p className="text-zinc-400 text-[11px] font-medium leading-relaxed">
        August 15th, 2026<br />At 8:45 AM
      </p>
    </div>
  );
}

const MasonryCard = memo(function MasonryCard({ item, index }: { item: MasonryItem; index: number }) {
  const [loaded, setLoaded]       = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const imgRef      = useRef<HTMLImageElement>(null);
  const modalVidRef = useRef<HTMLVideoElement>(null);

  // Handle cached images where onLoad fires before React attaches the handler
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  // Play / pause the modal video when it opens/closes
  useEffect(() => {
    const el = modalVidRef.current;
    if (!el) return;
    if (modalOpen) el.play().catch(() => {});
    else { el.pause(); el.currentTime = 0; }
  }, [modalOpen]);

  // Close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  return (
    <>
      <motion.div
        className="break-inside-avoid mb-3 overflow-hidden rounded-lg group"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -40px 0px' }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: item.ratio }}>
          {!loaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}

          {item.type === 'video' ? (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setModalOpen(true)}>
              {/* preload="metadata" fetches the first frame as a thumbnail */}
              <video
                src={item.src}
                muted
                playsInline
                preload="metadata"
                onLoadedMetadata={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
              {loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <PlayIcon className="w-6 h-6 text-zinc-900 ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <img
                ref={imgRef}
                src={item.src}
                alt={item.alt}
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.7s, transform 0.7s' }}
              />
              {loaded && <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />}
            </>
          )}
        </div>
      </motion.div>

      {/* Video modal — fixed overlay, plays with audio */}
      <AnimatePresence>
        {modalOpen && item.type === 'video' && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-sm"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.92,    opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVidRef}
                src={item.src}
                controls
                playsInline
                className="w-full rounded-2xl shadow-2xl"
                style={{ aspectRatio: item.ratio, maxHeight: '80vh' }}
              />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute -top-9 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
              >
                Close <span className="text-base leading-none">✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [isLoading, setIsLoading]         = useState(true);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isScrolled, setIsScrolled]       = useState(false);
  const [heroSlide, setHeroSlide]         = useState(0);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [heroPaused, setHeroPaused]       = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    if (heroPaused) return;
    const id = setInterval(() => setHeroSlide((s) => (s + 1) % HERO_IMAGES.length), 3000);
    return () => clearInterval(id);
  }, [heroPaused]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const up = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && up) setIsScrolled(true);
    else if (!up || latest <= 100) setIsScrolled(false);
  });

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  const visibleItems = showAllGallery ? MASONRY_ITEMS : MASONRY_INITIAL;

  return (
    <LanguageProvider>
      <ReactLenis root>
        <div className="relative w-full font-satoshi overflow-x-hidden">

          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          {/* ── Hero ── */}
          <section className="relative min-h-screen w-full overflow-hidden bg-zinc-50 flex items-center">
            <Navbar
              isLoading={isLoading}
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              onMenuToggle={setIsMenuOpen}
              theme="dark"
            />

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isLoading ? { opacity: 0, y: 32 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.45 }}
              className="w-full px-4 sm:px-7 md:px-12 pt-28 pb-10 md:pt-32 md:pb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] md:grid-rows-[1fr_auto] gap-3 md:h-[calc(100vh-11rem)]">

                {/* Card 1 — Info */}
                <div className="bg-[#E6FF2B] rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-80 md:min-h-0">
                  <div>
                    <h2 className="text-zinc-950 font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-3 uppercase">
                      Charleston Cooldown<br />2026
                    </h2>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs">
                      Embark on the ultimate outdoor fitness experience — where every rep is a journey of community and self&#8209;discovery.
                    </p>
                  </div>
                  <motion.a
                    href="/register"
                    className="relative mt-6 flex w-full items-center justify-between overflow-hidden rounded-full border-2 border-[#1A1A1A] py-3 pl-5 pr-2 cursor-pointer"
                    initial="rest" whileHover="hover" animate="rest"
                  >
                    <motion.span className="absolute inset-0 bg-[#1A1A1A]" style={{ transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                    <motion.span className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest" variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>Register Here</motion.span>
                    <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: '#1A1A1A', color: '#E6FF2B' }, hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                      <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                    </motion.span>
                  </motion.a>
                </div>

                {/* Card 2 — Slideshow, spans both rows */}
                <div className="md:row-span-2 relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-auto">
                  {HERO_IMAGES.map((img, i) => (
                    <img
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${i === heroSlide ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                  <button
                    onClick={() => setHeroPaused((p) => !p)}
                    className="absolute top-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-zinc-800 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm hover:bg-white transition-colors cursor-pointer"
                  >
                    {heroPaused ? <><PlayIcon className="w-3 h-3" /> Resume slide</> : <><PauseIcon className="w-3 h-3" /> Pause slide</>}
                  </button>
                  <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5">
                    {HERO_IMAGES.map((_, i) => (
                      <button key={i} onClick={() => setHeroSlide(i)} className="rounded-full transition-all cursor-pointer" style={{ width: i === heroSlide ? 18 : 7, height: 7, backgroundColor: i === heroSlide ? '#E6FF2B' : 'rgba(255,255,255,0.65)' }} />
                    ))}
                  </div>
                </div>

                {/* Cards 3 & 4 */}
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[110px_1fr] gap-3">
                  <div className="relative rounded-2xl overflow-hidden min-h-22">
                    <img src="https://res.cloudinary.com/dgrrovta3/image/upload/v1780311653/608315322_17953619883051106_8749987046411868448_n_gfvmne.jpg" alt="Event preview" className="w-full h-full object-cover" />
                  </div>
                  <CountdownCard />
                </div>

              </div>
            </motion.div>
          </section>

          {/* ── Event Highlights ── */}
          <section className="bg-[#0a0a0a] overflow-hidden">

            <div className="overflow-hidden border-b border-white/[0.06] py-5">
              <motion.div
                className="flex items-center whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                style={{ willChange: 'transform' }}
              >
                {TICKER_DOUBLED.map((item, i) => (
                  <span key={i} className="inline-flex items-center mr-10">
                    <span className="text-[#E6FF2B] font-extrabold uppercase text-xl md:text-2xl tracking-widest">{item}</span>
                    <span className="text-white/20 ml-10">—</span>
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="px-4 sm:px-7 md:px-12 pt-12 md:pt-16">

              {/* Featured Event Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="relative rounded-lg overflow-hidden mb-16 md:mb-20"
                style={{ minHeight: 480 }}
              >
                <img src={HERO_IMAGES[0].src} alt="Summer Cooldown 2026" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
                <div className="relative z-10 flex flex-col justify-between p-6 md:p-10" style={{ minHeight: 480 }}>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#E6FF2B] text-black text-[9px] font-extrabold uppercase tracking-[0.18em] px-3 py-1.5 rounded-sm">Featured</span>
                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Summer Cooldown 2026</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h2 className="font-extrabold uppercase text-white leading-none mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
                        THE ULTIMATE<br />SUMMER WORKOUT
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                        Marion Square comes alive — community, sweat, and Charleston sunshine. Open to all fitness levels, no equipment needed.
                      </p>
                    </div>
                    <a href="/register" className="shrink-0 flex items-center gap-2 border border-white/50 text-white text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                      Register Now <IoChevronForward size={11} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Masonry Gallery */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                {visibleItems.map((item, i) => (
                  <MasonryCard key={item.src} item={item} index={i} />
                ))}
              </div>

              {/* Gallery toggle */}
              <div className="mt-6 mb-16 md:mb-20 flex justify-center">
                <motion.button
                  onClick={() => setShowAllGallery((v) => !v)}
                  className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-white/30 py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest cursor-pointer"
                  initial="rest" whileHover="hover" animate="rest"
                >
                  <motion.span className="absolute inset-0 bg-[#E6FF2B]" style={{ transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                  <motion.span className="relative z-10 mr-3" variants={{ rest: { color: '#ffffff' }, hover: { color: '#09090b' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                    {showAllGallery ? 'Show Less' : 'Show All'}
                  </motion.span>
                  <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }, hover: { backgroundColor: '#09090b', color: '#E6FF2B' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                    <IoChevronForward size={11} className={showAllGallery ? 'rotate-90' : '-rotate-90'} />
                  </motion.span>
                </motion.button>
              </div>

              {/* Next Up */}
              <div className="border-t border-white/10 pt-12 pb-16 md:pb-24">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
                  <div>
                    <h2 className="font-extrabold uppercase text-white leading-none mb-2 text-[clamp(2rem,4vw,3.5rem)]">NEXT UP</h2>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                      Lace up. Here&apos;s where we&apos;re heading next — registration opens two weeks before event day.
                    </p>
                  </div>
                  <a href="#register" className="flex items-center gap-1 text-[#E6FF2B] text-[10px] font-extrabold uppercase tracking-widest hover:opacity-70 transition-opacity mt-1">
                    All Events <IoChevronForward size={10} />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {([
                    { date: 'JUN 21, 2026', title: 'Morning Mobility & Stretch', tagline: 'Kickstart your summer with a deep stretch and mobility flow.', location: 'Hampton Park, Charleston SC', time: '8:00 AM – 9:00 AM', spots: '50 spots', type: 'Free Admission', image: EVENT_IMAGES[5].src, featured: false },
                    { date: 'JUL 12, 2026', title: 'BBB Outdoor HIIT',           tagline: 'Push your limits with Coach Brad and the BBB community.',       location: 'Waterfront Park, Charleston SC', time: '7:00 AM – 8:15 AM', spots: '40 spots', type: 'Free Admission', image: EVENT_IMAGES[1].src, featured: false },
                    { date: 'AUG 15, 2026', title: 'Summer Cooldown 2026',        tagline: 'Marion Square comes alive — the biggest BBB event of the year.', location: 'Marion Square, Charleston SC',  time: '8:45 AM – 10:30 AM', spots: '80 spots', type: 'Free Admission', image: HERO_IMAGES[0].src, featured: true  },
                  ] as const).map((ev, i) => {
                    const cardBg      = ev.featured ? '#E6FF2B' : '#252525';
                    const textPrimary = ev.featured ? '#09090b' : '#ffffff';
                    const textMuted   = ev.featured ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.45)';
                    const accentCol   = ev.featured ? '#09090b' : '#E6FF2B';
                    const dividerCol  = ev.featured ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';
                    const labelHover  = ev.featured ? '#E6FF2B' : '#09090b';
                    const circRestBg  = accentCol;
                    const circRestTxt = ev.featured ? '#E6FF2B' : '#09090b';
                    const circHoverBg = ev.featured ? '#E6FF2B' : '#09090b';
                    const circHoverTxt = accentCol;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="flex overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center gap-2 mb-5">
                            <Calendar size={11} style={{ color: accentCol }} />
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: accentCol }}>{ev.date}</p>
                          </div>
                          <h3 className="font-extrabold uppercase leading-tight tracking-tight mb-1" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: textPrimary }}>{ev.title}</h3>
                          <p className="mb-5 text-xs font-medium leading-snug" style={{ color: textMuted }}>{ev.tagline}</p>
                          <motion.a href="/register" className="relative mb-5 flex w-full items-center justify-between overflow-hidden rounded-full border-2 py-3 pl-5 pr-2" style={{ borderColor: accentCol }} initial="rest" whileHover="hover" animate="rest">
                            <motion.span className="absolute inset-0" style={{ backgroundColor: accentCol, transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                            <motion.span className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest" variants={{ rest: { color: accentCol }, hover: { color: labelHover } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>Register Now</motion.span>
                            <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: circRestBg, color: circRestTxt }, hover: { backgroundColor: circHoverBg, color: circHoverTxt } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                              <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                            </motion.span>
                          </motion.a>
                          <div className="mb-5 h-px w-full" style={{ backgroundColor: dividerCol }} />
                          <ul className="flex flex-col gap-2">
                            {[ev.time, ev.location, ev.spots, ev.type].map((detail) => (
                              <li key={detail} className="flex items-start gap-2">
                                <span className="mt-0.5 shrink-0 text-[10px]" style={{ color: accentCol }}>✓</span>
                                <span className="text-[11px] leading-snug" style={{ color: textMuted }}>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="hidden w-[38%] shrink-0 p-3 lg:flex lg:items-stretch">
                          <div className="w-full overflow-hidden rounded-xl">
                            <img src={ev.image} alt={ev.title} className="h-full w-full object-cover object-center" loading="lazy" decoding="async" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>

          {/* ── Upcoming Events ── */}
          <section id="register" className="bg-zinc-50 py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]"><Dumbbell size={12} className="text-[#E6FF2B]" /></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">Don&apos;t miss out</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A] text-[clamp(2rem,4.5vw,4.5rem)]">
                  UPCOMING<br />EVENTS
                </motion.h2>
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }}>
                <motion.a href="/register" className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-[#1A1A1A] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest" initial="rest" whileHover="hover" animate="rest">
                  <motion.span className="absolute inset-0 bg-[#1A1A1A]" style={{ transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                  <motion.span className="relative z-10 mr-3" variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>Register Now</motion.span>
                  <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: '#1A1A1A', color: '#E6FF2B' }, hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                    <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-4">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} className="relative rounded-2xl overflow-hidden min-h-72 md:min-h-0">
                <img src={EVENT_IMAGES[2].src} alt="BBB Events" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B] mb-2">BBB Community</p>
                  <h3 className="text-white font-extrabold uppercase text-2xl md:text-3xl leading-tight mb-3">Our Programs &amp;<br />Events</h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs">Embark on the ultimate outdoor fitness experience — where every rep is a journey of community and self&#8209;discovery.</p>
                </div>
              </motion.div>

              <div className="flex flex-col gap-3">
                {UPCOMING_EVENTS.map((event, i) => (
                  <motion.a key={i} href={event.href} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} className="flex items-start justify-between gap-4 rounded-2xl px-6 py-5 group transition-opacity hover:opacity-90" style={{ backgroundColor: i === 0 ? '#E6FF2B' : '#f4f4f5' }}>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold uppercase text-sm md:text-base leading-snug mb-1.5 tracking-tight" style={{ color: '#09090b' }}>{event.title}</h3>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: i === 0 ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.45)' }}>{event.desc}</p>
                    </div>
                    <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110" style={{ backgroundColor: '#1A1A1A', color: '#E6FF2B' }}>
                      <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Event Calendar ── */}
          <section className="bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="mb-10 md:mb-14">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]"><Dumbbell size={12} className="text-[#E6FF2B]" /></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">Schedule</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A] text-[clamp(2rem,4.5vw,4.5rem)]">
                EVENT<br />CALENDAR
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-zinc-500 text-sm leading-relaxed max-w-md">
                Browse all upcoming BBB events. Click any highlighted date to view details and register.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              <EventCalendar events={CALENDAR_EVENTS} />
            </motion.div>
          </section>

          {/* ── Social Media ── */}
          <section className="bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]"><Dumbbell size={12} className="text-[#E6FF2B]" /></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: 'rgba(26,26,26,0.5)' }}>Stay Connected</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A] text-[clamp(2rem,4.5vw,4.5rem)] mb-10">
                  FOLLOW US ON<br />SOCIAL MEDIA
                </motion.h2>
                <div className="flex flex-col">
                  {socialMenuItems.map((item, i) => (
                    <motion.a key={item} href="#" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-center justify-between py-4 border-b border-zinc-200 group">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-950 group-hover:text-[#1A1A1A] transition-colors duration-200">{item}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 group-hover:bg-[#1A1A1A] transition-all duration-200">
                        <IoChevronForward size={11} className="text-zinc-950 group-hover:text-[#E6FF2B] transition-colors duration-200" />
                        <IoChevronForward size={11} className="-ml-1.5 text-zinc-950 group-hover:text-[#E6FF2B] transition-colors duration-200" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.15 }} className="rounded-2xl overflow-hidden aspect-4/3 w-full">
                <img src={EVENT_IMAGES[2].src} alt="Body By Brad Community" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
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
