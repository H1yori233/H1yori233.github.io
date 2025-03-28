'use client'

import { useState, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { TagFilter } from '@/components/tag-filter'
import { cn } from '@/lib/utils'

// Blog article metadata type
interface ArticleMetadata {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
}

// Sample data - corresponding to actual files in the content directory
const sampleArticles: ArticleMetadata[] = [
  {
    title: 'Reconstructing World Position from Depth Texture',
    slug: 'reconstruct-world-position',
    description: 'How to accurately reconstruct world-space positions from depth textures in real-time rendering',
    tags: ['OpenGL', 'GLSL', 'Graphics', 'Depth', 'Reconstruction']
  },
  {
    title: 'OpenGL Recap',
    slug: 'opengl-recap',
    description: 'A basic recap of OpenGL',
    tags: ['OpenGL', 'C++', 'Graphics']
  },
  {
    title: 'Useful Websites Collection',
    slug: 'useful-websites',
    description: 'A collection of useful websites for development and design',
    tags: ['Design', 'Development Tools', 'Inspiration']
  },
  {
    title: 'Useful Shell Commands',
    slug: 'useful-shell-commands',
    description: 'A collection of useful shell commands for different operating systems',
    tags: ['Shell', 'Command Line', 'Windows', 'Linux', 'macOS']
  }
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<ArticleMetadata[]>(sampleArticles)
  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    articles.forEach(article => {
      article.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [articles])

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Filter articles based on search query and selected tags
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags = 
        selectedTags.length === 0 || 
        (article.tags && selectedTags.every(tag => article.tags!.includes(tag)))

      return matchesSearch && matchesTags
    })
  }, [articles, searchQuery, selectedTags])

  if (loading) {
    return (
      <Layout title="Blog">
        <div className="text-center py-10">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout
      title="Blog"
      description="Explore my collection of blog posts and writings on various topics in technology, design, and development."
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Input
            type="text"
            placeholder="Search blog posts..."
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
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-card/80 border-2 hover:border-primary/50 hover:-translate-y-1 shadow-md flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="border-b border-border/40 bg-muted/30 p-4">
                    <h3 className="text-xl font-bold tracking-tight">{article.title}</h3>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex-grow overflow-hidden mb-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto mb-4">
                        {article.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-auto">
                      <Button asChild variant="default" className="w-full group hover:shadow-md">
                        <Link href={`/blog/${article.slug}`} className="flex items-center justify-center gap-1">
                          Read Article
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

