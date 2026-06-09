# ReddiReach website (Next.js)

The ReddiReach marketing site, built in **Next.js 14 (App Router)** with the blog rendered from the existing **Sanity** content via **ISR** (instant publishing). This is a Next.js port of the same site; the design and content are identical. It is intended to replace the current reddireach.com on Vercel.

> There is also an Astro version of this site. This Next.js version differs mainly in the blog: new posts can appear **instantly** (on-demand revalidation) without a full rebuild.

## Stack

- **Next.js 14**, App Router, plain JSX (no TypeScript). React 18.
- **Sanity** (headless CMS) for the blog — read-only, public dataset, queried with ISR.
- **@portabletext/react** to render post bodies.
- Global CSS in `app/globals.css`. Fonts: Geist + Geist Mono. Brand color `#ff4500`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Node 18.18+ recommended.

## Structure

```
app/
  layout.jsx              root layout (fonts, GA4, Organization JSON-LD)
  globals.css             all styles (consolidated)
  page.jsx                /            (homepage, split hero)
  about/ pricing/ checklist/ privacy/ terms/ cookies/ page.jsx
  services/{geo,seo,reddit,link-building}/page.jsx
  blog/page.jsx           /blog        (post list, ISR)
  blog/[slug]/page.jsx    /blog/:slug  (post, ISR + generateStaticParams)
  api/revalidate/route.js on-demand revalidation endpoint (instant publishing)
  sitemap.js              auto sitemap (static pages + all posts)
components/   Nav, Footer, HeroSplit, HeroShowcase, ServiceLayout, FaqAccordion, GeoChecklist, etc.
data/         services.js, checklist.js
lib/sanity.js read-only Sanity fetch (ISR-cached)
public/       logo.webp, robots.txt
```

## How the blog works (ISR + instant publishing)

Posts are authored in the existing **Sanity Studio** (no change to that). This site reads them with Next's ISR cache:

- Pages are statically cached and **revalidate every 60s** automatically.
- For **instant** updates, an on-demand revalidation endpoint refreshes the blog the moment a post is published — no rebuild, no waiting.

No API key is needed to display posts (the dataset is public).

### Set up instant publishing (one-time)

1. Pick a random secret string and set it as `SANITY_REVALIDATE_SECRET` in your Vercel project's Environment Variables.
2. In Sanity ([manage.sanity.io](https://manage.sanity.io) → project → API → Webhooks) create a webhook:
   - URL: `https://www.reddireach.com/api/revalidate?secret=YOUR_SECRET`
   - Trigger on create/update/delete, filter `_type == "post"`.

Now publishing a post in Studio refreshes `/blog` and the post pages within seconds. (Without this, posts still appear automatically within the 60s revalidate window.)

## Deploying to Vercel

1. Push this repo to GitHub.
2. Vercel → New Project → import the repo. Framework preset **Next.js** (auto-detected). No build config changes needed.
3. Environment variables: none are strictly required (Sanity + GA4 defaults are baked in). Set `SANITY_REVALIDATE_SECRET` if you want instant publishing (above). Optional overrides: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_GA4_ID`.
4. Add the `reddireach.com` and `www.reddireach.com` domains to this Vercel project, replacing the current deployment.
5. Set up the revalidation webhook (above) and submit `https://www.reddireach.com/sitemap.xml` in Google Search Console.

## Analytics & SEO

- **Google Analytics 4** is wired into every page via `app/layout.jsx`, defaulting to the live property `G-C3W16CY6DX`. Override with `NEXT_PUBLIC_GA4_ID` or set empty to disable.
- **Sitemap** (`/sitemap.xml`) and **robots.txt** are generated automatically and include every page and blog post.
- Metadata, OpenGraph, and JSON-LD (Organization, FAQPage, HowTo, BlogPosting) are in place.

## Notes

- No em dashes in site copy (house style).
- Legal pages' contact email is `danny@kirkco.io`; the careers contact on `/about` is `filipe@aipeekaboo.com`.
