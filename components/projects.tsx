import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Project {
  title: string
  description: string
  slug: string
  tags: string[]
  enable?: boolean
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-card/80 border-2 hover:border-primary/50 hover:-translate-y-1 shadow-md flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="border-b border-border/40 bg-muted/30 p-4">
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow overflow-hidden mb-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>
          </div>
          
          {/* 标签区域 - 固定位置 */}
          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 按钮区域 - 固定位置 */}
          <div className="mt-auto">
            <Button asChild variant="default" className="w-full group hover:shadow-md">
              <Link href={`/project/${project.slug}`} className="flex items-center justify-center gap-1">
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 