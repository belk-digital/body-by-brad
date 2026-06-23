'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ACHIEVEMENTS = [
  {
    title: 'Personal Training & Fitness Coaching',
    sub: 'Personalized programming for sustainable weight loss, strength development, and body transformation.',
    year: 'Core',
  },
  {
    title: 'Nutrition Guidance & Accountability',
    sub: 'Practical nutrition coaching and regular check-ins that support real-world lifestyles and lasting results.',
    year: 'Core',
  },
  {
    title: 'Evidence-Based Training Principles',
    sub: 'Coaching philosophy informed by ACSM, NSCA, and WHO Physical Activity Guidelines.',
    year: 'Method',
  },
  {
    title: 'Body Transformation & Muscle Building',
    sub: 'Proven systems for improving body composition, strength, confidence, and overall health.',
    year: 'Results',
  },
  {
    title: 'Fitness Challenges & Lifestyle Coaching',
    sub: 'Community-driven fitness challenges and holistic coaching for long-term habit formation.',
    year: 'Community',
  },
];

export default function AboutRecognitionSection() {
  return (
    <section className="font-satoshi bg-white px-4 sm:px-7 md:px-12 py-20 md:py-28 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400 block mb-4"
          >
            Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
            className="font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Certifications &amp;<br />expertise.
          </motion.h2>
        </div>

        {/* Achievement list */}
        <div className="divide-y divide-zinc-100">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.55, ease, delay: i * 0.08 }}
              className="group flex items-start justify-between gap-6 py-6 md:py-8"
            >
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-extrabold uppercase tracking-tight text-zinc-950 mb-1.5 group-hover:text-[#CCFF00] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-snug">{item.sub}</p>
              </div>
              <span
                className="text-sm font-bold text-zinc-300 shrink-0 pt-0.5"
                style={{ fontFamily: 'Unbounded, sans-serif' }}
              >
                {item.year}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
