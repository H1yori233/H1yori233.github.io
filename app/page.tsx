'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import { TechStack } from '@/components/tech-stack'
import { Terminal, AnimatedSpan, TypingAnimation } from '@/components/magicui/terminal'
import { TextScramble } from '@/components/magicui/text-scramble'
import { ProjectCard } from '@/components/project/projects'
import { projectList } from '@/components/project/projectData'
import { Star, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Top Bar Component (logo only)
const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background',
        isScrolled ? 'backdrop-blur-sophisticated border-b' : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="content-grid">
        <div className="flex h-20 items-center">
          <Link href="/" className="group relative">
            <motion.span
              className="text-heading-3 font-medium tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              KAICHIN
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-foreground origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}


// Scroll to Top Component
const ScrollToTop = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        className="fixed bottom-8 right-8 z-50 btn-primary p-3 rounded-full shadow-xl"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </motion.button>
    )}
  </AnimatePresence>
)

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any } }
}

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false)

  const filteredProjects = useMemo(() => {
    return projectList.filter(project => !showFeaturedOnly || project.featured)
  }, [showFeaturedOnly])

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTopVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-grow pt-20 w-full">
        {/* Hero Section */}
        <motion.section
          className="h-[calc(100vh-12rem)] flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
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

        <div className="section-padding">
          <div className="content-grid space-y-16">

            {/* Profile and Terminal Section */}
            <motion.section
              className="relative overflow-hidden"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Background subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px), linear-gradient(180deg, hsl(var(--border)) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-start py-8">
                {/* Left Column: Profile Image and Social Links */}
                <motion.div
                  className="lg:col-span-2 flex flex-col items-center justify-center h-[400px] space-y-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                >
                  {/* Profile Image */}
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <div className="w-64 h-64 rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm">
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/headshot_B&W.png"
                          alt="Kaiqin Kong"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover"
                          priority
                        />
                        <Image
                          src="/images/headshot.png"
                          alt="Kaiqin Kong"
                          width={256}
                          height={256}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        />
                      </div>
                    </div>

                    {/* Subtle floating effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/5 via-rose-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        boxShadow: [
                          "0 0 0 0px rgba(139, 92, 246, 0)",
                          "0 0 0 8px rgba(139, 92, 246, 0.02)",
                          "0 0 0 0px rgba(139, 92, 246, 0)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Name */}
                  <motion.h1
                    className="text-heading-2 font-light text-foreground tracking-tight text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Kaiqin Kong
                  </motion.h1>

                  {/* Social Links */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-3 max-w-xs mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    {[
                      { href: "https://github.com/H1yori233", icon: FaGithub, label: "GitHub", color: "group-hover:text-gray-900 dark:group-hover:text-white" },
                      { href: "https://www.linkedin.com/in/kaiqin-kong/", icon: FaLinkedin, label: "LinkedIn", color: "group-hover:text-blue-600" },
                      { href: "mailto:k1kong@ucsd.edu", icon: MdEmail, label: "Email", color: "group-hover:text-red-500" },
                      { href: "https://www.behance.net/kaiqinkong", icon: FaBehance, label: "Behance", color: "group-hover:text-blue-500" }
                    ].map(({ href, icon: Icon, label, color }, index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                      >
                        <Link
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : "_blank"}
                          rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                          className="group relative flex items-center justify-center p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/50 hover:border-border transition-all duration-300 hover:scale-105 hover:shadow-md flex-shrink-0"
                          aria-label={label}
                        >
                          <Icon className={`w-6 h-6 text-muted-foreground transition-colors duration-300 flex-shrink-0 ${color}`} />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Column: Terminal */}
                <motion.div
                  className="lg:col-span-3 w-full"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Terminal className="w-full shadow-xl h-[400px]">
                    <AnimatedSpan delay={200} className="block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ whoami</AnimatedSpan>
                    <TypingAnimation delay={400} duration={15} className="text-emerald-400 font-semibold">Kaiqin Kong</TypingAnimation>
                    <AnimatedSpan delay={800} className="mt-4 block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cat about.md</AnimatedSpan>
                    <div className="whitespace-normal break-words">
                      <TypingAnimation delay={1000} duration={5} className="text-foreground leading-relaxed block">Hi there! I'm Kaiqin Kong, an incoming CS graduate student at UC San Diego (CS75).</TypingAnimation>
                      <TypingAnimation delay={1500} duration={5} className="text-foreground leading-relaxed block">Prior to this, I obtained a Bachelor of Engineering in Industrial Design at Zhejiang University.</TypingAnimation>
                      <TypingAnimation delay={2000} duration={5} className="text-foreground leading-relaxed block">I'm interested in LLM infrastructure and ML systems, building scalable and optimized AI systems.</TypingAnimation>
                    </div>
                    <AnimatedSpan delay={2800} className="mt-4 block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cv</AnimatedSpan>
                    <AnimatedSpan delay={3000} className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors block"><Link href="/pdfs/cv.pdf" target="_blank" rel="noopener noreferrer">Kaichin's CV</Link></AnimatedSpan>
                  </Terminal>
                </motion.div>
              </div>
            </motion.section>

            {/* Technical Skills */}
            <motion.section
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <TechStack />
            </motion.section>

            {/* Projects Section */}
            <motion.section
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-t border-border pt-8">
                <h2 className="text-heading-3 font-light text-foreground">Featured Projects</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant={showFeaturedOnly ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className={cn(
                      "h-8 px-3 text-xs font-medium transition-all duration-300 rounded-md",
                      showFeaturedOnly
                        ? "bg-foreground text-background"
                        : "border-border/60 hover:border-border hover:bg-accent/50"
                    )}
                  >
                    <Star className="w-3 h-3 mr-1.5" />
                    Featured
                  </Button>
                  <div className="flex gap-1 bg-muted/60 rounded-md p-1">
                    {[
                      { mode: 'grid' as const, icon: Grid },
                      { mode: 'list' as const, icon: List }
                    ].map(({ mode, icon: Icon }) => (
                      <Button
                        key={mode}
                        variant={viewMode === mode ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode(mode)}
                        className={cn(
                          "h-6 px-2 text-xs transition-all duration-200 rounded-sm",
                          viewMode === mode
                            ? "bg-background shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="w-3 h-3" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Projects */}
              {!showFeaturedOnly && featuredProjects.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "transition-all duration-500",
                    viewMode === 'grid'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  )}
                >
                  {featuredProjects.slice(0, 6).map((project) => (
                    <motion.div key={project.slug} variants={itemVariants}>
                      <ProjectCard project={project} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* All Projects when showing featured only */}
              {showFeaturedOnly && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "transition-all duration-500",
                    viewMode === 'grid'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  )}
                >
                  {featuredProjects.map((project) => (
                    <motion.div key={project.slug} variants={itemVariants}>
                      <ProjectCard project={project} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Other Projects */}
              {!showFeaturedOnly && regularProjects.length > 0 && (
                <>
                  <h3 className="text-lg font-light text-foreground/80 mt-12 mb-6">Other Projects</h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                      "transition-all duration-500",
                      viewMode === 'grid'
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "flex flex-col gap-4"
                    )}
                  >
                    {regularProjects.slice(0, 6).map((project) => (
                      <motion.div key={project.slug} variants={itemVariants}>
                        <ProjectCard project={project} viewMode={viewMode} />
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </motion.section>


          </div>
        </div>
      </main>

      {/* Scroll to Top */}
      <ScrollToTop isVisible={isScrollTopVisible} />
    </div>
  )
}