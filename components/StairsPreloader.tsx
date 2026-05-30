'use client';

import { motion } from 'framer-motion';
import { stairSteps, logoUrl } from '@/lib/constants';

export default function StairsPreloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
      exit={{
        opacity: 0,
        transition: { delay: 0.2, duration: 0.25 },
      }}
    >
      {/* Stair panels — lime, staggered rise from bottom */}
      <div className="absolute inset-0 flex">
        {stairSteps.map((_, index) => (
          <motion.div
            key={index}
            className="relative h-full flex-1"
            style={{ backgroundColor: '#E6FF2B' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-105%' }}
            transition={{
              duration: 0.72,
              delay: index * 0.07,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }}
          />
        ))}
      </div>

      {/* Logo + progress bar — centered over lime panels */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
        transition={{ delay: 0.52, duration: 0.55, ease: 'easeOut' }}
      >
        <div className="text-center">
          <motion.img
            src={logoUrl}
            alt="Body By Brad"
            className="mx-auto mb-6 w-24 md:w-28 brightness-0"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="mx-auto h-px w-40 overflow-hidden bg-black/20">
            <motion.div
              className="h-full bg-black"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
