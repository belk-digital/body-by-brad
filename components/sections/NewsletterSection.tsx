'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { logoUrl } from '@/lib/constants';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="font-satoshi bg-[#CCFF00] px-4 sm:px-7 md:px-12 py-16 md:py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        <motion.img
          src={logoUrl}
          alt="Body By Brad"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-16 w-auto mb-8 object-contain"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.07 }}
          className="text-zinc-950 font-extrabold uppercase leading-[0.9] tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', fontFamily: 'Unbounded, sans-serif' }}
        >
          Stay in the loop
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-zinc-800 text-base sm:text-lg max-w-md mb-10"
        >
          Workouts, nutrition tips, event announcements, and exclusive deals — delivered straight to your inbox.
        </motion.p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-zinc-950 font-semibold text-lg"
          >
            You&apos;re in! Welcome to the BBB community.
          </motion.p>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-zinc-950 text-white placeholder:text-white/40 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-950/60"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-[#CCFF00] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors"
            >
              Subscribe
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.form>
        )}

      </div>
    </section>
  );
}
