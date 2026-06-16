'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  ClipboardList,
  Users,
  Bell,
  Settings,
  ArrowLeft,
  BarChart2,
} from 'lucide-react';

type NavItem = { href: string; label: string; icon: React.ElementType };

const MAIN_MENU: NavItem[] = [
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { href: '/admin/registrations', label: 'Registrations', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
];

const GENERAL: NavItem[] = [
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/', label: 'Back to Site', icon: ArrowLeft },
];

function NavLink({ href, label, icon: Icon, active }: NavItem & { active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-lime-400 text-zinc-950 shadow-sm'
          : 'text-zinc-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={16} strokeWidth={active ? 2.5 : 2} />
      {label}
    </Link>
  );
}

export default function AdminSideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
      <div>
        <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold px-3 mb-2">
          Main Menu
        </p>
        <ul className="space-y-0.5">
          {MAIN_MENU.map((item) => (
            <li key={item.href}>
              <NavLink {...item} active={pathname.startsWith(item.href)} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold px-3 mb-2">
          General
        </p>
        <ul className="space-y-0.5">
          {GENERAL.map((item) => (
            <li key={item.href}>
              <NavLink {...item} active={false} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
