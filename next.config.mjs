import createNextIntlPlugin from "next-intl/plugin";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 明確配置路徑別名以確保在所有環境中都能正確解析
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
      '@components': path.resolve(__dirname, 'components'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@app': path.resolve(__dirname, 'app'),
      '@looper-hq/nexus-utils': path.resolve(__dirname, 'packages/utils/src'),
      '@looper-hq/nexus-types': path.resolve(__dirname, 'packages/types/src'),
      '@looper-hq/nexus-config': path.resolve(__dirname, 'packages/config/src'),
    };

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