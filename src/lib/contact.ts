export type ContactInput = { name: string; email: string; company: string; topic: string; message: string };
export const topics = ["Full-time role", "Freelance project", "Flutter app", "Web or API work", "Something else"];
const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;

export function validate(raw: unknown): { ok: true; data: ContactInput } | { ok: false; errors: Record<string, string> } {
  const r = (raw ?? {}) as Record<string, unknown>;
  const s = (k: string, max: number) => (typeof r[k] === "string" ? (r[k] as string).replace(/\r/g, "").trim().slice(0, max) : "");
  const data = { name: s("name", 100), email: s("email", 200), company: s("company", 120), topic: s("topic", 60), message: s("message", 4000) };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.message.length < 10) errors.message = "Write at least 10 characters.";
  if (data.topic && !topics.includes(data.topic)) errors.topic = "Choose one of the listed reasons.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
export const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
