"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function HeroTitle({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  return (
    <h1 className="text-[clamp(2.8rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tight">
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-2">
          <motion.span className="block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
        </span>
      ))}
    </h1>
  );
}

// Slow depth shift on the product image as it scrolls through view.
export function Float({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { scale: 1.015 }}>
      {children}
    </motion.div>
  );
}
