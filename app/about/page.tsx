'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { LanguageProvider } from '@/lib/LanguageContext';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import AboutHeroSection from '@/components/sections/AboutHeroSection';
import AboutBioSection from '@/components/sections/AboutBioSection';
import AboutStatsSection from '@/components/sections/AboutStatsSection';
import AboutOriginSection from '@/components/sections/AboutOriginSection';
import AboutPhilosophySection from '@/components/sections/AboutPhilosophySection';
import AboutRunClubSection from '@/components/sections/AboutRunClubSection';
import AboutInstagramSection from '@/components/sections/AboutInstagramSection';
import TransformationSection from '@/components/sections/TransformationSection';
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';

const ABOUT_FAQ = [
  {
    q: 'Who is Coach Brad?',
    a: 'Coach Brad is an elite personal trainer and fitness coach based in Charleston, SC. With 8+ years of experience and 200+ client transformations, he specializes in personalized programming, accountability coaching, and community-driven fitness.',
  },
  {
    q: 'What is your coaching philosophy?',
    a: "Brad's philosophy is built on three pillars: personalized programming, consistent accountability, and a winning mindset. Every plan is built around who you are — your body, your schedule, your goals — not a generic template.",
  },
  {
    q: 'What is Let\'s Run Charleston?',
    a: "Let's Run Charleston — also known as the Cooldown Run Club — is a weekly community run event founded by Brad. It's open to all fitness levels, from first-time joggers to seasoned runners. No experience or registration required — just show up.",
  },
  {
    q: 'Do you work with complete beginners?',
    a: "Absolutely. Whether you've never stepped into a gym or you're returning after a long break, Brad meets you exactly where you are and builds a plan that grows with you.",
  },
  {
    q: 'What makes Body By Brad different from other coaches?',
    a: "BBB is more than a training plan — it's a community. Brad personally checks in with every client, tracks your progress, and adjusts your program as you evolve. You're never just a number here.",
  },
  {
    q: 'Where are you based and who can you train?',
    a: "Brad is based in Charleston, SC, and offers in-person training throughout the Lowcountry. Online coaching is available worldwide — wherever you are, there's a plan for you.",
  },
  {
    q: 'How do I get in touch with Coach Brad?',
    a: "You can reach Brad through the Contact page, DM on Instagram, or by booking a free 15-minute discovery call. He personally responds to every message.",
  },
];

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

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
        <div className="relative w-full font-satoshi overflow-x-hidden bg-white">
          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          {/* Hero */}
          <section className="relative h-dvh min-h-screen w-full overflow-hidden bg-white">
            <Navbar
              isLoading={isLoading}
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              onMenuToggle={setIsMenuOpen}
              theme="dark"
            />
            <AboutHeroSection isLoading={isLoading} />
          </section>

          {/* Bio quote */}
          <AboutBioSection />

          {/* Stats bar */}
          <AboutStatsSection />

          {/* Brad's origin story */}
          <AboutOriginSection />

          {/* Coaching philosophy pillars */}
          <AboutPhilosophySection />

          {/* Let's Run Charleston */}
          <AboutRunClubSection />

          {/* Instagram grid */}
          <AboutInstagramSection />

          {/* Transformation results */}
          <TransformationSection />

          {/* CTA */}
          <CTASection />

          {/* FAQ */}
          <FAQSection items={ABOUT_FAQ} />

          <Footer />
        </div>
      </ReactLenis>
    </LanguageProvider>
  );
}
