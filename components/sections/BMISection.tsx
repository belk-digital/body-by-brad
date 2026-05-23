'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function BMISection() {
  const { t } = useLanguage();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    let val: number;
    if (unit === 'metric') {
      const h = parseFloat(heightCm) / 100;
      const w = parseFloat(weight);
      val = w / (h * h);
    } else {
      const inches = parseFloat(heightFt) * 12 + parseFloat(heightIn || '0');
      const w = parseFloat(weight);
      val = (703 * w) / (inches * inches);
    }
    if (!isNaN(val) && isFinite(val) && val > 0) {
      setBmi(Math.round(val * 10) / 10);
    }
  };

  const category = bmi
    ? bmi < 18.5
      ? { label: t.bmiUnderweightLabel, color: '#60a5fa', tip: t.bmiUnderweightTip }
      : bmi < 25
        ? { label: t.bmiNormalLabel, color: '#4ade80', tip: t.bmiNormalTip }
        : bmi < 30
          ? { label: t.bmiOverweightLabel, color: '#fb923c', tip: t.bmiOverweightTip }
          : { label: t.bmiObeseLabel, color: '#f87171', tip: t.bmiObeseTip }
    : null;

  const markerPos = bmi ? Math.min(Math.max(((bmi - 10) / 35) * 100, 2), 98) : 0;

  const inputClass =
    'w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#007AE5] transition-colors';

  return (
    <section
      id="bmi"
      className="font-satoshi w-full bg-zinc-950 py-20 md:py-28 px-4 sm:px-7 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Form */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#007AE5]" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
                {t.healthTools}
              </span>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-tight"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                {t.bmiHeadingL1}
                <br />
                {t.bmiHeadingL2}
              </motion.h2>
            </div>

            <motion.p
              className="text-white/50 text-sm leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {t.bmiDesc}
            </motion.p>

            {/* Unit toggle */}
            <motion.div
              className="flex gap-1 bg-white/10 rounded-full p-1 w-fit mb-8"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {(['metric', 'imperial'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => {
                    setUnit(u);
                    setBmi(null);
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize cursor-pointer ${
                    unit === u ? 'bg-white text-zinc-950' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {u}
                </button>
              ))}
            </motion.div>

            {/* Inputs */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {unit === 'metric' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-2 block">
                      {t.heightLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="175"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                        cm
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-2 block">
                      {t.weightLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                        kg
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-2 block">
                      {t.feetLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="5"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                        ft
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-2 block">
                      {t.inchesLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="9"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                        in
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-2 block">
                      {t.weightLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="160"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className={inputClass}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                        lbs
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Calculate button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={calculate}
                className="relative overflow-hidden rounded-full border-2 border-[#007AE5] px-10 py-4 text-sm font-bold uppercase tracking-wide cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span
                  className="absolute inset-0 bg-[#007AE5]"
                  variants={{ rest: { y: '101%' }, hover: { y: 0 } }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span
                  className="relative z-10"
                  variants={{ rest: { color: '#007AE5' }, hover: { color: '#ffffff' } }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {t.calculateBtn}
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right — Result card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {bmi && category ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-2">
                      {t.yourBMI}
                    </p>
                    <motion.p
                      className="text-[6rem] sm:text-[7rem] font-bold leading-none mb-1"
                      style={{ color: category.color }}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      {bmi}
                    </motion.p>
                    <p
                      className="text-2xl font-bold uppercase mb-8"
                      style={{ color: category.color }}
                    >
                      {category.label}
                    </p>

                    {/* Scale bar */}
                    <div className="mb-1">
                      <div className="relative h-3 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-blue-400"
                          style={{ width: `${(8.5 / 35) * 100}%` }}
                        />
                        <div
                          className="h-full bg-green-400"
                          style={{ width: `${(6.5 / 35) * 100}%` }}
                        />
                        <div
                          className="h-full bg-orange-400"
                          style={{ width: `${(5 / 35) * 100}%` }}
                        />
                        <div className="h-full bg-red-400 flex-1" />
                      </div>
                      <div className="relative" style={{ marginTop: '-8px', height: '16px' }}>
                        <motion.div
                          className="absolute w-4 h-4 rounded-full bg-white shadow-lg -translate-x-1/2"
                          style={{
                            left: `${markerPos}%`,
                            border: `2.5px solid ${category.color}`,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                            delay: 0.15,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] text-white/35 font-semibold uppercase tracking-widest mt-2 mb-8">
                      <span>{t.scaleUnder}</span>
                      <span>{t.scaleNormal}</span>
                      <span>{t.scaleOver}</span>
                      <span>{t.scaleObese}</span>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <p className="text-white/50 text-sm leading-relaxed mb-4">{category.tip}</p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#007AE5] hover:underline"
                      >
                        {t.bookSession}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-6">
                      <span className="text-4xl font-bold text-white/20">?</span>
                    </div>
                    <p className="text-white/40 text-sm mb-10" style={{ whiteSpace: 'pre-line' }}>
                      {t.bmiPlaceholder}
                    </p>
                    <div className="w-full">
                      <div className="h-3 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-blue-400/30"
                          style={{ width: `${(8.5 / 35) * 100}%` }}
                        />
                        <div
                          className="h-full bg-green-400/30"
                          style={{ width: `${(6.5 / 35) * 100}%` }}
                        />
                        <div
                          className="h-full bg-orange-400/30"
                          style={{ width: `${(5 / 35) * 100}%` }}
                        />
                        <div className="h-full bg-red-400/30 flex-1" />
                      </div>
                      <div className="flex justify-between text-[9px] text-white/25 font-semibold uppercase tracking-widest mt-2">
                        <span>{t.scaleUnder}</span>
                        <span>{t.scaleNormal}</span>
                        <span>{t.scaleOver}</span>
                        <span>{t.scaleObese}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
