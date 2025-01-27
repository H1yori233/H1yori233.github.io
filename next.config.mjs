/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // 禁用 WebAssembly 相关功能
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: false,
    }

    // 修改 webpack 的哈希方法
    config.output = {
      ...config.output,
      hashFunction: 'xxhash64',  // 使用替代的哈希函数
      hashDigest: 'hex'
    }

    return config
  },
  experimental: {
    // 完全禁用所有实验性功能
    webpackBuildWorker: false,
    parallelServerBuildTraces: false,
    parallelServerCompiles: false,
    swcMinify: true, // 使用 SWC 进行压缩
  },
}

export default nextConfig