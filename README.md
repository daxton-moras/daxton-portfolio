# Daxton Moras · Portfolio

**Live site: [daxton-portfolio-iota.vercel.app](https://daxton-portfolio-iota.vercel.app)**

Personal portfolio for Daxton Moras, a Cloud & AI engineer in Dublin: AWS-certified, two-time AWS MVP, and currently deploying GPU-accelerated edge AI systems in production.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, statically prerendered) with React 19 and TypeScript
- Hand-written CSS in `app/globals.css`, with dark and light themes via `next-themes`
- Geist and Geist Mono fonts via `next/font`
- Canvas particle field, custom cursor and pointer effects, plus `framer-motion` for text animation
- Hosted on [Vercel](https://vercel.com)

## Editing content

All copy lives in [`data/portfolio-content.ts`](data/portfolio-content.ts): hero, about, skills, projects, career, certifications and awards (with their Credly badge links), and contact details. The components in `components/` only handle layout.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Before pushing, run `npm run build` and `npm run lint`.

## Deployment

Every push to `main` deploys to production on Vercel automatically, and other branches get preview URLs.
