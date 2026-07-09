/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      // /geo moved to /services/geo in this build — preserve SEO equity and backlinks
      { source: '/geo', destination: '/services/geo', permanent: true },
      // Deprecated route from previous site
      { source: '/ai-cold-email', destination: '/', permanent: true },
      // Sanity Studio — redirect to hosted studio structure view (leads + blog tabs)
      { source: '/studio', destination: 'https://sanity.io/@oZKuKY4Mp/studio/rvb6qrz8dhyv45xiryws587b/structure', permanent: false },
      { source: '/studio/:path*', destination: 'https://sanity.io/@oZKuKY4Mp/studio/rvb6qrz8dhyv45xiryws587b/structure', permanent: false },
    ];
  },
};

export default nextConfig;
