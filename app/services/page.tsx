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
import { Dumbbell, Smartphone, Flame, Target, Trophy, Home, ArrowUpRight } from 'lucide-react';

import Image from 'next/image';
import { LanguageProvider } from '@/lib/LanguageContext';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

const SERVICES_FAQ = [
  {
    q: 'Which service is right for me?',
    a: "It depends on your goals and lifestyle. If you want maximum accountability and results, Elite Personal Training is the top tier. Prefer flexibility? Online Coaching or Online Fitness Training lets you train from anywhere on your schedule. Not sure? Book a free 15-min call and Brad will point you in the right direction.",
  },
  {
    q: "What's the difference between online and in-person training?",
    a: "In-person training means you're working directly with Brad at a location in the Charleston area — ideal for hands-on coaching and real-time feedback. Online programs deliver your custom plan to your phone with weekly check-ins, perfect if you travel, work odd hours, or prefer training solo.",
  },
  {
    q: 'Do I need any equipment to get started?',
    a: "Not necessarily. Programs are built around what you have — a full gym, home dumbbells, or just bodyweight. Brad will build the most effective plan possible with your current setup.",
  },
  {
    q: 'Do you offer a free consultation before I commit?',
    a: "Yes. Every new client starts with a free 15-minute discovery call. Brad will learn about your goals, current fitness level, and lifestyle — then recommend the best service fit for you. Zero pressure.",
  },
  {
    q: 'Can I switch between services as my goals change?',
    a: "Absolutely. Many clients start with online coaching and later move to in-person sessions as schedules allow. Brad will work with you to transition seamlessly without losing momentum.",
  },
  {
    q: 'Are the fitness classes open to all levels?',
    a: "Yes. BBB fitness classes are designed to be challenging but scalable. Movements are modified so beginners can keep up while experienced athletes still feel the burn. Community energy is what drives these sessions.",
  },
];

// ── Data ─────────────────────────────────────────────────────────────────────

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=85';

const SERVICES = [
  {
    Icon: Dumbbell,
    title: 'ONLINE FITNESS TRAINING',
    slug: 'online-fitness-training',
    desc: 'Train smarter from anywhere with fully custom programs delivered to your phone, built around your schedule and goals.',
    image:
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Trophy,
    title: 'ELITE PERSONAL TRAINING',
    slug: 'elite-personal-training',
    desc: 'The highest level of 1-on-1 coaching — fully personalized programming, daily support, and concierge-level attention.',
    image:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Home,
    title: 'AT HOME TRAINING',
    slug: 'at-home-training',
    desc: 'No gym, no problem. Get a complete training experience designed around your home setup, schedule, and equipment.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Target,
    title: 'WEIGHT LOSS',
    slug: 'weight-loss',
    desc: 'Transform your body and health with our expert-guided weight loss programs tailored specifically to your goals.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Smartphone,
    title: 'ONLINE COACHING',
    slug: 'online-coaching',
    desc: 'Experience the structure and accountability of our dynamic digital coaching programs from anywhere in the world.',
    image:
      'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=700&q=80',
  },
  {
    Icon: Flame,
    title: 'FITNESS CLASSES',
    slug: 'fitness-classes',
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
  const ref    = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.a
      ref={ref}
      href={`/services/${service.slug}`}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay }}
      className="group flex overflow-hidden rounded-2xl"
      style={{ backgroundColor: CARD_BG, minHeight: '440px', textDecoration: 'none' }}
    >
      {/* Text side */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* Icon */}
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
            <service.Icon size={20} color={ACCENT} />
          </div>
          <ArrowUpRight
            size={18}
            color={ACCENT}
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        {/* Title + desc anchored to bottom */}
        <div>
          <h3 className="mb-3 font-bold uppercase text-white text-[20px] leading-tight" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            {service.title}
          </h3>
          <p className="text-[16px] leading-relaxed line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFFBF' }}>{service.desc}</p>
          <span
            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
            style={{ color: ACCENT }}
          >
            Learn More
          </span>
        </div>
      </div>

      {/* Image side */}
      <div className="hidden w-[42%] shrink-0 p-4 sm:block">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1280px) 22vw, 280px"
          />
        </div>
      </div>
    </motion.a>
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
          <motion.div variants={imageZoom} className="absolute inset-0">
            <Image
              src={HERO_IMAGE}
              alt="Body By Brad services"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/65" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

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

      <FAQSection items={SERVICES_FAQ} />
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
