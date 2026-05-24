'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';

type Props = {
  theme?: 'light' | 'dark';
};

function initial(email: string | undefined | null) {
  return email?.[0]?.toUpperCase() ?? '?';
}

export default function UserDropdown({ theme = 'light' }: Props) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const ringColor = theme === 'light' ? 'ring-white/40' : 'ring-zinc-900/20';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((x) => !x)}
        aria-label="Account"
        className={`w-7 h-7 rounded-full overflow-hidden ring-2 ${ringColor} hover:ring-offset-1 transition-all`}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
            {initial(user.email)}
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="font-satoshi absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-2xl border border-zinc-100 overflow-hidden z-[90]"
          >
            <div className="px-4 py-3 border-b border-zinc-100">
              <div className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-0.5">
                Signed in as
              </div>
              <div className="text-sm font-medium text-zinc-900 truncate">{user.email}</div>
            </div>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Account & orders
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors border-t border-zinc-100"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
