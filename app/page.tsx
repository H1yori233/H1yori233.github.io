'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense, useState, useMemo, useEffect } from 'react'
import { MapLibreMap } from '@/components/MapComponent'
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

            {/* Profile Section */}
            <motion.section
              className="text-center md:text-left"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="mb-8 flex flex-col items-center md:flex-row md:items-center md:justify-center gap-8">
                <div className="w-64 h-64 mb-6 md:mb-0 rounded-full overflow-hidden border border-border/60 flex-shrink-0">
                  <Image
                    src="/images/headshot_B&W.png"
                    alt="Kaiqin Kong"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <h1 className="text-heading-2 font-light text-foreground mb-2">Kaiqin Kong</h1>
                  <p className="text-heading-3 text-muted-foreground mb-4">孔楷钦</p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <Link
                      href="https://github.com/H1yori233"
                      target="_blank"
                      className="btn-ghost p-2 rounded-lg"
                      aria-label="GitHub"
                    >
                      <FaGithub className="w-8 h-8" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/kaiqin-kong/"
                      target="_blank"
                      className="btn-ghost p-2 rounded-lg"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-8 h-8" />
                    </Link>
                    <Link
                      href="mailto:k1kong@ucsd.edu"
                      className="btn-ghost p-2 rounded-lg"
                      aria-label="Email"
                    >
                      <MdEmail className="w-8 h-8" />
                    </Link>
                    <Link
                      href="https://www.behance.net/kaiqinkong"
                      target="_blank"
                      className="btn-ghost p-2 rounded-lg"
                      aria-label="Behance"
                    >
                      <FaBehance className="w-8 h-8" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Terminal Introduction */}
            <motion.section
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <Terminal className="w-full shadow-xl h-[320px] lg:h-[400px]">
                <AnimatedSpan delay={200} className="block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ whoami</AnimatedSpan>
                <TypingAnimation delay={400} duration={15} className="text-emerald-400 font-semibold">孔楷钦 (Kaiqin Kong)</TypingAnimation>
                <AnimatedSpan delay={800} className="mt-4 block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cat about.md</AnimatedSpan>
                <div className="whitespace-normal break-words">
                  <TypingAnimation delay={1000} duration={5} className="text-foreground leading-relaxed block">Hi there! I'm Kaiqin Kong (孔楷钦), an incoming CS graduate student at UC San Diego (CS75).</TypingAnimation>
                  <TypingAnimation delay={1500} duration={5} className="text-foreground leading-relaxed block">Prior to this, I obtained a Bachelor of Engineering in Industrial Design at Zhejiang University.</TypingAnimation>
                  <TypingAnimation delay={2000} duration={5} className="text-foreground leading-relaxed block">I'm interested in LLM infrastructure and ML systems, building scalable and optimized AI systems.</TypingAnimation>
                </div>
                <AnimatedSpan delay={2800} className="mt-4 block"><span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cv</AnimatedSpan>
                <AnimatedSpan delay={3000} className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors block"><Link href="/pdfs/cv.pdf" target="_blank" rel="noopener noreferrer">Kaichin's CV</Link></AnimatedSpan>
              </Terminal>
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

            {/* Location */}
            <motion.section
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-heading-3 font-light text-foreground mb-6 border-t border-border pt-8">Journey</h2>
              <div className="space-y-4 text-body text-muted-foreground leading-relaxed mb-4">
                <p>I come from a small county in Yunnan Province and am proud to be the first generation in my family to attend university.</p>
                <p>Thanks to China's college entrance examination system, I was able to earn my place at a university in Hangzhou through hard work and determination.</p>
                <p>Now, I have the opportunity to study and work in California, continuing my journey in technology and design.</p>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden border border-border mb-4">
                <Suspense fallback={
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="w-8 h-8 mx-auto mb-2 border border-border rounded-full" />
                      <p className="text-caption">Loading map...</p>
                    </div>
                  </div>
                }>
                  <MapLibreMap />
                </Suspense>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      {/* Scroll to Top */}
      <ScrollToTop isVisible={isScrollTopVisible} />
    </div>
  )
}