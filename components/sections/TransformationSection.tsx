"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { IoChevronForward } from "react-icons/io5";
import { useLanguage } from "@/lib/LanguageContext";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const BEFORE_IMAGES = [
  "https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233545/IMG_0593_nbc9pi.jpg",
  "https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233550/Untitled_design_5_rbsa0t.png",
  "https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto/v1779233552/IMG_0591_cyzuem.jpg",
];

export default function TransformationSection() {
  const { t } = useLanguage();

  return (
    <section className="font-satoshi bg-white py-20 md:py-28 px-4 sm:px-7 md:px-12">

      {/* Header */}
      <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <motion.span
            className="inline-flex items-center gap-2 bg-zinc-900 rounded-full pl-1 pr-4 py-1 mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="w-6 h-6 rounded-full bg-[#E6FF2B] flex items-center justify-center flex-shrink-0">
              <Dumbbell size={12} className="text-zinc-900" />
            </span>
            <span className="text-[#E6FF2B] text-[11px] font-bold uppercase tracking-widest">
              {t.transformLabel}
            </span>
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-950 leading-[1.05]"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
            >
              {t.transformL1}
              <br />
              <span className="text-zinc-950">{t.transformL2}</span>
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-4">
          <motion.p
            className="text-zinc-500 text-sm leading-relaxed max-w-xs sm:text-right"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            {t.transformDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
          <motion.a
            href="/results"
            className="relative flex items-center gap-0 overflow-hidden rounded-full border-2 border-zinc-900 py-2 pl-6 pr-2 text-[11px] font-extrabold uppercase tracking-widest w-fit"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.span
              className="absolute inset-0 bg-zinc-900"
              style={{ transformOrigin: "left" }}
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            />
            <motion.span
              className="relative z-10 mr-3"
              variants={{ rest: { color: "#09090b" }, hover: { color: "#ffffff" } }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            >
              More Results
            </motion.span>
            <motion.span
              className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
              variants={{
                rest:  { backgroundColor: "#09090b", color: "#ffffff" },
                hover: { backgroundColor: "#E6FF2B", color: "#09090b" },
              }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            >
              <IoChevronForward size={11} />
              <IoChevronForward size={11} className="-ml-1.5" />
            </motion.span>
          </motion.a>
          </motion.div>
        </div>
      </div>

      {/* 3-card grid */}
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
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              delay: i * 0.1,
            }}
          >
            <BeforeAfterSlider
              before={src}
              beforeAlt={`Transformation ${i + 1} — Before`}
              afterContent={
                <div className="h-full w-full bg-zinc-100 flex items-center justify-end pr-8">
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

    </section>
  );
}
