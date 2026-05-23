'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { IoCheckmarkSharp, IoArrowForward } from 'react-icons/io5';

import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: 'Online Coaching',
    price: '$99',
    period: '/mo',
    desc: 'Train from anywhere with a fully custom program delivered straight to your phone.',
    features: [
      'Custom 4-week training program',
      'Weekly video check-ins',
      'Nutrition guidelines',
      'Form review videos',
      'Direct messaging support',
    ],
    cta: 'Get Started',
    featured: false,
    dark: false,
  },
  {
    name: 'Group Fitness',
    price: '$149',
    period: '/mo',
    desc: 'Unlimited high-energy classes with the full BBB community right here in Charleston, SC.',
    features: [
      'Unlimited group classes',
      'High-energy coached workouts',
      'Community events & Cooldowns',
      'All fitness levels welcome',
      'Monthly BBB event access',
    ],
    cta: 'Join the Group',
    featured: true,
    dark: false,
  },
  {
    name: 'Personal Training',
    price: '$250',
    period: '/mo',
    desc: '100% custom 1-on-1 coaching built entirely around your body, goals, and schedule.',
    features: [
      'Fully custom periodized program',
      'All group classes included',
      '4 one-on-one sessions / month',
      'Nutrition & lifestyle plan',
      'Priority scheduling',
      'Direct phone access to Brad',
    ],
    cta: 'Work With Brad',
    featured: false,
    dark: true,
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Book a Free Call',
    desc: "15 minutes with Brad to talk goals, history, and which plan fits your life. Zero pressure — it's just a conversation.",
  },
  {
    number: '02',
    title: 'Get Your Plan',
    desc: 'Within 48 hours you receive a fully custom program built specifically for your body, schedule, and equipment.',
  },
  {
    number: '03',
    title: 'Start Training',
    desc: "Execute the plan, track progress, and check in weekly. Brad stays with you every step of the way until you hit your goals.",
  },
];

const PACKAGE_FAQS = [
  {
    q: "What's the difference between Online Coaching and Personal Training?",
    a: "Online Coaching gives you a fully custom program delivered to your phone with weekly check-ins — perfect if you prefer training independently or live outside Charleston. Personal Training is 1-on-1 in-person sessions with Brad, ideal if you want hands-on guidance, real-time form corrections, and a fully immersive coaching experience.",
  },
  {
    q: 'Is there a long-term contract or commitment?',
    a: "No contracts. All plans are billed month-to-month and can be paused or cancelled before your next billing cycle with no hidden fees or cancellation charges. We earn your loyalty through results, not paperwork.",
  },
  {
    q: 'Can I switch plans after I sign up?',
    a: "Absolutely. You can upgrade or change your plan at any time. If you start with Online Coaching and want to add in-person sessions, just reach out and we'll sort it out before your next billing cycle.",
  },
  {
    q: 'How many Personal Training sessions are included per month?',
    a: "The Personal Training plan includes 4 one-on-one sessions per month. Additional sessions can be added at a per-session rate. You also get full access to all group fitness classes at no extra cost.",
  },
  {
    q: 'Do I need a gym membership for Online Coaching?',
    a: "Not at all. Your program is built around whatever equipment you have available — a full commercial gym, a home setup with dumbbells, or even just your bodyweight. Brad adapts the plan to your situation.",
  },
  {
    q: 'What happens if I travel or need to take a week off?',
    a: "Life happens. For Online Coaching, Brad can adjust your program around travel, limited equipment, or recovery weeks. For Personal Training, sessions can be rescheduled with at least 24 hours notice.",
  },
  {
    q: 'How do I get started?',
    a: 'Click any "Get Started" button on this page to book a free 15-minute intro call. Brad will walk you through your goals, current fitness level, and which plan makes the most sense. No pressure — just a real conversation.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

function PricingContent() {
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

  return (
    <div className="relative w-full bg-black overflow-x-hidden">

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <Navbar
        isLoading={false}
        isMenuOpen={isMenuOpen}
        isScrolled={isScrolled}
        onMenuToggle={setIsMenuOpen}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-zinc-950 pt-36 pb-24 md:pt-44 md:pb-32 px-4 sm:px-7 md:px-12 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779419947/pricing_hero_image_fywggl.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-0 bg-zinc-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            className="text-[#DFF994] text-[11px] uppercase tracking-[0.3em] font-semibold mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Flexible Plans
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-satoshi text-white text-[clamp(3rem,8vw,6.5rem)] font-extrabold uppercase leading-none tracking-tight hero-title"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            >
              Invest in<br />Yourself
            </motion.h1>
          </div>

          <motion.p
            className="text-zinc-400 text-base md:text-lg max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            Every plan includes Brad's full coaching attention. Choose the format that fits your life.
          </motion.p>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────────────── */}
      <section className="font-satoshi bg-[#f5f0e1] py-20 md:py-28 px-4 sm:px-7 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl md:rounded-3xl p-7 sm:p-8 ${
                  plan.featured
                    ? 'bg-[#007AE5] text-white md:-mt-5 md:mb-0 shadow-2xl shadow-[#007AE5]/30'
                    : plan.dark
                    ? 'bg-zinc-950 text-white'
                    : 'bg-white text-zinc-950 border border-zinc-200/80'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-[#DFF994] text-zinc-950 px-4 py-1.5 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                {/* Label */}
                <p className={`text-[10px] uppercase tracking-[0.22em] font-bold mb-6 ${
                  plan.featured ? 'text-white/60' : plan.dark ? 'text-white/40' : 'text-zinc-400'
                }`}>
                  {plan.name}
                </p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-3">
                  <span className="font-satoshi font-extrabold text-[3.25rem] leading-none tracking-tight">
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${
                    plan.featured ? 'text-white/55' : plan.dark ? 'text-white/35' : 'text-zinc-400'
                  }`}>
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-7 ${
                  plan.featured ? 'text-white/75' : plan.dark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {plan.desc}
                </p>

                {/* Divider */}
                <div className={`h-px mb-7 ${
                  plan.featured ? 'bg-white/15' : plan.dark ? 'bg-white/8' : 'bg-zinc-100'
                }`} />

                {/* Features */}
                <ul className="flex flex-col gap-3.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={`mt-0.5 shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                        plan.featured
                          ? 'bg-white/20'
                          : plan.dark
                          ? 'bg-white/10'
                          : 'bg-[#007AE5]/10'
                      }`}>
                        <IoCheckmarkSharp
                          size={10}
                          className={plan.featured || plan.dark ? 'text-white' : 'text-[#007AE5]'}
                        />
                      </span>
                      <span className={`text-sm leading-snug ${
                        plan.featured ? 'text-white/90' : plan.dark ? 'text-zinc-300' : 'text-zinc-600'
                      }`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href="#"
                  className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-widest transition-opacity ${
                    plan.featured
                      ? 'bg-white text-[#007AE5]'
                      : plan.dark
                      ? 'bg-white text-zinc-950'
                      : 'bg-zinc-950 text-white'
                  }`}
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.2 }}
                >
                  {plan.cta}
                  <IoArrowForward size={14} className="transition-transform group-hover:translate-x-0.5" />
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          <motion.p
            className="text-center text-zinc-500 text-sm mt-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Not sure which plan fits you best?{' '}
            <a
              href="#"
              className="text-zinc-950 font-semibold underline underline-offset-4 hover:text-[#007AE5] transition-colors"
            >
              Book a free 15-min call
            </a>{' '}
            and we'll figure it out together.
          </motion.p>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="font-satoshi bg-[#007AE5] py-20 md:py-28 px-4 sm:px-7 md:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-14 md:mb-16 max-w-xl">
            <motion.p
              className="text-white/50 text-[11px] uppercase tracking-[0.25em] font-semibold mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              The Process
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="text-white text-3xl sm:text-4xl md:text-[2.75rem] font-bold uppercase tracking-tight leading-tight"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                How it works
              </motion.h2>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 }}
                className="flex flex-col gap-4"
              >
                <span className="text-[#DFF994] text-xs font-bold tracking-[0.2em] uppercase">
                  {step.number}
                </span>
                <div className="h-px bg-white/20" />
                <h3 className="text-white text-xl font-bold leading-snug">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FAQSection items={PACKAGE_FAQS} />

      {/* ── CTA + Footer ──────────────────────────────────────────────────── */}
      <CTASection />
      <Footer />
    </div>
  );
}

export default function PricingPage() {
  return (
    <LanguageProvider>
      <ReactLenis root>
        <PricingContent />
      </ReactLenis>
    </LanguageProvider>
  );
}
