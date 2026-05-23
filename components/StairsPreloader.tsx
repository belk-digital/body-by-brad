'use client';

import { motion } from 'framer-motion';
import { stairSteps, logoUrl } from '@/lib/constants';

export default function StairsPreloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#007AE5] text-white"
      initial={{ backgroundColor: 'rgba(55, 123, 221, 1)' }}
      exit={{
        backgroundColor: 'rgba(55, 123, 221, 0)',
        transition: { delay: 0.15, duration: 0.2 },
      }}
    >
      <div className="absolute inset-0 flex">
        {stairSteps.map((_, index) => (
          <motion.div
            key={index}
            className="stair-step relative h-full flex-1 overflow-hidden border-l border-white/10 bg-[#007AE5]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-105%' }}
            transition={{
              duration: 0.75,
              delay: index * 0.075,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18, transition: { duration: 0.25 } }}
        transition={{ delay: 0.55, duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-center">
          <motion.img
            src={logoUrl}
            alt="Body By Brad"
            className="mx-auto mb-6 w-24 md:w-28 brightness-0 invert"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="mx-auto mt-6 h-px w-48 overflow-hidden bg-white/20">
            <motion.div
              className="h-full bg-white"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
