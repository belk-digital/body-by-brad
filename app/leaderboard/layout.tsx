import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaderboard | Body By Brad',
  robots: { index: false, follow: false },
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
