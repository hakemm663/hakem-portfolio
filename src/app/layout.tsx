import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/data/site";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#08090B", width: "device-width", initialScale: 1 };
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: site.url, siteName: site.name, title: `${site.name} — ${site.role}`, description: site.description },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description: site.description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} style={{ ["--font-sans" as string]: "var(--font-geist-sans)", ["--font-mono" as string]: "var(--font-geist-mono)" }}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
