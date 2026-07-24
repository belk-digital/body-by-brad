import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Charleston Fitness Events & Wellness Challenges | Body By Brad',
  description:
    "Join Charleston's premier fitness events, outdoor workouts, wellness workshops, and transformation challenges. Train with expert coaches, build healthy habits, and become part of Charleston's fitness community.",
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Charleston Fitness Events, Workshops & Transformation Challenges | Body By Brad',
    description:
      "Join Charleston's premier fitness events, outdoor workouts, wellness workshops, and transformation challenges. Train with expert coaches and build healthy habits.",
    url: '/events',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
