import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export interface Project {
  title: string
  description: string
  slug: string
  image?: string
  enable?: boolean
}

export function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  // 默认的替代图片
  const fallbackImage = "/images/project-placeholder.jpg";

  return (
    <Card className="overflow-hidden border border-border shadow-md">
      <CardContent className="p-0 flex flex-row items-center">
        {/* 左侧图片区域 */}
        <div className="w-2/5 h-64 relative">
          {project.image && !imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Image
                src={fallbackImage}
                alt="Project placeholder"
                fill
                className="object-cover opacity-50"
                onError={(e) => {
                  // 如果连替代图片也加载失败，显示纯灰色背景
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* 右侧内容区域 */}
        <div className="p-6 w-3/5 flex flex-col h-full">
          <div className="l-4">
            <Link
              href={`/project/${project.slug}`}
              className="text-xl font-bold tracking-tight"
            >
              {project.title}
            </Link>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              {project.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 