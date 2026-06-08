'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { Dumbbell, CheckCircle2 } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';

import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const EVENTS = [
  'Summer Cooldown — Jun 20, 2026',
  'BBB Outdoor HIIT — Jul 19, 2026',
  'Sunset Bootcamp — Aug 15, 2026',
];

const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];

const HEAR_OPTIONS = ['Instagram', 'Facebook', 'YouTube', 'Friend / Referral', 'Google Search', 'Other'];

const BRING_ITEMS = ['Water bottle', 'Athletic shoes', 'Comfortable workout gear', 'Sunscreen & hat', 'Positive energy!'];

type FormState = {
  firstName: string; lastName: string; email: string;
  event: string; fitnessLevel: string; heardFrom: string;
  emergencyName: string;
  notes: string; agreed: boolean;
};

const EMPTY: FormState = {
  firstName: '', lastName: '', email: '',
  event: '', fitnessLevel: '', heardFrom: '',
  emergencyName: '', notes: '', agreed: false,
};

const inputCls =
  'w-full rounded-xl border border-zinc-700 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#E6FF2B] focus:ring-2 focus:ring-[#E6FF2B]/10 transition-all';

const selectCls =
  'w-full rounded-xl border border-zinc-700 bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none focus:border-[#E6FF2B] transition-all appearance-none cursor-pointer';

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        {label}{required && <span className="text-[#E6FF2B] ml-0.5">*</span>}
      </label>
      {children}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-zinc-700/50">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E6FF2B] shrink-0">
        <Dumbbell size={10} className="text-[#1A1A1A]" />
      </span>
      <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">{children}</h2>
    </div>
  );
}

export default function RegisterPage() {
  const [isLoading, setIsLoading]   = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [form, setForm]             = useState<FormState>(EMPTY);
  const [errors, setErrors]         = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const prevScrollY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const up = latest < prevScrollY.current;
    prevScrollY.current = latest;
    if (latest > 100 && up) setIsScrolled(true);
    else if (!up || latest <= 100) setIsScrolled(false);
  });

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(t);
  }, []);

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim())      e.firstName      = 'Required';
    if (!form.lastName.trim())       e.lastName       = 'Required';
    if (!form.email.trim())          e.email          = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.event)                 e.event          = 'Please select an event';
    if (!form.fitnessLevel)          e.fitnessLevel   = 'Please select a level';
    if (!form.emergencyName.trim())  e.emergencyName  = 'Required';
    if (!form.agreed)                e.agreed         = 'You must agree to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <ReactLenis root>
      <div className="relative w-full min-h-screen font-satoshi bg-[#f5f4f3] overflow-x-hidden">

          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <section className="relative bg-[#1A1A1A] pt-36 pb-16 px-4 sm:px-7 md:px-12 overflow-hidden">
            <Navbar
              isLoading={isLoading}
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              onMenuToggle={setIsMenuOpen}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isLoading ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.4 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FF2B]">
                  <Dumbbell size={12} className="text-[#1A1A1A]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E6FF2B]">
                  Body By Brad
                </span>
              </div>
              <h1
                className="text-white font-extrabold leading-none uppercase tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
              >
                Event
                <br />
                Registration
              </h1>
              <p className="text-white/40 text-sm md:text-base mt-4 max-w-md leading-relaxed">
                Secure your spot at one of Charleston&apos;s premier outdoor fitness events.
                Fill in your details below and we&apos;ll confirm your registration.
              </p>
            </motion.div>
          </section>

          {/* ── Form ──────────────────────────────────────────────────────── */}
          <section className="px-4 sm:px-7 md:px-12 py-16 md:py-20">

            <AnimatePresence mode="wait">
              {submitted ? (

                /* ── Success ──────────────────────────────────────────── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                  className="bg-white rounded-3xl p-10 md:p-16 text-center max-w-xl mx-auto shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E6FF2B]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#1A1A1A]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-zinc-950 mb-3">
                    You&apos;re Registered!
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                    Thanks, <strong className="text-zinc-950">{form.firstName}</strong>! We&apos;ve received your
                    registration for <strong className="text-zinc-950">{form.event}</strong>.
                    Check your inbox for a confirmation email.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="/events"
                      className="px-7 py-3 rounded-full bg-[#1A1A1A] text-white text-[11px] font-extrabold uppercase tracking-widest hover:opacity-80 transition-opacity"
                    >
                      Back to Events
                    </a>
                    <a
                      href="/"
                      className="px-7 py-3 rounded-full border-2 border-zinc-200 text-zinc-600 text-[11px] font-extrabold uppercase tracking-widest hover:border-zinc-950 hover:text-zinc-950 transition-all"
                    >
                      Go Home
                    </a>
                  </div>
                </motion.div>

              ) : (

                /* ── Form ─────────────────────────────────────────────── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start"
                >

                  {/* ── Left — main fields ──────────────────────────── */}
                  <div className="bg-[#252525] rounded-3xl p-6 md:p-10 flex flex-col gap-8">

                    {/* Personal Info */}
                    <div>
                      <SectionHeading>Personal Information</SectionHeading>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name" required error={errors.firstName}>
                          <input type="text" placeholder="John" value={form.firstName} onChange={set('firstName')} className={inputCls} />
                        </Field>
                        <Field label="Last Name" required error={errors.lastName}>
                          <input type="text" placeholder="Doe" value={form.lastName} onChange={set('lastName')} className={inputCls} />
                        </Field>
                        <Field label="Email Address" required error={errors.email}>
                          <input type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} className={inputCls} />
                        </Field>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div>
                      <SectionHeading>Event Details</SectionHeading>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Select Event" required error={errors.event}>
                          <div className="relative">
                            <select value={form.event} onChange={set('event')} className={selectCls}>
                              <option value="">Choose an event…</option>
                              {EVENTS.map((e) => <option key={e} value={e}>{e}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
                          </div>
                        </Field>
                        <Field label="Fitness Level" required error={errors.fitnessLevel}>
                          <div className="relative">
                            <select value={form.fitnessLevel} onChange={set('fitnessLevel')} className={selectCls}>
                              <option value="">Select level…</option>
                              {FITNESS_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
                          </div>
                        </Field>
                        <Field label="How did you hear about us?">
                          <div className="relative">
                            <select value={form.heardFrom} onChange={set('heardFrom')} className={selectCls}>
                              <option value="">Select…</option>
                              {HEAR_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
                          </div>
                        </Field>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <SectionHeading>Emergency Contact</SectionHeading>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Contact Name" required error={errors.emergencyName}>
                          <input type="text" placeholder="Jane Doe" value={form.emergencyName} onChange={set('emergencyName')} className={inputCls} />
                        </Field>
                      </div>
                    </div>

                    {/* Notes */}
                    <Field label="Medical conditions / additional notes">
                      <textarea
                        rows={4}
                        placeholder="Any injuries, allergies, or things we should know…"
                        value={form.notes}
                        onChange={set('notes')}
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    {/* Terms */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={form.agreed}
                            onChange={(e) => setForm((f) => ({ ...f, agreed: e.target.checked }))}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              form.agreed
                                ? 'bg-[#E6FF2B] border-[#E6FF2B]'
                                : 'border-zinc-600 group-hover:border-zinc-400'
                            }`}
                          >
                            {form.agreed && (
                              <svg className="w-3 h-3 text-[#1A1A1A]" fill="none" viewBox="0 0 12 12">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-zinc-400 leading-relaxed">
                          I agree to the{' '}
                          <a href="#" className="text-white underline underline-offset-2 hover:opacity-60">Terms &amp; Conditions</a>
                          {' '}and confirm that the information provided is accurate.
                          I understand that participation in outdoor fitness events carries inherent risks.
                        </span>
                      </label>
                      {errors.agreed && <p className="text-red-500 text-xs mt-1.5 ml-8">{errors.agreed}</p>}
                    </div>
                  </div>

                  {/* ── Right — summary + submit ─────────────────────── */}
                  <div className="flex flex-col gap-4 lg:sticky lg:top-28">

                    {/* Event summary */}
                    <div className="bg-[#E6FF2B] rounded-3xl p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/50 mb-3">
                        Selected Event
                      </p>
                      <p className="font-extrabold text-[#1A1A1A] text-lg leading-snug uppercase">
                        {form.event || 'No event selected yet'}
                      </p>
                      {form.event && (
                        <div className="mt-4 pt-4 border-t border-black/10 text-xs text-black/55 leading-relaxed space-y-1.5">
                          <p>📍 Charleston, SC</p>
                          <p>🎽 Fitness Level: {form.fitnessLevel || '—'}</p>
                          <p>✉️ {form.email || '—'}</p>
                        </div>
                      )}
                    </div>

                    {/* What to bring */}
                    <div className="bg-[#252525] rounded-3xl p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400 mb-4">
                        What to Bring
                      </p>
                      <ul className="space-y-2.5">
                        {BRING_ITEMS.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="relative overflow-hidden rounded-full border-2 border-[#1A1A1A] py-4 px-8 text-[11px] font-extrabold uppercase tracking-widest w-full cursor-pointer disabled:opacity-50 flex items-center justify-between"
                      initial="rest"
                      whileHover={submitting ? 'rest' : 'hover'}
                      animate="rest"
                    >
                      <motion.span
                        className="absolute inset-0 bg-[#1A1A1A]"
                        style={{ transformOrigin: 'left' }}
                        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                      />
                      <motion.span
                        className="relative z-10"
                        variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#E6FF2B' } }}
                        transition={{ duration: 0.32, ease: 'easeInOut' }}
                      >
                        {submitting ? 'Submitting…' : 'Register Now'}
                      </motion.span>
                      <motion.span
                        className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                        variants={{
                          rest:  { backgroundColor: '#1A1A1A', color: '#E6FF2B' },
                          hover: { backgroundColor: '#E6FF2B', color: '#1A1A1A' },
                        }}
                        transition={{ duration: 0.32, ease: 'easeInOut' }}
                      >
                        {submitting ? (
                          <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                        ) : (
                          <>
                            <IoChevronForward size={11} />
                            <IoChevronForward size={11} className="-ml-1.5" />
                          </>
                        )}
                      </motion.span>
                    </motion.button>

                    <p className="text-center text-zinc-400 text-xs">
                      Free to attend — no payment required at this stage.
                    </p>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </section>

          <Footer />
        </div>
      </ReactLenis>
  );
}
