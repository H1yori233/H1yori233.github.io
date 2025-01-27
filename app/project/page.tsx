'use client'

import { useState, useEffect, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
// import { ProjectCard } from '@/components/projects'
// import { TagFilter } from '@/components/TagFilter'
import { motion } from 'framer-motion'
// import { Project, loadContent } from '@/lib/utils'

// 临时类型定义
interface Project {
  title: string;
  description: string;
  slug: string;
  tags: string[];
}

// 临时函数定义
const loadContent = async <T,>(type: string): Promise<T[]> => {
  // TODO: 实现加载逻辑
  return [] as T[];
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    loadContent<Project>('projects').then(setProjects)
  }, [])

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
      title="Project"
      description="Here are some of the projects I've worked on. Feel free to explore and learn more about each one."
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xl w-full"
          />
          {/* <TagFilter 
            tags={allTags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          /> */}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* <ProjectCard project={project} /> */}
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

