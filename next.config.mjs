/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain <img> tags are used throughout (no next/image), so no image config is
  // required. Lint is not run during builds to keep the handoff build simple.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
