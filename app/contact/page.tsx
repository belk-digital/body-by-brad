'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import { LanguageProvider } from '@/lib/LanguageContext';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import ContactHeroSection from '@/components/sections/ContactHeroSection';
import ContactDetailsSection from '@/components/sections/ContactDetailsSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
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

          <section className="relative h-[50dvh] min-h-[360px] w-full overflow-hidden bg-black">
            <Navbar
              isLoading={isLoading}
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              onMenuToggle={setIsMenuOpen}
              theme="light"
            />

            <ContactHeroSection isLoading={isLoading} />
          </section>

          <ContactDetailsSection />
          <ContactFormSection />
          <CTASection />
          <Footer />
        </div>
      </ReactLenis>
    </LanguageProvider>
  );
}
