import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/auth/isAdmin';
import AdminSideNav from './AdminTabs';
import AdminHeader from './AdminHeader';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/');

  return (
    <div className="flex h-dvh overflow-hidden font-satoshi">
      <aside className="w-56 shrink-0 bg-zinc-950 flex flex-col overflow-y-auto">
        <div className="px-5 pt-6 pb-5 border-b border-white/5">
          <Link href="/" className="block">
            <span className="text-white font-black text-xs uppercase tracking-widest">
              Body By Brad
            </span>
            <span className="block text-lime-400 text-[9px] font-bold uppercase tracking-widest mt-0.5">
              Admin Panel
            </span>
          </Link>
        </div>

        <AdminSideNav />

        <div className="px-5 py-4 border-t border-white/5 mt-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <span>←</span>
            <span>Back to site</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto bg-[#f5f4f3] px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
