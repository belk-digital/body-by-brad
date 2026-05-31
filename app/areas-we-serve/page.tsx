import type { Metadata } from 'next';
import AreasContent from './AreasContent';

export const metadata: Metadata = {
  title: 'Areas We Serve | Body By Brad – Personal Trainer Charleston SC',
  description:
    'Body By Brad serves Charleston and the greater Lowcountry including Mount Pleasant, North Charleston, West Ashley, Summerville, and more. Online coaching available everywhere.',
  keywords: [
    'personal trainer Charleston SC',
    'personal trainer near me',
    'personal trainer Mount Pleasant SC',
    'personal trainer North Charleston',
    'personal trainer Summerville SC',
    'fitness coach West Ashley',
    'personal trainer James Island SC',
    'online personal trainer',
    'fitness training Lowcountry SC',
    'body by brad service area',
  ],
  openGraph: {
    title: 'Areas We Serve | Body By Brad – Charleston SC Personal Trainer',
    description:
      'In-person personal training across the Charleston Lowcountry. Online coaching available everywhere in the world.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Areas We Serve | Body By Brad',
    description:
      'In-person personal training across the Charleston Lowcountry. Online coaching available everywhere.',
  },
};

export default function AreasWeServePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Body By Brad',
    url: 'https://www.bodybybrad.com',
    description:
      'Elite personal training, group fitness classes, and online coaching based in Charleston, SC.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Charleston',
      addressRegion: 'SC',
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
      { '@type': 'City', name: 'Folly Beach', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Isle of Palms', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: "Sullivan's Island", containedInPlace: { '@type': 'State', name: 'South Carolina' } },
      { '@type': 'City', name: 'Ladson', containedInPlace: { '@type': 'State', name: 'South Carolina' } },
    ],
    sameAs: ['https://www.instagram.com/bodybybrad'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreasContent />
    </>
  );
}
