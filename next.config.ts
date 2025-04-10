import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/styles")],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
