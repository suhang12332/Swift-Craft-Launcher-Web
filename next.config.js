/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    // Keep the site dependency-light: serve artwork as-is.
    unoptimized: true,
  },
};

module.exports = nextConfig;
