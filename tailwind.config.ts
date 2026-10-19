import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: "var(--bg)", surface: "var(--surface)", line: "var(--line)", fg: "var(--fg)", mute: "var(--mute)", raq: "var(--raq)" },
    fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
  }},
  plugins: [],
} satisfies Config;
