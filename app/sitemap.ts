import type { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/lib/services-data';
import { getAllAreaSlugs } from '@/lib/areas-data';
import { supabaseAdmin } from '@/lib/supabase/server';

const SITE_URL = 'https://bodybybrad.com';

const STATIC_ROUTES = [
  '',
  '/about-brad',
  '/services',
  '/areas-we-serve',
  '/packages',
  '/events',
  '/results',
  '/merchandise',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const serviceEntries: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
  }));

  const areaEntries: MetadataRoute.Sitemap = getAllAreaSlugs().map((slug) => ({
    url: `${SITE_URL}/areas-we-serve/${slug}`,
    lastModified: new Date(),
  }));

  const { data: products } = await supabaseAdmin
    .from('products')
    .select('id')
    .eq('active', true);

  const productEntries: MetadataRoute.Sitemap = (products ?? []).map(({ id }) => ({
    url: `${SITE_URL}/merchandise/${id}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...serviceEntries, ...areaEntries, ...productEntries];
}
