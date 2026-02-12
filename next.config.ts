import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // If you have a slash at the end of URLs, keep it consistent
    trailingSlash: true,
};

export default nextConfig;
