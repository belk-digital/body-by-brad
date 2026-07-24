import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Shop Merchandise | Body By Brad Fitness Apparel',
  description:
    'Shop official Body By Brad fitness apparel — premium hoodies and gear built for performance. Shipping across the United States.',
  alternates: { canonical: '/merchandise' },
  openGraph: {
    title: 'Shop Merchandise | Body By Brad Fitness Apparel',
    description: 'Premium fitness apparel built for performance, from Body By Brad.',
    url: '/merchandise',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function MerchandiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
