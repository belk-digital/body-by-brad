import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { isAdmin } from '@/lib/auth/isAdmin';
import AdminTabs from './AdminTabs';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    redirect('/');
  }

  return (
    <div className="font-satoshi min-h-dvh bg-[#f5f0e1]">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-zinc-950 text-sm uppercase tracking-widest">
              Body By Brad <span className="text-zinc-400">/ Admin</span>
            </Link>
            <AdminTabs />
          </div>
          <UserButton />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">{children}</main>
    </div>
  );
}
