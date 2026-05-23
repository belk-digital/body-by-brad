'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollBar() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-0 top-0 h-full w-[6px] bg-[#111] z-[9999] pointer-events-none">
      <motion.div
        className="w-full bg-[#007AE5] origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
}
