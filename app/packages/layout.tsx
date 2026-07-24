import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Fitness Coaching Packages | Personal Training & Body Transformation Plans | Body By Brad',
  description:
    'Choose from expert fitness coaching packages designed for weight loss, muscle gain, body transformation, and long-term health. Personalized workouts, nutrition guidance, accountability coaching, and ongoing support from Body By Brad.',
  alternates: { canonical: '/packages' },
  openGraph: {
    title: 'Fitness Coaching Packages for Weight Loss, Muscle Gain & Transformation | Body By Brad',
    description:
      'Choose from expert fitness coaching packages designed for weight loss, muscle gain, body transformation, and long-term health. Personalized workouts, nutrition guidance, and accountability coaching.',
    url: '/packages',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
