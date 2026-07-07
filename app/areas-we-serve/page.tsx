import type { Metadata } from 'next';
import AreasContent from './AreasContent';

export const metadata: Metadata = {
  title: 'Personal Trainer Charleston SC | Areas We Serve | Fitness Coaching by Body By Brad',
  description:
    'Body By Brad provides personal training, fitness coaching, weight loss programs, body transformation coaching, and fitness challenges throughout Charleston, Mount Pleasant, North Charleston, Summerville, Goose Creek, and surrounding Lowcountry communities.',
  keywords: [
    'personal trainer Charleston SC',
    'fitness coaching Charleston SC',
    'personal trainer near me',
    'personal trainer Mount Pleasant SC',
    'personal trainer North Charleston',
    'personal trainer Summerville SC',
    'fitness coach West Ashley',
    'personal trainer James Island SC',
    'weight loss coaching Charleston SC',
    'body transformation Charleston',
    'online personal trainer',
    'fitness training Lowcountry SC',
  ],
  alternates: { canonical: '/areas-we-serve-charleston-sc' },
  openGraph: {
    title: 'Personal Training & Fitness Coaching Throughout Charleston SC | Areas We Serve',
    description:
      'Body By Brad provides personal training, fitness coaching, weight loss programs, and body transformation coaching throughout Charleston and surrounding Lowcountry communities.',
    url: '/areas-we-serve-charleston-sc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Trainer Charleston SC | Areas We Serve',
    description:
      'Personal training, fitness coaching, and body transformation throughout Charleston SC and the Lowcountry. Online coaching available nationwide.',
  },
};

const AREAS_FAQ_SCHEMA = [
  { q: 'What areas around Charleston do you serve?', a: 'We serve Charleston, Mount Pleasant, North Charleston, Summerville, Goose Creek, Hanahan, Daniel Island, Johns Island, James Island, and West Ashley.' },
  { q: 'Do you offer online fitness coaching?', a: 'Yes. We provide online coaching programs for clients nationwide.' },
  { q: 'Can I join from Mount Pleasant?', a: 'Absolutely. We work with clients throughout Mount Pleasant and the surrounding Lowcountry.' },
  { q: 'What fitness services do you offer?', a: 'We offer personal training, body transformation coaching, nutrition guidance, accountability coaching, fitness challenges, and online coaching.' },
  { q: 'Can fitness coaching help me lose weight?', a: 'Yes. Our coaching programs focus on sustainable weight loss through personalized training and nutrition support.' },
  { q: 'How do I get started?', a: "Schedule a consultation and we'll recommend the best coaching option for your goals." },
];

export default function AreasWeServePage() {
  const jsonLdBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Body By Brad',
    url: 'https://www.bodybybradfitness.com',
    description:
      'Body By Brad provides personal training, fitness coaching, weight loss programs, body transformation coaching, and fitness challenges throughout Charleston and surrounding Lowcountry communities.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '466 Savannah Hwy',
      addressLocality: 'Charleston',
      addressRegion: 'SC',
      postalCode: '29407',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Charleston', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Mount Pleasant', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'North Charleston', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'West Ashley', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'James Island', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Daniel Island', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Johns Island', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Summerville', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Goose Creek', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Hanahan', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
    ],
    sameAs: ['https://www.instagram.com/bradnboujee_'],
    priceRange: '$$',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AREAS_FAQ_SCHEMA.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bodybybradfitness.com' },
      { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: 'https://www.bodybybradfitness.com/areas-we-serve-charleston-sc' },
    ],
  };

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Personal Training & Fitness Coaching',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Body By Brad',
      url: 'https://www.bodybybradfitness.com',
    },
    areaServed: [
      'Charleston, SC', 'Mount Pleasant, SC', 'North Charleston, SC', 'Summerville, SC',
      'Goose Creek, SC', 'Hanahan, SC', 'Daniel Island, SC', 'Johns Island, SC',
      'James Island, SC', 'West Ashley, SC',
    ],
    description: 'Personal training, fitness coaching, weight loss programs, body transformation coaching, nutrition guidance, accountability coaching, and online fitness coaching.',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <AreasContent />
    </>
  );
}
