"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

// Add your before image URLs here — after images can be added later
const BEFORE_IMAGES = [
  "https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233545/IMG_0593_nbc9pi.jpg",
  "https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233550/Untitled_design_5_rbsa0t.png",
  "https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233552/IMG_0591_cyzuem.jpg",
];

export default function TransformationSection() {
  const { t } = useLanguage();

  return (
    <section className="font-satoshi bg-[#f5f0e1] py-20 md:py-28 px-4 sm:px-7 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            className="text-zinc-500 text-xs uppercase tracking-[0.25em] font-semibold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {t.transformLabel}
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold uppercase tracking-tight text-zinc-950 leading-tight"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              {t.transformL1} {t.transformL2}
            </motion.h2>
          </div>

          <motion.p
            className="text-zinc-500 text-sm leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            {t.transformDesc}
          </motion.p>
        </div>

        {/* 3-card grid with before/after sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {BEFORE_IMAGES.map((src, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-3/4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.65,
                ease: [0.4, 0, 0.2, 1],
                delay: i * 0.1,
              }}
            >
              <BeforeAfterSlider
                before={src}
                beforeAlt={`Transformation ${i + 1} — Before`}
                afterContent={
                  <div className="h-full w-full bg-white flex items-center justify-end pr-8">
                    <p className="text-zinc-400 text-xs font-semibold leading-relaxed text-right uppercase tracking-widest">
                      Slide right<br />to see<br />the results
                    </p>
                  </div>
                }
                initialPos={45}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
