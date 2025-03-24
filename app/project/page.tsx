'use client'

import { useState, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { ProjectCard, Project } from '@/components/projects'
import { TagFilter } from '@/components/tag-filter'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Sample project data - corresponding to actual files in the content directory
const sampleProjects: Project[] = [
  {
    title: "Personal Blog Website",
    description: "A personal static blog website built with Next.js and TypeScript",
    slug: "project-1",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Task Management App",
    description: "A feature-rich task management application supporting multi-user collaboration and real-time updates",
    slug: "project-2",
    tags: ["React", "Redux", "Firebase", "Full-stack"]
  },
  {
    title: "InnoWeaver",
    description: "A full-stack web application research project at International Design Institute of Zhejiang University, featuring user management, document data management, and LLM-powered content generation",
    slug: "innoweaver",
    tags: ["FastAPI", "MongoDB", "NextJS", "TypeScript", "LLM"]
  }
];

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const projects = sampleProjects;

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    projects.forEach(project => {
      project.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [projects])

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Filter projects based on search query and selected tags
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [projects, searchQuery, selectedTags])

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
          <TagFilter 
            tags={allTags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
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

