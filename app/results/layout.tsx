import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Fitness Transformation Results in Charleston | Body By Brad',
  description:
    'See real fitness transformation results from Charleston clients. Explore weight loss success stories, body transformations, strength gains, and sustainable health improvements achieved through expert coaching and accountability.',
  alternates: { canonical: '/results' },
  openGraph: {
    title: 'Fitness Transformation Results & Success Stories | Body By Brad Charleston',
    description:
      'See real fitness transformation results from Charleston clients. Weight loss success stories, body transformations, and strength gains through expert coaching.',
    url: '/results',
    type: 'website',
  },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
