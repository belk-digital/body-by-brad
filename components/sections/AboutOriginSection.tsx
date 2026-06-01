'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BRAD_IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_900/v1779378587/New_Project_6_kckuio.webp';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
};

export default function AboutOriginSection() {
  return (
    <section className="font-satoshi bg-zinc-950 px-4 sm:px-7 md:px-12 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.0, ease }}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full"
        >
          <Image
            src={BRAD_IMAGE}
            alt="Bradley Carter"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Charleston, SC
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.13, delayChildren: 0.1 }}
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#CCFF00]"
          >
            His Story
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-extrabold uppercase leading-[1.02] tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
          >
            From the streets of Charleston to building a movement
          </motion.h2>

          <motion.p variants={fadeUp} className="text-zinc-400 text-base leading-relaxed">
            Bradley Carter didn&apos;t start in a gym — he started in the community. Growing up in Charleston,
            SC, Brad discovered early on that fitness was about more than physical results. It was about
            confidence, discipline, and showing up for yourself and the people around you.
          </motion.p>

          <motion.p variants={fadeUp} className="text-zinc-400 text-base leading-relaxed">
            After years of personal training and coaching hundreds of clients across the Lowcountry,
            Brad founded <span className="text-white font-semibold">Body By Brad</span> — a fitness brand
            rooted in accountability, real results, and genuine community. His philosophy is simple:
            train hard, stay consistent, and bring people with you.
          </motion.p>

          <motion.p variants={fadeUp} className="text-zinc-400 text-base leading-relaxed">
            Beyond the gym, Brad took his passion outside. He founded{' '}
            <span className="text-[#CCFF00] font-semibold">Let&apos;s Run Charleston</span> — a weekly
            community run club that has grown into one of the city&apos;s most vibrant outdoor fitness
            experiences. Every week, runners of all levels come together to move, connect, and cool down
            together.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-zinc-950 hover:border-white transition-all duration-300"
            >
              Train with Brad
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
