import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data';
import ServiceDetail from './ServiceDetail';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      images: [
        {
          url: service.heroImage,
          width: 1920,
          height: 1080,
          alt: service.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo.title,
      description: service.seo.description,
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seo.description,
    url: `https://www.bodybybrad.com/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Body By Brad',
      url: 'https://www.bodybybrad.com',
      telephone: '',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Charleston',
        addressRegion: 'SC',
        addressCountry: 'US',
      },
      sameAs: [
        'https://www.instagram.com/bradnboujee_',
      ],
    },
    serviceType: service.accentLabel,
    areaServed: {
      '@type': 'City',
      name: 'Charleston',
      containedInPlace: {
        '@type': 'State',
        name: 'South Carolina',
      },
    },
    offers: {
      '@type': 'Offer',
      url: 'https://www.bodybybrad.com/fitness-coaching-packages',
      priceCurrency: 'USD',
    },
    image: service.heroImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
