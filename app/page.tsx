'use client'

import { Layout } from '@/components/layout'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// 动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 flex items-center justify-center">
            <span>Design</span>
            <span className="relative mx-3 sm:mx-2 md:mx-3 lg:mx-4 font-light">
              <span className={cn(
                "absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]",
                "animate-gradient"
              )}>
                X
              </span>
              <span className="opacity-0">X</span>
            </span>
            <span>Technology</span>
          </h1>
        </motion.div>
      </div>
    </Layout>
  )
}

