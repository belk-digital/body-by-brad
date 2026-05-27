'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const SC_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d432918.2!2d-80.1!3d32.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7a42d49b3b87%3A0x91c8b8c8b8b8b8b8!2sCharleston%2C%20SC!5e0!3m2!1sen!2sus!4v1716000000000';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  coachingType: string;
  experience: string;
  message: string;
};

const initialForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  ageGroup: '',
  coachingType: '',
  experience: '',
  message: '',
};

export default function ContactFormSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(initialForm);

  const introRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: '-15% 0px' });
  const formInView = useInView(formRef, { once: true, margin: '-10% 0px' });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hook up to your messaging backend here.
    console.log('contact form submit', form);
  };

  const inputCls =
    'w-full bg-white rounded-md px-4 py-3 text-sm text-[#684556] placeholder:text-[#898A8D] outline-none border border-[#898A8D]/25 focus:border-[#007AE5] focus:ring-2 focus:ring-[#007AE5]/30 transition-all';

  return (
    <>
      {/* Blue intro band */}
      <section className="relative w-full bg-[#007AE5]">
        <motion.div
          ref={introRef}
          variants={stagger}
          initial="hidden"
          animate={introInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-7xl px-4 py-14 sm:px-7 sm:py-20 md:px-12 md:py-24"
        >
          <motion.h2
            variants={fadeUp}
            className="font-bold uppercase leading-[0.95] tracking-tight text-white text-[10vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.6rem]"
          >
            {t.contactFormHeadingL1}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xs text-sm leading-relaxed text-white/85 md:text-base"
          >
            {t.contactFormSubtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* Form */}
      <section className="relative w-full bg-[#F9F7F2]">
        <motion.div
          ref={formRef}
          variants={stagger}
          initial="hidden"
          animate={formInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-7xl px-4 py-16 sm:px-7 sm:py-20 md:px-12 md:py-24"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {/* Personal Info */}
            <motion.div variants={fadeUp}>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#684556]">
                {t.contactFormPersonalLabel}
              </p>

              <div className="mb-5">
                <label htmlFor="fullName" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormFullName}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder={t.contactFormFullNamePh}
                  className={inputCls}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormEmail}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contactFormEmailPh}
                  className={inputCls}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormPhone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.contactFormPhonePh}
                  className={inputCls}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="ageGroup" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormAgeGroup}
                </label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={form.ageGroup}
                  onChange={handleChange}
                  className={inputCls}
                >
                  {t.contactFormAgeGroupOptions.map((opt, i) => (
                    <option key={opt} value={i === 0 ? '' : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Coaching */}
            <motion.div variants={fadeUp}>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#684556]">
                {t.contactFormCoachingLabel}
              </p>

              <div className="mb-5">
                <label htmlFor="coachingType" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormCoachingType}
                </label>
                <select
                  id="coachingType"
                  name="coachingType"
                  value={form.coachingType}
                  onChange={handleChange}
                  className={inputCls}
                >
                  {t.contactFormCoachingTypeOptions.map((opt, i) => (
                    <option key={opt} value={i === 0 ? '' : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="experience" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormExperience}
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className={inputCls}
                >
                  {t.contactFormExperienceOptions.map((opt, i) => (
                    <option key={opt} value={i === 0 ? '' : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="mb-2 block text-sm text-[#898A8D]">
                  {t.contactFormMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contactFormMessagePh}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <motion.button
                type="submit"
                className="relative overflow-hidden rounded-full border-2 border-[#007AE5] px-10 py-4 text-sm font-bold uppercase tracking-wide cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span
                  className="absolute inset-0 bg-[#007AE5]"
                  variants={{ rest: { y: 0 }, hover: { y: '101%' } }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span
                  className="relative z-10"
                  variants={{ rest: { color: '#ffffff' }, hover: { color: '#007AE5' } }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {t.contactFormSubmit}
                </motion.span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Map */}
        <div className="w-full px-0">
          <div className="relative h-[55vh] min-h-105 w-full overflow-hidden border-t border-[#898A8D]/30">
            <iframe
              title="Body By Brad — Charleston, South Carolina"
              src={SC_MAP_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
