import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Personal Training Services in Charleston, SC | Body By Brad',
  description:
    'Explore Body By Brad\'s personal training services in Charleston, SC — online fitness training, at-home training, weight loss coaching, online coaching, and group fitness classes.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Personal Training Services in Charleston, SC | Body By Brad',
    description:
      "Online fitness training, at-home training, weight loss coaching, online coaching, and group fitness classes — all led by Charleston's top-rated trainer.",
    url: '/services',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
