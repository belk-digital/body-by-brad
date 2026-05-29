'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function FeaturedSection() {
  const { t } = useLanguage();
  return (
    <section
      id="featured"
      className="font-satoshi w-full bg-[#f5f0e1] py-20 md:py-28 px-4 sm:px-7 md:px-12"
    >
      <div>

        {/* Header */}
        <div className="mb-8 md:mb-12 max-w-lg">
          <div className="overflow-hidden mb-3">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold uppercase tracking-tight text-zinc-950 leading-tight"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              {t.featuredHeadingL1}
              <br />
              {t.featuredHeadingL2}
            </motion.h2>
          </div>
          <motion.p
            className="text-zinc-500 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          >
            {t.featuredDesc}
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="flex flex-col gap-4">

          {/* Row 1: wide image left | narrow dark card right */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
            <motion.div
              className="rounded-xl overflow-hidden h-64 sm:h-80 md:h-96"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
              <img
                src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779049650/SaveClip.App_681681765_18028795517771345_8290600577097476417_n_xgbtih.jpg"
                alt="BBB Event"
                className="h-full w-full object-cover object-bottom hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              className="rounded-xl bg-zinc-950 text-white p-7 sm:p-8 flex flex-col justify-end h-64 sm:h-80 md:h-96"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold uppercase leading-tight mb-3">
                {t.eventsCardTitleL1}
                <br />
                {t.eventsCardTitleL2}
                <br />
                {t.eventsCardTitleL3}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {t.eventsCardDesc}
              </p>
              <motion.a
                href="/events"
                className="relative rounded-full border-2 border-white px-6 py-2.5 text-xs font-bold uppercase tracking-wide w-fit inline-flex items-center"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {/* Slide-fill clipped to button interior, border stays outside */}
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.span
                    className="absolute inset-0 bg-white"
                    variants={{ rest: { y: '101%' }, hover: { y: 0 } }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                </span>
                <motion.span
                  className="relative z-10"
                  variants={{ rest: { color: '#ffffff' }, hover: { color: '#09090b' } }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {t.eventsCardBtn}
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Row 2: narrow light card left | wide image right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4">
            <motion.div
              className="rounded-xl p-7 sm:p-8 flex flex-col justify-end h-64 sm:h-80 md:h-96"
              style={{
                backgroundColor: '#101585',
                boxShadow:
                  'inset 0 0 0 1.5px rgba(223,249,148,0.15), inset 0 0 40px rgba(0,0,30,0.35)',
              }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold uppercase leading-tight mb-3 text-white">
                {t.merchCardTitleL1}
                <br />
                {t.merchCardTitleL2}
              </h3>
              <p className="text-sm leading-relaxed mb-6 text-white/60">
                {t.merchCardDesc}
              </p>
              <motion.a
                href="#"
                className="relative overflow-hidden rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wide w-fit border-2"
                style={{ borderColor: '#DFF994' }}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ backgroundColor: '#DFF994' }}
                  variants={{ rest: { y: '101%' }, hover: { y: 0 } }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span
                  className="relative z-10"
                  variants={{ rest: { color: '#DFF994' }, hover: { color: '#101585' } }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {t.merchCardBtn}
                </motion.span>
              </motion.a>
            </motion.div>

            <motion.div
              className="rounded-xl overflow-hidden h-64 sm:h-80 md:h-96"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
              <img
                src="https://res.cloudinary.com/dgrrovta3/image/upload/v1779379374/IMG_3076_llkeme.webp"
                alt="Body By Brad Merchandise"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
