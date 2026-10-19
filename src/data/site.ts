export const site = {
  name: "Mohamed Hakem",
  role: "Full-Stack Engineer & Flutter Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hakemm663@gmail.com",
  github: "https://github.com/hakemm663",
  linkedin: "https://linkedin.com/in/mohamed-hakem-74a111261",
  gumroad: "https://hakemm6.gumroad.com",
  cv: "/documents/mohamed-hakem-cv.pdf",
  raqimo: "https://raqmio.com/en",
  raqimoApp: "https://app.raqmio.com/app",
  playUrl: process.env.NEXT_PUBLIC_PLAY_URL || "",
  description:
    "Mohamed Hakem is a Full-Stack Engineer and Flutter developer in Egypt who builds, tests and ships products end to end. Creator of Raqimo: Flutter app, React web app, NestJS API, CI/CD and release testing.",
};

export const experience = [
  { role: "Founder & Full-Stack Engineer", org: "Raqimo", when: "2026 – present", note: "Designed, built and released an invoicing and finance product across mobile, web and API." },
  { role: "Flutter Developer (self-employed)", org: "Giza, Egypt", when: "Apr 2025 – present", note: "Flutter apps for real estate and healthcare with BLoC/Cubit, Firebase and Supabase; CI quality gates with GitHub Actions." },
  { role: "Coding Instructor", org: "Filo (remote)", when: "May 2025 – present", note: "One-to-one tutoring in programming fundamentals, web and mobile development, with code review and debugging." },
  { role: "Computer Science & Mobile Development Instructor", org: "iSchool, Cairo", when: "Jun 2024 – Feb 2025", note: "500+ live sessions to 100+ students; promoted from Golden to Diamond Instructor." },
  { role: "B.Sc. Business Information Systems", org: "Canadian International College, Cairo", when: "2020 – 2025", note: "" },
];

export const approach = [
  ["Start from the user's problem", "I write down who the screen is for and what they need to finish before I choose a widget or an endpoint."],
  ["Keep rules where they can't be bypassed", "On Raqimo, invoice totals, payment limits and void rules live in the database, so the web app, mobile app and AI see the same truth."],
  ["Architecture that survives change", "Clean Architecture and BLoC/Cubit on Flutter; typed REST APIs on NestJS; one reporting model shared by every client."],
  ["Test before release", "SQL test suites run before every Raqimo release; Flutter work uses format, analyze and test gates in GitHub Actions."],
  ["Accessible and bilingual", "Arabic/English with RTL support, keyboard-friendly interfaces and measured Core Web Vitals."],
  ["Ship, then iterate", "Build flavors, internal distribution and Google Play testing tracks keep releases small and reversible."],
];
