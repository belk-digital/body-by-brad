'use client';

import { usePathname } from 'next/navigation';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import UserDropdown from '@/components/layout/UserDropdown';

export default function AdminHeader() {
  const pathname = usePathname();

  const now = new Date();
  const monthLabel = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <header className="bg-white border-b border-zinc-200 px-6 py-3 flex items-center gap-4">
      <div className="w-28 shrink-0">
        <span className="text-lg font-black text-zinc-950 tracking-tight">Overview</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search…"
            className="w-full pl-8 pr-16 py-2 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100 bg-white transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="text-[9px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded font-mono">⌘</kbd>
            <kbd className="text-[9px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded font-mono">K</kbd>
          </div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Date filter */}
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <Calendar size={13} className="text-zinc-400" />
          <span className="text-xs font-semibold">{monthLabel}</span>
          <ChevronDown size={13} className="text-zinc-400" />
        </button>

        {/* View filter */}
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <span className="text-xs font-semibold">All</span>
          <ChevronDown size={13} className="text-zinc-400" />
        </button>

        {/* User */}
        <UserDropdown theme="dark" />
      </div>
    </header>
  );
}
