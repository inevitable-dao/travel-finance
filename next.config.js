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
