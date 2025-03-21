import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });
    return config;
  },
  experimental: {
    // Keep any webpack config synced with this turbo config to avoid issues
    // See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbo
    turbo: {
      rules: {
        "*.woff2": {
          loaders: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[hash].[ext]",
              },
            },
          ],
        },
      },
    },
  },
};

export default nextConfig;
