'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { evaluatePassword, PASSWORD_RULES } from '@/lib/auth/password';

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'] as const;
const STRENGTH_COLORS = [
  'bg-white/20',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-[#E6FF2B]',
  'bg-emerald-400',
] as const;

export default function SignUpForm() {
  const params = useSearchParams();
  const next = params.get('next') || '/account';

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [pwTouched, setPwTouched] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const { results: pwResults, score: pwScore, allValid: pwValid } = useMemo(
    () => evaluatePassword(password),
    [password],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwValid) { setPwTouched(true); setError('Password does not meet all requirements.'); return; }
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data.session) { window.location.assign(next); return; }
    setConfirmSent(true);
  };

  const oauth = async (provider: 'google') => {
    setError(null);
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) setError(error.message);
  };

  if (confirmSent) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
          Check your email
        </h1>
        <p className="text-sm text-white/40 mb-6">
          We sent a confirmation link to{' '}
          <span className="font-semibold text-white">{email}</span>.
          Click it to finish creating your account.
        </p>
        <Link href="/sign-in" className="text-sm font-bold text-[#E6FF2B] hover:opacity-75 transition-opacity">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-1">
        Create account
      </h1>
      <p className="text-sm text-white/40 mb-8">Join the BBB community.</p>

      {/* OAuth */}
      <div className="space-y-2 mb-6">
        <button
          type="button"
          onClick={() => oauth('google')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-white/8 border border-white/10 text-white text-sm font-semibold hover:bg-white/12 transition-colors"
        >
          <FcGoogle size={18} /> Continue with Google
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
            onBlur={() => setPwTouched(true)}
            aria-invalid={pwTouched && !pwValid}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/6 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E6FF2B] transition-colors"
            placeholder="Strong password"
          />

          {(password.length > 0 || pwTouched) && (
            <div className="mt-2.5 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${STRENGTH_COLORS[pwScore]}`}
                    style={{ width: `${(pwScore / PASSWORD_RULES.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 w-20 text-right">
                  {STRENGTH_LABELS[pwScore]}
                </span>
              </div>
              <ul className="space-y-1">
                {pwResults.map((r) => (
                  <li
                    key={r.id}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      r.passed ? 'text-[#E6FF2B]' : 'text-white/35'
                    }`}
                  >
                    {r.passed ? <IoCheckmarkCircle size={13} /> : <IoEllipseOutline size={13} />}
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !pwValid}
          className="w-full bg-[#E6FF2B] text-[#1A1A1A] py-3.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity mt-2"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-xs text-white/35 text-center mt-7">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-bold text-[#E6FF2B] hover:opacity-75 transition-opacity">
          Sign in
        </Link>
      </p>
    </div>
  );
}
