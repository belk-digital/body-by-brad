'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const Word = ({ children, index }: { children: string; index: number }) => {
  return (
    <span className="inline-block overflow-hidden pr-2 py-0.5">
      <motion.span
        variants={{
          hidden: { x: 40, opacity: 0, skewX: -15 },
          visible: {
            x: 0,
            opacity: 1,
            skewX: 0,
            transition: {
              type: 'spring',
              stiffness: 70,
              damping: 14,
              delay: index * 0.012,
            },
          },
        }}
        className="inline-block origin-left"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function ParagraphReveal({ text }: { text: string }) {
  const words = text.split(' ');
  // ref kept for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ref = useRef<HTMLParagraphElement>(null);

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      className="text-[17px] sm:text-xl md:text-[23px] text-zinc-900 leading-relaxed font-light font-satoshi flex flex-wrap tracking-wide"
    >
      {words.map((word, i) => (
        <Word key={i} index={i}>
          {word}
        </Word>
      ))}
    </motion.p>
  );
}
