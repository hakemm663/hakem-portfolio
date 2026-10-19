# Mohamed Hakem — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 · Motion · simple-icons · Lucide

## Run locally
```bash
npm install
cp .env.example .env.local     # then edit values
npm run dev                    # http://localhost:3000
npm run check                  # lint + typecheck + production build
```

## Environment variables (`.env.example`)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your real domain (canonical URLs, sitemap, Open Graph). Set it in Vercel. |
| `NEXT_PUBLIC_PLAY_URL` | Your verified Google Play URL. Empty = the Google Play button is hidden. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form email (server-only). |

### Contact form setup (Resend)
1. Create a Resend account and an API key.
2. Verify a sending domain in Resend (DNS records). `CONTACT_FROM_EMAIL` must use that domain, e.g. `Portfolio <contact@yourdomain.com>`.
3. Add the three variables locally and in Vercel, then send one real test message. Until then the form honestly answers "isn't configured yet".
The route validates on the server, has a honeypot field and a best-effort in-memory rate limit (5 per 10 min per IP; use Vercel KV/Upstash for strict global limits).

## Editing content
- Links, bio data, experience, approach: `src/data/site.ts`
- Technologies (logos, brand colours, links): `src/data/technologies.ts`
- Layout and copy: `src/app/page.tsx`
- Images: `public/images` · CV: `public/documents/mohamed-hakem-cv.pdf` (replace the file, keep the name)

## Known gaps / to confirm
- No portrait photo was supplied, so the page shows none. Add one to `public/images` and place it in `page.tsx` when ready.
- Confirm the real-estate image is your Dwelleo work (it is labelled "Dwelleo" from your CV) and the DocDoc artwork is yours.
- No Playwright, unit tests or Lighthouse run are included; run Lighthouse in Chrome DevTools against the deployed site.

## Deploy
```bash
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/hakemm663/<repo-name>.git
git push -u origin main
```
Then vercel.com → Add New → Project → import the repo (framework auto-detected as Next.js) → add the env variables → Deploy. After you add a custom domain, update `NEXT_PUBLIC_SITE_URL` and redeploy.
