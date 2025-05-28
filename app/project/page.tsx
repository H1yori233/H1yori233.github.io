'use client'

import { useState, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard, Project } from '@/components/projects'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, Star } from 'lucide-react'
import { projectList } from './projectData'

// Animation configuration
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const projects = projectList;

  // Filter projects based on search query and featured status
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFeatured = !showFeaturedOnly || project.featured

      return matchesSearch && matchesFeatured
    })
  }, [projects, searchQuery, showFeaturedOnly])

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <Layout
      title="Projects"
      description="Here are some of the projects I've worked on. Feel free to explore and learn more about each one."
    >
      <div className="space-y-8 mb-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Search Bar and Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative max-w-lg w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full search-focus"
              />
            </div>
            
            {/* Featured Filter */}
            <Button
              variant={showFeaturedOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="text-sm h-10 px-4"
            >
              <Star className="w-4 h-4 mr-2" />
              Featured Only
            </Button>
            
            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-sm text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </div>
        </motion.div>

        {/* Featured Projects Section */}
        {!showFeaturedOnly && featuredProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 justify-center">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {featuredProjects.map((project) => (
                <motion.div key={project.slug} variants={itemVariants}>
                  <ProjectCard project={project} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* All Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {!showFeaturedOnly && featuredProjects.length > 0 && regularProjects.length > 0 && (
            <h2 className="text-2xl font-bold tracking-tight text-center">All Projects</h2>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${showFeaturedOnly}-${viewMode}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {(showFeaturedOnly ? featuredProjects : regularProjects).map((project) => (
                <motion.div key={project.slug} variants={itemVariants}>
                  <ProjectCard project={project} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setShowFeaturedOnly(false)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.section>
      </div>
    </Layout>
  )
}

