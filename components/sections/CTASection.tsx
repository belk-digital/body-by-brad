"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/lib/LanguageContext";
import { bradImagePool } from "@/lib/constants";

const SLOT_COUNT = 9;

export default function CTASection() {
  const { t } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLAnchorElement>(null);
  const gridRef     = useRef<HTMLUListElement>(null);
  const itemRefs    = useRef<(HTMLLIElement | null)[]>([]);
  const titleOffsetY = useRef(0);

  const staticImages = bradImagePool.slice(0, SLOT_COUNT);

  useLenis(() => { ScrollTrigger.update(); });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const title   = titleRef.current;
      const desc    = descRef.current;
      const btn     = btnRef.current;
      const grid    = gridRef.current;
      const items   = itemRefs.current.filter((el): el is HTMLLIElement => el !== null);

      if (!section || !content || !title || !desc || !btn || !grid || !items.length) return;

      const columns: HTMLLIElement[][] = [[], [], []];
      items.forEach((item, i) => columns[i % 3].push(item));

      gsap.set([desc, btn], { opacity: 0 });

      const dy = (content.offsetHeight - title.offsetHeight) / 2;
      titleOffsetY.current = (dy / content.offsetHeight) * 100;
      gsap.set(title, { yPercent: titleOffsetY.current });

      const toggleContent = (visible: boolean) => {
        gsap.timeline({ defaults: { overwrite: true } })
          .to(title, {
            yPercent: visible ? 0 : titleOffsetY.current,
            duration: 0.7,
            ease: "power2.inOut",
          })
          .to(
            [desc, btn],
            {
              opacity: visible ? 1 : 0,
              duration: 0.4,
              ease: `power1.${visible ? "inOut" : "out"}`,
            },
            visible ? "-=90%" : "<",
          );
      };

      gsap.from(title, {
        opacity: 0,
        duration: 0.7,
        ease: "power1.out",
        scrollTrigger: {
          trigger: section,
          start: "top 57%",
          toggleActions: "play none none reset",
        },
      });

      const wh = window.innerHeight;
      const revealDist = wh - (wh - grid.offsetHeight) / 2;

      const revealTl = gsap.timeline();
      columns.forEach((col, ci) => {
        const fromTop = ci % 2 === 0;
        revealTl.from(
          col,
          {
            y: revealDist * (fromTop ? -1 : 1),
            stagger: { each: 0.1, from: fromTop ? "end" : "start" },
            ease: "power1.inOut",
          },
          "reveal",
        );
      });

      const zoomTl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
      zoomTl.to(grid, { scale: 2.05 });
      zoomTl.to(columns[0], { xPercent: -40 }, "<");
      zoomTl.to(columns[2], { xPercent:  40 }, "<");
      zoomTl.to(
        columns[1],
        {
          yPercent: (i) => (i < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.5",
      );

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600vh",
          pin: true,
          pinSpacing: true,
          scrub: 2.5,
        },
      });

      mainTl
        .add(revealTl)
        .add(zoomTl, "-=0.6")
        .add(() => toggleContent(mainTl.scrollTrigger!.direction === 1), "-=0.32");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <ul
          ref={gridRef}
          className="grid grid-cols-3 gap-3"
          style={{ width: "min(630px, 92vw)", willChange: "transform" }}
        >
          {staticImages.map((src, i) => (
            <li
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="relative aspect-square overflow-hidden rounded-xl"
              style={{ willChange: "transform" }}
            >
              <Image
                src={src}
                alt="Body By Brad"
                fill
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
                sizes="210px"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none bg-white/50" />

      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center pt-24 pointer-events-none"
      >
        <span className="text-zinc-400 uppercase tracking-[0.25em] text-xs font-semibold mb-4">
          {t.ctaLabel}
        </span>
        <h2
          ref={titleRef}
          className="font-satoshi text-zinc-950 text-center font-extrabold hero-title"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          {t.ctaL1}<br />{t.ctaL2}
        </h2>
        <p
          ref={descRef}
          className="text-zinc-500 text-center mt-6 max-w-md text-base md:text-lg leading-relaxed px-6"
        >
          {t.ctaDesc}
        </p>

        <motion.a
          ref={btnRef}
          href="#"
          className="pointer-events-auto mt-8 relative overflow-hidden rounded-full border-2 border-zinc-950 px-8 py-3 text-sm font-bold uppercase tracking-widest flex items-center"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.span
            className="absolute inset-0 bg-zinc-950"
            variants={{ rest: { y: "101%" }, hover: { y: 0 } }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="relative z-10"
            variants={{ rest: { color: "#09090b" }, hover: { color: "#ffffff" } }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {t.ctaBtn}
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
