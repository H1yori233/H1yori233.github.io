/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open.spotify.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Disable WebAssembly related features
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: false,
    }

    // Modify webpack hash method
    config.output = {
      ...config.output,
      hashFunction: 'xxhash64',  // Use alternative hash function
      hashDigest: 'hex'
    }

    return config
  },
  experimental: {
    // Completely disable all experimental features
    webpackBuildWorker: false,
    parallelServerBuildTraces: false,
    parallelServerCompiles: false,
    swcMinify: true, // Use SWC for minification
  },
}

export default nextConfig