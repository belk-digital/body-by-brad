'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from 'lucide-react';

import { LanguageProvider } from '@/lib/LanguageContext';
import StairsPreloader from '@/components/StairsPreloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const EVENTS = [
  'Summer Cooldown — Jun 20, 2026',
  'BBB Outdoor HIIT — Jul 19, 2026',
  'Sunset Bootcamp — Aug 15, 2026',
];

const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];

const HEAR_OPTIONS = [
  'Instagram',
  'Facebook',
  'YouTube',
  'Friend / Referral',
  'Google Search',
  'Other',
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  event: string;
  fitnessLevel: string;
  heardFrom: string;
  emergencyName: string;
  emergencyPhone: string;
  notes: string;
  agreed: boolean;
};

const EMPTY: FormState = {
  firstName: '', lastName: '', email: '', phone: '',
  event: '', fitnessLevel: '', heardFrom: '',
  emergencyName: '', emergencyPhone: '',
  notes: '', agreed: false,
};

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {label}{required && <span className="text-[#007AE5] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:border-[#007AE5] focus:ring-2 focus:ring-[#007AE5]/15 transition-all';

const selectCls =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none focus:border-[#007AE5] focus:ring-2 focus:ring-[#007AE5]/15 transition-all appearance-none cursor-pointer';

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
    if (!form.firstName.trim())    e.firstName    = 'Required';
    if (!form.lastName.trim())     e.lastName     = 'Required';
    if (!form.email.trim())        e.email        = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim())        e.phone        = 'Required';
    if (!form.event)               e.event        = 'Please select an event';
    if (!form.fitnessLevel)        e.fitnessLevel = 'Please select a level';
    if (!form.emergencyName.trim()) e.emergencyName = 'Required';
    if (!form.emergencyPhone.trim()) e.emergencyPhone = 'Required';
    if (!form.agreed)              e.agreed       = 'You must agree to continue';
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
    <LanguageProvider>
      <ReactLenis root>
        <div className="relative w-full min-h-screen font-satoshi bg-[#f5f4f3] overflow-x-hidden">

          <AnimatePresence>
            {isLoading && <StairsPreloader />}
          </AnimatePresence>

          {/* Hero — blue, contains Navbar */}
          <section className="relative bg-[#007AE5] pt-36 pb-16 px-4 sm:px-7 md:px-12 overflow-hidden">
            <Navbar
              isLoading={isLoading}
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              onMenuToggle={setIsMenuOpen}
            />

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white/5" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isLoading ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              className="relative z-10 max-w-7xl mx-auto"
            >
              <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.25em]">
                Body By Brad
              </span>
              <h1
                className="text-white font-extrabold leading-none mt-3 uppercase"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
              >
                Event
                <br />
                Registration
              </h1>
              <p className="text-white/65 text-sm md:text-base mt-4 max-w-md leading-relaxed">
                Secure your spot at one of Charleston&apos;s premier outdoor fitness events.
                Fill in your details below and we&apos;ll confirm your registration.
              </p>
            </motion.div>
          </section>

          {/* Form */}
          <section className="px-4 sm:px-7 md:px-12 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success state ─────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white rounded-3xl p-10 md:p-16 text-center max-w-xl mx-auto shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#007AE5]/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-8 h-8 text-[#007AE5]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 mb-3">
                      You&apos;re Registered!
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                      Thanks, <strong className="text-zinc-950">{form.firstName}</strong>! We&apos;ve received your registration
                      for <strong className="text-zinc-950">{form.event}</strong>. Check your inbox for a confirmation email.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="/events"
                        className="px-7 py-3 rounded-full bg-[#007AE5] text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                      >
                        Back to Events
                      </a>
                      <a
                        href="/"
                        className="px-7 py-3 rounded-full border-2 border-zinc-200 text-zinc-700 text-sm font-bold hover:border-zinc-950 transition-colors"
                      >
                        Go Home
                      </a>
                    </div>
                  </motion.div>

                ) : (
                  /* ── Form ──────────────────────────────────────── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start"
                  >
                    {/* Left — main form card */}
                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm flex flex-col gap-8">

                      {/* Personal Info */}
                      <div>
                        <h2 className="text-lg font-extrabold text-zinc-950 mb-5 pb-3 border-b border-zinc-100">
                          Personal Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="First Name" required>
                            <input
                              type="text"
                              placeholder="John"
                              value={form.firstName}
                              onChange={set('firstName')}
                              className={inputCls}
                            />
                            {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                          </Field>
                          <Field label="Last Name" required>
                            <input
                              type="text"
                              placeholder="Doe"
                              value={form.lastName}
                              onChange={set('lastName')}
                              className={inputCls}
                            />
                            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                          </Field>
                          <Field label="Email Address" required>
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={form.email}
                              onChange={set('email')}
                              className={inputCls}
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                          </Field>
                          <Field label="Phone Number" required>
                            <input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={form.phone}
                              onChange={set('phone')}
                              className={inputCls}
                            />
                            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                          </Field>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div>
                        <h2 className="text-lg font-extrabold text-zinc-950 mb-5 pb-3 border-b border-zinc-100">
                          Event Details
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Select Event" required>
                            <div className="relative">
                              <select
                                value={form.event}
                                onChange={set('event')}
                                className={selectCls}
                              >
                                <option value="">Choose an event…</option>
                                {EVENTS.map((e) => <option key={e} value={e}>{e}</option>)}
                              </select>
                              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
                            </div>
                            {errors.event && <span className="text-red-500 text-xs">{errors.event}</span>}
                          </Field>
                          <Field label="Fitness Level" required>
                            <div className="relative">
                              <select
                                value={form.fitnessLevel}
                                onChange={set('fitnessLevel')}
                                className={selectCls}
                              >
                                <option value="">Select level…</option>
                                {FITNESS_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                              </select>
                              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
                            </div>
                            {errors.fitnessLevel && <span className="text-red-500 text-xs">{errors.fitnessLevel}</span>}
                          </Field>
                          <Field label="How did you hear about us?">
                            <div className="relative">
                              <select
                                value={form.heardFrom}
                                onChange={set('heardFrom')}
                                className={selectCls}
                              >
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
                        <h2 className="text-lg font-extrabold text-zinc-950 mb-5 pb-3 border-b border-zinc-100">
                          Emergency Contact
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Contact Name" required>
                            <input
                              type="text"
                              placeholder="Jane Doe"
                              value={form.emergencyName}
                              onChange={set('emergencyName')}
                              className={inputCls}
                            />
                            {errors.emergencyName && <span className="text-red-500 text-xs">{errors.emergencyName}</span>}
                          </Field>
                          <Field label="Contact Phone" required>
                            <input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={form.emergencyPhone}
                              onChange={set('emergencyPhone')}
                              className={inputCls}
                            />
                            {errors.emergencyPhone && <span className="text-red-500 text-xs">{errors.emergencyPhone}</span>}
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
                                form.agreed ? 'bg-[#007AE5] border-[#007AE5]' : 'border-zinc-300 group-hover:border-zinc-500'
                              }`}
                            >
                              {form.agreed && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-zinc-500 leading-relaxed">
                            I agree to the{' '}
                            <a href="#" className="text-[#007AE5] underline underline-offset-2">Terms &amp; Conditions</a>
                            {' '}and confirm that the information provided is accurate.
                            I understand that participation in outdoor fitness events carries inherent risks.
                          </span>
                        </label>
                        {errors.agreed && <p className="text-red-500 text-xs mt-1.5 ml-8">{errors.agreed}</p>}
                      </div>
                    </div>

                    {/* Right — summary + submit */}
                    <div className="flex flex-col gap-4 lg:sticky lg:top-28">

                      {/* Event summary card */}
                      <div className="bg-[#007AE5] rounded-3xl p-6 text-white">
                        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                          Selected Event
                        </p>
                        <p className="font-extrabold text-lg leading-snug">
                          {form.event || 'No event selected yet'}
                        </p>
                        {form.event && (
                          <div className="mt-4 pt-4 border-t border-white/15 text-xs text-white/70 leading-relaxed space-y-1">
                            <p>📍 Charleston, SC</p>
                            <p>🎽 Fitness Level: {form.fitnessLevel || '—'}</p>
                            <p>✉️ {form.email || '—'}</p>
                          </div>
                        )}
                      </div>

                      {/* What to bring card */}
                      <div className="bg-[#f5f0e1] rounded-3xl p-6">
                        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">
                          What to Bring
                        </p>
                        <ul className="text-sm text-zinc-700 space-y-2">
                          {['Water bottle', 'Athletic shoes', 'Comfortable workout gear', 'Sunscreen & hat', 'Positive energy!'].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#007AE5] shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="relative overflow-hidden rounded-2xl bg-zinc-950 px-8 py-4 text-sm font-bold text-white uppercase tracking-widest w-full cursor-pointer disabled:opacity-60"
                        initial="rest"
                        whileHover={submitting ? 'rest' : 'hover'}
                        animate="rest"
                      >
                        <motion.span
                          className="absolute inset-0 bg-[#007AE5]"
                          variants={{ rest: { x: '-101%' }, hover: { x: 0 } }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {submitting ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Submitting…
                            </>
                          ) : (
                            <>Register Now &#8599;</>
                          )}
                        </span>
                      </motion.button>

                      <p className="text-center text-zinc-400 text-xs">
                        Free to attend &mdash; no payment required at this stage.
                      </p>
                    </div>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </section>

          <Footer />
        </div>
      </ReactLenis>
    </LanguageProvider>
  );
}
