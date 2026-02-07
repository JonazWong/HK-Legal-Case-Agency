import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: [
        /node_modules/,
        /app\/index-test-dashboard\/client/,
        /app\/index-test-dashboard\/server/,
      ],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);