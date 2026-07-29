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
