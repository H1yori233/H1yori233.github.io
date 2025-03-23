'use client'

import { useState, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// Blog article metadata type
interface ArticleMetadata {
  title: string;
  authors: string;
  slug: string;
  date: string;
  description: string;
  tags?: string[];
}

// Sample data - corresponding to actual files in the content directory
const sampleArticles: ArticleMetadata[] = [
  {
    title: 'My First Blog Post',
    authors: 'H1yori233',
    slug: 'first-post',
    date: '2024-06-20',
    description: 'An introduction to building static blogs with Next.js',
    tags: ['Next.js', 'React', 'Frontend Development']
  },
  {
    title: 'Advanced Features of Static Blogs',
    authors: 'H1yori233',
    slug: 'second-post',
    date: '2024-06-21',
    description: 'Exploring advanced features and best practices for building static blogs with Next.js',
    tags: ['Next.js', 'SSG', 'Performance Optimization']
  }
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<ArticleMetadata[]>(sampleArticles)
  const [loading, setLoading] = useState(false)

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             article.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (article.tags && article.tags.some(tag => 
                tag.toLowerCase().includes(searchQuery.toLowerCase())
             )) ||
             article.description.toLowerCase().includes(searchQuery.toLowerCase());
    })
  }, [articles, searchQuery])

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
                    <div className="flex gap-2 text-sm text-muted-foreground mb-2">
                      <time>{article.date}</time>
                      <span>·</span>
                      <span>{article.authors}</span>
                    </div>
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

