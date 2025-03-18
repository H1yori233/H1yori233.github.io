'use client'

import { useState, useEffect, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

// 临时类型定义
interface ArticleMetadata {
  title: string;
  authors: string;
  slug: string;
  tags?: string[];
}

// 临时函数定义
const loadContent = async <T,>(type: string): Promise<T[]> => {
  return [] as T[];
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<ArticleMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await loadContent<ArticleMetadata>('reading')
      setArticles(articles)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             article.authors.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [articles, searchQuery])

  if (loading) {
    return (
      <Layout title="Articles">
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout
      title="Blog"
      description="Explore my collection of blog and writings on various topics in technology, design, and development."
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Input
            type="text"
            placeholder="Search blog..."
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
              <div>{article.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

