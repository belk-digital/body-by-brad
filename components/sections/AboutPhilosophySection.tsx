'use client';

import { motion } from 'framer-motion';
import { Target, Users, TrendingUp } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PILLARS = [
  {
    icon: Target,
    number: '01',
    title: 'Accountability',
    body: 'Every client gets direct check-ins from Brad — not an app, not a chatbot. Real accountability from a coach who knows your name, your goals, and your story.',
  },
  {
    icon: Users,
    number: '02',
    title: 'Community',
    body: 'Fitness is better together. From group bootcamps to Cooldown run club events, Brad builds spaces where people push each other, celebrate together, and keep showing up.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Results',
    body: 'Everything is built around measurable progress. Personalized programming means your plan adapts as you grow — no generic templates, no guesswork, just results.',
  },
];

export default function AboutPhilosophySection() {
  return (
    <section className="font-satoshi bg-white px-4 sm:px-7 md:px-12 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400 block mb-4"
          >
            Coaching Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
            className="font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Three pillars.<br />One system.
          </motion.h2>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-150">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease, delay: i * 0.12 }}
                className={`p-8 md:p-10 flex flex-col gap-6 ${
                  i < PILLARS.length - 1 ? 'border-b md:border-b-0 md:border-r border-zinc-150' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950">
                    <Icon size={20} className="text-[#CCFF00]" />
                  </div>
                  <span
                    className="font-extrabold text-zinc-100 leading-none"
                    style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontFamily: 'Unbounded, sans-serif' }}
                  >
                    {pillar.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-zinc-950 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
