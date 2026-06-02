'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import { memo, useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, Dumbbell, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

import { socialMenuItems } from '@/lib/constants';
import type { CalendarEvent } from '@/components/ui/EventCalendar';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

const EventCalendar = dynamic(() => import('@/components/ui/EventCalendar'), { ssr: false });

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
const MASONRY_INITIAL = MASONRY_ITEMS.slice(0, 4);

const TICKER_ITEMS = ['HIGHLIGHTS', 'PUSHING LIMITS', 'CHASING GOALS', 'BBB EVENTS', 'COMMUNITY FIRST', 'SHOW UP'];
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

const UPCOMING_EVENTS = [
  { title: "Let's Run CHS – Body By Brad Events",  desc: "Join Charleston's legendary run club Let's Run CHS for weekly community runs powered by Body By Brad. All paces welcome.", href: '#' },
  { title: 'Body By Brad Events – Summer 2026',    desc: 'Join us at Marion Square for a free outdoor workout open to all fitness levels — no equipment needed.',                    href: '#' },
  { title: 'BBB Outdoor HIIT – July Edition',      desc: 'High-intensity interval training on the waterfront. Push your limits with Coach Brad and the BBB community.',            href: '#' },
];

const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ce-1', title: 'Body By Brad Events 2026',    date: '2026-08-15', time: '8:45 AM',  endTime: '10:30 AM', location: 'Marion Square, Charleston SC',    description: 'Join us at Marion Square for a free outdoor workout open to all fitness levels — no equipment needed. Bring water and a great attitude.', type: 'workout',   href: '/register',     spots: 80, spotsLeft: 23 },
  { id: 'ce-2', title: 'BBB Outdoor HIIT – July',     date: '2026-07-12', time: '7:00 AM',  endTime: '8:15 AM',  location: 'Waterfront Park, Charleston SC', description: 'High-intensity interval training on the waterfront. Push your limits with Coach Brad and the BBB community.',                            type: 'hiit',      href: '/register',     spots: 40, spotsLeft: 11 },
  { id: 'ce-3', title: 'Sunset Bootcamp at Folly',    date: '2026-09-06', time: '6:00 PM',  endTime: '7:30 PM',  location: 'Folly Beach, SC',                description: 'End your summer with an unforgettable beachside bootcamp. Register early — spots are very limited.',                                       type: 'bootcamp',  href: '/register',     spots: 30, spotsLeft: 7  },
  { id: 'ce-4', title: 'BBB Community Run Club',      date: '2026-07-26', time: '6:30 AM',                       location: 'Battery Park, Charleston SC',     description: 'A laid-back group run through the historic streets of Charleston. All paces welcome — finish with coffee on us.',                         type: 'community', href: '/register',     spots: 60, spotsLeft: 34 },
  { id: 'ce-5', title: 'BBB Merch Drop — Summer',     date: '2026-08-01', time: '12:00 PM',                      location: 'Online & In-Person Pop-Up',       description: 'Limited summer merch drop. In-person pop-up at the studio plus simultaneous online release. Quantities strictly limited.',               type: 'merch',     href: '/merchandise'                       },
  { id: 'ce-6', title: 'Morning Mobility & Stretch',  date: '2026-06-21', time: '8:00 AM',  endTime: '9:00 AM',  location: 'Hampton Park, Charleston SC',     description: 'Kickstart your summer solstice with a deep stretch and mobility flow led by Coach Brad. Free and open to all.',                         type: 'workout',   href: '/register',     spots: 50, spotsLeft: 38 },
  { id: 'ce-7', title: 'BBB HIIT & Chill – August',   date: '2026-08-15', time: '11:00 AM', endTime: '12:00 PM', location: 'Marion Square, Charleston SC',    description: 'Second session of the day — a shorter, high-energy HIIT block after the morning Body By Brad Events workout.',                          type: 'hiit',      href: '/register',     spots: 40, spotsLeft: 18 },
];

// ─── Isolated components ─────────────────────────────────────────────────────

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
    <div className="rounded-2xl bg-[#191919] px-3 sm:px-5 py-3 sm:py-4 flex flex-col justify-center h-full">
      <div className="flex items-end gap-2 sm:gap-4 mb-2">
        {([
          { v: cd.days,  l: 'Days'  },
          { v: cd.hours, l: 'Hours' },
          { v: cd.mins,  l: 'Mins'  },
          { v: cd.secs,  l: 'Secs'  },
        ] as const).map(({ v, l }) => (
          <div key={l} className="flex flex-col items-center">
            <span className="text-white font-extrabold text-lg sm:text-xl md:text-2xl tabular-nums leading-none">
              {String(v).padStart(2, '0')}
            </span>
            <span className="text-zinc-400 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest mt-1">{l}</span>
          </div>
        ))}
      </div>
      <p className="text-zinc-400 text-[10px] sm:text-[11px] font-medium leading-relaxed">
        August 15th, 2026<br />At 8:45 AM
      </p>
    </div>
  );
}

const MasonryCard = memo(function MasonryCard({
  item,
  index,
  onOpen,
}: {
  item: MasonryItem;
  index: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(item.type === 'video');
  const imgRef  = useRef<HTMLImageElement>(null);
  const posterUrl = item.type === 'video' ? item.src.replace(/\.mp4(\?.*)?$/, '.jpg') : '';

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <motion.div
      className="break-inside-avoid mb-3 overflow-hidden rounded-lg group cursor-pointer"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: item.ratio }}>
        {!loaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}

        {item.type === 'video' ? (
          <div className="relative w-full h-full">
            <video
              src={item.src}
              poster={posterUrl}
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors duration-300">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 ml-0.5" />
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
  );
});

// ─── Lightbox ────────────────────────────────────────────────────────────────

function LightboxModal({
  items,
  index,
  onClose,
  onChange,
}: {
  items: MasonryItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const item   = items[index];
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onChange((index - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, onChange]);

  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  }, [index]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/78 backdrop-blur-sm" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 hover:bg-white transition-colors shadow-lg cursor-pointer"
      >
        <span className="text-sm font-bold leading-none">✕</span>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onChange((index - 1 + items.length) % items.length); }}
        className="absolute left-3 sm:left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 hover:bg-white/22 text-white transition-colors backdrop-blur-sm cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Media */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className="relative z-10 mx-16 sm:mx-20 flex flex-col items-center"
          style={{ maxWidth: 480, width: '100%' }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt}
              className="w-full rounded-2xl shadow-2xl object-cover"
              style={{ aspectRatio: item.ratio, maxHeight: '85vh' }}
            />
          ) : (
            <video
              ref={vidRef}
              src={item.src}
              controls
              playsInline
              className="w-full rounded-2xl shadow-2xl"
              style={{ aspectRatio: item.ratio, maxHeight: '85vh' }}
            />
          )}

          {/* Dot indicators */}
          <div className="mt-4 flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onChange(i); }}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width:           i === index ? 18 : 6,
                  height:          6,
                  backgroundColor: i === index ? '#E6FF2B' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onChange((index + 1) % items.length); }}
        className="absolute right-3 sm:right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 hover:bg-white/22 text-white transition-colors backdrop-blur-sm cursor-pointer"
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [isLoading, setIsLoading]           = useState(true);
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [isScrolled, setIsScrolled]         = useState(false);
  const [heroSlide, setHeroSlide]           = useState(0);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [heroPaused, setHeroPaused]         = useState(false);
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);
  const prevScrollY = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    const t = window.requestAnimationFrame(() => lenis?.resize());
    return () => window.cancelAnimationFrame(t);
  }, [showAllGallery, lenis]);

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
    <ReactLenis root>
        <div className="relative w-full font-satoshi overflow-x-hidden">

          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          {/* ── Hero ── */}
          <section className="relative min-h-screen w-full overflow-hidden bg-zinc-50 flex items-start md:items-center">
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
              className="w-full px-4 sm:px-7 md:px-12 pt-24 sm:pt-28 pb-8 md:pt-32 md:pb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] md:grid-rows-[1fr_auto] gap-3 md:h-[calc(100vh-11rem)]">

                {/* Card 1 — Info */}
                <div className="bg-[#E6FF2B] rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-72 md:min-h-0">
                  <div>
                    <h2 className="text-zinc-950 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-2 sm:mb-3 uppercase">
                      Body By Brad<br />Events 2026
                    </h2>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs">
                      Embark on the ultimate outdoor fitness experience — where every rep is a journey of community and self&#8209;discovery.
                    </p>
                  </div>
                  <motion.a
                    href="/register"
                    className="relative mt-5 flex w-full items-center justify-between overflow-hidden rounded-full border-2 border-[#1A1A1A] py-3 pl-5 pr-2 cursor-pointer"
                    initial="rest" whileHover="hover" animate="rest"
                  >
                    <motion.span className="absolute inset-0 bg-[#1A1A1A]" style={{ transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                    <motion.span className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest" variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>Register Here</motion.span>
                    <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: '#1A1A1A', color: '#E6FF2B' }, hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                      <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                    </motion.span>
                  </motion.a>
                </div>

                {/* Card 2 — Slideshow */}
                <div className="md:row-span-2 relative rounded-2xl overflow-hidden h-52 sm:h-64 md:h-auto">
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
                  <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5">
                    {HERO_IMAGES.map((_, i) => (
                      <button key={i} onClick={() => setHeroSlide(i)} className="rounded-full transition-all cursor-pointer" style={{ width: i === heroSlide ? 18 : 7, height: 7, backgroundColor: i === heroSlide ? '#E6FF2B' : 'rgba(255,255,255,0.65)' }} />
                    ))}
                  </div>
                </div>

                {/* Cards 3 & 4 */}
                <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[110px_1fr] gap-3 h-[88px] sm:h-[100px]">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src="https://res.cloudinary.com/dgrrovta3/image/upload/v1780311653/608315322_17953619883051106_8749987046411868448_n_gfvmne.jpg" alt="Event preview" className="w-full h-full object-cover" />
                  </div>
                  <CountdownCard />
                </div>

              </div>
            </motion.div>
          </section>

          {/* ── Event Highlights ── */}
          <section className="bg-[#0a0a0a] overflow-hidden">

            <div className="overflow-hidden border-b border-white/[0.06] py-4 sm:py-5">
              <motion.div
                className="flex items-center whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                style={{ willChange: 'transform' }}
              >
                {TICKER_DOUBLED.map((item, i) => (
                  <span key={i} className="inline-flex items-center mr-8 sm:mr-10">
                    <span className="text-[#E6FF2B] font-extrabold uppercase text-lg sm:text-xl md:text-2xl tracking-widest">{item}</span>
                    <span className="text-white/20 ml-8 sm:ml-10">—</span>
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="px-4 sm:px-7 md:px-12 pt-10 md:pt-16">

              {/* Featured Event Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="relative rounded-xl overflow-hidden mb-12 md:mb-20 min-h-[260px] sm:min-h-[360px] md:min-h-[480px]"
              >
                <img src={HERO_IMAGES[0].src} alt="Body By Brad Events 2026" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
                <div className="relative z-10 flex flex-col justify-between p-5 sm:p-7 md:p-10 min-h-[260px] sm:min-h-[360px] md:min-h-[480px]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="bg-[#E6FF2B] text-black text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.18em] px-2.5 sm:px-3 py-1.5 rounded-sm">Featured</span>
                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">Body By Brad Events 2026</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <h2 className="font-extrabold uppercase text-white leading-none mb-3" style={{ fontSize: 'clamp(1.6rem, 5vw, 3.5rem)' }}>
                        THE ULTIMATE<br />SUMMER WORKOUT
                      </h2>
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-sm sm:max-w-lg">
                        Marion Square comes alive — community, sweat, and Charleston sunshine. Open to all fitness levels, no equipment needed.
                      </p>
                    </div>
                    <a
                      href="/register"
                      className="flex items-center justify-center gap-2 border border-white/50 text-white text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-white hover:text-black transition-colors whitespace-nowrap sm:shrink-0 w-full sm:w-auto"
                    >
                      Register Now <IoChevronForward size={11} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Masonry Gallery */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
                {visibleItems.map((item, i) => (
                  <MasonryCard key={item.src} item={item} index={i} onOpen={() => setLightboxIndex(i)} />
                ))}
              </div>

              {/* Gallery toggle */}
              <div className="mt-5 mb-12 md:mb-20 flex justify-center">
                <motion.button
                  onClick={() => setShowAllGallery((v) => !v)}
                  className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-white/30 py-2.5 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest cursor-pointer"
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
              <div className="border-t border-white/10 pt-10 md:pt-12 pb-14 md:pb-24">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-8 md:mb-10">
                  <div>
                    <h2 className="font-extrabold uppercase text-white leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}>NEXT UP</h2>
                    <p className="text-white/35 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-sm">
                      Lace up. Here&apos;s where we&apos;re heading next — registration opens two weeks before event day.
                    </p>
                  </div>
                  <motion.a
                    href="/register"
                    className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-white/30 py-2.5 pl-5 sm:pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest shrink-0 mt-1"
                    initial="rest" whileHover="hover" animate="rest"
                  >
                    <motion.span className="absolute inset-0 bg-[#E6FF2B]" style={{ transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                    <motion.span className="relative z-10 mr-3" variants={{ rest: { color: '#ffffff' }, hover: { color: '#09090b' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>Register</motion.span>
                    <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }, hover: { backgroundColor: '#09090b', color: '#E6FF2B' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                      <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                    </motion.span>
                  </motion.a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {([
                    { date: 'JUN 21, 2026', title: 'Morning Mobility & Stretch', tagline: 'Kickstart your summer with a deep stretch and mobility flow.', location: 'Hampton Park, Charleston SC', time: '8:00 AM – 9:00 AM', spots: '50 spots', type: 'Free Admission', image: EVENT_IMAGES[5].src, featured: false },
                    { date: 'JUL 12, 2026', title: 'BBB Outdoor HIIT',           tagline: 'Push your limits with Coach Brad and the BBB community.',       location: 'Waterfront Park, Charleston SC', time: '7:00 AM – 8:15 AM', spots: '40 spots', type: 'Free Admission', image: EVENT_IMAGES[1].src, featured: false },
                    { date: 'AUG 15, 2026', title: 'Body By Brad Events 2026',    tagline: 'Marion Square comes alive — the biggest BBB event of the year.', location: 'Marion Square, Charleston SC',  time: '8:45 AM – 10:30 AM', spots: '80 spots', type: 'Free Admission', image: HERO_IMAGES[0].src, featured: true  },
                  ] as const).map((ev, i) => {
                    const cardBg      = ev.featured ? '#E6FF2B' : '#252525';
                    const textPrimary = ev.featured ? '#09090b' : '#ffffff';
                    const textMuted   = ev.featured ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.45)';
                    const accentCol   = ev.featured ? '#09090b' : '#E6FF2B';
                    const dividerCol  = ev.featured ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="flex overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar size={11} style={{ color: accentCol }} />
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: accentCol }}>{ev.date}</p>
                          </div>
                          <h3 className="font-extrabold uppercase leading-tight tracking-tight mb-1 text-base sm:text-lg" style={{ color: textPrimary }}>{ev.title}</h3>
                          <p className="mb-4 text-xs font-medium leading-snug" style={{ color: textMuted }}>{ev.tagline}</p>
                          <div className="mb-4 h-px w-full" style={{ backgroundColor: dividerCol }} />
                          <ul className="flex flex-col gap-1.5 sm:gap-2">
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
          <section id="register" className="bg-zinc-50 py-14 md:py-24 px-4 sm:px-7 md:px-12 scroll-mt-20">
            <div className="mb-8 md:mb-14 flex flex-wrap items-end justify-between gap-4 sm:gap-6">
              <div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]"><Dumbbell size={12} className="text-[#E6FF2B]" /></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">Don&apos;t miss out</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A]" style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }}>
                  UPCOMING<br />EVENTS
                </motion.h2>
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }}>
                <motion.a href="/register" className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-[#1A1A1A] py-2 pl-5 sm:pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest" initial="rest" whileHover="hover" animate="rest">
                  <motion.span className="absolute inset-0 bg-[#1A1A1A]" style={{ transformOrigin: 'left' }} variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
                  <motion.span className="relative z-10 mr-3" variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>Register Now</motion.span>
                  <motion.span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" variants={{ rest: { backgroundColor: '#1A1A1A', color: '#E6FF2B' }, hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' } }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                    <IoChevronForward size={11} /><IoChevronForward size={11} className="-ml-1.5" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-4">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} className="relative rounded-2xl overflow-hidden min-h-64 sm:min-h-72 md:min-h-0">
                <img src={EVENT_IMAGES[2].src} alt="BBB Events" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B] mb-2">BBB Community</p>
                  <h3 className="text-white font-extrabold uppercase text-xl sm:text-2xl md:text-3xl leading-tight mb-2 sm:mb-3">Our Programs &amp;<br />Events</h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xs">Embark on the ultimate outdoor fitness experience — where every rep is a journey of community and self&#8209;discovery.</p>
                </div>
              </motion.div>

              <div className="flex flex-col gap-3">
                {UPCOMING_EVENTS.map((event, i) => (
                  <motion.a key={i} href={event.href} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} className="flex items-start justify-between gap-3 sm:gap-4 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 group transition-opacity hover:opacity-90" style={{ backgroundColor: i === 0 ? '#E6FF2B' : '#f4f4f5' }}>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold uppercase text-sm leading-snug mb-1 sm:mb-1.5 tracking-tight" style={{ color: '#09090b' }}>{event.title}</h3>
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
          <section id="calendar" className="bg-white py-14 md:py-24 px-4 sm:px-7 md:px-12 scroll-mt-20">
            <div className="mb-8 md:mb-14">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-2 sm:mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]"><Dumbbell size={12} className="text-[#E6FF2B]" /></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">Schedule</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A]" style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }}>
                EVENT<br />CALENDAR
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-3 sm:mt-4 text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-md">
                Browse all upcoming BBB events. Click any highlighted date to view details and register.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              <EventCalendar events={CALENDAR_EVENTS} />
            </motion.div>
          </section>

          {/* ── Social Media ── */}
          <section className="bg-white py-14 md:py-24 px-4 sm:px-7 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]"><Dumbbell size={12} className="text-[#E6FF2B]" /></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: 'rgba(26,26,26,0.5)' }}>Stay Connected</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} className="font-extrabold uppercase leading-none tracking-tight text-[#1A1A1A] mb-8 md:mb-10" style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }}>
                  FOLLOW US ON<br />SOCIAL MEDIA
                </motion.h2>
                <div className="flex flex-col">
                  {socialMenuItems.map((item, i) => (
                    <motion.a key={item} href="#" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-center justify-between py-3.5 sm:py-4 border-b border-zinc-200 group">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-950 group-hover:text-[#1A1A1A] transition-colors duration-200">{item}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 group-hover:bg-[#1A1A1A] transition-all duration-200">
                        <IoChevronForward size={11} className="text-zinc-950 group-hover:text-[#E6FF2B] transition-colors duration-200" />
                        <IoChevronForward size={11} className="-ml-1.5 text-zinc-950 group-hover:text-[#E6FF2B] transition-colors duration-200" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.15 }} className="rounded-2xl overflow-hidden aspect-4/3 w-full max-h-80 sm:max-h-none">
                <img src={EVENT_IMAGES[2].src} alt="Body By Brad Community" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
              </motion.div>
            </div>
          </section>

          <FAQSection />
          <CTASection />
          <Footer />

          <AnimatePresence>
            {lightboxIndex !== null && (
              <LightboxModal
                items={visibleItems}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onChange={setLightboxIndex}
              />
            )}
          </AnimatePresence>

        </div>
      </ReactLenis>
  );
}
