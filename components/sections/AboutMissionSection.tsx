'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PHOTO =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_900/v1779378587/New_Project_5_v1vfcy.webp';

const TABS = {
  mission: {
    label: 'Mission',
    body: "To push every client beyond what they think is possible — through personalized programming, relentless accountability, and a community that refuses to let you quit. Fitness isn't just about looking good; it's about becoming the strongest version of yourself.",
  },
  vision: {
    label: 'Vision',
    body: "A Charleston where fitness is a lifestyle, not a chore — where every person, regardless of experience level, has access to a coach and a community that believes in them. BBB is building that world one session, one run, one transformation at a time.",
  },
} as const;

type Tab = keyof typeof TABS;

export default function AboutMissionSection() {
  const [active, setActive] = useState<Tab>('mission');

  return (
    <section className="font-satoshi bg-white px-4 sm:px-7 md:px-12 py-20 md:py-28 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left — text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400 block mb-4"
          >
            Mission Vision
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.07 }}
            className="font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950 mb-8"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            Our Mission<br />&amp; Vision
          </motion.h2>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="flex gap-0 mb-6 border-b border-zinc-150"
          >
            {(Object.keys(TABS) as Tab[]).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  active === key ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {TABS[key].label}
                {active === key && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Body */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="text-zinc-500 text-base leading-relaxed mb-8"
            >
              {TABS[active].body}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.22 }}
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#CCFF00] hover:text-zinc-950 transition-colors duration-300"
            >
              Get in touch
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.0, ease }}
          className="relative rounded-2xl overflow-hidden aspect-[3/4] w-full"
        >
          <img
            src={PHOTO}
            alt="Coach Brad Carter"
            className="h-full w-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
