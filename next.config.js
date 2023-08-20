const { withPlugins } = require('next-composed-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  {
    swcMinify: true,
    reactStrictMode: false,
    compiler: {
      styledComponents: true,
    },
  },
  [withBundleAnalyzer],
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'd23ybff5p6c2tt.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
    ],
  },
};

module.exports = nextConfig;
