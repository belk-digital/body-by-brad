import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Fitness Blog | Training, Nutrition & Charleston Running Guides | Body By Brad',
  description:
    "Training guides, coaching advice, and Charleston fitness resources from ISSA certified coach Brad — including a full Cooper River Bridge Run training plan.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Fitness Blog | Body By Brad',
    description:
      "Training guides, coaching advice, and Charleston fitness resources from ISSA certified coach Brad.",
    url: '/blog',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
