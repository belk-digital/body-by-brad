import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Body By Brad | Charleston Personal Trainer & Fitness Coach',
  description:
    "Meet Brad, Charleston's trusted fitness coach helping individuals transform their health through personal training, fitness coaching, nutrition guidance, accountability, and community-driven fitness challenges.",
  alternates: { canonical: '/about-brad' },
  openGraph: {
    title: 'About Brad | Charleston Personal Trainer, Fitness Coach & Transformation Expert',
    description:
      "Meet Brad, Charleston's trusted fitness coach helping individuals transform their health through personal training, fitness coaching, nutrition guidance, accountability, and community-driven fitness challenges.",
    url: '/about-brad',
    type: 'profile',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
