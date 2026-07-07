'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import PackagesHeroSection from '@/components/sections/PackagesHeroSection';
import PackagesPricingSection from '@/components/sections/PackagesPricingSection';
import TransformationSection from '@/components/sections/TransformationSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import { Dumbbell, Phone, ClipboardList, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const PACKAGES_FAQ = [
  {
    q: 'What is included in a fitness coaching package?',
    a: 'Most packages include customized workout plans, nutrition guidance, accountability coaching, progress tracking, and expert support.',
  },
  {
    q: 'Which package is right for me?',
    a: 'The best package depends on your goals, experience level, and desired level of support. A consultation can help determine the right fit.',
  },
  {
    q: 'Do coaching packages include meal plans?',
    a: 'Nutrition guidance is included. Depending on the package, personalized nutrition recommendations and meal planning support may also be provided.',
  },
  {
    q: 'How often will I receive support?',
    a: 'Support frequency varies by package, but most clients receive weekly check-ins and ongoing communication.',
  },
  {
    q: 'Can I switch packages later?',
    a: 'Yes. Coaching plans can be upgraded as your goals evolve.',
  },
  {
    q: 'How quickly can I see results?',
    a: 'Many clients notice improvements within a few weeks, though long-term transformation depends on consistency, adherence, and individual factors.',
  },
  {
    q: 'Is online fitness coaching effective?',
    a: 'Yes. Online fitness coaching provides expert guidance, accountability, and structured programming while allowing flexibility and convenience.',
  },
  {
    q: 'Can a fitness coach help me lose weight?',
    a: 'Absolutely. A coach can provide training, nutrition strategies, accountability, and behavior change support to help achieve sustainable weight loss.',
  },
  {
    q: 'What is accountability coaching?',
    a: 'Accountability coaching involves regular check-ins, progress reviews, and support to help clients stay consistent and achieve their goals.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a consultation, complete your assessment, and receive a personalized coaching plan designed around your goals.',
  },
];

const JSONLD_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PACKAGES_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const JSONLD_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Fitness Coaching Packages',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Body By Brad',
    url: 'https://www.bodybybradfitness.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '466 Savannah Hwy',
      addressLocality: 'Charleston',
      addressRegion: 'SC',
      postalCode: '29407',
      addressCountry: 'US',
    },
  },
  description: 'Expert fitness coaching packages designed for weight loss, muscle gain, body transformation, and long-term health. Includes personalized workouts, nutrition guidance, accountability coaching, and ongoing support.',
  offers: [
    { '@type': 'Offer', name: 'Starter Coaching Package', price: '50', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Transformation Coaching Package', price: '250', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Premium Coaching Plan', price: '500', priceCurrency: 'USD' },
  ],
};

const JSONLD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bodybybradfitness.com' },
    { '@type': 'ListItem', position: 2, name: 'Coaching Services', item: 'https://www.bodybybradfitness.com/services' },
    { '@type': 'ListItem', position: 3, name: 'Fitness Coaching Packages', item: 'https://www.bodybybradfitness.com/fitness-coaching-packages' },
  ],
};

const STEPS = [
  {
    number: '01',
    title: 'Book a Free Call',
    desc: "15 minutes with Brad to talk goals, history, and which plan fits your life. Zero pressure — it's just a conversation.",
    Icon: Phone,
  },
  {
    number: '02',
    title: 'Get Your Plan',
    desc: 'Within 48 hours you receive a fully custom program built specifically for your body, schedule, and equipment.',
    Icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Start Training',
    desc: "Execute the plan, track progress, and check in weekly. Brad stays with you every step of the way until you hit your goals.",
    Icon: Zap,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

function PricingContent() {
  const [isLoading, setIsLoading] = useState(true);
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
    <div className="relative w-full bg-black overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_SERVICE) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_BREADCRUMB) }} />
      <AnimatePresence>
        {isLoading && <StairsPreloader />}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-dvh min-h-screen w-full overflow-hidden bg-black">
        <Navbar
          isLoading={isLoading}
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          onMenuToggle={setIsMenuOpen}
        />
        <PackagesHeroSection isLoading={isLoading} />
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────────────── */}
      <PackagesPricingSection />

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="font-satoshi bg-[#1a1a1a] py-20 md:py-28 px-4 sm:px-7 md:px-12">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.div
              className="mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                <Dumbbell size={12} className="text-zinc-950" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                The Process
              </span>
            </motion.div>
            <motion.h2
              className="font-extrabold uppercase leading-none tracking-tight text-white text-[clamp(2rem,4.5vw,4.5rem)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 }}
            >
              HOW IT
              <br />
              WORKS
            </motion.h2>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
              className="relative bg-[#252525] rounded-2xl p-7 flex flex-col gap-5 overflow-hidden group hover:bg-[#2c2c2c] transition-colors"
            >
              {/* Watermark number */}
              <span
                className="pointer-events-none absolute -bottom-4 -right-2 font-black text-[7rem] leading-none text-white/[0.04] select-none"
              >
                {step.number}
              </span>

              {/* Icon + step badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <step.Icon size={20} color="#E6FF2B" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6FF2B] bg-[#E6FF2B]/10 px-2.5 py-1 rounded-full">
                  {step.number}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/8" />

              {/* Text */}
              <div className="flex flex-col gap-2.5 relative z-10">
                <h3 className="text-white font-extrabold text-lg uppercase leading-snug tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Lime bottom accent bar — grows on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#E6FF2B]"
                initial={{ width: '0%' }}
                whileInView={{ width: '35%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.4, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Choose Your Program ─────────────────────────────────────────── */}
      <section className="font-satoshi bg-black px-4 py-20 sm:px-7 md:px-12 md:py-28">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Weight Loss */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-white mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Weight Loss Coaching Program
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-6 max-w-2xl">
              Our science-based weight loss coaching program focuses on sustainable fat loss, healthy habits, and long-term success.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Calorie management', 'Healthy eating habits', 'Exercise programming', 'Recovery strategies', 'Lifestyle optimization'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Body Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-white mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Body Transformation Program
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-6 max-w-2xl">
              Transform your body composition through a structured coaching system that combines training, nutrition, recovery, and accountability.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Increased lean muscle mass', 'Improved strength development', 'Better energy levels', 'Enhanced confidence', 'Long-term fitness success'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Strength & Muscle Building */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-white mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Strength &amp; Muscle Building Program
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-6 max-w-2xl">
              Designed for clients who want to build muscle, improve performance, and maximize strength through progressive overload and expert coaching.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Progressive overload', 'Strength training', 'Muscle growth coaching', 'Recovery optimization', 'Performance tracking'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Online Personal Training */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-extrabold uppercase leading-tight tracking-tight text-white mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Online Personal Training Packages
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-6 max-w-2xl">
              Train from anywhere with our virtual personal training and online coaching system. Online coaching gives you the flexibility to train on your schedule while receiving expert guidance.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Customized workout plans', 'Training video guidance', 'Weekly check-ins', 'Fitness assessments', 'Progress monitoring', 'Nutrition support'].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 size={14} className="text-[#E6FF2B] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── What's Included In Every Package ──────────────────────────────── */}
      <section className="font-satoshi bg-[#1a1a1a] px-4 py-20 sm:px-7 md:px-12 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E6FF2B] block mb-4"
          >
            Every Package
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
            className="font-extrabold uppercase leading-tight tracking-tight text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontFamily: 'Unbounded, sans-serif' }}
          >
            What&apos;s Included In Every Package
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Personalized Fitness Assessment', desc: 'Every client begins with a detailed assessment to evaluate goals, fitness level, body composition, and training history.' },
              { title: 'Customized Workout Plans', desc: 'Your exercise program is built specifically around your goals, schedule, equipment availability, and experience level.' },
              { title: 'Nutrition Coaching', desc: 'Receive practical nutrition guidance that supports your fitness goals without restrictive dieting.' },
              { title: 'Weekly Accountability', desc: 'Regular check-ins ensure consistent progress and adjustments when needed.' },
              { title: 'Progress Tracking', desc: 'Track performance, measurements, habits, and milestones to stay focused on long-term success.' },
              { title: 'Expert Support', desc: 'Direct communication with your coach every step of the way for guidance, motivation, and program adjustments.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className="rounded-2xl bg-[#252525] p-6"
              >
                <h3
                  className="font-bold uppercase text-white text-[15px] leading-tight mb-3"
                  style={{ fontFamily: 'Unbounded, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Our Coaching Works ────────────────────────────────────────── */}
      <section className="font-satoshi bg-black px-4 py-20 sm:px-7 md:px-12 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E6FF2B] block mb-4"
          >
            Our Approach
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
            className="font-extrabold uppercase leading-tight tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontFamily: 'Unbounded, sans-serif' }}
          >
            Why Our Coaching Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="text-base text-white/50 leading-relaxed mb-12 max-w-2xl"
          >
            Unlike generic fitness programs, our coaching is built around evidence-based training principles and real-world sustainability.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Science-Based Programming', desc: 'Programs designed using proven methods supported by ACSM and NSCA.' },
              { title: 'Individualized Coaching', desc: 'No templates. No guesswork. Every recommendation is tailored to the individual.' },
              { title: 'Sustainable Results', desc: 'We help clients build habits that support lifelong health and fitness.' },
              { title: 'Accountability System', desc: 'Consistent support increases adherence, motivation, and long-term success.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 p-6"
              >
                <h3
                  className="font-bold uppercase text-white text-[15px] leading-tight mb-3"
                  style={{ fontFamily: 'Unbounded, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transformation Results ────────────────────────────────────────── */}
      <TransformationSection />

      {/* ── CTA Band ──────────────────────────────────────────────────────── */}
      <section className="font-satoshi px-4 py-12 sm:px-7 md:px-12 bg-[#E6FF2B]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-600">
              Ready to start?
            </p>
            <h2
              className="font-extrabold uppercase leading-tight text-zinc-950"
              style={{ fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              Start Your Transformation Today
            </h2>
          </div>
          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            Book A Fitness Consultation
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FAQSection items={PACKAGES_FAQ} />

      {/* ── CTA + Footer ──────────────────────────────────────────────────── */}
      <CTASection />
      <Footer />
    </div>
  );
}

export default function PricingPage() {
  return (
    <ReactLenis root>
      <PricingContent />
    </ReactLenis>
  );
}
