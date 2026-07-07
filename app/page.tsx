'use client';

import { useEffect, useRef, useState } from 'react';

const JSONLD_LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthClub'],
  name: 'Body By Brad',
  alternateName: 'BBB',
  description: 'Elite personal training, group fitness classes, and online coaching in Charleston, SC. ISSA certified coach Brad, former Citadel football player.',
  url: 'https://bodybybradfitness.com/',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Charleston',
    addressRegion: 'SC',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 32.7765, longitude: -79.9311 },
  areaServed: [
    'Charleston, SC', 'Mount Pleasant, SC', 'West Ashley, SC',
    'North Charleston, SC', 'James Island, SC', 'Summerville, SC',
  ],
  priceRange: '$$',
  openingHours: 'Mo-Sa 06:00-20:00',
  founder: {
    '@type': 'Person',
    name: 'Brad',
    jobTitle: 'ISSA Certified Personal Trainer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'The Citadel, The Military College of South Carolina',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certification',
      name: 'ISSA Certified Personal Trainer',
    },
    url: 'https://bodybybradfitness.com/about-brad',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Personal Training Services',
    itemListElement: [
      { '@type': 'Offer', name: '1-on-1 Personal Training', areaServed: 'Charleston, SC' },
      { '@type': 'Offer', name: 'Group Fitness Classes', areaServed: 'Charleston, SC' },
      { '@type': 'Offer', name: 'Online Coaching Program', areaServed: 'Nationwide' },
    ],
  },
};

const JSONLD_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What types of training does Body By Brad offer?', acceptedAnswer: { '@type': 'Answer', text: 'Body By Brad offers three core services: 1-on-1 personal training, group fitness classes, and online coaching with weekly check-ins. All programs are based in Charleston, SC with online coaching available nationwide.' } },
    { '@type': 'Question', name: 'How do I get started with personal training at Body By Brad?', acceptedAnswer: { '@type': 'Answer', text: "Getting started is simple. Book a free strategy call — no commitment required. We'll discuss your goals, current fitness level, and which BBB program is the right fit. From there, we'll schedule your first session within 48 hours." } },
    { '@type': 'Question', name: 'Do I need gym equipment to use the online coaching program?', acceptedAnswer: { '@type': 'Answer', text: "No. Every BBB online coaching program is customized to the equipment you have available, whether that's a full commercial gym, a basic home setup, or just your bodyweight." } },
    { '@type': 'Question', name: 'How quickly will I see results from personal training?', acceptedAnswer: { '@type': 'Answer', text: 'Most clients notice visible changes within 4 to 8 weeks. Significant body composition changes typically occur between 10 and 16 weeks with consistent training and nutrition.' } },
    { '@type': 'Question', name: 'How much does a personal trainer cost in Charleston, SC?', acceptedAnswer: { '@type': 'Answer', text: 'Personal trainer rates in Charleston, SC typically range from $50 to $120 per session. Body By Brad offers flexible packages for 1-on-1 training, group fitness, and online coaching.' } },
    { '@type': 'Question', name: 'What are the BBB Cooldown Events?', acceptedAnswer: { '@type': 'Answer', text: "The BBB Cooldown Events are Body By Brad's signature fitness community events held throughout Charleston, SC. Open to clients and non-clients alike — a chance to train together and experience the BBB community." } },
    { '@type': 'Question', name: 'Is online personal training as effective as in-person training?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Research shows online personal training produces comparable fat loss and strength results when accountability and structured check-ins are in place. BBB online coaching includes weekly reviews, video form checks, and direct coach access.' } },
    { '@type': 'Question', name: 'What certifications does Coach Brad hold?', acceptedAnswer: { '@type': 'Answer', text: 'Coach Brad is an ISSA Certified Personal Trainer and a former football player at The Citadel, a Division I military college in Charleston, SC.' } },
    { '@type': 'Question', name: 'Do you serve clients outside of Charleston, SC?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Body By Brad serves clients throughout greater Charleston and offers online coaching to clients anywhere in the United States.' } },
    { '@type': 'Question', name: 'What is your cancellation policy?', acceptedAnswer: { '@type': 'Answer', text: "BBB asks for at least 24 hours notice to cancel or reschedule a session. For online coaching, programs can be paused or adjusted — contact Coach Brad directly." } },
  ],
};

const JSONLD_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Body By Brad',
  url: 'https://bodybybradfitness.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://bodybybradfitness.com/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_LOCAL_BUSINESS) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_WEBSITE) }} />
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
    </>
  );
}
