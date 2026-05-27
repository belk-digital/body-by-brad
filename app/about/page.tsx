'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { LanguageProvider } from '@/lib/LanguageContext';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import AboutHeroSection from '@/components/sections/AboutHeroSection';
import AboutBioSection from '@/components/sections/AboutBioSection';
import Footer from '@/components/layout/Footer';

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

          <AboutBioSection />

          <Footer />
        </div>
      </ReactLenis>
    </LanguageProvider>
  );
}
