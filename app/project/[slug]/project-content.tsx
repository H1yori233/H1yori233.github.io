'use client'

import { Project } from '@/lib/utils'

interface ProjectContentProps {
  project: Project
}

export function ProjectContent({ project }: ProjectContentProps) {
  return project.content
} 