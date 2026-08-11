import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Security response headers applied to every route.
//
// Deliberately NOT included: Content-Security-Policy. A CSP here needs careful
// whitelisting of Google Fonts, GTM/GA4, the Sanity image CDN and the favicon
// service, and should ship as Report-Only first. That is a separate effort.
//
// Note on HSTS: Vercel already sends `max-age=63072000` by default. Setting it
// explicitly here adds `includeSubDomains; preload`, which the default lacks.
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // SAMEORIGIN rather than DENY: the embedded Sanity Studio at /studio frames
    // same-origin site routes for its Presentation tool.
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Only widely supported features are listed. Unknown/experimental feature
    // names produce console warnings in browsers that do not implement them.
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
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
    ];
  },
  webpack(config) {
    // Polyfill react/compiler-runtime for React 18 so Sanity Studio (which uses
    // React Compiler) builds without requiring React 19.
    config.resolve.alias['react/compiler-runtime'] = require.resolve('react-compiler-runtime');
    return config;
  },
};

export default nextConfig;
