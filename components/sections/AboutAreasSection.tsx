'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AREAS = [
  'Charleston, SC',
  'Mount Pleasant, SC',
  'North Charleston, SC',
  'Summerville, SC',
  'Goose Creek, SC',
  'Hanahan, SC',
  'Daniel Island, SC',
  'Johns Island, SC',
  'James Island, SC',
  'West Ashley, SC',
];

export default function AboutAreasSection() {
  return (
    <section className="font-satoshi bg-zinc-50 px-4 sm:px-7 md:px-12 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400 block mb-4"
            >
              Service Areas
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.07 }}
              className="font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950 mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              Helping Charleston<br />Transform
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.12 }}
              className="text-zinc-500 text-base leading-relaxed mb-8"
            >
              We proudly serve clients throughout the Charleston Lowcountry area. We also offer online fitness coaching programs for clients nationwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
            >
              <a
                href="/areas-we-serve-charleston-sc"
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#CCFF00] hover:text-zinc-950 transition-colors duration-300"
              >
                View all areas
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {AREAS.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.45, ease, delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-xl bg-white p-4 border border-zinc-100"
              >
                <MapPin size={16} className="text-[#CCFF00] shrink-0" />
                <span className="text-sm font-semibold text-zinc-800">{area}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
