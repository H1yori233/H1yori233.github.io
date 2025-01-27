'use client'

import { useState, useEffect, useMemo } from 'react'
import { Layout } from '@/components/layout'
import { Input } from '@/components/ui/input'
// import { ArticleCard } from '@/components/articles'
// import { TagFilter } from '@/components/TagFilter'
import { motion } from 'framer-motion'
// import { ArticleMetadata, loadContent } from '@/lib/utils'
// import { LoadingSpinner } from '@/components/ui/loading-spinner'

// 临时类型定义
interface ArticleMetadata {
  title: string;
  authors: string;
  slug: string;
  tags?: string[];
}

// 临时函数定义
const loadContent = async <T,>(type: string): Promise<T[]> => {
  // TODO: 实现加载逻辑
  return [] as T[];
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<ArticleMetadata[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await loadContent<ArticleMetadata>('reading')
      setArticles(articles)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    articles.forEach(article => {
      article.tags?.forEach(tag => tag && tagSet.add(tag))
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
        article.authors.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.every(tag => article.tags?.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [articles, searchQuery, selectedTags])

  if (loading) {
    return (
      <Layout title="Articles">
        {/* <LoadingSpinner /> */}
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
          {/* <TagFilter 
            tags={allTags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          /> */}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* <ArticleCard note={article} /> */}
              <div>{article.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

