'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { evaluatePassword, PASSWORD_RULES } from '@/lib/auth/password';

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'] as const;
const STRENGTH_COLORS = [
  'bg-zinc-200',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-emerald-500',
] as const;

export default function SignUpForm() {
  const params = useSearchParams();
  const next = params.get('next') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwTouched, setPwTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const { results: pwResults, score: pwScore, allValid: pwValid } = useMemo(
    () => evaluatePassword(password),
    [password]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwValid) {
      setPwTouched(true);
      setError('Password does not meet all requirements.');
      return;
    }
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // If email confirmations are off, user is signed in immediately.
    if (data.session) {
      window.location.assign(next);
      return;
    }
    setConfirmSent(true);
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

  if (confirmSent) {
    return (
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-950 mb-2">Check your email</h1>
        <p className="text-sm text-zinc-500 mb-6">
          We sent a confirmation link to <span className="font-semibold text-zinc-900">{email}</span>. Click
          it to finish creating your account.
        </p>
        <Link href="/sign-in" className="text-sm font-semibold text-zinc-900 hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 mb-6 inline-block">
        ← Back to site
      </Link>
      <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-950 mb-1">Create account</h1>
      <p className="text-sm text-zinc-500 mb-8">Join the BBB community.</p>

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
            onBlur={() => setPwTouched(true)}
            aria-invalid={pwTouched && !pwValid}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 bg-white"
            placeholder="Strong password"
          />

          {(password.length > 0 || pwTouched) && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${STRENGTH_COLORS[pwScore]}`}
                    style={{ width: `${(pwScore / PASSWORD_RULES.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-20 text-right">
                  {STRENGTH_LABELS[pwScore]}
                </span>
              </div>
              <ul className="space-y-1">
                {pwResults.map((r) => (
                  <li
                    key={r.id}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      r.passed ? 'text-emerald-700' : 'text-zinc-500'
                    }`}
                  >
                    {r.passed ? (
                      <IoCheckmarkCircle size={14} />
                    ) : (
                      <IoEllipseOutline size={14} />
                    )}
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {error && (
          <div className="text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !pwValid}
          className="w-full bg-zinc-950 text-white py-3.5 rounded-full text-sm font-semibold hover:bg-zinc-700 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-xs text-zinc-500 text-center mt-6">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-semibold text-zinc-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
