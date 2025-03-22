'use client'

import { Layout } from '@/components/layout'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TextAnimate } from '@/components/magicui/text-animate'
import { AuroraText } from '@/components/magicui/aurora-text'

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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl flex items-center justify-center gap-1 md:gap-4">
            <TextAnimate 
              animation="blurInUp" 
              duration={0.2} 
              delay={0.1}
              by="character"
              className="font-bold mr-3"
            >
              Design
            </TextAnimate>
            <div className="animate-fadeIn opacity-0" 
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <span className="pointer-events-none z-10 whitespace-pre-wrap 
                bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] 
                bg-clip-text text-center text-7xl font-medium leading-none tracking-tighter 
                text-transparent">
                X
              </span>
            </div>
            <TextAnimate 
              animation="blurInUp" 
              duration={0.15} 
              delay={0.5}
              by="character"
              className="font-bold ml-3"
            >
              Technology
            </TextAnimate>
          </h1>
        </motion.div>
      </div>
    </Layout>
  )
}

