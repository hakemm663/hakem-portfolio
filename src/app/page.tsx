import Image from "next/image";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { site, experience, approach } from "@/data/site";
import { technologies, groups, type Tech } from "@/data/technologies";
import { Nav } from "@/components/Nav";
import { Reveal, HeroTitle } from "@/components/Reveal";
import { Tilt, Magnetic, Spotlight, SplitHeading, Counter, CameraStory } from "@/components/Motion";
import { ContactForm } from "@/components/ContactForm";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const byId = (id: string) => technologies.find((t) => t.id === id)!;
const ghPath = byId("github").icon.path;
const Flip = ({ t }: { t: string }) => <span className="flip"><span data-t={t}>{t}</span></span>;
const Logo = ({ t, size = 20 }: { t: Tech; size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false" fill={t.accent}><path d={t.icon.path} /></svg>;

const craft = [
  { title: "Delivery and DevOps", lead: "Code that reaches users safely and repeatably.", points: [
    "GitHub Actions quality gates (format, analyze, test) and internal distribution workflows on Flutter projects.",
    "Fastlane, build flavors, Firebase App Distribution and Google Play internal and closed testing tracks for Raqimo.",
    "Raqimo API deployed serverless on Vercel, with a daily scheduled job, CSP and security headers.",
    "Auth hardening: sign-in rate limiting, CAPTCHA and leaked-password protection, plus a migration that closed anonymous-callable database functions."] },
  { title: "Testing and quality", lead: "Rules that cannot be bypassed, checked before every release.", points: [
    "SQL test suites run before every Raqimo release, covering invoice lifecycle, totals, payment limits and void rules.",
    "Unit, widget and integration testing on Flutter; release checklists and technical documentation.",
    "One reporting model so web, mobile and AI always show identical numbers.",
    "Production site measured at 98 Performance, 100 Accessibility, 100 Best Practices and 100 SEO (PageSpeed Insights, desktop). I review all AI-generated code."] },
  { title: "UI/UX and product identity", lead: "Product decisions made by the person who ships them.", points: [
    "Founder of Raqimo: who it is for, what it leaves out, and how it speaks, in English and Arabic with full RTL.",
    "Human-in-the-loop AI: the assistant drafts, a person reviews, and nothing is sent without approval.",
    "Shareable public invoice links with view tracking, PDF export and WhatsApp sharing, so the product works outside the app.",
    "iSchool instructor certification in UI/UX Design (2024), and I taught UI/UX to students."] },
];

const faq = [
  ["Which roles are you looking for?", "Flutter and full-stack engineering first. With knowledge of DevOps and release engineering, QA and test automation, and UI/UX-minded product engineering, where my CI/CD, testing and product work counts."],
  ["Did you build Raqimo alone?", "I founded it and built the mobile app, web app and API myself. I use AI tools such as Claude while developing and review the code they generate."],
  ["What state is Raqimo in?", "The web app is live. The Android app (release 1.0.7) is in Google Play internal and closed testing. Paymob checkout is built behind a feature flag."],
  ["Do you work remotely?", "Yes. I've worked remotely since 2025 on Raqimo and as a tutor. I'm based in Giza, Egypt."],
  ["What languages do you speak?", "Arabic (native) and English (professional working proficiency)."],
  ["Can I see more of your code?", "My GitHub has public work. For anything private, I'm happy to walk through the architecture and decisions in an interview."],
];

const stats = [
  [500, "+", "live sessions taught"], [100, "+", "students"], [2, "+", "years of Flutter"],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, jobTitle: site.role, url: site.url, email: `mailto:${site.email}`,
      sameAs: [site.github, site.linkedin, site.raqimo], knowsAbout: ["Flutter", "Dart", "React", "NestJS", "PostgreSQL", "CI/CD", "Software testing", "UI/UX design"],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Canadian International College" } },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: `${site.name} — Portfolio`, author: { "@id": `${site.url}/#person` } },
    { "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ],
};

export default function Home() {
  const loop = [...technologies, ...technologies];
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <main id="main">
        {/* Hero */}
        <Spotlight id="top" className="relative isolate overflow-hidden pt-28 sm:pt-36">
          <div className="aurora" aria-hidden />
          <div className="wrap relative z-10 grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
            <div>
              <p className="mb-6 text-mute">Giza, Egypt · open to Flutter, full-stack, DevOps and QA roles</p>
              <HeroTitle lines={["Mohamed", "Hakem"]} />
              <p className="mt-6 text-xl sm:text-2xl">{site.role}</p>
              <p className="mt-4 max-w-xl text-lg text-mute">I build, test and ship products end to end: Flutter apps, React interfaces, NestJS APIs and the pipelines that release them. My latest, Raqimo, is an invoicing and finance product I designed, built and released.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic><a href="#work" className="btn btn-primary"><Flip t="Explore my work" /></a></Magnetic>
                <Magnetic><a href={site.cv} download className="btn"><Download size={16} aria-hidden /><Flip t="Download CV" /></a></Magnetic>
                <Magnetic><a href="#contact" className="btn"><Mail size={16} aria-hidden /><Flip t="Get in touch" /></a></Magnetic>
                <a href={site.github} {...ext} aria-label="Mohamed Hakem on GitHub (opens in a new tab)" className="btn !p-3"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden><path d={ghPath} fill="currentColor" /></svg></a>
                <a href={site.linkedin} {...ext} aria-label="Mohamed Hakem on LinkedIn (opens in a new tab)" className="btn !px-3.5 !py-2.5 font-bold"><span aria-hidden>in</span></a>
              </div>
            </div>
            {/* 3D product stack: real Raqimo Android screens */}
            <Reveal className="[perspective:1200px]" y={40}>
              <Tilt className="mx-auto aspect-[5/4] w-full max-w-[34rem]" max={12}>
                {[
                  { n: 1, cls: "left-[2%] top-[14%] w-[27%] [transform:translateZ(20px)_rotate(-8deg)]", alt: "Raqimo home screen with quick actions and smart tips" },
                  { n: 3, cls: "right-[2%] top-[18%] w-[27%] [transform:translateZ(30px)_rotate(7deg)]", alt: "Raqimo invoice detail with payments timeline" },
                  { n: 2, cls: "left-[34%] top-[2%] w-[32%] [transform:translateZ(90px)]", alt: "Raqimo dashboard showing money you kept" },
                ].map((p) => (
                  <div key={p.n} className={`absolute overflow-hidden rounded-[1.4rem] border border-line shadow-2xl shadow-black/60 ${p.cls}`}>
                    <Image src={`/images/raqimo-app-${p.n}.webp`} alt={p.alt} width={269} height={575} sizes="180px" priority={p.n === 2} className="h-auto w-full" />
                  </div>))}
                {["flutter", "nest", "postgres", "react"].map((id, i) => { const t = byId(id); return (
                  <div key={id} className="absolute [transform:translateZ(130px)]" style={{ left: ["12%", "78%", "4%", "70%"][i], top: ["88%", "6%", "2%", "80%"][i] }}>
                    <div className="bob flex items-center gap-2 rounded-full border border-line bg-bg/80 px-3 py-1.5 text-sm backdrop-blur" style={{ animationDelay: `${i * 0.8}s` }}><Logo t={t} size={16} />{t.name}</div>
                  </div>); })}
              </Tilt>
              <p className="mt-3 text-center text-sm text-mute">Real screens from the Flutter apps</p>
            </Reveal>
          </div>
          <div className="wrap relative z-10 grid grid-cols-2 gap-6 border-t border-line py-8 sm:grid-cols-4">
            {stats.map(([n, s, l]) => (<div key={String(l)}><p className="text-3xl font-semibold sm:text-4xl"><Counter to={n as number} suffix={s as string} /></p><p className="text-sm text-mute">{l}</p></div>))}
            <div><p className="whitespace-nowrap text-2xl font-semibold sm:text-3xl">98 · 100 · 100 · 100</p><p className="text-sm text-mute">PageSpeed on the Raqimo site (desktop)</p></div>
          </div>
        </Spotlight>

        {/* Tech marquee */}
        <div className="fade-x overflow-hidden border-y border-line py-5" aria-label="Technologies I work with">
          <ul className="marquee gap-10">
            {loop.map((t, i) => (<li key={i} aria-hidden={i >= technologies.length} className="flex items-center gap-2.5 whitespace-nowrap pr-10 text-mute"><Logo t={t} size={22} />{t.name}</li>))}
          </ul>
        </div>

        {/* Raqimo flagship */}
        <section id="work" className="py-20 sm:py-28">
          <div className="wrap">
            <SplitHeading text="Raqimo: invoices, expenses and collections in one place" className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl" />
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <Reveal>
                <p className="text-lg text-mute">Raqimo helps small businesses and freelancers create invoices, record expenses, chase payments and understand their numbers, with AI-assisted drafting that a person always reviews. I founded it and built the mobile app, web app and API.</p>
                <p className="mt-6 text-sm text-mute">Status: the web app is live. The Android app (release 1.0.7) is in Google Play internal and closed testing. Paymob checkout is built behind a feature flag.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic><a href={site.raqimo} {...ext} className="btn btn-primary" style={{ background: "var(--raq)", borderColor: "var(--raq)" }}><Flip t="Visit Raqimo" /><ArrowUpRight size={16} aria-hidden /></a></Magnetic>
                  <Magnetic><a href={site.raqimoApp} {...ext} className="btn"><Flip t="Open the web app" /><ArrowUpRight size={16} aria-hidden /></a></Magnetic>
                  {site.playUrl && <a href={site.playUrl} {...ext} className="btn"><Flip t="Google Play" /><ArrowUpRight size={16} aria-hidden /></a>}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-4 text-mute">
                  <li><b className="text-fg">API:</b> NestJS on PostgreSQL (Supabase): authentication, tenant isolation, audit logging, overdue-invoice job.</li>
                  <li><b className="text-fg">Database rules:</b> invoice lifecycle, totals, payment limits and the free-plan cap enforced by constraints and triggers.</li>
                  <li><b className="text-fg">Web:</b> React, Vite, Tailwind. Arabic/English with RTL, shareable invoice links, PDF export.</li>
                  <li><b className="text-fg">Mobile:</b> Flutter, Clean Architecture, BLoC/Cubit. Receipt scan, push notifications, AI proposal review.</li>
                </ul>
              </Reveal>
            </div>
          </div>
          <div className="mt-16"><CameraStory src="/images/raqimo-poster.webp" /></div>
          <div className="wrap mt-10">
            <Reveal><p className="mb-4 text-sm text-mute">More real screens from the Flutter apps</p></Reveal>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 [perspective:1000px]">
              {[1, 2, 3, 4, 5].map((n, i) => (
                <li key={n} className={i > 2 ? "hidden sm:block" : ""}>
                  <Reveal delay={i * 0.07}><div className="overflow-hidden rounded-2xl border border-line transition-transform duration-500 hover:[transform:translateY(-8px)_rotateX(4deg)]">
                    <Image src={`/images/raqimo-app-${n}.webp`} alt={["Home with quick actions", "Dashboard: money you kept", "Invoice detail and payments", "Invoice list with filters", "Raqimo AI assistant"][i]} width={269} height={575} sizes="(min-width:640px) 20vw, 33vw" loading="lazy" className="h-auto w-full transition-transform duration-700 hover:scale-105" />
                  </div></Reveal>
                </li>))}
            </ul>
          </div>
        </section>

        {/* Other projects */}
        <section className="border-t border-line py-20">
          <div className="wrap">
            <SplitHeading text="Earlier Flutter work" className="text-3xl font-semibold tracking-tight sm:text-5xl" />
            <div className="mt-10 grid gap-14 md:grid-cols-2">
              {[
                { img: "/images/docdoc-overview.webp", w: 1600, h: 964, alt: "DocDoc app overview: home screen, nearby map and booking details", title: "DocDoc: dental appointment app (guided learning project)", body: "Built while following a senior mobile lead's project to practise real-world Flutter structure. A Flutter app for finding dentists and booking appointments: search and filtering, booking flow, Firebase and Supabase, secure storage, GitHub Actions and multi-environment builds.", ids: ["flutter", "firebase", "supabase", "actions"], href: site.github, cta: "See my GitHub" },
                { img: "/images/real-estate-app-kit.webp", w: 1600, h: 900, alt: "Flutter real-estate app with property search, AI search and a sales-agent screen", title: "Bilingual real-estate app (Dwelleo)", body: "Arabic/English Flutter real-estate app with feature-first Clean Architecture, BLoC, get_it, Dio, go_router, Crashlytics and App Check foundations.", ids: ["flutter", "dart", "firebase", "github"], href: site.gumroad, cta: "See my Gumroad store" },
              ].map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="[perspective:1200px]"><Tilt max={6} className="group overflow-hidden rounded-xl border border-line">
                    <Image src={p.img} alt={p.alt} width={p.w} height={p.h} sizes="(min-width:768px) 560px, 100vw" loading="lazy" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
                  </Tilt></div>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-mute">{p.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute">{p.ids.map((id) => <li key={id} className="flex items-center gap-1.5"><Logo t={byId(id)} size={14} />{byId(id).name}</li>)}</ul>
                  <a href={p.href} {...ext} className="mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:text-raq">{p.cta}<ArrowUpRight size={14} aria-hidden /></a>
                </Reveal>))}
            </div>
          </div>
        </section>

        {/* Craft: DevOps, testing, UX */}
        <section id="craft" className="border-t border-line py-20 sm:py-28">
          <div className="wrap">
            <SplitHeading text="Beyond writing code" className="text-3xl font-semibold tracking-tight sm:text-5xl" />
            <p className="mt-4 max-w-2xl text-lg text-mute">The work that decides whether a product survives contact with real users: delivery, testing and product decisions. Everything below comes from shipping Raqimo and my Flutter projects.</p>
            <div className="mt-12 border-t border-line">
              {craft.map((c) => (
                <Reveal key={c.title}>
                  <div className="row grid gap-6 border-b border-line py-10 lg:grid-cols-[1fr_1.6fr]">
                    <div><h3 className="text-2xl font-semibold sm:text-3xl">{c.title}</h3><p className="mt-2 text-mute">{c.lead}</p></div>
                    <ul className="space-y-3 text-mute">{c.points.map((p) => <li key={p} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-raq" />{p}</li>)}</ul>
                  </div>
                </Reveal>))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t border-line py-20 sm:py-28">
          <div className="wrap">
            <SplitHeading text="Tools I use to ship" className="text-3xl font-semibold tracking-tight sm:text-5xl" />
            <p className="mt-3 max-w-xl text-mute">Each one links to its official site. Hover or focus to see where I used it.</p>
            <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <div key={g}>
                  <h3 className="mb-2 text-lg font-semibold">{g}</h3>
                  <ul>{technologies.filter((t) => t.group === g).map((t) => (
                    <li key={t.id}><a href={t.url} {...ext} className="tech block py-3" style={{ ["--c" as string]: t.accent }}>
                      <span className="flex items-center gap-3"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden focusable="false"><path d={t.icon.path} /></svg><span>{t.name}</span><span className="sr-only"> (opens official site in a new tab)</span></span>
                      <span className="role mt-1 block pl-[34px] text-sm text-mute">{t.role}</span></a></li>))}</ul>
                </div>))}
            </div>
          </div>
        </section>

        {/* About + approach */}
        <section id="about" className="border-t border-line py-20 sm:py-28">
          <div className="wrap grid gap-14 lg:grid-cols-2">
            <Reveal>
              <SplitHeading text="From teaching code to shipping products" className="text-3xl font-semibold tracking-tight sm:text-4xl" />
              <p className="mt-5 text-lg text-mute">I started by teaching programming: 500+ live Flutter, Dart and web sessions at iSchool, where I was promoted from Golden to Diamond Instructor. Explaining code clearly taught me to write it clearly too.</p>
              <p className="mt-4 text-lg text-mute">Since 2025 I have built Flutter apps for real estate and healthcare, and in 2026 I released Raqimo end to end.</p>
              <h3 className="mt-10 text-xl font-semibold">Where I&apos;ve worked and studied</h3>
              <ol className="mt-4 space-y-5 border-l border-line pl-5">
                {experience.map((e) => (<li key={e.role}><p className="font-medium">{e.role}</p><p className="text-sm text-mute">{e.org} · {e.when}</p>{e.note && <p className="mt-1 text-sm text-mute">{e.note}</p>}</li>))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <SplitHeading text="How I work" className="text-3xl font-semibold tracking-tight sm:text-4xl" />
              <dl className="mt-6 space-y-6">{approach.map(([t, d]) => (<div key={t}><dt className="font-medium">{t}</dt><dd className="mt-1 text-mute">{d}</dd></div>))}</dl>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line py-20">
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <SplitHeading text="Questions recruiters ask" className="text-3xl font-semibold tracking-tight sm:text-4xl" />
            <div className="faq">{faq.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-line py-20 sm:py-28">
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <SplitHeading text="Let's build something useful" className="text-4xl font-semibold tracking-tight sm:text-5xl" />
              <p className="mt-4 max-w-md text-mute">Hiring for a Flutter, full-stack, or need a product built and shipped? Tell me what you&apos;re working on.</p>
            </Reveal>
            <Reveal delay={0.1}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10 text-sm text-mute">
        <div className="wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p><span className="text-fg">{site.name}</span> · {site.role} · © {new Date().getFullYear()}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href={site.github} {...ext} className="hover:text-fg"><Flip t="GitHub" /></a></li>
            <li><a href={site.linkedin} {...ext} className="hover:text-fg"><Flip t="LinkedIn" /></a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a></li>
            <li><a href={site.cv} download className="hover:text-fg"><Flip t="Download CV" /></a></li>
            <li><a href={site.raqimo} {...ext} className="hover:text-fg"><Flip t="Raqimo" /></a></li>
          </ul>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
