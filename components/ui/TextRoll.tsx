'use client';

import { motion } from 'framer-motion';
import { STAGGER } from '@/lib/constants';
import type { TextRollProps } from '@/lib/types';

export default function TextRoll({ children, className, center = false }: TextRollProps) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={['relative block overflow-hidden', className].filter(Boolean).join(' ')}
    >
      <div>
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: '-100%' },
              }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? ' ' : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: '100%' },
                hovered: { y: 0 },
              }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? ' ' : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
}
