'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { bradImagePool } from '@/lib/constants';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MILESTONES: { year: string; title: string; body: string }[] = [
  {
    year: "2016",
    title: "Building More Than Workouts",
    body: "Body By Brad was created with one goal: to help people discover what they are capable of when they have the right guidance, support, and accountability.",
  },
  {
    year: "2018",
    title: "Turning Experience Into Impact",
    body: "Brad turned years of competitive athletics and study into a commitment to helping others through evidence-based coaching principles and real-world accountability systems.",
  },
  {
    year: "2020",
    title: "Going Digital",
    body: "Online coaching launched, expanding BBB beyond Charleston. Clients nationwide joined the movement for sustainable weight loss, strength development, and body transformation.",
  },
  {
    year: "2025",
    title: "The Movement Grows",
    body: "200+ clients transformed, community fitness events, and a thriving run club. Helping Charleston and beyond build confidence, discipline, and lifelong habits.",
  },
];

type GridItem =
  | { kind: 'text'; milestone: (typeof MILESTONES)[number] }
  | { kind: 'image'; src: string; idx: number };

const GRID: GridItem[] = [
  { kind: 'text',  milestone: MILESTONES[0] },
  { kind: 'image', src: bradImagePool[0], idx: 0 },
  { kind: 'text',  milestone: MILESTONES[1] },
  { kind: 'image', src: bradImagePool[1], idx: 1 },
  { kind: 'image', src: bradImagePool[2], idx: 2 },
  { kind: 'text',  milestone: MILESTONES[2] },
  { kind: 'image', src: bradImagePool[4], idx: 3 },
  { kind: 'text',  milestone: MILESTONES[3] },
];

export default function AboutTimelineSection() {
  return (
    <section className="font-satoshi bg-white px-4 sm:px-7 md:px-12 py-20 md:py-28">
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
            Our Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.07 }}
            className="font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            The story behind<br />Body By Brad.
          </motion.h2>
        </div>

        {/* 4-col staggered grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GRID.map((item, i) =>
            item.kind === 'text' ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease, delay: (i % 4) * 0.08 }}
                className="flex flex-col justify-end p-5 md:p-7 bg-zinc-50 rounded-2xl min-h-[220px] md:min-h-[280px]"
              >
                <span
                  className="font-extrabold leading-none tracking-tight text-zinc-200 mb-3 block"
                  style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontFamily: 'Unbounded, sans-serif' }}
                >
                  {item.milestone.year}
                </span>
                <h3 className="text-sm font-extrabold uppercase tracking-tight text-zinc-950 mb-1.5">
                  {item.milestone.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {item.milestone.body}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease, delay: (i % 4) * 0.08 }}
                className="relative rounded-2xl overflow-hidden min-h-[220px] md:min-h-[280px]"
              >
                <Image
                  src={item.src}
                  alt={`Brad Carter training moment ${item.idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  loading="lazy"
                />
              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
}
