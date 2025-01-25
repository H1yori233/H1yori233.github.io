'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const skills = [
  { category: "Programming", items: ["C++", "C#", "TypeScript", "Python", "ShaderLab"] },
  { category: "Frameworks", items: ["React", "Next.js",] },
  { category: "Design", items: ["Figma", "Adobe Photoshop"] },
  { category: "Other", items: ["Git", "Linux", "Unity"] },
]

export default function AboutPage() {
  return (
    <Layout title="About Me">
      <div className="max-w-5xl mx-auto space-y-16 py-8">
        {/* Introduction */}
        <section className="prose dark:prose-invert lg:prose-lg mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 lg:p-10">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Hi there! I'm passionate about combining technical 
              expertise with creative design to build innovative solutions.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Music Section */}
        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Music That Inspires Me</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video max-w-4xl mx-auto">
              <iframe
                src="https://open.spotify.com/embed/playlist/7gRzSkYJkMPCNilm32UG6Y?utm_source=generator"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full h-full"
              />
            </div>
            <div className="p-6 bg-gradient-to-t from-background/80 to-transparent">
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                This playlist has accompanied me through countless hours of programming and design. 
                Each song carries a unique story and emotion.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Get in Touch</h2>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                <span>GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="mr-2 h-5 w-5" />
                <span>LinkedIn</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="mailto:example@email.com">
                <Mail className="mr-2 h-5 w-5" />
                <span>Email</span>
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}

