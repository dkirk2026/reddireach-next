// Every permanent redirect the site serves, read by next.config.mjs.
// Kept in its own file so data/redirects.test.mjs can check the list (for
// example that no destination is itself a redirect source, which would make
// a chain). .mjs because Node loads this directly when it reads the config.

// Permanent redirects from each merged blog post to the post it was merged into.
function mergeInto(survivorSlug, mergedSlugs) {
  return mergedSlugs.map((slug) => ({
    source: `/blog/${slug}`,
    destination: `/blog/${survivorSlug}`,
    permanent: true,
  }));
}

export const redirects = [
  // /geo moved to /services/geo in this build — preserve SEO equity and backlinks
  { source: '/geo', destination: '/services/geo', permanent: true },
  // Deprecated route from previous site
  { source: '/ai-cold-email', destination: '/', permanent: true },

  // WordPress-era URLs that still earn Search Console impressions and
  // currently 404. Each destination is the closest surviving equivalent, so
  // any legacy link equity is preserved rather than dropped on a 404.
  // /reddit is the urgent one: it holds a live backlink from a domain with
  // DataForSEO rank 243 and has been returning 404.
  { source: '/reddit', destination: '/services/reddit', permanent: true },
  { source: '/boost', destination: '/pricing', permanent: true },
  {
    source: '/why-reddit-marketing-is-a-game-changer-for-your-business',
    destination: '/services/reddit',
    permanent: true,
  },
  {
    source: '/quality-leads-on-reddit',
    destination: '/blog/reddit-lead-generation-playbook-for-saas-ecommerce-2026',
    permanent: true,
  },
  {
    source: '/how-to-generate-quality-leads-on-reddit-the-authentic-approach-guide',
    destination: '/blog/reddit-lead-generation-playbook-for-saas-ecommerce-2026',
    permanent: true,
  },
  // Repointed in wave 1: its old destination,
  // how-to-market-on-reddit-without-getting-banned, merges into the strategy
  // pillar, so this goes straight there instead of through a second hop.
  {
    source: '/how-to-avoid-common-mistakes-when-marketing-on-reddit',
    destination: '/blog/reddit-marketing-strategy',
    permanent: true,
  },
  // Old WordPress taxonomy and author archives. Wildcards so every legacy
  // term and author lands on the blog index rather than a 404.
  { source: '/category/:slug*', destination: '/blog', permanent: true },
  { source: '/author/:slug*', destination: '/blog', permanent: true },

  // Retired blog posts. Off topic for a Reddit and AI search blog, never
  // crawled by Google and 0 impressions in 16 months; its subject is sold on
  // the SEO service page, so readers and any link land there.
  {
    source: '/blog/how-to-vet-an-seo-expert-in-2026',
    destination: '/services/seo',
    permanent: true,
  },

  // Wave 1 merges of the blog plan. DO NOT SHIP BEFORE THE WAVE 1 SURVIVORS
  // PUBLISH: best-reddit-marketing-agencies and reddit-marketing-strategy are
  // new slugs that do not exist yet, so until they are live these would send
  // readers to a 404. Each merged post goes straight to its survivor.
  // Source: content-workflow-pilot/reddireach-wave1-2026-10-23/wave-map.json.
  ...mergeInto('best-reddit-marketing-agencies', [
    'reddit-marketing-agencies-and-what-top-lists-get-wrong',
    'soar-agency-alternatives-for-reddit-marketing-in-2026',
  ]),
  ...mergeInto('how-to-choose-a-reddit-marketing-agency', [
    '2026-update-reddit-marketing-agency-for-saas-ecommerce-strategy-execution-and-measurable-roi',
    'reddit-marketing-agency-guide-for-2026',
    'underpaid-overworked-in-2026-when-to-hire-a-reddit-growth-partner',
    'reddit-marketing-deliverables-checklist-for-2026',
  ]),
  ...mergeInto('reddit-marketing-strategy', [
    'how-to-market-on-reddit-without-getting-banned',
    'reddit-promotion-without-being-salesy-in-2026-post-templates',
    'improve-brand-visibility-on-reddit-without-getting-downvoted',
    'reddit-marketing-in-2026-without-creator-energy',
    'lurkers-everywhere-fix-engagement-drop-off-in-2026-communities',
    'engagement-collapse-in-2026-fix-they-watch-don-t-comment',
  ]),
];
