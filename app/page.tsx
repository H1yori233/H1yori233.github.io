'use client'

import { Button } from '@/components/ui/button'
import { Layout } from '@/components/layout'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 flex items-center justify-center">
            <span>Design</span>
            <span className="relative mx-3 sm:mx-2 md:mx-3 lg:mx-4 font-light">
              <span className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]">
                X
              </span>
              <span className="opacity-0">X</span>
            </span>
            <span>Technology</span>
          </h1>
          {/* <div className="flex justify-center space-x-6">
            <Button asChild size="lg" className="text-lg px-6 py-3">
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" asChild size="lg" className="text-lg px-6 py-3">
              <a href="#contact">Contact Me</a>
            </Button>
          </div> */}
        </motion.div>
      </div>
    </Layout>
  )
}

