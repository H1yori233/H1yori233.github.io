'use client'

import { Project } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

// 创建一个简单的加载组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
  </div>
)

// Lazy load the InteractiveDice component
const InteractiveDice = dynamic(() => import('@/components/math').then(mod => mod.InteractiveDice), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

const project: Project = {
  slug: 'dice-throne',
  title: 'Dice Throne: Digital Edition',
  description: 'An ambitious project that brings the beloved tabletop game into the digital realm, preserving the essence of the original while introducing innovative features that enhance the gaming experience.',
  tags: ['Unity', 'C#', 'Game Development', 'UI/UX', 'Animation'],
  content: (
    <motion.div 
      className="max-w-7xl mx-auto transition-colors duration-200"
      style={{
        '--theme-background': 'var(--background)',
        '--theme-foreground': '#d97706',
        '--theme-card': '#fef3c7',
        '--theme-border': '#d97706',
        '--theme-primary': '#d97706',
        '--theme-primary-foreground': '#ffffff',
        '--theme-secondary': '#14b8a6',
        '--theme-secondary-foreground': '#ffffff',
        '--theme-muted': '#6b7280',
      } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative mb-24">
        <div className="aspect-[21/9] w-full rounded-xl overflow-hidden bg-gradient-to-r from-amber-900/20 via-amber-600/20 to-amber-500/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tighter text-amber-600"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              DICE THRONE
            </motion.h1>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--theme-background)_100%)]" />
        </div>
      </section>

      {/* Introduction */}
      <section className="mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-amber-600">Project Overview</h2>
            <div className="prose prose-amber dark:prose-invert">
              <p className="text-lg text-[var(--theme-muted)]">
                Despite Dice Throne having a strong reputation and popularity among board game enthusiasts, 
                its global reach remains limited due to the inherent constraints of physical games.
              </p>
              <p className="text-lg text-[var(--theme-muted)]">
                The official team has considered developing a digital version but has been slow to move forward, 
                as they lack experience in video game development. Recognizing this issue, our team decided to 
                take the initiative to create a digital version of Dice Throne as a reference for the company.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              <div className="bg-[var(--theme-card)] rounded-lg p-4 border border-[var(--theme-border)]/20">
                <h3 className="font-semibold text-amber-600 mb-2">Original Essence</h3>
                <p className="text-sm text-[var(--theme-muted)]">Faithful recreation of the original game mechanics</p>
              </div>
              <div className="bg-[var(--theme-card)] rounded-lg p-4 border border-[var(--theme-border)]/20">
                <h3 className="font-semibold text-amber-600 mb-2">Digital Enhancement</h3>
                <p className="text-sm text-[var(--theme-muted)]">Added features unique to digital format</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="lg:h-[600px] rounded-xl overflow-hidden bg-[var(--theme-card)] border border-[var(--theme-border)]/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <InteractiveDice />
          </motion.div>
        </div>
      </section>

      {/* Development Process */}
      <section className="mb-24">
        <motion.h2 
          className="text-4xl font-bold text-amber-600 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Development Process
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Research & Planning",
              description: "Extensive analysis of the original game mechanics and player feedback",
              icon: "🎲"
            },
            {
              title: "Design Phase",
              description: "Creating intuitive UI/UX that maintains the game's essence",
              icon: "🎨"
            },
            {
              title: "Development",
              description: "Implementing game logic and multiplayer functionality",
              icon: "💻"
            },
            {
              title: "Testing",
              description: "Rigorous playtesting and balance adjustments",
              icon: "🔍"
            },
            {
              title: "Optimization",
              description: "Performance improvements and bug fixes",
              icon: "⚡"
            },
            {
              title: "Launch",
              description: "Deployment and post-launch support",
              icon: "🚀"
            }
          ].map((phase, index) => (
            <motion.div
              key={phase.title}
              className="bg-[var(--theme-card)] rounded-xl p-6 border border-[var(--theme-border)]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl mb-4">{phase.icon}</div>
              <h3 className="text-xl font-bold text-amber-600 mb-2">{phase.title}</h3>
              <p className="text-[var(--theme-muted)]">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-24">
        <motion.h2 
          className="text-4xl font-bold text-amber-600 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Key Features
        </motion.h2>
        <div className="grid gap-8">
          {[
            {
              title: "Multiplayer Experience",
              description: "Local and online multiplayer support with real-time interaction",
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              title: "Dynamic Combat System",
              description: "Enhanced battle mechanics with fluid animations and effects",
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              title: "Character Progression",
              description: "Expanded character development and customization options",
              image: "/placeholder.svg?height=400&width=600"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="grid md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <h3 className="text-2xl font-bold text-amber-600">{feature.title}</h3>
                <p className="text-lg text-[var(--theme-muted)]">{feature.description}</p>
                <div className="bg-[var(--theme-card)] rounded-lg p-4 border border-[var(--theme-border)]/20">
                  <ul className="space-y-2 text-[var(--theme-muted)]">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      <span>Intuitive controls and feedback</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      <span>Seamless integration with game mechanics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      <span>Enhanced visual and audio effects</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="aspect-video rounded-xl overflow-hidden bg-[var(--theme-card)] border border-[var(--theme-border)]/20">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Details */}
      <section className="mb-24">
        <motion.h2 
          className="text-4xl font-bold text-amber-600 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Technical Implementation
        </motion.h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 bg-[var(--theme-card)] rounded-xl p-8 border border-[var(--theme-border)]/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold text-amber-600 mb-6">Architecture Overview</h3>
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[var(--theme-background)] mb-6">
              <img 
                src="/placeholder.svg?height=400&width=800" 
                alt="Architecture diagram"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-600 mb-2">Frontend</h4>
                <ul className="space-y-2 text-[var(--theme-muted)]">
                  <li>Unity UI System</li>
                  <li>Custom Shaders</li>
                  <li>Animation Controllers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600 mb-2">Backend</h4>
                <ul className="space-y-2 text-[var(--theme-muted)]">
                  <li>Game State Management</li>
                  <li>Networking Layer</li>
                  <li>Data Persistence</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-[var(--theme-card)] rounded-xl p-6 border border-[var(--theme-border)]/20">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Performance Metrics</h3>
              <ul className="space-y-4">
                <li className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--theme-muted)]">FPS Target</span>
                    <span className="text-amber-600">60 FPS</span>
                  </div>
                  <div className="h-2 bg-[var(--theme-background)] rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-amber-600 rounded-full" />
                  </div>
                </li>
                <li className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--theme-muted)]">Memory Usage</span>
                    <span className="text-amber-600">{"<"}256MB</span>
                  </div>
                  <div className="h-2 bg-[var(--theme-background)] rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-amber-600 rounded-full" />
                  </div>
                </li>
                <li className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--theme-muted)]">Load Time</span>
                    <span className="text-amber-600">{"<"}3s</span>
                  </div>
                  <div className="h-2 bg-[var(--theme-background)] rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-amber-600 rounded-full" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-[var(--theme-card)] rounded-xl p-6 border border-[var(--theme-border)]/20">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Tech Stack</h3>
              <ul className="space-y-3 text-[var(--theme-muted)]">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Unity 2022.2
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  C# / .NET Core
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  HLSL Shaders
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Photon Networking
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Development */}
      <section className="mb-24">
        <motion.h2 
          className="text-4xl font-bold text-amber-600 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Future Development
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Cross-Platform Play",
              description: "Enable seamless gaming across all devices",
              progress: 65
            },
            {
              title: "Tournament Mode",
              description: "Competitive gameplay with rankings and rewards",
              progress: 45
            },
            {
              title: "Custom Content",
              description: "User-created characters and scenarios",
              progress: 30
            },
            {
              title: "Social Features",
              description: "Enhanced community and social interaction",
              progress: 25
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-[var(--theme-card)] rounded-xl p-6 border border-[var(--theme-border)]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h3 className="text-xl font-bold text-amber-600 mb-2">{feature.title}</h3>
              <p className="text-[var(--theme-muted)] mb-4">{feature.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--theme-muted)]">Progress</span>
                  <span className="text-amber-600">{feature.progress}%</span>
                </div>
                <div className="h-2 bg-[var(--theme-background)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-600 rounded-full transition-all duration-1000"
                    style={{ width: `${feature.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  ),
  enable: true
}

export default project

