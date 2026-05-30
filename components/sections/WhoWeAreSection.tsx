'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { IoChevronForward } from 'react-icons/io5';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const LEFT_IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779378587/New_Project_2_zimcoc.webp';
const RIGHT_IMAGE =
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779735223/DSC00643_onxic2.webp';

const AVATARS = [
  'https://i.pravatar.cc/40?img=47',
  'https://i.pravatar.cc/40?img=32',
  'https://i.pravatar.cc/40?img=15',
];

export default function WhoWeAreSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.06 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={ref}
      id="who-we-are"
      className="font-satoshi relative w-full bg-white overflow-hidden px-4 pt-20 pb-24 sm:px-7 md:px-12 md:pt-28 md:pb-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full"
      >
        {/* ── Label ─────────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="mb-8 flex items-center justify-start gap-2.5 md:mb-10">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950">
            <Dumbbell size={14} className="text-white" />
          </span>
          <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-zinc-950">
            About Us
          </span>
        </motion.div>

        {/* ── Headline ──────────────────────────────────────────────────── */}
        <motion.h2
          variants={fadeUp}
          className="
            mb-16 text-left font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950
            text-[clamp(2rem,4.5vw,4.5rem)]
            md:mb-20
          "
        >
          WE BELIEVE FITNESS ISN&apos;T
          <br />
          JUST ABOUT LIFTING WEIGHTS
          <br />
          IT&apos;S ABOUT BUILDING
        </motion.h2>

        {/* ── Three-column layout ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.5fr_1fr] md:gap-8 lg:gap-12">

          {/* Left image */}
          <motion.div
            variants={imageReveal}
            className="hidden overflow-hidden rounded-2xl md:block"
            style={{ aspectRatio: '4/5' }}
          >
            <img
              src={LEFT_IMAGE}
              alt="Body By Brad training"
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </motion.div>

          {/* Center content */}
          <motion.div variants={fadeUp} className="flex flex-col">

            {/* Stat */}
            <div className="mb-5 flex items-end gap-4">
              <span className="font-extrabold leading-none tracking-tight text-zinc-950 text-[clamp(4rem,8vw,7rem)]">
                <AnimatedCounter
                  endValue={8}
                  suffix="+"
                  duration={1.8}
                  start={inView}
                />
              </span>
              <div className="mb-2 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-950 leading-tight">
                  YEARS OF
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-950 leading-tight">
                  EXPERIENCE
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-6 h-px w-full bg-zinc-200" />

            {/* Body */}
            <p className="mb-4 text-sm leading-relaxed text-zinc-500 md:text-base">
              We combine focused personal coaching, high-energy group classes, and
              accountability-driven programming to deliver a premium fitness experience.
              Whether your goal is strength, fat loss, or community.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-zinc-500 md:text-base">
              We don&apos;t just train bodies — we train mindsets. Step inside and experience a
              fitness journey built around consistency, confidence, and showing up for yourself.
            </p>

            {/* Button + reviews row */}
            <div className="flex flex-wrap items-center gap-5">
              {/* About Us button */}
              <motion.a
                href="/about"
                className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-zinc-950 py-2 pl-5 pr-2 text-[11px] font-extrabold uppercase tracking-widest"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {/* Left-to-right fill */}
                <motion.span
                  className="absolute inset-0 bg-zinc-950"
                  style={{ transformOrigin: 'left' }}
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                />
                {/* Label */}
                <motion.span
                  className="relative z-10 mr-2"
                  variants={{ rest: { color: '#09090b' }, hover: { color: '#ffffff' } }}
                  transition={{ duration: 0.32, ease: 'easeInOut' }}
                >
                  About Us
                </motion.span>
                {/* Chevron circle */}
                <motion.span
                  className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
                  variants={{
                    rest:  { backgroundColor: '#09090b', color: '#ffffff' },
                    hover: { backgroundColor: '#ffffff', color: '#09090b' },
                  }}
                  transition={{ duration: 0.32, ease: 'easeInOut' }}
                >
                  <IoChevronForward size={12} />
                  <IoChevronForward size={12} className="-ml-1.5" />
                </motion.span>
              </motion.a>

              {/* Avatars + stars */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {AVATARS.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Client"
                      className="h-9 w-9 rounded-full border-2 border-white object-cover"
                      style={{ marginLeft: i === 0 ? 0 : '-10px' }}
                      loading="lazy"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 text-[#F5A623] text-sm leading-none">
                    {'★★★★★'}
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-zinc-500">
                    (500+ Clients)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            variants={imageReveal}
            className="overflow-hidden rounded-2xl"
            style={{ aspectRatio: '3/4' }}
          >
            <img
              src={RIGHT_IMAGE}
              alt="Body By Brad coaching"
              className="h-full w-full object-cover object-top"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
