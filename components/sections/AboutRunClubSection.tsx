'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Users } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const RUN_IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_900/v1779378588/New_Project_3_yd6ba6.webp';

const DETAILS = [
  { icon: Calendar, label: 'Every Week', sub: 'Weekly community runs' },
  { icon: MapPin,   label: 'Charleston, SC', sub: 'Lowcountry routes' },
  { icon: Users,    label: 'All Levels', sub: 'Walkers to runners' },
];

export default function AboutRunClubSection() {
  return (
    <section className="font-satoshi bg-zinc-950 px-4 sm:px-7 md:px-12 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Text side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
          className="flex flex-col gap-6 order-2 md:order-1"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#CCFF00]"
          >
            Founded by Brad
          </motion.span>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } }}
            className="font-extrabold uppercase leading-[1.02] tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
          >
            Let&apos;s Run Charleston
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-zinc-400 text-base leading-relaxed"
          >
            What started as a small group of friends hitting the pavement has grown into Charleston&apos;s most
            energetic community run club. Brad founded <span className="text-white font-semibold">Let&apos;s Run Charleston</span> — also known as the
            Cooldown Run Club — to bring people together through movement, sweat, and good vibes.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-zinc-400 text-base leading-relaxed"
          >
            No experience required. No pressure. Just show up, run your pace, and cool down with the community.
            Whether you&apos;re a first-time jogger or a seasoned runner, there&apos;s a place for you in this crew.
          </motion.p>

          {/* Detail chips */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="grid grid-cols-3 gap-3 pt-2"
          >
            {DETAILS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col gap-2 border border-white/10 rounded-xl p-4">
                <Icon size={18} className="text-[#CCFF00]" />
                <span className="text-white text-sm font-bold leading-tight">{label}</span>
                <span className="text-zinc-500 text-xs leading-tight">{sub}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
          >
            <a
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full bg-[#CCFF00] text-zinc-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
            >
              View upcoming runs
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.0, ease }}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full order-1 md:order-2"
        >
          <Image
            src={RUN_IMAGE}
            alt="Let's Run Charleston run club"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
          <div className="absolute top-5 left-5">
            <span className="bg-[#CCFF00] text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              Cooldown Run Club
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
