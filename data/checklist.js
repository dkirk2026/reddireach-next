// Plain (server-safe) data module for the GEO checklist. Shared by the
// client component (components/GeoChecklist.jsx) and the server page
// (app/checklist/page.jsx, which builds the HowTo schema from it).

export const s2 = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

export const B = {
  chatgpt: { domain: 'chatgpt.com', name: 'ChatGPT' },
  claude: { domain: 'claude.ai', name: 'Claude' },
  perplexity: { domain: 'perplexity.ai', name: 'Perplexity' },
  google: { domain: 'google.com', name: 'Google' },
  cloudflare: { domain: 'cloudflare.com', name: 'Cloudflare' },
  sucuri: { domain: 'sucuri.net', name: 'Sucuri' },
  reddit: { domain: 'reddit.com', name: 'Reddit' },
  g2: { domain: 'g2.com', name: 'G2' },
  capterra: { domain: 'capterra.com', name: 'Capterra' },
  trustpilot: { domain: 'trustpilot.com', name: 'Trustpilot' },
  youtube: { domain: 'youtube.com', name: 'YouTube' },
  reddireach: { domain: 'reddireach.com', name: 'ReddiReach' },
  peekaboo: { domain: 'aipeekaboo.com', name: 'AI Peekaboo' },
  ahrefs: { domain: 'ahrefs.com', name: 'Ahrefs' },
  schema: { domain: 'schema.org', name: 'Schema.org' },
  ga: { domain: 'analytics.google.com', name: 'Google Analytics', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/png/google-analytics.png' },
  gsc: { domain: 'search.google.com', name: 'Google Search Console', icon: 'https://brandlogos.net/wp-content/uploads/2025/07/google_search_console_icon-vector_brandlogos.net_hxtfr-512x512.png' },
};

export const sections = [
  {
    n: '01', key: 'crawler', title: 'AI crawler access',
    blurb: 'Make sure ChatGPT, Claude, Perplexity and Google can actually reach and read your site.',
    items: [
      { text: 'Allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) in robots.txt', brands: [B.chatgpt, B.claude, B.perplexity, B.google] },
      { text: 'Remove CDN and firewall blocks on AI bots', brands: [B.cloudflare, B.sucuri] },
      { text: 'Create an llms.txt with a clear site description' },
      { text: 'Submit an accessible XML sitemap', brands: [B.gsc] },
    ],
  },
  {
    n: '02', key: 'foundations', title: 'Website foundations',
    blurb: 'The technical basics AI models reward: fast, clean, readable pages.',
    items: [
      { text: 'Hit sub-3-second page load times' },
      { text: 'Use a semantic HTML structure' },
      { text: 'Embed text directly, avoid image-only or JS-only rendering' },
      { text: 'Ship mobile-responsive layouts' },
      { text: 'Enable HTTPS across every page' },
    ],
  },
  {
    n: '03', key: 'schema', title: 'Structured data & schema',
    blurb: 'Help AI parse who you are and what you offer with schema markup.',
    items: [
      { text: 'Add Organization schema to your homepage', brands: [B.schema] },
      { text: 'Add FAQ schema to relevant content', brands: [B.schema] },
      { text: 'Add Product or Service schema where it applies', brands: [B.schema] },
      { text: 'Add breadcrumb navigation schema', brands: [B.schema] },
    ],
  },
  {
    n: '04', key: 'authority', title: 'Brand authority signals',
    blurb: 'Give AI the trust signals it looks for before recommending a brand.',
    items: [
      { text: 'Publish a detailed About page with real team information', brands: [B.reddireach] },
      { text: 'Show visible contact details and an address' },
      { text: 'Add customer testimonials and case studies' },
      { text: 'List your credentials and certifications' },
      { text: 'Keep brand naming consistent across every page' },
    ],
  },
  {
    n: '05', key: 'content', title: 'Content for AI consumption',
    blurb: 'Write the way AI reads: answer-first, well structured and genuinely useful.',
    items: [
      { text: 'Lead with the answer (BLUF: bottom line up front)' },
      { text: 'Use a clean heading hierarchy (H1 to H2 to H3)' },
      { text: 'Keep paragraphs short, two to three sentences max' },
      { text: 'Include statistics and cited sources' },
      { text: 'Answer the specific questions your buyers ask' },
      { text: 'Refresh key pages at least quarterly' },
    ],
  },
  {
    n: '06', key: 'offsite', title: 'Off-site presence & mentions',
    blurb: 'AI recommends what the wider web, and Reddit especially, is talking about.',
    items: [
      { text: 'Earn positive Reddit discussion and mentions', brands: [B.reddit] },
      { text: 'Get listed on the major review platforms', brands: [B.g2, B.capterra, B.trustpilot] },
      { text: 'Appear in third-party comparison articles' },
      { text: 'Participate authentically in your communities', brands: [B.reddit] },
      { text: 'Keep NAP (name, address, phone) consistent in directories' },
      { text: 'Publish video content', brands: [B.youtube] },
    ],
  },
  {
    n: '07', key: 'tracking', title: 'Tracking & measurement',
    blurb: 'Prove it is working: track where AI starts sending traffic and citing you.',
    items: [
      { text: 'Monitor AI referral traffic', brands: [B.ga] },
      { text: 'Test your brand mentions in ChatGPT, Claude and Perplexity', brands: [B.chatgpt, B.claude, B.perplexity, B.peekaboo] },
      { text: 'Track branded search volume trends', brands: [B.ahrefs] },
      { text: 'Set up Google Search Console', brands: [B.gsc] },
      { text: 'Use post-purchase survey attribution' },
    ],
  },
];

export const totalSteps = sections.reduce((sum, s) => sum + s.items.length, 0);
