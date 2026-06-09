# Implementation instructions (for Claude Code)

You are helping the owner of **reddireach.com** put this repo live. It is a
**Next.js 14 (App Router)** rebuild of the ReddiReach website that should **replace
the current site on Vercel**. Read `README.md` for full detail; this is the short
version.

## Goal
Deploy this repo to Vercel and serve it at `reddireach.com`, replacing the current
deployment. Keep the existing Sanity blog working (this site reads from it), and
enable instant publishing via on-demand revalidation.

## Key facts
- Next.js 14, App Router, plain JSX (no TypeScript). `npm install` → `npm run build`.
- The blog reads the **existing public Sanity dataset** with ISR. No API key, no
  backend, no content migration. Posts are still written in the current Sanity Studio.
- The site builds with **zero required env vars** (Sanity project `vj3ex5iz` /
  `production` and GA4 `G-C3W16CY6DX` are baked in as defaults).

## Steps
1. **Verify locally:** `npm install && npm run build`. It should build ~62 routes,
   including `/blog` and ~46 `/blog/<slug>` pages, with no errors.
2. **Deploy to Vercel:** import this GitHub repo as a project (framework preset
   **Next.js**, auto-detected). No build config changes.
3. **Domain:** move `reddireach.com` and `www.reddireach.com` onto this Vercel
   project so it replaces the current site. Confirm HTTPS resolves.
4. **Instant blog publishing (on-demand revalidation):**
   - In Vercel env vars, set `SANITY_REVALIDATE_SECRET` to a random string.
   - In Sanity (manage.sanity.io → project → API → Webhooks) add a webhook to
     `https://www.reddireach.com/api/revalidate?secret=THAT_SECRET`, triggering on
     create/update/delete, filtered to `_type == "post"`.
   - Result: publishing a post in Studio refreshes the blog within seconds. (Even
     without this, ISR refreshes posts within 60s.)
5. **Post-launch:** submit `https://www.reddireach.com/sitemap.xml` in Google Search
   Console. The sitemap and robots.txt regenerate automatically and include all
   pages and posts.

## Guardrails — do NOT
- Do **not** migrate, rewrite, or duplicate the blog content. This repo only reads
  Sanity; leave the Studio and its content untouched.
- Do **not** commit any secret. `SANITY_REVALIDATE_SECRET` goes in Vercel env vars
  only.
- Do **not** introduce em dashes in site copy (house style).
- Keep it Next.js App Router; do not convert to Pages Router or another framework.

## If something breaks
- Build fails fetching Sanity → confirm network access; endpoint is
  `https://vj3ex5iz.apicdn.sanity.io`. Config is in `lib/sanity.js`.
- A blog page is missing → it comes from Sanity `post` documents with a
  `slug.current`; confirm the post is published, then it appears within the
  revalidate window (or instantly via the webhook).
- Interactive bits (nav dropdown, FAQ accordions, GEO checklist, hero animations)
  are `'use client'` components; everything else is server-rendered.
