// Every permanent redirect the site serves, read by next.config.mjs.
// Kept in its own file so data/redirects.test.mjs can check the list (for
// example that no destination is itself a redirect source, which would make
// a chain). .mjs because Node loads this directly when it reads the config.

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
  {
    source: '/how-to-avoid-common-mistakes-when-marketing-on-reddit',
    destination: '/blog/how-to-market-on-reddit-without-getting-banned',
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
];
