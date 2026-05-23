'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
];

export default function AdminTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active
                ? 'bg-zinc-950 text-white'
                : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
