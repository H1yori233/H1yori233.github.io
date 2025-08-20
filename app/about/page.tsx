'use client'

import { Layout } from '@/components/layout'
import Head from 'next/head'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdSchool, MdWork } from 'react-icons/md'
import { HiAcademicCap, HiHeart, HiMusicNote, HiGlobeAlt, HiCode } from 'react-icons/hi'
import Link from 'next/link'
import Image from 'next/image'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal'
import { useEffect, useRef, useState } from 'react'
import { MapLibreMap } from './MapComponent'
import { TechStack } from '@/components/tech-stack'
import { Suspense } from 'react'

// Animation variants with reduced motion support
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
}

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Me - Kaichin Kong</title>
        <meta name="description" content="Learn more about Kaichin Kong - Computer Science graduate student at UC San Diego, former Industrial Design student at Zhejiang University, passionate about LLM infrastructure and gaming." />
        <meta name="keywords" content="about me, Kaichin Kong, Kaiqin Kong, 孔楷钦, UC San Diego, Zhejiang University, computer science, industrial design, LLM infrastructure, gaming, esports" />

        {/* Open Graph */}
        <meta property="og:title" content="About Me - Kaichin Kong" />
        <meta property="og:description" content="Learn more about Kaichin Kong - Computer Science graduate student at UC San Diego, former Industrial Design student at Zhejiang University, passionate about LLM infrastructure and gaming." />
        <meta property="og:image" content="/images/avatar.png" />
        <meta property="og:url" content="https://h1yori233.github.io/about" />
        <meta property="og:type" content="profile" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Me - Kaichin Kong" />
        <meta name="twitter:description" content="Learn more about Kaichin Kong - Computer Science graduate student at UC San Diego, former Industrial Design student at Zhejiang University, passionate about LLM infrastructure and gaming." />
        <meta name="twitter:image" content="/images/avatar.png" />

        <link rel="canonical" href="https://h1yori233.github.io/about" />
      </Head>
      <Layout
        title="About Me"
        description="Get to know me better - my background, interests, and journey."
      >
      <motion.div
        className="max-w-7xl mx-auto space-y-20 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section - Introduction */}
        <motion.section
          className="prose dark:prose-invert lg:prose-lg mx-auto px-4"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/images/avatar.png"
                  alt="Kaiqin Kong"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 256px"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjggMTkyQzE2MC4wMzIgMTkyIDE4NiAxNjYuMDMyIDE4NiAxMzRDMTg2IDEwMS45NjggMTYwLjAzMiA3NiAxMjggNzZDOTUuOTY4IDc2IDcwIDEwMS45NjggNzAgMTM0QzcwIDE2Ni4wMzIgOTUuOTY4IDE5MiAxMjggMTkyWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
                  }}
                />
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <Link href="https://github.com/H1yori233" target="_blank" className="p-2 transition-transform hover:scale-110 touch-manipulation">
                  <FaGithub className="h-6 w-6" style={{ color: '#333333' }} />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="p-2 transition-transform hover:scale-110 touch-manipulation">
                  <FaLinkedin className="h-6 w-6" style={{ color: '#0077b5' }} />
                </Link>
                <Link href="mailto:k1kong@ucsd.edu" className="p-2 transition-transform hover:scale-110 touch-manipulation">
                  <MdEmail className="h-6 w-6" style={{ color: '#EA4335' }} />
                </Link>
                <Link href="https://www.behance.net/kaiqinkong" target="_blank" className="p-2 transition-transform hover:scale-110 touch-manipulation">
                  <FaBehance className="h-6 w-6" style={{ color: '#131313' }} />
                </Link>
              </div>
            </div>

            <Terminal className="flex-1 shadow-lg mx-auto max-w-4xl h-[280px] md:h-[300px]">
              <AnimatedSpan delay={200} className="block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ whoami
              </AnimatedSpan>

              <TypingAnimation delay={400} duration={15} className="text-emerald-400 font-semibold">
                孔楷钦 (Kaiqin Kong)
              </TypingAnimation>

              <AnimatedSpan delay={800} className="mt-4 block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cat about.md
              </AnimatedSpan>

              <div className="whitespace-normal break-words">
                <TypingAnimation delay={1000} duration={5} className="text-gray-800 leading-relaxed block">
                  Hi there! I'm Kaiqin Kong (孔楷钦), an incoming CS graduate student at UC San Diego (CS75).
                </TypingAnimation>

                <TypingAnimation delay={1500} duration={5} className="text-gray-800 leading-relaxed block">
                  Prior to this, I obtained a Bachelor of Engineering in Industrial Design at Zhejiang University.
                </TypingAnimation>

                <TypingAnimation delay={2000} duration={5} className="text-gray-800 leading-relaxed block">
                  I'm interested in LLM infrastructure and ML systems, building scalable and optimized AI systems.
                </TypingAnimation>
              </div>

              <AnimatedSpan delay={2800} className="mt-4 block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cv
              </AnimatedSpan>

              <AnimatedSpan delay={3000} className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors block">
                <Link href="/pdfs/cv.pdf" target="_blank" rel="noopener noreferrer">
                  Kaichin's CV
                </Link>
              </AnimatedSpan>

              {/* <AnimatedSpan delay={3500} className="mt-4 block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ <span className="animate-pulse">_</span>
              </AnimatedSpan> */}
            </Terminal>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          className="px-4"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiCode className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold tracking-tight">Technical Skills</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              My technical expertise spans across AI/ML infrastructure, GPU computing, and systems programming,
              with a focus on LLM training, inference optimization, and high-performance computing for large language models.
            </p>
          </div>

          <TechStack />
        </motion.section>

        {/* Hobbies Section */}
        <motion.section
          className="px-4"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiHeart className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold tracking-tight">Hobbies & Interests</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In my free time, I enjoy listening to music and playing video games. I'm particularly passionate about gaming and esports.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gaming Section */}
            <motion.div variants={cardVariants}>
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/images/others/overwatch.png"
                      alt="Overwatch Game"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform group-hover:scale-110 duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                        Gaming & Esports
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Overwatch Enthusiast</h3>
                    <p className="text-muted-foreground">
                      I'm an avid Overwatch fan and currently serve as the manager of the ZJU Overwatch discussion group.
                      My journey with Overwatch esports began in 2016, and in-game I primarily play the flex role at around Diamond rank.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Indie Games Section */}
            <motion.div variants={cardVariants}>
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/images/others/chronoark.png"
                      alt="ChronoArk Game"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform group-hover:scale-110 duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
                        Indie Games
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Roguelike & Strategy</h3>
                    <p className="text-muted-foreground">
                      I have a soft spot for indie titles, especially roguelikes and card-based games like Slay the Spire and Into the Breach.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Currently exploring <span className="font-medium text-foreground">ChronoArk</span> - a tactical RPG that blends roguelike progression with deck-building mechanics.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Music Section */}
        <motion.section
          className="px-4"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiMusicNote className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold tracking-tight">Music That Inspires Me</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This playlist has accompanied me through countless hours of programming and design. Each song carries a unique story and emotion.
            </p>
          </div>

          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="aspect-video max-w-5xl mx-auto">
                  <Suspense fallback={
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <HiMusicNote className="w-12 h-12 mx-auto mb-2" />
                        <p>Loading music playlist...</p>
                      </div>
                    </div>
                  }>
                    <iframe
                      src="https://open.spotify.com/embed/playlist/7gRzSkYJkMPCNilm32UG6Y?utm_source=generator"
                      width="100%"
                      height="100%"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full h-full"
                      onError={() => {
                        // Fallback content will be handled by the iframe's natural error handling
                      }}
                    />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Journey Section */}
        <motion.section
          className="px-4"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiGlobeAlt className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold tracking-tight">My Journey</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I come from a small county in Yunnan Province and am proud to be the first generation in my family to attend university.
              Thanks to China's college entrance examination system, I was able to earn my place at a university in Hangzhou through hard work and determination.
              Now, I have the opportunity to study and work in California.
            </p>
          </div>

          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-6">
                <div className="h-96 rounded-lg overflow-hidden">
                  <Suspense fallback={
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <HiGlobeAlt className="w-12 h-12 mx-auto mb-2" />
                        <p>Loading interactive map...</p>
                      </div>
                    </div>
                  }>
                    <MapLibreMap />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
    </>
  )
}

