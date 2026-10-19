"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;
const fine = (e: React.PointerEvent) => e.pointerType === "mouse";

/** Pointer-driven 3D tilt with a moving highlight. Children can use translateZ for depth. */
export function Tilt({ children, className, max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const gx = useMotionValue(50), gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,.10), transparent 60%)`;
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !fine(e)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2); rx.set(-(py - 0.5) * max * 2); gx.set(px * 100); gy.set(py * 100);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div onPointerMove={move} onPointerLeave={leave} className={`relative ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100, transformStyle: "preserve-3d" }}>
      {children}
      {!reduce && <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />}
    </motion.div>
  );
}

/** Button/link that leans toward the pointer. Desktop mouse only. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 });
  return (
    <motion.span className="inline-block" style={{ x, y }}
      onPointerMove={(e) => { if (reduce || !fine(e)) return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>
  );
}

/** Cursor-following light, written to CSS variables so nothing re-renders. */
export function Spotlight({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section id={id} ref={ref} className={`spot ${className ?? ""}`}
      onPointerMove={(e) => { if (!fine(e) || !ref.current) return; const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`); ref.current.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
      {children}
    </section>
  );
}

export function SplitHeading({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h2" | "h3" }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
          <motion.span className="inline-block" initial={reduce ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: i * 0.05, ease }}>{w}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) { ref.current.textContent = `${to}${suffix}`; return; }
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => { if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`; } });
    return () => c.stop();
  }, [inView, to, suffix, reduce]);
  return <span ref={ref}>{reduce ? `${to}${suffix}` : `0${suffix}`}</span>;
}

const stages = [
  { cx: 0.5, cy: 0.5, s: 1, title: "One product, three surfaces", body: "Web dashboard, Android app and AI assistant, all on one API and one reporting model." },
  { cx: 0.42, cy: 0.57, s: 2, title: "Web dashboard", body: "React, Vite and Tailwind. Invoices, customers, expenses, reports. Arabic and English with RTL." },
  { cx: 0.645, cy: 0.55, s: 2.3, title: "AI assistant", body: "Drafts invoices and expenses and answers questions about the numbers. A person reviews every draft." },
  { cx: 0.83, cy: 0.62, s: 2.4, title: "Mobile app", body: "Flutter with Clean Architecture and BLoC/Cubit. Send and void invoices, record payments, share on WhatsApp." },
];
const KF = [0, 0.28, 0.58, 0.88];

function Caption({ p, i }: { p: MotionValue<number>; i: number }) {
  const k = KF[i];
  const opacity = useTransform(p, i === 0 ? [0, 0.1, 0.18, 0.26] : i === 3 ? [k - 0.12, k - 0.04, 1, 1] : [k - 0.12, k - 0.04, k + 0.1, k + 0.18], i === 0 ? [1, 1, 1, 0] : i === 3 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(opacity, [0, 1], [16, 0]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <h3 className="text-2xl font-semibold sm:text-3xl">{stages[i].title}</h3>
      <p className="mt-2 max-w-xl text-mute">{stages[i].body}</p>
    </motion.div>
  );
}

/** Scroll-linked camera move across the real Raqimo poster. Static list when motion is reduced. */
export function CameraStory({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const s = useTransform(p, KF, stages.map((t) => t.s));
  const xp = useTransform(p, KF, stages.map((t) => (0.5 - t.cx * t.s) * 100));
  const yp = useTransform(p, KF, stages.map((t) => (0.5 - t.cy * t.s) * 100));
  const x = useMotionTemplate`${xp}%`, y = useMotionTemplate`${yp}%`;
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);
  const img = <Image src={src} alt="Raqimo product poster: web dashboard, mobile app and AI assistant" width={1536} height={1024} sizes="1100px" className="h-full w-full object-cover" />;
  if (reduce) return (
    <div className="wrap"><div className="overflow-hidden rounded-2xl border border-line">{img}</div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">{stages.slice(1).map((t) => <li key={t.title}><b>{t.title}</b><p className="text-mute">{t.body}</p></li>)}</ul></div>);
  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6 px-4 pt-16">
        <div className="relative aspect-[3/2] w-[min(100%,calc(62vh*1.5))] overflow-hidden rounded-2xl border border-line bg-surface">
          <motion.div className="absolute inset-0" style={{ x, y, scale: s, transformOrigin: "0 0", willChange: "transform" }}>{img}</motion.div>
        </div>
        <div className="relative h-28 w-[min(100%,calc(62vh*1.5))] sm:h-24">{stages.map((_, i) => <Caption key={i} p={p} i={i} />)}</div>
        <div className="h-px w-[min(100%,calc(62vh*1.5))] bg-line" aria-hidden><motion.div className="h-px bg-raq" style={{ width: bar }} /></div>
      </div>
    </div>
  );
}
