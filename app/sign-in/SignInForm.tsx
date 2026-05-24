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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  };

  const oauth = async (provider: 'google' | 'facebook') => {
    setError(null);
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 mb-6 inline-block">
        ← Back to site
      </Link>
      <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-950 mb-1">Sign in</h1>
      <p className="text-sm text-zinc-500 mb-8">Welcome back to Body By Brad.</p>

      <div className="space-y-2 mb-5">
        <button
          type="button"
          onClick={() => oauth('google')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 text-zinc-900 text-sm font-semibold hover:bg-zinc-50 transition-colors"
        >
          <FcGoogle size={18} /> Continue with Google
        </button>
        <button
          type="button"
          onClick={() => oauth('facebook')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#0e63d1] transition-colors"
        >
          <FaFacebook size={18} /> Continue with Facebook
        </button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-zinc-200" />
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">or</span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 bg-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 bg-white"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-950 text-white py-3.5 rounded-full text-sm font-semibold hover:bg-zinc-700 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-xs text-zinc-500 text-center mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-semibold text-zinc-900 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
