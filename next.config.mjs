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
};

export default nextConfig;
