'use client'
import { Project } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Home, Hand, Bot, MessageCircle, Brain, Book, ThumbsUp, Star, Layout } from 'lucide-react'
import { useState, useEffect } from 'react'

// 创建一个简单的卡片组件
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

// 创建一个简单的按钮组件
const Button = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <button className={`px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors ${className}`}>
    {children}
  </button>
)

// Interactive Demo Components
function ChatBubble({ message, isAI = false }: { message: string; isAI?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[80%] p-4 rounded-2xl ${
        isAI 
          ? 'bg-[var(--theme-secondary)] text-[var(--theme-secondary-foreground)]' 
          : 'bg-[var(--theme-primary)] text-[var(--theme-primary-foreground)]'
      }`}>
        <p className="text-sm">{message}</p>
      </div>
    </motion.div>
  )
}

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animationDuration = 2000 // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / animationDuration

      if (progress < 1) {
        setCount(Math.min(Math.floor(value * progress), value))
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <span>{count}</span>
}

const project: Project = {
  slug: 'kid-talk',
  title: 'KidTalk',
  description: 'A course project exploring AI-powered educational tools for sibling interaction, developed as part of the Human-Computer Interaction course.',
  tags: ['Educational Technology', 'AI', 'UX Design', 'Family Learning'],
  content: (
    <div 
      className="space-y-16"
      style={{
        '--theme-background': 'var(--background)',
        '--theme-foreground': '#6366f1',
        '--theme-card': '#f0fdf4',
        '--theme-border': '#6366f1',
        '--theme-primary': '#6366f1',
        '--theme-primary-foreground': '#ffffff',
        '--theme-secondary': '#22c55e',
        '--theme-secondary-foreground': '#ffffff',
        '--theme-muted': '#6b7280',
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-gradient-to-r from-indigo-100 via-green-100 to-purple-100">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-green-600 to-purple-600">
              KidTalk
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
              {[
                { icon: Home, label: "Family-Centric", color: "indigo" },
                { icon: Hand, label: "Interactive Learning", color: "green" },
                { icon: Bot, label: "AI-Powered Guide", color: "purple" }
              ].map(({ icon: Icon, label, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className={`w-16 h-16 rounded-full bg-${color}-100 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 text-${color}-600`} />
                  </div>
                  <h2 className={`text-lg font-semibold text-${color}-600`}>{label}</h2>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Demo Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--theme-primary)] mb-6">Project Overview</h2>
          <p className="text-[var(--theme-muted)] mb-6">
            Our AI guide helps facilitate learning conversations between siblings.
            The interactive interface makes learning fun and engaging for both children.
          </p>
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img 
              src="/placeholder.svg?height=400&width=600" 
              alt="KidTalk Interface Demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <Card className="border-[var(--theme-border)]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[var(--theme-primary)] mb-4">Key Features</h3>
              <div className="space-y-4">
                {[
                  { icon: MessageCircle, label: "Natural Conversations", desc: "AI-powered natural dialogue system" },
                  { icon: Brain, label: "Adaptive Learning", desc: "Personalized learning paths for each child" },
                  { icon: Star, label: "Reward System", desc: "Motivating achievements and progress tracking" },
                  { icon: Hand, label: "Interactive Activities", desc: "Engaging exercises for collaborative learning" }
                ].map(({ icon: Icon, label, desc }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--theme-card)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--theme-primary)]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--theme-primary)]">{label}</h4>
                      <p className="text-sm text-[var(--theme-muted)]">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Survey Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 border-[var(--theme-border)]">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Policy Impact</h2>
            <ul className="space-y-2 text-sm">
              <li>Nationwide two-child policy implemented</li>
              <li>Increased demand for family-oriented educational tools</li>
              <li>Growing need for resources supporting multiple-child households</li>
              <li>Shift in family dynamics and parenting strategies</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Growth in two-child families:</p>
              <div className="h-32 flex items-end justify-around mt-2">
                {[34, 38, 48, 43, 50, 52].map((value, index) => (
                  <div key={index} className="w-8 relative">
                    <div 
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${value}%` }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">
                      {2018 + index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 border-[var(--theme-border)]">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-green-600">Family Dynamics</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-600 mb-2">Positive Trends</h3>
                <p className="text-sm">Joint activities encouraged, fostering closer sibling relationships</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-medium text-red-600 mb-2">Challenges</h3>
                <p className="text-sm">Cognitive differences lead to conflicts, requiring tailored solutions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 border-[var(--theme-border)]">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-purple-600">Key Findings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Communication Challenges:</h3>
                <ul className="text-sm space-y-2">
                  <li>• Insufficient understanding between siblings</li>
                  <li>• Objective recognition of cognitive differences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Contributing Factors:</h3>
                <ul className="text-sm space-y-2">
                  <li>• Failed communication experiences</li>
                  <li>• Emotional behavior among children</li>
                  <li>• Resistance to younger sibling's perspective</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* User Analysis Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="border-[var(--theme-border)]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Target Users</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Primary Focus</h3>
                  <p className="text-sm text-muted-foreground">Families with two children, aged 4-9 years</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Age Gap</h3>
                  <p className="text-sm text-muted-foreground">1-5 years between siblings</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Book className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Background</h3>
                  <p className="text-sm text-muted-foreground">Parents seeking educational support, diverse cultural backgrounds</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--theme-border)]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Key Characteristics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-600 mb-2">Communication</h3>
                <p className="text-sm">Challenges in expressing thoughts and feelings between siblings</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-600 mb-2">Cognitive Growth</h3>
                <p className="text-sm">Varied developmental stages requiring adaptive learning approaches</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-600 mb-2">Engagement</h3>
                <p className="text-sm">Eager to participate in interactive and collaborative activities</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-600 mb-2">Learning Preference</h3>
                <p className="text-sm">Parents prefer educational apps that balance fun and learning</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Concept Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="border-[var(--theme-border)]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Proposal</h2>
            <div className="space-y-4">
              <p className="text-sm">
                The app is designed for use on a tablet. Users need a quiet, well-lit, 
                and spacious environment, such as a living room or a personal room, 
                during use.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Two Main Usage Methods:</h3>
                <ul className="text-sm space-y-2">
                  <li>1. Individual learning of fun knowledge points</li>
                  <li>2. Shared learning experience between siblings on the same tablet</li>
                </ul>
              </div>
              <p className="text-sm">
                While the first method is similar to other apps, the second method 
                places the tablet between users, utilizing touch pens or other tools 
                to display specific content.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--theme-border)]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Digital Human Role</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Meet Your AI Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhanced learning experience with tailored support
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <ThumbsUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm">Guides the 'little teacher' during collaborative lessons</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm">Provides constructive feedback to both children</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <span className="text-sm">Acts as a communication bridge, fostering understanding</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Layout className="w-5 h-5 text-purple-600 mt-0.5" />
                  <span className="text-sm">Celebrates achievements and encourages growth</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testing Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Testing and Future Outlook</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-[var(--theme-border)]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Feedback Results</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-600 mb-2">Positive Impact</h4>
                  <p className="text-sm">Users reported improved communication and logical thinking skills through mutual teaching.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-600 mb-2">Strong Connections</h4>
                  <p className="text-sm">Siblings felt a stronger bond and connection with their partners through the app.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-600 mb-2">Interface Appreciation</h4>
                  <p className="text-sm">Users provided positive feedback on the interface and features of the app.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--theme-border)]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">User Testimonials</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-600 mb-2">Younger Sister</h4>
                  <p className="text-sm italic">
                    "I think this game is so fun! The big girl in the game talks to me. 
                    I even taught my sister how kangaroo moms protect their babies. 
                    I feel smarter now!"
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-600 mb-2">Older Sister</h4>
                  <p className="text-sm italic">
                    "I love teaching my little sister new things. It's fun to see her 
                    learn, and I learn too! But I wish there were more rewards for 
                    teaching well."
                  </p>
                </div>
              </div>
              
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  ),
  enable: true
}

export default project

