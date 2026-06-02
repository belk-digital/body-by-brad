'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import ServicesGridSection from '@/components/sections/ServicesGridSection';
import PackagesPreviewSection from '@/components/sections/PackagesPreviewSection';
import OurServicesSection from '@/components/sections/OurServicesSection';
import FeaturedSection from '@/components/sections/FeaturedSection';
import SupplementsSection from '@/components/sections/SupplementsSection';
import BMISection from '@/components/sections/BMISection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import TransformationSection from '@/components/sections/TransformationSection';
import CTASection from '@/components/sections/CTASection';
import BlogSection from '@/components/sections/BlogSection';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrollingUp = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && scrollingUp) {
      setIsScrolled(true);
    } else if (!scrollingUp || latest <= 100) {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => window.clearTimeout(loadingTimer);
  }, []);

  return (
    <ReactLenis root>
      <div className="relative w-full bg-black overflow-x-hidden selection:bg-[#DFF994]/30 selection:text-[#DFF994]">
        <section className="relative h-dvh w-full overflow-hidden bg-black">
          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          <Navbar
            isLoading={isLoading}
            isMenuOpen={isMenuOpen}
            isScrolled={isScrolled}
            onMenuToggle={setIsMenuOpen}
          />

          <HeroSection isLoading={isLoading} />
        </section>

        <WhoWeAreSection />
        <ServicesGridSection />
        
        <OurServicesSection />
        <PackagesPreviewSection />
        <FeaturedSection />
        {/* <MerchSection /> */}
        <SupplementsSection />
        <BMISection />
        <TransformationSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
        <CTASection />
        <Footer />
      </div>
    </ReactLenis>
  );
}
