import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export interface Project {
  title: string
  description: string
  slug: string
  image?: string
  enable?: boolean
  externalUrl?: string
  featured: boolean
}

export function ProjectCard({ project, viewMode = 'grid' }: { project: Project; viewMode?: 'grid' | 'list' }) {
  const [imgError, setImgError] = useState(false);

  // 默认的替代图片
  const fallbackImage = "/images/project-placeholder.jpg";
  
  // 根据是否存在 externalUrl 决定链接地址
  const projectUrl = project.externalUrl ? project.externalUrl : `/project/${project.slug}`;
  const isExternal = !!project.externalUrl; // 判断是否为外部链接

  if (viewMode === 'list') {
    return (
      <Card className={cn(
        "group overflow-hidden border border-border shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        project.featured && "ring-2 ring-primary/20"
      )}>
        <CardContent className="p-0 flex flex-row items-center">
          {/* 左侧图片区域 */}
          <div className="w-1/3 h-48 relative flex-shrink-0 overflow-hidden">
            {project.image && !imgError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Image
                  src={fallbackImage}
                  alt="Project placeholder"
                  fill
                  className="object-cover opacity-50"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            {/* 特色项目标识 */}
            {project.featured && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-primary/90 text-primary-foreground shadow-lg">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* 右侧内容区域 */}
          <div className="p-6 w-2/3 flex flex-col justify-center">
            <div className="space-y-3">
              <div>
                <Link
                  href={projectUrl}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  className="text-xl font-bold tracking-tight hover:text-primary transition-colors group-hover:text-primary line-clamp-2"
                >
                  <span className="flex items-center gap-2">
                    {project.title}
                    {isExternal && <ExternalLink className="w-4 h-4 opacity-70 flex-shrink-0" />}
                  </span>
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view (default)
  return (
    <Card className={cn(
      "group overflow-hidden border border-border shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full flex flex-col",
      project.featured && "ring-2 ring-primary/20"
    )}>
      <CardContent className="p-0 flex flex-col h-full">
        {/* 图片区域 */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          {project.image && !imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Image
                src={fallbackImage}
                alt="Project placeholder"
                fill
                className="object-cover opacity-50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* 特色项目标识 */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            <div>
              <Link
                href={projectUrl}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="text-lg font-bold tracking-tight hover:text-primary transition-colors group-hover:text-primary line-clamp-2 leading-tight"
              >
                <span className="flex items-start gap-2">
                  <span className="flex-1">{project.title}</span>
                  {isExternal && <ExternalLink className="w-4 h-4 opacity-70 flex-shrink-0 mt-0.5" />}
                </span>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 