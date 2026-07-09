/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      // /geo moved to /services/geo in this build — preserve SEO equity and backlinks
      { source: '/geo', destination: '/services/geo', permanent: true },
      // Deprecated route from previous site
      { source: '/ai-cold-email', destination: '/', permanent: true },
      // Sanity Studio lives on the old deployment — redirect all /studio/* paths there
      { source: '/studio', destination: 'https://reddireach-99o9papco-daniel-kirks-projects-ad29b84b.vercel.app/studio', permanent: false },
      { source: '/studio/:path*', destination: 'https://reddireach-99o9papco-daniel-kirks-projects-ad29b84b.vercel.app/studio/:path*', permanent: false },
    ];
  },
};

export default nextConfig;
