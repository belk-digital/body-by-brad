'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Dumbbell, Smartphone, Flame, Target, Trophy, Home } from 'lucide-react';

import { LanguageProvider } from '@/lib/LanguageContext';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

// ── Data ─────────────────────────────────────────────────────────────────────

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=85';

const SERVICES = [
  {
    Icon: Dumbbell,
    title: 'ONLINE FITNESS TRAINING',
    desc: 'Train smarter from anywhere with fully custom programs delivered to your phone, built around your schedule and goals.',
    image:
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Trophy,
    title: 'ELITE PERSONAL TRAINING',
    desc: 'The highest level of 1-on-1 coaching — fully personalized programming, daily support, and concierge-level attention.',
    image:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Home,
    title: 'AT HOME TRAINING',
    desc: 'No gym, no problem. Get a complete training experience designed around your home setup, schedule, and equipment.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Target,
    title: 'WEIGHT LOSS',
    desc: 'Transform your body and health with our expert-guided weight loss programs tailored specifically to your goals.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Smartphone,
    title: 'ONLINE COACHING',
    desc: 'Experience the structure and accountability of our dynamic digital coaching programs from anywhere in the world.',
    image:
      'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Flame,
    title: 'FITNESS CLASSES',
    desc: 'Our body fitness classes combine strength training, dynamic movements, and community energy built around real results.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80',
  },
];

const CARD_BG  = '#252525';
const ACCENT   = '#E6FF2B';

// ── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  delay = 0,
}: {
  service: (typeof SERVICES)[0];
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay }}
      className="flex overflow-hidden rounded-2xl"
      style={{ backgroundColor: CARD_BG, minHeight: '440px' }}
    >
      {/* Text side */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
          <service.Icon size={20} color={ACCENT} />
        </div>

        {/* Title + desc anchored to bottom */}
        <div>
          <h3 className="mb-3 font-bold uppercase text-white text-[20px] leading-tight" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            {service.title}
          </h3>
          <p className="text-[16px] leading-relaxed line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>{service.desc}</p>
        </div>
      </div>

      {/* Image side */}
      <div className="hidden w-[42%] shrink-0 p-4 sm:block">
        <div className="h-full w-full overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function ServicesContent() {
  const [isLoading, setIsLoading]   = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY                  = useRef(0);

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

  // Hero variants
  const heroContainer: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
  };
  const imageZoom: Variants = {
    hidden:  { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };
  const headlineLine: Variants = {
    hidden:  { opacity: 0, x: -60, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };
  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <div className="relative w-full font-satoshi overflow-x-hidden bg-white">
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-black"
        style={{ height: 'clamp(360px, 55vh, 640px)' }}
      >
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="light"
        />

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate={isLoading ? 'hidden' : 'visible'}
          className="relative h-full w-full"
        >
          <motion.img
            variants={imageZoom}
            src={HERO_IMAGE}
            alt="Body By Brad services"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between px-4 pb-10 pt-28 sm:px-7 md:px-12 md:pb-14">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6FF2B]"
            >
              What We Offer
            </motion.p>

            <h1
              className="font-extrabold uppercase leading-[0.93] tracking-tight text-white
                         text-[clamp(3.5rem,9vw,8rem)]"
            >
              <motion.span variants={headlineLine} className="block">
                OUR
              </motion.span>
              <motion.span variants={headlineLine} className="block">
                SERVICES
              </motion.span>
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <section className="w-full bg-white px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={(i % 2) * 0.1} />
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <ServicesContent />
      </ReactLenis>
    </LanguageProvider>
  );
}
