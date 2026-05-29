'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push(next);
    router.refresh();
  };

  const oauth = async (provider: 'google' | 'facebook') => {
    setError(null);
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) setError(error.message);
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-1">
        Sign in
      </h1>
      <p className="text-sm text-white/40 mb-8">Welcome back to Body By Brad.</p>

      {/* OAuth */}
      <div className="space-y-2 mb-6">
        <button
          type="button"
          onClick={() => oauth('google')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-white/8 border border-white/10 text-white text-sm font-semibold hover:bg-white/12 transition-colors"
        >
          <FcGoogle size={18} /> Continue with Google
        </button>
        <button
          type="button"
          onClick={() => oauth('facebook')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#0e63d1] transition-colors"
        >
          <FaFacebook size={18} /> Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/6 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E6FF2B] transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/6 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E6FF2B] transition-colors"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E6FF2B] text-[#1A1A1A] py-3.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity mt-2"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-xs text-white/35 text-center mt-7">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-bold text-[#E6FF2B] hover:opacity-75 transition-opacity">
          Sign up
        </Link>
      </p>
    </div>
  );
}
