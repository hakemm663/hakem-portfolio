"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [["Work", "#work"], ["Craft", "#craft"], ["Skills", "#skills"], ["About", "#about"], ["Contact", "#contact"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(([, h]) => { const el = document.querySelector(h); if (el) io.observe(el); });
    return () => { window.removeEventListener("keydown", onKey); io.disconnect(); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur">
      <motion.div style={{ scaleX }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-raq" aria-hidden />
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">Mohamed Hakem</a>
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} aria-current={active === h ? "true" : undefined}
              className={`transition-colors hover:text-fg ${active === h ? "text-fg underline decoration-raq decoration-2 underline-offset-8" : "text-mute"}`}><span className="flip"><span data-t={l}>{l}</span></span></a></li>
          ))}
          <li><a className="btn btn-primary !py-2" href={site.cv} download><Download size={16} aria-hidden />Download CV</a></li>
        </ul>
        <button className="btn !p-2.5 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="wrap flex flex-col gap-1 border-t border-line pb-5 pt-3 md:hidden">
          {links.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-lg">{l}</a></li>)}
          <li><a className="btn btn-primary mt-2" href={site.cv} download><Download size={16} aria-hidden />Download CV</a></li>
        </ul>
      )}
    </header>
  );
}
