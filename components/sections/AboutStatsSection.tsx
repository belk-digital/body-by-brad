'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const STATS = [
  { value: 8,    suffix: '+', label: 'Years\nCoaching' },
  { value: 200,  suffix: '+', label: 'Clients\nTransformed' },
  { value: 50,   suffix: '+', label: 'Events\nHosted' },
  { value: 10,   suffix: 'K+', label: 'Instagram\nFollowers' },
];

export default function AboutStatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section ref={ref} className="font-satoshi bg-[#CCFF00] px-4 sm:px-7 md:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            className={`flex flex-col items-center text-center py-8 px-4 ${
              i < STATS.length - 1 ? 'border-r border-zinc-950/15' : ''
            } ${i >= 2 ? 'border-t border-zinc-950/15 md:border-t-0' : ''}`}
          >
            <span
              className="font-extrabold leading-none tracking-tight text-zinc-950"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontFamily: 'Unbounded, sans-serif' }}
            >
              <AnimatedCounter
                endValue={stat.value}
                suffix={stat.suffix}
                duration={1.8}
                delay={i * 0.1}
                start={inView}
              />
            </span>
            <span className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-700 whitespace-pre-line leading-snug">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
