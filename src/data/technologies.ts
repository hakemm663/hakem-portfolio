import {
  siFlutter, siDart, siReact, siTypescript, siJavascript, siNodedotjs, siNestjs, siTailwindcss,
  siPostgresql, siSupabase, siFirebase, siGit, siGithub, siVercel, siVite, siGithubactions, siFastlane, siGoogleplay, type SimpleIcon,
} from "simple-icons";

export type Tech = { id: string; name: string; icon: SimpleIcon; accent: string; url: string; group: string; role: string };

const t = (id: string, name: string, icon: SimpleIcon, group: string, url: string, role: string, accent?: string): Tech =>
  ({ id, name, icon, group, url, role, accent: accent ?? `#${icon.hex}` });

// Accents are brand colours; a few very dark brand colours use the brand's lighter shade so they stay readable on black.
export const technologies: Tech[] = [
  t("flutter", "Flutter", siFlutter, "Mobile", "https://flutter.dev", "Raqimo mobile app, DocDoc, real-estate app", "#54C5F8"),
  t("dart", "Dart", siDart, "Mobile", "https://dart.dev", "Language behind every Flutter app", "#2CB7F6"),
  t("react", "React", siReact, "Frontend", "https://react.dev", "Raqimo web app", "#61DAFB"),
  t("vite", "Vite", siVite, "Frontend", "https://vite.dev", "Build tooling for the Raqimo web app", "#A78BFA"),
  t("typescript", "TypeScript", siTypescript, "Frontend", "https://www.typescriptlang.org", "Typed web and API code", "#3A8DDE"),
  t("javascript", "JavaScript", siJavascript, "Frontend", "https://developer.mozilla.org/docs/Web/JavaScript", "Web interfaces and tooling", "#F7DF1E"),
  t("tailwind", "Tailwind CSS", siTailwindcss, "Frontend", "https://tailwindcss.com", "Styling for the Raqimo web app and this site", "#38BDF8"),
  t("node", "Node.js", siNodedotjs, "Backend", "https://nodejs.org", "Runtime for the Raqimo API", "#5FA04E"),
  t("nest", "NestJS", siNestjs, "Backend", "https://nestjs.com", "Raqimo REST API", "#E0234E"),
  t("postgres", "PostgreSQL", siPostgresql, "Data", "https://www.postgresql.org", "Constraints, triggers and tenant isolation", "#6B8FE8"),
  t("supabase", "Supabase", siSupabase, "Data", "https://supabase.com", "Auth and SQL migrations", "#3ECF8E"),
  t("firebase", "Firebase", siFirebase, "Data", "https://firebase.google.com", "Push, Crashlytics, App Check, Firestore", "#FFCA28"),
  t("actions", "GitHub Actions", siGithubactions, "Delivery & QA", "https://github.com/features/actions", "Format, analyze and test gates on Flutter projects", "#2088FF"),
  t("fastlane", "Fastlane", siFastlane, "Delivery & QA", "https://fastlane.tools", "Android and iOS release automation", "#00F200"),
  t("play", "Google Play Console", siGoogleplay, "Delivery & QA", "https://play.google.com/console/about/", "Internal and closed testing tracks for Raqimo", "#34A853"),
  t("git", "Git", siGit, "Tools", "https://git-scm.com", "Feature-branch workflow", "#F05032"),
  t("github", "GitHub", siGithub, "Tools", "https://github.com", "Source hosting and GitHub Actions", "#F0F0F0"),
  t("vercel", "Vercel", siVercel, "Tools", "https://vercel.com", "Serverless deployment for the Raqimo API", "#FFFFFF"),
];
export const groups = ["Mobile", "Frontend", "Backend", "Data", "Delivery & QA", "Tools"];
