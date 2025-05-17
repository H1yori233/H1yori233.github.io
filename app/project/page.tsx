'use client'

import { useState, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { ProjectCard, Project } from '@/components/projects'
import { motion } from 'framer-motion'

// Sample project data - corresponding to actual files in the content directory
const sampleProjects: Project[] = [
  {
    title: "Personal Blog Website",
    description: "A personal static blog website built with Next.js and TypeScript",
    slug: "project-1",
    image: "/images/projects/blog-website.png"
  },
  {
    title: "InnoWeaver",
    description: "A full-stack web application research project at International Design Institute of Zhejiang University, featuring user management, document data management, and LLM-powered content generation",
    slug: "innoweaver",
    image: "/images/projects/innoweaver.png"
  },
  {
    title: "Lajolla",
    description: "UCSD CSE 272 renderer",
    slug: "lajolla",
    image: "/images/projects/lajolla.png"
  },
  {
    title: "Interactive CUDA Path Tracer",
    description: "CIS5650 Project3 - A real-time interactive path tracer implemented with CUDA",
    slug: "cuda-path-tracer",
    image: "/images/projects/cuda-path-tracer.png"
  },
  {
    title: "WebGPU Forward+ & Clustered Deferred Rendering",
    description: "CIS5650 Project4 - Implementation of Forward+ and Clustered Deferred rendering techniques using WebGPU",
    slug: "webgpu-rendering",
    image: "/images/projects/webgpu-rendering.png"
  },
  {
    title: "Vulkan Grass Rendering",
    description: "CIS5650 Project5 - Real-time grass rendering system implemented with Vulkan",
    slug: "vulkan-grass",
    image: "/images/projects/vulkan-grass.png"
  },
  {
    title: "Dice Throne",
    description: "A digital version of the classical board game Dice Throne, developed with Unity",
    slug: "dice-throne",
    image: "/images/projects/dice-throne.png"
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
  const projects = sampleProjects;

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

