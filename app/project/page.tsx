'use client'

import { useState, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { ProjectCard, Project } from '@/components/projects'
import { motion } from 'framer-motion'
import { projectList } from './projectData'

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const projects = projectList;

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })
  }, [projects, searchQuery])

  return (
    <Layout
      title="Projects"
      description="Here are some of the projects I've worked on. Feel free to explore and learn more about each one."
    >
      <div className="space-y-6 mb-12">
        <div className="flex flex-col items-center gap-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xl w-full"
          />
        </div>
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

