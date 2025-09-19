'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface TechSkill {
  name: string
  level: number
  category: string
  description: string
}

const techSkills: TechSkill[] = [
  {
    name: 'CUDA',
    level: 85,
    category: 'AI/ML',
    description: 'GPU acceleration for LLM training, parallel computing, memory optimization'
  },
  {
    name: 'PyTorch',
    level: 90,
    category: 'AI/ML',
    description: 'Deep learning framework, model training, distributed computing'
  },
  {
    name: 'Triton',
    level: 75,
    category: 'AI/ML',
    description: 'GPU kernel development for optimized LLM operations'
  },
  {
    name: 'C/C++',
    level: 90,
    category: 'Programming',
    description: 'Low-level programming, memory management, performance optimization'
  },
  {
    name: 'Python',
    level: 90,
    category: 'Programming',
    description: 'Machine learning, data analysis, automation, AI/ML workflows'
  },
  {
    name: 'Unity',
    level: 95,
    category: 'Graphics',
    description: 'Game engine, 3D graphics, interactive applications'
  },
  {
    name: 'Next.js',
    level: 85,
    category: 'Web',
    description: 'React framework, full-stack development, modern web applications'
  }
]

const categories = ['All', ...Array.from(new Set(techSkills.map(skill => skill.category)))]

// Component prop interfaces
interface EditorialSkillItemProps {
  skill: TechSkill
  isExpanded: boolean
  onToggle: () => void
}

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

// Minimal skill component
const EditorialSkillItem = ({ skill, isExpanded, onToggle }: EditorialSkillItemProps) => (
  <motion.div
    className="border-b border-gray-100 last:border-b-0"
    initial={false}
  >
    <button
      onClick={onToggle}
      className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <span className="text-gray-900 font-normal">{skill.name}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wide">{skill.category}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600 text-sm">{skill.level}%</span>
        <span className={`text-gray-400 transition-transform duration-200 text-sm ${isExpanded ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </div>
    </button>

    <motion.div
      initial={false}
      animate={{
        height: isExpanded ? 'auto' : 0,
        opacity: isExpanded ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="pb-4">
        <div className="mb-3">
          <div className="bg-gray-100 h-1 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-900"
              initial={{ width: 0 }}
              animate={{ width: isExpanded ? `${skill.level}%` : 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {skill.description}
        </p>
      </div>
    </motion.div>
  </motion.div>
)

// Category filter component
const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => (
  <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`px-3 py-1 text-sm whitespace-nowrap border rounded transition-colors ${selected === category
          ? 'border-gray-900 text-gray-900'
          : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
          }`}
      >
        {category}
      </button>
    ))}
  </div>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
}

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const filteredSkills = selectedCategory === 'All'
    ? techSkills
    : techSkills.filter(skill => skill.category === selectedCategory)

  return (
    <div>
      <h2 className="text-xl font-normal text-gray-900 mb-6 border-t border-gray-100 pt-8">Technical Skills</h2>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div key={skill.name} variants={itemVariants}>
            <EditorialSkillItem
              skill={skill}
              isExpanded={expandedSkill === skill.name}
              onToggle={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-500 leading-relaxed">
          Additional experience with Git, Linux, Docker, MongoDB, Vulkan,
          Blender, and various development tools.
        </p>
      </div>
    </div>
  )
} 