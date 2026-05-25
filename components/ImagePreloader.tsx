'use client';

import { motion } from 'framer-motion';
import { heroBackgroundUrl } from '@/lib/constants';

type Size = 'sm' | 'md' | 'lg';

type ImagePreloaderProps = {
  size?: Size;
  images?: string[];
};

const PANEL_COUNT: Record<Size, number> = { sm: 3, md: 4, lg: 5 };

const introPool = [
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779689530/brad_logo_eakubf.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/v1779678046/bodybybrad_hero_banner_vqepcn.png',
];

function buildPanels(count: number, custom?: string[]) {
  if (custom && custom.length > 0) {
    return Array.from({ length: count }, (_, i) => custom[i % custom.length]);
  }
  const intro = Array.from(
    { length: Math.max(count - 1, 0) },
    (_, i) => introPool[i % introPool.length],
  );
  return [...intro, heroBackgroundUrl];
}

export default function ImagePreloader({
  size = 'md',
  images,
}: ImagePreloaderProps) {
  const count = PANEL_COUNT[size];
  const panels = buildPanels(count, images);

  const stagger = 1.2;
  const cycleDuration = 1.5;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {panels.map((src, index) => {
        const isLast = index === count - 1;
        return (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              initial={{
                y: '60vh',
                opacity: 0,
                width: '70vmin',
                height: '40vmin',
                borderRadius: 0,
              }}
              animate={
                isLast
                  ? {
                      y: ['60vh', '0vh', '0vh'],
                      opacity: [0, 1, 1],
                      width: ['70vmin', '70vmin', '100vw'],
                      height: ['40vmin', '40vmin', '100vh'],
                    }
                  : {
                      y: ['60vh', '0vh', '0vh', '-80vh'],
                      opacity: [0, 1, 1, 0],
                    }
              }
              transition={{
                duration: cycleDuration,
                delay: index * stagger,
                times: isLast ? [0, 0.4, 1] : [0, 0.28, 0.52, 1],
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <motion.img
                src={src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
                initial={{ scale: 1 }}
                animate={isLast ? { scale: [1, 1, 1.1] } : { scale: 1 }}
                transition={{
                  duration: cycleDuration,
                  delay: index * stagger,
                  times: isLast ? [0, 0.4, 1] : undefined,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
