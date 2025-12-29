'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import { Terminal, AnimatedSpan, TypingAnimation } from '@/components/magicui/terminal'
import { ProjectCard, Project } from '@/components/project/projects'
import { getAllProjects } from '@/lib/projectLoader'
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
  const [projects, setProjects] = useState<Project[]>([])

  // Load projects from Real FS
  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => !showFeaturedOnly || project.featured)
  }, [projects, showFeaturedOnly])

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
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Ambient Background - Visual Depth */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-grow pt-20 w-full">
        <div className="pt-[var(--section-padding)] pb-8">
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

              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-20">
                {/* Left Column: Profile Image and Social Links */}
                <motion.div
                  className="lg:col-span-2 flex flex-col items-center justify-center h-full min-h-[400px] space-y-8"
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
                          src="/images/avatar.png"
                          alt="Kaiqin Kong"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover grayscale contrast-125 brightness-110 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-300"
                          priority
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

                {/* Right Column: Interactive Terminal */}
                <motion.div
                  className="lg:col-span-3 w-full"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Terminal className="w-full shadow-xl h-[400px]" />
                </motion.div>
              </div>
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




            {/* Footer / Last Updated */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-6 border-t border-border/40 text-center"
            >
              <p className="text-xs text-muted-foreground/60 font-mono">
                Last updated: December 2025
              </p>
            </motion.footer>

          </div>
        </div>
      </main>

      {/* Scroll to Top */}
      <ScrollToTop isVisible={isScrollTopVisible} />
    </div>
  )
}