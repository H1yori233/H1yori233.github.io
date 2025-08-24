'use client'

import { useState, useMemo, useRef, memo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Search, Grid, List, Star, Filter, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ProjectCard, Project } from './projects'
import { projectList } from './projectData'

// Sophisticated animation orchestration
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any } }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } }
}

// Refined Filter Controls Component
const FilterControls = memo(({
  searchQuery,
  setSearchQuery,
  showFeaturedOnly,
  setShowFeaturedOnly,
  viewMode,
  setViewMode,
  resultsCount
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showFeaturedOnly: boolean
  setShowFeaturedOnly: (show: boolean) => void
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  resultsCount: number
}) => {
  return (
    <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Single-line search and filters */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
        {/* Search Interface */}
        <div className="w-full max-w-md lg:max-w-lg">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-4 h-4 transition-colors group-hover:text-muted-foreground" />
            <Input
              type="text"
              placeholder="Discover projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-body border-border/60 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-foreground/20 focus:shadow-lg rounded-lg"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: searchQuery ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <Button
              variant={showFeaturedOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={cn(
                "h-10 px-4 font-medium text-caption tracking-wide transition-all duration-300 rounded-lg whitespace-nowrap",
                showFeaturedOnly
                  ? "bg-foreground text-background shadow-lg"
                  : "border-border/60 hover:border-border hover:bg-accent/50"
              )}
            >
              <Star className="w-4 h-4 mr-2" />
              Featured
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-1 bg-muted/60 rounded-lg p-1 backdrop-blur-sm border border-border/40"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {[
              { mode: 'grid' as const, icon: Grid, label: 'Grid' },
              { mode: 'list' as const, icon: List, label: 'List' }
            ].map(({ mode, icon: Icon, label }) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode(mode)}
                className={cn(
                  "h-8 px-3 text-caption font-medium transition-all duration-200 rounded-md",
                  viewMode === mode
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Results Counter */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="text-caption text-muted-foreground tracking-wide">
          {resultsCount} {resultsCount !== 1 ? 'projects' : 'project'} found
        </span>
      </motion.div>
    </motion.section>
  )
});

FilterControls.displayName = 'FilterControls';

// Sophisticated Section Header
const SectionHeader = ({ title, icon, delay = 0 }: { title: string; icon?: React.ComponentType<any>; delay?: number }) => {
  const Icon = icon;

  return (
    <motion.div
      className="flex items-center justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {Icon && (
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="w-5 h-5 text-foreground/60" />
        </motion.div>
      )}
      <h2 className="text-heading-2 font-light tracking-tight text-foreground">
        {title}
      </h2>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const containerRef = useRef<HTMLDivElement>(null)

  // Intelligent filtering
  const filteredProjects = useMemo(() => {
    return projectList.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFeatured = !showFeaturedOnly || project.featured
      return matchesSearch && matchesFeatured
    })
  }, [searchQuery, showFeaturedOnly])

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <Layout
      title="Projects"
      description="Here are some of the projects I've worked on. Feel free to explore and learn more about each one."
    >
      <div ref={containerRef} className="space-y-16">
        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFeaturedOnly={showFeaturedOnly}
          setShowFeaturedOnly={setShowFeaturedOnly}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultsCount={filteredProjects.length}
        />

        {/* Featured Projects Section */}
        {!showFeaturedOnly && featuredProjects.length > 0 && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <SectionHeader title="Featured Projects" icon={Star} delay={0.1} />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={cn(
                "transition-all duration-500",
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-5"
              )}
            >
              {featuredProjects.map((project, index) => (
                <motion.div key={project.slug} variants={itemVariants}>
                  <ProjectCard
                    project={project}
                    viewMode={viewMode}
                    priority={index < 3}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* All Projects Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {!showFeaturedOnly && featuredProjects.length > 0 && regularProjects.length > 0 && (
            <SectionHeader title="All Projects" delay={0.2} />
          )}

          <motion.div
            key={`${showFeaturedOnly}-${viewMode}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "transition-all duration-500",
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-5"
            )}
          >
            {(showFeaturedOnly ? featuredProjects : regularProjects).map((project) => (
              <motion.div key={project.slug} variants={itemVariants}>
                <ProjectCard project={project} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>

          {/* Elegant No Results State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="text-center py-20 space-y-8"
            >
              <motion.div
                className="w-20 h-20 mx-auto rounded-full bg-muted/40 flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Search className="w-7 h-7 text-muted-foreground/60" />
              </motion.div>
              <div className="space-y-4">
                <h3 className="text-heading-3 font-light tracking-tight text-foreground">No projects found</h3>
                <p className="text-body text-muted-foreground max-w-md mx-auto">Try adjusting your search criteria or explore our featured work to discover something new.</p>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="outline"
                  onClick={() => { setSearchQuery(''); setShowFeaturedOnly(false); }}
                  className="btn-ghost border-border/60 hover:border-border hover:bg-accent/50 rounded-lg"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.section>
        
      </div>
    </Layout>
  )
}
