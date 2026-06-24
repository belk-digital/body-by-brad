'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Turnstile } from 'react-turnstile';
import { useLanguage } from '@/lib/LanguageContext';

const FORM_IMAGE =
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;

  plan: string;
  location: string;
  date: string;
};

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',

  plan: '',
  location: '',
  date: '',
};

export default function ContactFormSection() {
  const { t } = useLanguage();
  const [form, setForm]           = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]         = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-10% 0px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-10% 0px' });

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          plan: form.plan,
          location: form.location,
          date: form.date,
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full bg-white rounded-md px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all';

  const labelCls = 'block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1.5';

  return (
    <section className="relative w-full bg-[#f4f4f4]">
      <div className="flex flex-col lg:flex-row min-h-[680px]">

        {/* ── Left: image + contact bars ─────────────────────────── */}
        <div ref={leftRef} className="relative w-full lg:w-[44%] min-h-[420px] lg:min-h-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={leftInView ? { scale: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="absolute inset-0"
          >
            <img
              src={FORM_IMAGE}
              alt="Body By Brad training"
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/10" />

          {/* Contact bar */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={leftInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="absolute bottom-0 left-0 right-0"
          >
            {/* Support mail */}
            <div className="bg-[#CBFF00] px-5 py-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-black/55 text-[9px] uppercase tracking-widest mb-0.5">Support Mail</p>
                <p className="text-black font-bold text-xs sm:text-sm truncate">{t.contactEmailValue}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Right: form ────────────────────────────────────────── */}
        <motion.div
          ref={rightRef}
          variants={stagger}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
          className="w-full lg:w-[56%] px-6 py-12 sm:px-10 md:px-14 lg:px-16 lg:py-14 flex flex-col justify-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CBFF00] flex-shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
              GET IN TOUCH
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-bold uppercase leading-[1.0] tracking-tight text-gray-900 mb-8 md:mb-10
              text-[8vw] sm:text-[5.5vw] md:text-[4.5vw] lg:text-[2.65rem]"
          >
            HAVE QUESTIONS<br />OR WANT TO JOIN?
          </motion.h2>

          <form onSubmit={handleSubmit} className="w-full max-w-lg">

            {/* First Name + Last Name */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className={labelCls}>
                  FIRST NAME <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Your First Name"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  LAST NAME <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Your Last Name"
                  className={inputCls}
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="mb-3">
              <label className={labelCls}>
                EMAIL <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={inputCls}
              />
            </motion.div>

            {/* Select Plan */}
            <motion.div variants={fadeUp} className="mb-3">
              <label className={labelCls}>
                SELECT PLAN <span className="text-red-500">*</span>
              </label>
              <select
                name="plan"
                required
                value={form.plan}
                onChange={handleChange}
                className={inputCls}
              >
                {t.contactFormCoachingTypeOptions.map((opt, i) => (
                  <option key={opt} value={i === 0 ? '' : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Location + Date */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 mb-8">
              <div>
                <label className={labelCls}>LOCATION</label>
                <input
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>DATE</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </motion.div>

            {/* Status messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 mb-4"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <p className="text-sm text-green-700 font-medium">Message sent! Brad will get back to you within 24 hours.</p>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 mb-4"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again or email us directly.</p>
              </motion.div>
            )}

            {/* Turnstile CAPTCHA */}
            <motion.div variants={fadeUp} className="mb-4">
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onVerify={(token) => setTurnstileToken(token)}
                theme="light"
              />
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                disabled={submitting || !turnstileToken}
                whileHover={submitting ? {} : { scale: 1.02 }}
                whileTap={submitting ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gray-900 text-white
                  pl-7 pr-2 py-2 rounded-full font-bold uppercase text-sm tracking-wider
                  hover:bg-black transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'SENDING…' : 'BOOK YOUR SPOT'}
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                  {submitting ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  ) : (
                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                  )}
                </span>
              </motion.button>
            </motion.div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
