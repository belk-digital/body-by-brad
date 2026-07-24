import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Body By Brad | Charleston Personal Trainer',
  description:
    "Get in touch with Body By Brad. Book a free 15-minute discovery call to start personal training, group fitness classes, or online coaching in Charleston, SC.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Body By Brad | Charleston Personal Trainer',
    description:
      "Book a free 15-minute discovery call to start personal training, group fitness classes, or online coaching in Charleston, SC.",
    url: '/contact',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
