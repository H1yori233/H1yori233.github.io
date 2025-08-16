'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'

interface TechSkill {
  name: string
  level: number
  category: string
  color: string
  description: string
  icon?: string
}

const techSkills: TechSkill[] = [
  {
    name: 'CUDA',
    level: 85,
    category: 'AI/ML Infrastructure',
    color: 'bg-green-500',
    description: 'GPU acceleration for LLM training and inference, parallel computing, memory optimization for large models',
    icon: '🚀'
  },
  {
    name: 'PyTorch',
    level: 90,
    category: 'AI/ML Infrastructure',
    color: 'bg-orange-500',
    description: 'Deep learning framework for LLM development, model training, distributed computing, and inference optimization',
    icon: '🔥'
  },
  {
    name: 'Triton',
    level: 75,
    category: 'AI/ML Infrastructure',
    color: 'bg-blue-600',
    description: 'GPU kernel development for optimized LLM operations, performance optimization',
    icon: '⚡'
  },
  {
    name: 'C/C++',
    level: 90,
    category: 'Systems Programming',
    color: 'bg-blue-500',
    description: 'Low-level programming, memory management, performance optimization',
    icon: '💻'
  },
  {
    name: 'Python',
    level: 90,
    category: 'AI/ML Infrastructure',
    color: 'bg-yellow-500',
    description: 'Machine learning, data analysis, automation, scripting for AI/ML workflows',
    icon: '🐍'
  },
  {
    name: 'Unity',
    level: 95,
    category: 'Game Development',
    color: 'bg-gray-800',
    description: 'Game engine, 3D graphics, interactive applications',
    icon: '🎮'
  },
  {
    name: 'Next.js',
    level: 85,
    category: 'Web Development',
    color: 'bg-black',
    description: 'React framework, full-stack development, modern web apps',
    icon: '⚛️'
  },
]

const categories = Array.from(new Set(techSkills.map(skill => skill.category)))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = selectedCategory
    ? techSkills.filter(skill => skill.category === selectedCategory)
    : techSkills

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => setSelectedCategory(null)}
        >
          All Technologies
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        layout
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            layout
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            <Card className="h-full overflow-hidden group cursor-pointer border-2 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {skill.level}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress
                    value={hoveredSkill === skill.name ? skill.level : 0}
                    className="h-2"
                  />
                  <motion.div
                    className={`h-2 rounded-full ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredSkill === skill.name ? `${skill.level}%` : '0%'
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>

                {/* Skill Level Indicator */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Proficiency:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < Math.floor(skill.level / 20)
                          ? skill.color
                          : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        variants={itemVariants}
      >
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{techSkills.length}</div>
          <div className="text-sm text-muted-foreground">Technologies</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{categories.length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">
            {Math.round(techSkills.reduce((acc, skill) => acc + skill.level, 0) / techSkills.length)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg Proficiency</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">
            {techSkills.filter(skill => skill.level >= 80).length}
          </div>
          <div className="text-sm text-muted-foreground">Expert Level</div>
        </Card>
      </motion.div>

      {/* Other Skills */}
      <motion.div
        className="text-center mt-8 pt-6 border-t border-border"
        variants={itemVariants}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Others:</span> Git, Linux, Figma, Docker, MongoDB, Vulkan, Blender, Photoshop, and various other tools and frameworks
        </p>
      </motion.div>
    </motion.div>
  )
} 