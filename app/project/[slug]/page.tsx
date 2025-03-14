import { Layout } from '@/components/layout'
import { Project } from '@/lib/utils'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { ProjectContent } from './project-content'

// 直接返回静态路径
export async function generateStaticParams() {
  return [
    { slug: 'dice-throne' },
    { slug: 'kid-talk' },
    { slug: 'pop-up-midi' }
  ]
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p: Project) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <Layout title={project.title}>
      <div className="max-w-7xl mx-auto py-8">
        <ProjectContent project={project} />
      </div>
    </Layout>
  )
} 