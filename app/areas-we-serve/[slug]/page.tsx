import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAreaBySlug, getAllAreaSlugs } from '@/lib/areas-data';
import AreaLocationContent from './AreaLocationContent';

export function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: 'Area Not Found' };

  return {
    title: area.seo.title,
    description: area.seo.description,
    keywords: area.seo.keywords,
    openGraph: {
      title: area.seo.title,
      description: area.seo.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: area.seo.title,
      description: area.seo.description,
    },
  };
}

export default async function AreaLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Body By Brad',
    url: `https://www.bodybybradfitness.com/areas-we-serve-charleston-sc/${area.slug}`,
    description: area.seo.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Charleston',
      addressRegion: 'SC',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: {
        '@type': 'State',
        name: 'South Carolina',
      },
    },
    sameAs: ['https://www.instagram.com/bradnboujee_'],
    priceRange: '$$',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaLocationContent area={area} />
    </>
  );
}
