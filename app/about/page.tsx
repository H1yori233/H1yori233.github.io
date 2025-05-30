'use client'

import { Layout } from '@/components/layout'
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function AboutPage() {
  return (
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
              <div className="flex-shrink-0 w-64 h-64 relative rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/images/avatar.png"
                  alt="Kaiqin Kong"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 192px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex justify-center gap-5 mt-2">
                <Link href="https://github.com/H1yori233" target="_blank" className="transition-transform hover:scale-110">
                  <FaGithub className="h-6 w-6" style={{ color: '#333333' }} />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="transition-transform hover:scale-110">
                  <FaLinkedin className="h-6 w-6" style={{ color: '#0077b5' }} />
                </Link>
                <Link href="mailto:k1kong@ucsd.edu" className="transition-transform hover:scale-110">
                  <MdEmail className="h-6 w-6" style={{ color: '#EA4335' }} />
                </Link>
                <Link href="https://www.behance.net/kaiqinkong" target="_blank" className="transition-transform hover:scale-110">
                  <FaBehance className="h-6 w-6" style={{ color: '#131313' }} />
                </Link>
              </div>
            </div>
            
            <Terminal className="flex-1 shadow-lg mx-auto max-w-4xl h-[300px]">
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
                  I'm passionate about combining technical expertise with creative design to build innovative solutions.
                </TypingAnimation>
              </div>
              
              <AnimatedSpan delay={2800} className="mt-4 block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ <span className="animate-pulse">_</span>
              </AnimatedSpan>
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
              My technical expertise spans across multiple domains, from low-level systems programming to modern web development, 
              with a focus on graphics programming, game development, and AI applications.
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
                      style={{objectFit: 'cover'}}
                      className="transition-transform group-hover:scale-110 duration-500"
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
                      style={{objectFit: 'cover'}}
                      className="transition-transform group-hover:scale-110 duration-500"
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
                  <iframe
                    src="https://open.spotify.com/embed/playlist/7gRzSkYJkMPCNilm32UG6Y?utm_source=generator"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full h-full"
                  />
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
                  <MapLibreMap />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
  )
}

