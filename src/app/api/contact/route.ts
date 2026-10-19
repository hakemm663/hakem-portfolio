import { NextResponse } from "next/server";
import { validate, esc } from "@/lib/contact";

export const runtime = "nodejs";
// Best-effort per-instance limiter (resets on cold start). Add Upstash/Vercel KV for strict global limits.
const hits = new Map<string, number[]>();
const LIMIT = 5, WINDOW = 10 * 60_000;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return NextResponse.json({ error: "Too many messages. Try again in a few minutes or email me directly." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof (body as { website?: unknown })?.website === "string" && (body as { website: string }).website) return NextResponse.json({ ok: true }); // honeypot

  const v = validate(body);
  if (!v.ok) return NextResponse.json({ error: "Please fix the highlighted fields.", errors: v.errors }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL)
    return NextResponse.json({ error: "The contact form isn't configured yet. Please email me directly." }, { status: 503 });

  const d = v.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL, to: [CONTACT_TO_EMAIL], reply_to: d.email,
        subject: `Portfolio: ${d.topic || "New message"} from ${d.name.replace(/[\r\n]/g, " ")}`,
        text: `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || "-"}\nReason: ${d.topic || "-"}\n\n${d.message}`,
        html: `<p><b>Name:</b> ${esc(d.name)}<br><b>Email:</b> ${esc(d.email)}<br><b>Company:</b> ${esc(d.company || "-")}<br><b>Reason:</b> ${esc(d.topic || "-")}</p><p style="white-space:pre-wrap">${esc(d.message)}</p>`,
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "The message couldn't be delivered. Please try again or email me directly." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The message couldn't be delivered. Please try again or email me directly." }, { status: 502 });
  }
}
