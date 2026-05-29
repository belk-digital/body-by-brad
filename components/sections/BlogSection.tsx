'use client';

import { motion, type Variants } from 'framer-motion';
import { IoChevronForward } from 'react-icons/io5';
import { useLanguage } from '@/lib/LanguageContext';

const BLOG_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    category: 'FITNESS',
    date: 'APR 8, 2025',
    title: 'WE ARE DEDICATED TO HELPING EVERY MEMBER..',
    authorName: 'Rita M.',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&q=80',
    category: 'WORKOUT',
    date: 'APR 21, 2025',
    title: '5 BEST HOME WORKOUTS FOR BEGINNERS...',
    authorName: 'Gladys A.',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80',
    category: 'ROUTINE',
    date: 'FEB 18, 2025',
    title: 'WE PROVIDE THE TOOLS, MOTIVATION, SUPPORT..',
    authorName: 'Amanda B.',
    authorAvatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=80&q=80',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: (i: any) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function BlogSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white font-satoshi px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <rect x="1" y="9.5" width="4.5" height="5" rx="1.2" />
              <rect x="18.5" y="9.5" width="4.5" height="5" rx="1.2" />
              <rect x="3" y="7.5" width="2.5" height="9" rx="1" />
              <rect x="18.5" y="7.5" width="2.5" height="9" rx="1" />
              <rect x="5.5" y="11" width="13" height="2" rx="1" />
            </svg>
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: '#1A1A1A' }}
          >
            {t.blogLabel}
          </span>
        </div>

        <motion.a
          href="/blog"
          className="relative flex items-center gap-0 overflow-hidden rounded-full border-2
                     border-[#1A1A1A] py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.span
            className="absolute inset-0 bg-[#1A1A1A]"
            style={{ transformOrigin: 'left' }}
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="relative z-10 mr-3"
            variants={{ rest: { color: '#1A1A1A' }, hover: { color: '#ffffff' } }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            More Blogs
          </motion.span>
          <motion.span
            className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
            variants={{
              rest:  { backgroundColor: '#1A1A1A', color: '#ffffff' },
              hover: { backgroundColor: '#ffffff', color: '#1A1A1A' },
            }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <IoChevronForward size={11} />
            <IoChevronForward size={11} className="-ml-1.5" />
          </motion.span>
        </motion.a>
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-extrabold uppercase leading-[0.92] mb-12 md:mb-16"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', color: '#1A1A1A', letterSpacing: '-0.02em' }}
      >
        {t.blogHeadingL1}
        <br />
        {t.blogHeadingL2}
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="cursor-pointer group"
          >
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Category / date bar */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3"
                style={{ background: 'rgba(0,0,0,0.65)' }}
              >
                <span
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: '#E6FF2B' }}
                >
                  {post.category}
                </span>
                <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  / {post.date}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="mt-4 font-extrabold uppercase leading-tight"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: '#1A1A1A', letterSpacing: '0.01em' }}
            >
              {post.title}
            </h3>

            {/* Author */}
            <div className="mt-3 flex items-center gap-2.5">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: '#1A1A1A' }}
              >
                {post.authorName}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
