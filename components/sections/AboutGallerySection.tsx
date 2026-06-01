'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type GalleryItem = { type: 'image' | 'video'; src: string; aspect: string };

const ITEMS: GalleryItem[] = [
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780296636/New_content._No_cover._Catch_the_rest_of_the_SouthernHospitality_Reunion_looks_at_our_link_in_b_p1bxsz.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780296634/Are_you_working_out_or_working_on_your_excusesGet_your_tickets_to_the_Keep_It_Moving_Tour_ASAP_xepq3r.jpg',
    aspect: 'aspect-square',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dgrrovta3/video/upload/v1780296576/If_you_want_to_reclaim_your_health_this_time_next_Christmas_let_me_help_you_No_matter_where_yo_j9ezyv.mp4',
    aspect: 'aspect-[3/4]',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780296632/Congratulations_to_shopmaggiejewelry_for_another_month_in_britishvogue_you_have_a_gift_and_I_m_mr0sij.jpg',
    aspect: 'aspect-square',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780296631/Is_it_clocking_to_you_uquftm.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dgrrovta3/video/upload/v1780296629/Welcome_to_Chapter_29_Just_me_trying_to_cram_10_years_of_growth_into_12_months_First_video_jtvssh.mp4',
    aspect: 'aspect-square',
  },
];

export default function AboutGallerySection() {
  return (
    <section className="font-satoshi bg-white px-4 sm:px-7 md:px-12 py-20 md:py-28 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950">
                <FaInstagram size={14} className="text-white" />
              </div>
              <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-zinc-950">
                @bradnboujee_
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.07 }}
              className="font-extrabold uppercase leading-[1.02] tracking-tight text-zinc-950"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            >
              Strength in<br />every moment
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
          >
            <a
              href="https://instagram.com/bradnboujee_"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-zinc-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all duration-300"
            >
              Follow on Instagram
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* 3-col masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {ITEMS.map((item, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/bradnboujee_"
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.07 }}
              className={`group relative rounded-xl overflow-hidden block ${item.aspect}`}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={`Brad Carter Instagram post ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/30 transition-all duration-300 flex items-center justify-center">
                <FaInstagram
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="text-zinc-400 text-sm text-center mt-8"
        >
          Workouts, events, client wins, and daily motivation — all on Instagram.
        </motion.p>

      </div>
    </section>
  );
}
