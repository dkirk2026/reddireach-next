import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
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
