/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Keep the site dependency-light: serve artwork and remote icons as-is.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // 静态导出不能用 Next.js 图片优化器
  },
}

module.exports = nextConfig;
