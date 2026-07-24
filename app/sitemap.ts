import type { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/lib/services-data';
import { getAllAreaSlugs } from '@/lib/areas-data';
import { getAllPostSlugs } from '@/lib/blog-data';
import { supabaseAdmin } from '@/lib/supabase/server';
import { SITE_URL } from '@/lib/site';

// Rendered per request: product entries come from Supabase, which isn't
// reachable during the build.
export const dynamic = 'force-dynamic';

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

  const blogEntries: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
  }));

  // A Supabase outage shouldn't take the whole sitemap down with it.
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('active', true);

    productEntries = (products ?? []).map(({ id }) => ({
      url: `${SITE_URL}/merchandise/${id}`,
      lastModified: new Date(),
    }));
  } catch (err) {
    console.error('sitemap: failed to load products', err);
  }

  return [...staticEntries, ...serviceEntries, ...areaEntries, ...blogEntries, ...productEntries];
}
