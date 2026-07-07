'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { testimonialsData } from '@/lib/constants';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

const RESULTS_FAQ = [
  {
    q: 'What results can I expect from personal training?',
    a: 'Most clients experience improvements in strength, fitness consistency, energy levels, body composition, and overall health when following a structured training program.',
  },
  {
    q: 'How long does it take to see fitness results?',
    a: 'Many individuals begin noticing improvements in energy and performance within a few weeks, while visible body composition changes often occur within several months of consistent effort.',
  },
  {
    q: 'Are transformation results sustainable?',
    a: 'Yes. Sustainable results come from healthy habits, structured coaching, and realistic lifestyle changes rather than quick-fix solutions.',
  },
  {
    q: 'Can beginners achieve body transformation results?',
    a: 'Absolutely. Many of our most successful clients started with little or no fitness experience.',
  },
  {
    q: 'How is progress measured?',
    a: 'We track body composition changes, strength gains, performance improvements, consistency, and overall wellness markers.',
  },
  {
    q: 'Is nutrition included?',
    a: 'Nutrition guidance is incorporated into coaching recommendations to help clients maximize results.',
  },
  {
    q: 'What factors influence transformation success?',
    a: 'Consistency, accountability, nutrition, training quality, recovery, and mindset all play important roles.',
  },
  {
    q: 'How do I get started?',
    a: 'Schedule a consultation to discuss your goals and receive a personalized fitness roadmap.',
  },
];

const JSONLD_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: RESULTS_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const JSONLD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bodybybradfitness.com' },
    { '@type': 'ListItem', position: 2, name: 'Results', item: 'https://www.bodybybradfitness.com/results' },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────
const TRANSFORMATIONS = [
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233545/IMG_0593_nbc9pi.jpg',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233550/Untitled_design_5_rbsa0t.png',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233552/IMG_0591_cyzuem.jpg',
  'https://res.cloudinary.com/denskvdyt/image/upload/v1780530730/client-transfromation-image_mdqgre.webp',
  'https://res.cloudinary.com/denskvdyt/image/upload/v1780530730/transfromation-image_lexzt0.webp',
  'https://res.cloudinary.com/denskvdyt/image/upload/v1780530730/client-results-image_e1r90d.webp',
];

const STATS = [
  { value: '200+', label: 'Clients Transformed' },
  { value: '4.9★', label: 'Average Rating'       },
  { value: '5+',   label: 'Years Coaching'        },
  { value: '98%',  label: 'Client Retention'      },
];

// ── Star rating ───────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E6FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────
function ReviewCard({
  quote, sender, reactions, index,
}: { quote: string; sender: string; reactions: string[]; index: number }) {
  return (
    <motion.div
      className="break-inside-avoid bg-white border border-zinc-100 rounded-2xl p-6 mb-5"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: index * 0.07 }}
    >
      <Stars />
      <p
        className="mt-4 mb-5 text-[15px] leading-relaxed text-zinc-700"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
            <span className="text-[11px] font-bold text-zinc-500 uppercase">
              {sender.charAt(0)}
            </span>
          </div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-950">
            {sender}
          </span>
        </div>
        {reactions.length > 0 && (
          <div className="flex items-center gap-1">
            {reactions.map((r, i) => (
              <span key={i} className="text-base leading-none">{r}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function ResultsPageContent() {
  const [isLoading,  setIsLoading]  = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

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

  return (
    <div className="relative w-full bg-white overflow-x-hidden font-satoshi">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_BREADCRUMB) }} />
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[60dvh] min-h-[420px] w-full overflow-hidden bg-black">
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
          theme="light"
        />

        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-7 md:px-12 pb-10 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6FF2B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                Body By Brad
              </span>
            </div>
            <h1
              className="font-extrabold uppercase text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)' }}
            >
              REAL PEOPLE. REAL RESULTS.<br />REAL TRANSFORMATIONS.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Stat strip ───────────────────────────────────────────────────── */}
      <section className="w-full bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-7 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="py-7 px-4 sm:px-6 first:pl-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.07 }}
              >
                <p className="font-extrabold text-zinc-950 leading-none text-3xl sm:text-4xl mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transformations ──────────────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6FF2B] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                Transformations
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2
                  className="font-bold uppercase tracking-tight text-zinc-950 leading-none mb-3"
                  style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
                >
                  REAL CLIENT<br />TRANSFORMATIONS
                </h2>
                <p
                  className="text-zinc-500 text-sm sm:text-base max-w-md leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Discover how Charleston clients have achieved sustainable weight loss, improved body composition, increased strength, and long-term health improvements through personalized coaching and accountability.
                </p>
              </div>
              <a
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-zinc-950 text-white font-bold uppercase text-sm tracking-wider hover:bg-black transition-colors"
              >
                <span>Start Your Journey</span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-zinc-100 mb-12 md:mb-16" />

          {/* Before/After grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {TRANSFORMATIONS.map((src, i) => (
              <motion.div
                key={i}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-3/4 bg-[#191919]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
              >
                <BeforeAfterSlider
                  before={src}
                  beforeAlt={`Charleston fitness transformation client before and after results ${i + 1}`}
                  afterContent={
                    <div className="h-full w-full bg-[#191919] flex items-center justify-center pb-8">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 text-center leading-relaxed">
                        Slide right<br />to see<br />the results
                      </span>
                    </div>
                  }
                  initialPos={42}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="w-full bg-zinc-50 py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6FF2B] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                Client Reviews
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="font-bold uppercase tracking-tight text-zinc-950 leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                WHAT CLIENTS<br />SAY ABOUT US
              </h2>
              <div className="flex items-center gap-3">
                <Stars />
                <span
                  className="text-sm text-zinc-500"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  4.9 average · {testimonialsData.length} reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* Masonry review grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {testimonialsData.map((item, i) => (
              <ReviewCard
                key={item.id}
                quote={item.quote}
                sender={item.sender}
                reactions={item.reactions}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes These Results Different ────────────────────────── */}
      <section className="w-full bg-zinc-950 py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-extrabold uppercase leading-tight tracking-tight text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontFamily: 'Unbounded, sans-serif' }}
          >
            What Makes These Results Different
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'Personalized Coaching', desc: 'Every client receives individualized guidance based on their goals, experience level, schedule, and lifestyle.' },
              { title: 'Accountability That Creates Consistency', desc: "Most people don't fail because of lack of knowledge. They struggle because of inconsistency. Our accountability coaching helps clients stay committed." },
              { title: 'Sustainable Fitness Habits', desc: 'Crash diets and extreme programs rarely create lasting results. Our coaching focuses on behavior change, habit formation, and realistic strategies.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="rounded-2xl border border-white/10 p-6">
                <h3 className="font-bold uppercase text-white text-[15px] leading-tight mb-3" style={{ fontFamily: 'Unbounded, sans-serif' }}>{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Clients Achieve Results ───────────────────────────────── */}
      <section className="w-full bg-[#1a1a1a] py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-extrabold uppercase leading-tight tracking-tight text-white mb-12"
            style={{ fontSize: 'clamp(1.6rem,3.5vw,3rem)', fontFamily: 'Unbounded, sans-serif' }}
          >
            Why Clients Achieve Results
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Evidence-Based Training', desc: 'Every program is built on proven exercise science principles that maximize results while minimizing injury risk.' },
              { title: 'Nutrition Support', desc: 'Results are accelerated when effective training is paired with sustainable nutrition strategies.' },
              { title: 'Progress Tracking', desc: 'Regular assessments help clients see measurable improvements and stay motivated throughout their journey.' },
              { title: 'Community & Support', desc: 'Fitness is easier when you are surrounded by people who support your success.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="rounded-2xl bg-[#252525] p-6">
                <h3 className="font-bold uppercase text-white text-[15px] leading-tight mb-3" style={{ fontFamily: 'Unbounded, sans-serif' }}>{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results Beyond Physical Appearance ────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-7 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="font-extrabold uppercase leading-tight tracking-tight text-zinc-950 mb-4" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}>
              Results Beyond Physical Appearance
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed mb-6">
              The most meaningful transformations extend beyond aesthetics. Clients frequently report:
            </p>
            <ul className="space-y-3">
              {['Increased confidence', 'Better energy', 'Reduced stress', 'Improved sleep', 'Greater discipline', 'Higher productivity', 'Enhanced quality of life'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-700">
                  <CheckCircle2 size={14} className="text-[#CCFF00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="rounded-2xl bg-zinc-50 p-8">
              <h2 className="font-extrabold uppercase leading-tight tracking-tight text-zinc-950 mb-4" style={{ fontSize: 'clamp(1.4rem,3vw,2.2rem)', fontFamily: 'Unbounded, sans-serif' }}>
                Charleston Fitness Results That Last
              </h2>
              <p className="text-base text-zinc-500 leading-relaxed mb-6">
                Unlike short-term fitness programs, Body By Brad focuses on helping Charleston residents create habits that produce lasting change. The goal is not simply getting results — the goal is keeping them.
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-950 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#CCFF00] hover:text-zinc-950 transition-colors duration-300"
              >
                Start Your Transformation
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection items={RESULTS_FAQ} />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ReactLenis root>
      <ResultsPageContent />
    </ReactLenis>
  );
}
