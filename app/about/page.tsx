'use client'

import { Layout } from '@/components/layout'
import Head from 'next/head'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { HiMusicNote, HiGlobeAlt } from 'react-icons/hi'
import Link from 'next/link'
import Image from 'next/image'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal'
import { Suspense } from 'react'
import { MapLibreMap } from './MapComponent'
import { TechStack } from './tech-stack'
import { Badge } from '@/components/ui/badge'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1] as any
    }
  }
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1] as any
    }
  }
}

export default function AboutPage() {
  const playlistId = "7gRzSkYJkMPCNilm32UG6Y";
  const spotifyEmbedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <>
      <Head>
        <title>About Me - Kaichin Kong</title>
        <meta name="description" content="Learn more about Kaichin Kong - Computer Science graduate student at UC San Diego, former Industrial Design student at Zhejiang University, passionate about LLM infrastructure and gaming." />
        <meta name="keywords" content="about me, Kaichin Kong, Kaiqin Kong, 孔楷钦, UC San Diego, Zhejiang University, computer science, industrial design, LLM infrastructure, gaming, esports" />
        <link rel="canonical" href="https://h1yori233.github.io/about" />
      </Head>
      <Layout
        title="About Me"
        description="Get to know me better - my background, interests, and journey."
      >
        <div className="max-w-none mx-auto space-y-0 py-8 overflow-hidden">

          {/* Hero Section - Asymmetrical Split */}
          <motion.section
            className="min-h-[70vh] flex items-center relative py-16"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Diagonal Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-primary/5 to-transparent transform rotate-12 origin-top-right"></div>
              <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-gradient-to-tr from-accent/10 to-transparent transform -rotate-6 origin-bottom-left"></div>
            </div>

            <div className="relative z-10 grid grid-cols-12 gap-8 w-full max-w-7xl mx-auto px-4">
              {/* Terminal Section - Left Side (7 columns) */}
              <div className="col-span-12 lg:col-span-7 flex items-center">
                <Terminal className="w-full shadow-2xl h-[320px] lg:h-[400px]">
                  <AnimatedSpan delay={200} className="block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ whoami</AnimatedSpan>
                  <TypingAnimation delay={400} duration={15} className="text-emerald-400 font-semibold">孔楷钦 (Kaiqin Kong)</TypingAnimation>
                  <AnimatedSpan delay={800} className="mt-4 block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cat about.md</AnimatedSpan>
                  <div className="whitespace-normal break-words">
                    <TypingAnimation delay={1000} duration={5} className="text-gray-800 dark:text-gray-300 leading-relaxed block">Hi there! I'm Kaiqin Kong (孔楷钦), an incoming CS graduate student at UC San Diego (CS75).</TypingAnimation>
                    <TypingAnimation delay={1500} duration={5} className="text-gray-800 dark:text-gray-300 leading-relaxed block">Prior to this, I obtained a Bachelor of Engineering in Industrial Design at Zhejiang University.</TypingAnimation>
                    <TypingAnimation delay={2000} duration={5} className="text-gray-800 dark:text-gray-300 leading-relaxed block">I'm interested in LLM infrastructure and ML systems, building scalable and optimized AI systems.</TypingAnimation>
                  </div>
                  <AnimatedSpan delay={2800} className="mt-4 block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cv</AnimatedSpan>
                  <AnimatedSpan delay={3000} className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors block"><Link href="/pdfs/cv.pdf" target="_blank" rel="noopener noreferrer">Kaichin's CV</Link></AnimatedSpan>
                </Terminal>
              </div>

              {/* Profile Section - Right Side (5 columns, offset) */}
              <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center space-y-8 lg:mt-8">
                <div className="relative">
                  <div className="w-64 h-64 relative rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/images/avatar.png"
                      alt="Kaiqin Kong"
                      fill
                      priority
                      sizes="256px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-background border-2 border-primary rounded-full p-4 shadow-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex justify-center gap-6">
                  <Link href="https://github.com/H1yori233" target="_blank" className="p-3 bg-background border border-border rounded-xl transition-all hover:scale-110 hover:shadow-lg"><FaGithub className="h-6 w-6" style={{ color: '#333333' }} /></Link>
                  <Link href="https://linkedin.com" target="_blank" className="p-3 bg-background border border-border rounded-xl transition-all hover:scale-110 hover:shadow-lg"><FaLinkedin className="h-6 w-6" style={{ color: '#0077b5' }} /></Link>
                  <Link href="mailto:k1kong@ucsd.edu" className="p-3 bg-background border border-border rounded-xl transition-all hover:scale-110 hover:shadow-lg"><MdEmail className="h-6 w-6" style={{ color: '#EA4335' }} /></Link>
                  <Link href="https://www.behance.net/kaiqinkong" target="_blank" className="p-3 bg-background border border-border rounded-xl transition-all hover:scale-110 hover:shadow-lg"><FaBehance className="h-6 w-6" style={{ color: '#131313' }} /></Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Combined Tech Stack & Hobbies Section - Desktop Side by Side */}
          <motion.section
            className="py-16 relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
          >
            {/* Flowing organic shapes */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-muted/30 to-transparent transform -skew-y-1 origin-top-left"></div>
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-primary/5 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/4"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16">
              <div className="grid grid-cols-12 gap-8 xl:gap-12 items-start">

                {/* Tech Stack - Left Side */}
                <div className="col-span-12 lg:col-span-5 xl:col-span-4">
                  <TechStack />
                </div>

                {/* Hobbies - Right Side */}
                <div className="col-span-12 lg:col-span-7 xl:col-span-8 space-y-8 flex flex-col justify-start">
                  <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-light tracking-tight mb-4">Hobbies & Passions</h2>
                    <p className="text-body-large text-muted-foreground">Gaming, music, and creative pursuits that fuel my passion for technology.</p>
                  </div>

                  {/* Gaming Cards Grid */}
                  <motion.div
                    className="grid grid-cols-12 gap-4 lg:gap-6 mb-8"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-150px" }}
                  >
                    {/* Gaming Card */}
                    <motion.div variants={cardItemVariants} className="col-span-12 md:col-span-7">
                      <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                        <CardContent className="p-0">
                          <div className="relative h-48 lg:h-56 overflow-hidden">
                            <Image
                              src="/images/others/overwatch.png"
                              alt="Overwatch Game"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              style={{ objectFit: 'cover' }}
                              className="transition-transform group-hover:scale-105 duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground mb-2">Gaming & Esports</Badge>
                              <h3 className="text-lg font-medium text-white mb-2">Overwatch</h3>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Indie Games Card */}
                    <motion.div variants={cardItemVariants} className="col-span-12 md:col-span-5">
                      <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                        <CardContent className="p-0">
                          <div className="relative h-48 lg:h-56 overflow-hidden">
                            <Image
                              src="/images/others/chronoark.png"
                              alt="ChronoArk Game"
                              fill
                              sizes="(max-width: 768px) 100vw, 30vw"
                              style={{ objectFit: 'cover' }}
                              className="transition-transform group-hover:scale-105 duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground mb-2">Indie Games</Badge>
                              <h3 className="text-lg font-medium text-white mb-2">Roguelike & Strategy</h3>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>

                  {/* Music Section */}
                  <motion.div variants={cardItemVariants}>
                    <div className="text-center lg:text-left mb-6">
                      <h3 className="text-2xl font-light tracking-tight mb-2">Music That Inspires Me</h3>
                      <p className="text-body text-muted-foreground">Coding soundtracks and creative fuel</p>
                    </div>
                    <Card className="overflow-hidden shadow-xl">
                      <CardContent className="p-0 aspect-video">
                        <Suspense fallback={
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <HiMusicNote className="w-12 h-12 mx-auto mb-2" />
                              <p>Loading music playlist...</p>
                            </div>
                          </div>
                        }>
                          <iframe
                            src={spotifyEmbedUrl}
                            width="100%"
                            height="100%"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="w-full h-full"
                            style={{ border: 'none' }}
                          />
                        </Suspense>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.section>

          {/* Journey Section - Split Layout with Map */}
          <motion.section
            className="py-24 relative"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
          >
            {/* Diagonal separator */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-bl from-accent/20 to-transparent transform skew-y-1 origin-top-right"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16">
              <div className="grid grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Text Content */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                  <h2 className="text-heading-2 font-light tracking-tight">My Journey</h2>
                  <div className="space-y-4 text-body-large text-muted-foreground leading-relaxed">
                    <p>I come from a small county in Yunnan Province and am proud to be the first generation in my family to attend university.</p>
                    <p>Thanks to China's college entrance examination system, I was able to earn my place at a university in Hangzhou through hard work and determination.</p>
                    <p>Now, I have the opportunity to study and work in California, continuing my journey in technology and design.</p>
                  </div>
                </div>

                {/* Map - Larger Window */}
                <motion.div variants={cardItemVariants} className="col-span-12 lg:col-span-7">
                  <Card className="overflow-hidden shadow-2xl transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                    <CardContent className="p-6">
                      <div className="h-[500px] rounded-xl overflow-hidden">
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
              </div>
            </div>
          </motion.section>

        </div>
      </Layout>
    </>
  )
}