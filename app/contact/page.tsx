'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import ContactHeroSection from '@/components/sections/ContactHeroSection';
import ContactDetailsSection from '@/components/sections/ContactDetailsSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

const CONTACT_FAQ = [
  {
    q: 'How quickly will I hear back after submitting the form?',
    a: "Brad personally responds to every inquiry within 24 hours — usually much faster. If you need an urgent response, DM on Instagram is the quickest route.",
  },
  {
    q: 'What should I include in my first message?',
    a: "Keep it simple: your main goal, your current fitness level, and whether you're looking for in-person or online training. That gives Brad enough to give you a useful first response right away.",
  },
  {
    q: 'Do you offer a free consultation call?',
    a: "Yes — all new clients start with a complimentary 15-minute discovery call. It's a no-pressure conversation to talk about your goals and figure out the best plan for you.",
  },
  {
    q: 'What happens after I reach out?',
    a: "Brad will reply to confirm your details, then schedule your free discovery call. From there, you'll receive your custom program within 48 hours of signing up.",
  },
  {
    q: 'Do you work with clients outside of Charleston?',
    a: "Yes. Online coaching is available to clients anywhere in the world. Brad has coached people across the US and internationally — distance is no barrier.",
  },
  {
    q: "What's the best way to reach you on social media?",
    a: "Instagram is the fastest channel — DM @bradnboujee_ for a quick response. You can also follow along for daily tips, event announcements, and client highlights.",
  },
];

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
          <FAQSection items={CONTACT_FAQ} />
          <CTASection />
          <Footer />
        </div>
      </ReactLenis>
  );
}
