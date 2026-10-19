"use client";
import { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { topics } from "@/lib/contact";
import { site } from "@/data/site";

type State = { s: "idle" | "sending" | "ok" | "error"; msg?: string; errors?: Record<string, string> };

export function ContactForm() {
  const [st, setSt] = useState<State>({ s: "idle" });
  const status = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (st.s === "sending") return;
    const form = e.currentTarget;
    setSt({ s: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { form.reset(); setSt({ s: "ok", msg: "Message sent. I'll reply to the email you gave." }); }
      else setSt({ s: "error", msg: j.error ?? "Something went wrong. Your message is still here.", errors: j.errors });
    } catch { setSt({ s: "error", msg: "Network error. Your message is still here; try again or email me." }); }
    setTimeout(() => status.current?.focus(), 50);
  }
  const err = (k: string) => st.errors?.[k];
  const bad = (k: string) => (err(k) ? true : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-busy={st.s === "sending"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="name" className="mb-1.5 block text-sm">Name</label>
          <input id="name" name="name" required autoComplete="name" className="field" aria-invalid={bad("name")} aria-describedby={err("name") ? "e-name" : undefined} />
          {err("name") && <p id="e-name" className="mt-1 text-sm text-red-300">{err("name")}</p>}</div>
        <div><label htmlFor="email" className="mb-1.5 block text-sm">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" aria-invalid={bad("email")} aria-describedby={err("email") ? "e-email" : undefined} />
          {err("email") && <p id="e-email" className="mt-1 text-sm text-red-300">{err("email")}</p>}</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="company" className="mb-1.5 block text-sm">Company <span className="text-mute">(optional)</span></label>
          <input id="company" name="company" autoComplete="organization" className="field" /></div>
        <div><label htmlFor="topic" className="mb-1.5 block text-sm">Reason for contact</label>
          <select id="topic" name="topic" className="field" defaultValue="">
            <option value="">Choose one</option>{topics.map((t) => <option key={t}>{t}</option>)}</select></div>
      </div>
      <div><label htmlFor="message" className="mb-1.5 block text-sm">Message</label>
        <textarea id="message" name="message" rows={6} required className="field" aria-invalid={bad("message")} aria-describedby={err("message") ? "e-message" : undefined} />
        {err("message") && <p id="e-message" className="mt-1 text-sm text-red-300">{err("message")}</p>}</div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" disabled={st.s === "sending"}>
          {st.s === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
          {st.s === "sending" ? "Sending…" : "Send message"}</button>
        <a href={`mailto:${site.email}`} className="text-sm text-mute underline underline-offset-4 hover:text-fg">or email {site.email}</a>
      </div>
      <p ref={status} tabIndex={-1} role="status" aria-live="polite" className={`text-sm outline-none ${st.s === "ok" ? "text-raq" : "text-red-300"}`}>{st.msg}</p>
      <p className="text-xs text-mute">I use what you send only to reply to your inquiry.</p>
    </form>
  );
}
