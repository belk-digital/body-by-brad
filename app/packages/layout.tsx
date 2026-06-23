import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fitness Coaching Packages | Personal Training & Body Transformation Plans | Body By Brad',
  description:
    'Choose from expert fitness coaching packages designed for weight loss, muscle gain, body transformation, and long-term health. Personalized workouts, nutrition guidance, accountability coaching, and ongoing support from Body By Brad.',
  alternates: { canonical: '/fitness-coaching-packages' },
  openGraph: {
    title: 'Fitness Coaching Packages for Weight Loss, Muscle Gain & Transformation | Body By Brad',
    description:
      'Choose from expert fitness coaching packages designed for weight loss, muscle gain, body transformation, and long-term health. Personalized workouts, nutrition guidance, and accountability coaching.',
    url: '/fitness-coaching-packages',
    type: 'website',
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
