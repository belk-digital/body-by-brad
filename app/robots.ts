import type { MetadataRoute } from 'next';

const SITE_URL = 'https://bodybybrad.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/account', '/checkout', '/order-confirmed', '/api', '/auth', '/reset-password'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
