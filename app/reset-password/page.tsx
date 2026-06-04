'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { evaluatePassword, PASSWORD_RULES } from '@/lib/auth/password';
import { useMemo } from 'react';

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'] as const;
const STRENGTH_COLORS = [
  'bg-white/20',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-[#E6FF2B]',
  'bg-emerald-400',
] as const;

const IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779139268/IMG_3044_vsxjow.jpg';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [pwTouched, setPwTouched] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [done, setDone]           = useState(false);

  const { results: pwResults, score: pwScore, allValid: pwValid } = useMemo(
    () => evaluatePassword(password),
    [password],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwTouched(true);
    if (!pwValid) { setError('Password does not meet all requirements.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setDone(true);
  };

  return (
    <main className="font-satoshi min-h-dvh flex">

      {/* ── Left — form ─────────────────────────────────────────────────── */}
      <div className="relative flex w-full flex-col justify-center bg-[#1A1A1A] px-8 py-16 md:w-[45%] lg:w-[40%]">

        <Link
          href="/"
          className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          ← Back to site
        </Link>

        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
            <span className="text-[9px] font-black text-[#1A1A1A] leading-none">B</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6FF2B]">
            Body By Brad
          </span>
        </div>

        {done ? (
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
              Password updated
            </h1>
            <p className="text-sm text-white/40 mb-6">
              Your password has been changed. You can now sign in with your new password.
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-[#E6FF2B] text-[#1A1A1A] px-6 py-3 rounded-full text-[11px] font-extrabold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Go to sign in
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-1">
              New password
            </h1>
            <p className="text-sm text-white/40 mb-8">Choose a strong password for your account.</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
                  New password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPwTouched(true)}
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

              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
                  Confirm password
                </label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
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
                {loading ? 'Updating…' : 'Update password'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Right — photo ────────────────────────────────────────────────── */}
      <div className="relative hidden flex-1 md:block">
        <img
          src={IMAGE}
          alt="Body By Brad training"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B] mb-2">
            Charleston, SC
          </p>
          <h2 className="font-extrabold uppercase text-white leading-none text-4xl lg:text-5xl">
            WHERE EFFORT
            <br />
            BECOMES
            <br />
            TRANSFORMATION
          </h2>
        </div>
      </div>

    </main>
  );
}
