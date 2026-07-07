'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import AboutHeroSection from '@/components/sections/AboutHeroSection';
import AboutTimelineSection from '@/components/sections/AboutTimelineSection';
import AboutMissionSection from '@/components/sections/AboutMissionSection';
import AboutStatsSection from '@/components/sections/AboutStatsSection';
import AboutGallerySection from '@/components/sections/AboutGallerySection';
import AboutRecognitionSection from '@/components/sections/AboutRecognitionSection';
import AboutRunClubSection from '@/components/sections/AboutRunClubSection';
import AboutAreasSection from '@/components/sections/AboutAreasSection';
import TransformationSection from '@/components/sections/TransformationSection';
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';

const ABOUT_FAQ = [
  {
    q: 'Who is Brad?',
    a: 'Brad is a Charleston fitness coach and personal trainer focused on helping individuals achieve lasting health and fitness transformations through personalized coaching, accountability, and community support.',
  },
  {
    q: 'What type of clients do you work with?',
    a: 'We work with beginners, busy professionals, weight loss clients, athletes, and individuals seeking body transformation. Every program is tailored to your specific goals, fitness level, and lifestyle.',
  },
  {
    q: 'Do you offer online coaching?',
    a: 'Yes. Online coaching is available nationwide. You get the same personalized programming, nutrition guidance, and accountability — delivered digitally from anywhere.',
  },
  {
    q: 'What makes your coaching different?',
    a: 'Our programs combine personalized training, accountability coaching, nutrition guidance, and community support. Every client receives individual attention with evidence-backed training principles — not a generic template.',
  },
  {
    q: 'Can you help me lose weight?',
    a: 'Absolutely. Sustainable weight loss is one of our primary coaching specialties. We combine personalized training with practical nutrition coaching and accountability systems designed for lasting results.',
  },
  {
    q: 'Do you provide nutrition coaching?',
    a: 'Yes. Nutrition guidance is integrated into many of our coaching programs. Clients receive practical nutrition coaching that supports real-world lifestyles and long-term health.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Charleston and surrounding Lowcountry communities including Mount Pleasant, North Charleston, Summerville, Goose Creek, Hanahan, Daniel Island, Johns Island, James Island, and West Ashley. Online clients are served nationwide.',
  },
  {
    q: 'How do I get started?',
    a: "Book a consultation and we'll recommend the best coaching option based on your goals. You can reach Brad through the Contact page, DM on Instagram, or by booking a free discovery call.",
  },
];

const JSONLD_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ABOUT_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const JSONLD_PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Brad',
  jobTitle: 'Personal Trainer & Fitness Coach',
  description:
    'Charleston-based fitness coach, personal trainer, and community leader dedicated to helping individuals achieve sustainable weight loss, body transformation, improved strength, and long-term health through personalized coaching and accountability.',
  url: 'https://bodybybradfitness.com/about-brad',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Charleston',
    addressRegion: 'SC',
    addressCountry: 'US',
  },
  knowsAbout: [
    'Personal Training',
    'Fitness Coaching',
    'Weight Loss Coaching',
    'Body Transformation',
    'Strength Training',
    'Nutrition Guidance',
    'Accountability Coaching',
    'Fitness Challenges',
  ],
};

const JSONLD_LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Body By Brad',
  description:
    'Body By Brad combines personalized coaching, evidence-based training, nutrition guidance, accountability systems, and community support to help clients achieve sustainable fitness results.',
  url: 'https://bodybybradfitness.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '466 Savannah Hwy',
    addressLocality: 'Charleston',
    addressRegion: 'SC',
    postalCode: '29407',
    addressCountry: 'US',
  },
  areaServed: [
    'Charleston, SC',
    'Mount Pleasant, SC',
    'North Charleston, SC',
    'Summerville, SC',
    'Goose Creek, SC',
    'Hanahan, SC',
    'Daniel Island, SC',
    'Johns Island, SC',
    'James Island, SC',
    'West Ashley, SC',
  ],
};

const JSONLD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bodybybradfitness.com' },
    { '@type': 'ListItem', position: 2, name: 'About Brad', item: 'https://bodybybradfitness.com/about-brad' },
  ],
};

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
    <ReactLenis root>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_FAQ) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_PERSON) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_LOCAL_BUSINESS) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_BREADCRUMB) }}
        />
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

          {/* Timeline — Our Journey */}
          <AboutTimelineSection />

          {/* Mission & Vision */}
          <AboutMissionSection />

          {/* Stats bar */}
          <AboutStatsSection />

          {/* Instagram Gallery */}
          <AboutGallerySection />

          {/* Recognition / Achievements list */}
          <AboutRecognitionSection />

          {/* Let's Run Charleston */}
          <AboutRunClubSection />

          {/* Helping Charleston Transform — service areas */}
          <AboutAreasSection />

          {/* Transformation results */}
          <TransformationSection />

          {/* CTA */}
          <CTASection />

          {/* FAQ */}
          <FAQSection items={ABOUT_FAQ} />

          <Footer />
        </div>
      </ReactLenis>
  );
}
