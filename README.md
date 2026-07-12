# LSI — Precision CNC Manufacturing website

Marketing site + Request-a-Quote / Contact flow for LSI, a CNC machining shop.

## Stack
- **Next.js 16** (App Router) · **React 19** · **Tailwind v4** · **shadcn/ui**
- **Postgres** (`pg`) for quote/contact persistence
- **Resend** for email notifications · **Linq** for SMS/text notifications

## Develop
```bash
npm install
cp .env.example .env.local   # fill in keys (optional — app runs without them)
npm run dev                  # http://localhost:3000
```

## Pages
`/` home · `/services` · `/capabilities` · `/industries` · `/about` ·
`/quote` (full quote form + file upload) · `/contact` (talk-it-through message form)

## Quote / contact submissions
`POST /api/quote` validates the payload, then **saves to Postgres + emails the
shop (files attached) + texts the shop via Linq** in parallel. Every provider
no-ops gracefully when its env vars are unset, so the site works before keys are
added. See [`.env.example`](./.env.example) for all variables.

## Deploy (Render)
Uses [`render.yaml`](./render.yaml): a Node web service + free Postgres.
Set the `sync:false` secrets (Resend/Linq/email) in the Render dashboard.

## To finish setup
- Replace `public/logo.svg` with the real logo (`public/logo.png`).
- Confirm company name/email in `src/lib/site.ts`.
- Add provider keys as environment variables.
