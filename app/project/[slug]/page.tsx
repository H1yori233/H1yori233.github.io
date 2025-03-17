import { Layout } from '@/components/layout'
import { Project } from '@/lib/utils'
import { projects, diceThrone, kidTalk, popUpMidi } from '@/data/projects'
import { notFound } from 'next/navigation'
import { ProjectContent } from './project-content'

// 直接使用项目数据生成静态路径
export async function generateStaticParams() {
  return [
    { slug: 'dice-throne' },
    { slug: 'kidtalk' },
    { slug: 'pop-up-midi' },
    // 为了兼容旧链接，添加额外的路径
    { slug: 'kid-talk' }
  ]
}

// 手动映射slug到对应的项目数据
const slugToProject: Record<string, Project> = {
  'dice-throne': diceThrone,
  'kidtalk': kidTalk,
  'kid-talk': kidTalk, // 别名映射到相同项目
  'pop-up-midi': popUpMidi
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // 直接从映射中获取项目，避免数组查找
  const project = slugToProject[slug];

  if (!project) {
    console.error(`找不到项目: ${slug}`);
    notFound();
  }

  return (
    <Layout title={project.title}>
      <div className="max-w-7xl mx-auto py-8">
        <ProjectContent project={project} />
      </div>
    </Layout>
  )
} 