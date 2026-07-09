/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      // /geo moved to /services/geo in this build — preserve SEO equity and backlinks
      { source: '/geo', destination: '/services/geo', permanent: true },
      // Deprecated route from previous site
      { source: '/ai-cold-email', destination: '/', permanent: true },
      // Sanity Studio — redirect to manage.sanity.io which always works regardless of domain
      { source: '/studio', destination: 'https://manage.sanity.io', permanent: false },
      { source: '/studio/:path*', destination: 'https://manage.sanity.io', permanent: false },
    ];
  },
};

export default nextConfig;
