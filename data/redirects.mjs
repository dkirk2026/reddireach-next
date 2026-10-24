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
  // Repointed for waves 2 to 4: the lead-generation playbook these used to
  // reach merges into the new lead generation guide, so they go straight there.
  {
    source: '/quality-leads-on-reddit',
    destination: '/blog/reddit-lead-generation',
    permanent: true,
  },
  {
    source: '/how-to-generate-quality-leads-on-reddit-the-authentic-approach-guide',
    destination: '/blog/reddit-lead-generation',
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

  // Waves 2 to 4 merges of the blog plan. SHIP ONLY IN THE SAME DEPLOY THAT
  // PUBLISHES ALL 21 SURVIVORS: six of them are new slugs that do not exist
  // yet, so until they are live these would send readers to a 404.
  // Source: content-workflow-pilot/reddireach-wave1-2026-10-23/wave-map.json.
  ...mergeInto('best-reddit-marketing-tools-for-2025-2026-plus-the-exact-moments-to-hire-an-agency-instead', [
    'reddit-marketing-tool-guide-for-saas-founders-2026',
    'reddit-lead-generation-tools-2026-how-to-choose-best-options-for-saas-ecom',
  ]),
  ...mergeInto('automated-reddit-marketing-tools-what-to-automate-and-avoid', [
    'ai-powered-reddit-engagement-without-sounding-like-a-bot',
    'ai-powered-reddit-engagement-for-saas-automate-vs-human-vs-roi',
  ]),
  ...mergeInto('how-to-set-up-reddit-keyword-monitoring-for-saas-and-ecommerce', [
    'reddit-first-demand-signals-in-2026',
  ]),
  ...mergeInto('reddit-analytics-metrics-that-matter-for-saas-and-growth-teams', [
    'reddit-marketing-roi-in-2026',
  ]),
  ...mergeInto('reddit-ai-search-optimization', [
    'reddit-ai-search-optimization-2026-the-definitive-playbook-to-earn-mentions-in-ai-answers-rank-in-google',
    'answer-engine-optimization-for-reddit-in-2026',
    'reddit-and-quora-distribution-system-for-ai-search-in-2026',
  ]),
  ...mergeInto('reddit-seo', [
    'reddit-ai-seo-strategies-for-2026',
    'reddit-seo-strategies-for-ranking-threads-in-google-and-ai-answers',
    'reddit-marketing-vs-seo-for-ai-recommendations',
    'reddit-seo-intelligence-for-saas-evaluate-subreddits-and-threads',
  ]),
  ...mergeInto('how-to-get-chatgpt-to-mention-your-brand-via-reddit-marketing', [
    'why-chatgpt-recommends-your-competitors',
    'why-brand-mentions-matter-for-ai-search-optimization',
  ]),
  ...mergeInto('generative-engine-optimization-for-brands', [
    'stop-vague-ai-visibility-advice-with-a-2026-ai-search-test-checklist',
    'ai-seo-case-study-more-ai-citations-and-qualified-leads-in-60-days',
  ]),
  ...mergeInto('reddit-marketing-for-saas', [
    'reddit-marketing-in-2026-for-saas-founders',
    'b2b-reddit-marketing-playbook-for-pipeline-without-brand-account-blowback',
    'nobody-cares-about-your-startup-reddit-positioning-that-converts',
  ]),
  ...mergeInto('reddit-marketing-for-ecommerce', [
    'how-to-market-your-ecommerce-brand-with-reddit',
    'reddit-strategies-for-7-9-figure-ecommerce-brands',
  ]),
  ...mergeInto('reddit-lead-generation', [
    'how-to-find-customers-on-reddit-for-saas-and-ecommerce',
    'reddit-lead-generation-playbook-for-saas-ecommerce-2026',
    'reddit-comment-to-lead-funnel-for-saas-founders-2026',
    'steal-competitors-angry-customers-on-reddit-no-spam-2026',
    'scared-of-cold-calling-use-reddit-as-warm-outbound-in-2026',
    'first-3-clients-with-0-in-2026-using-direct-outreach',
    'first-paying-customer-fast-in-2026-with-a-reddit-launch-checklist',
    'first-customer-on-reddit-in-2026-offer-and-post-playbook',
    '1-paying-customer-from-the-wild-to-10-with-reddit-in-2026',
    'solo-saas-launch-in-2026-with-reddit-demand-validation',
    'linkedin-not-converting-in-2026-validate-demand-with-reddit-ai-search',
    'grow-saas-without-ads-in-2026-using-reddit-and-ai-search',
  ]),
  ...mergeInto('reddit-marketing-case-studies', [
    'reddit-marketing-case-studies-7-campaign-breakdowns',
    'reddit-marketing-case-studies-2026',
  ]),
];
