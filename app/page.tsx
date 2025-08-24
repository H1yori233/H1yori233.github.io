'use client'

import { Layout } from '@/components/layout'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextScramble } from '@/components/magicui/text-scramble'
import Head from 'next/head'
import { useRef } from 'react'

// Main Homepage Component
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      <Head>
        <title>Kaichin Kong - Design × Technology</title>
        <meta name="description" content="Computer Science graduate student at UC San Diego passionate about LLM infrastructure, ML systems, and innovative design solutions." />
        <meta name="keywords" content="portfolio, computer science, machine learning, design, UC San Diego, Zhejiang University, LLM infrastructure, Kaichin Kong, Kaiqin Kong, 孔楷钦" />

        {/* Open Graph */}
        <meta property="og:title" content="Kaichin Kong - Design × Technology" />
        <meta property="og:description" content="Computer Science graduate student at UC San Diego passionate about LLM infrastructure, ML systems, and innovative design solutions." />
        <meta property="og:image" content="/images/avatar.png" />
        <meta property="og:url" content="https://h1yori233.github.io" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kaichin Kong - Design × Technology" />
        <meta name="twitter:description" content="Computer Science graduate student at UC San Diego passionate about LLM infrastructure, ML systems, and innovative design solutions." />
        <meta name="twitter:image" content="/images/avatar.png" />

        <link rel="canonical" href="https://h1yori233.github.io" />
      </Head>

      <Layout customNav={false} fullWidth={true}>
        <motion.section
          ref={containerRef}
          className="h-[calc(100vh-20rem)] flex items-center justify-center relative overflow-hidden"
          style={{ opacity }}
        >
          {/* Background Grid - Subtle */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <motion.div
            className="content-grid relative z-10"
            style={{ y }}
          >
            <div className="text-center space-y-12 max-w-5xl mx-auto">
              {/* Main Heading */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="text-display flex items-center justify-center flex-wrap gap-4 md:gap-8">
                  <TextScramble
                    text="Design"
                    className="font-light tracking-tight"
                    charChangeCount={16}
                    charChangeSpeed={60}
                    delay={100}
                  />

                  <motion.span
                    className="relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.5,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                  >
                    <span className="pointer-events-none whitespace-pre-wrap 
                      bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 
                      bg-clip-text text-transparent font-medium">
                      ×
                    </span>

                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 blur-xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 opacity-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.1, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.span>

                  <TextScramble
                    text="Technology"
                    className="font-light tracking-tight"
                    charChangeCount={20}
                    charChangeSpeed={55}
                    delay={300}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </Layout>
    </>
  )
}