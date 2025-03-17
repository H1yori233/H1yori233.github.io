'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const skills = [
  { category: "Programming", items: ["C++", "C#", "TypeScript", "Python", "ShaderLab"] },
  { category: "Frameworks", items: ["React", "Next.js",] },
  { category: "Design", items: ["Figma", "Adobe Photoshop"] },
  { category: "Other", items: ["Git", "Linux", "Unity"] },
]

const education = [
  {
    period: "Sep 2025 - Dec 2026 (Expected)",
    institution: "UC San Diego",
    degree: "Master of Science in Computer Science and Engineering",
    logo: "/images/UCSanDiegoLogo-BlueGold.png"
  },
  {
    period: "Sep 2020 - Jun 2024",
    institution: "Zhejiang University",
    degree: "Bachelor of Engineering in Industrial Design",
    thesis: "Indoor emergency evacuation strategy simulation game based on social force model",
    logo: "/images/浙江大学-logo-2048px.png"
  }
]

const experience = [
  {
    period: "Jun 2024 - Jun 2025",
    position: "Research Assistant Intern",
    organization: "International Design Institute of Zhejiang University",
    supervisor: "Wei, Xiang",
    logo: "/images/IDI.png"
    // logo: "/images/UCSanDiegoLogo-BlueGold.png"
  },
  {
    period: "Sep 2023 - Feb 2024",
    position: "Teaching Assistant for Computer Game Programming",
    organization: "Zhejiang University",
    supervisor: "Weidong, Geng",
    logo: "/images/浙江大学-logo-2048px.png"
  }
]

export default function AboutPage() {
  return (
    <Layout title="About Me">
      <div className="max-w-5xl mx-auto space-y-16 py-8">
        {/* Introduction */}
        <section className="prose dark:prose-invert lg:prose-lg mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 lg:p-10">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Hi there! I'm Kaiqin Kong (孔楷钦), an incoming CS graduate student at UC San Diego (CS75).
              Prior to this, I obtained a Bachelor of Engineering in Industrial Design at Zhejiang University.
              I'm passionate about combining technical expertise with creative design to build innovative solutions.
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

        {/* Education */}
        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="flex-shrink-0 w-24 h-24 relative">
                        <Image 
                          src={edu.logo} 
                          alt={`${edu.institution} Logo`} 
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{edu.institution}
                          <span className="float-right text-sm text-muted-foreground">{edu.period}</span>
                        </h3>
                        <p className="text-lg text-muted-foreground mb-2">{edu.degree}</p>
                        {edu.thesis && (
                          <div className="text-sm mt-4">
                            <p className="mb-1"><span className="font-medium">Thesis: </span>{edu.thesis}</p>
                            {edu.institution === "Zhejiang University" && (
                              <p><span className="font-medium">Supervisor: </span>Weidong, Geng</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="flex-shrink-0 w-24 h-24 relative">
                        <Image 
                          src={exp.logo} 
                          alt={`${exp.organization} Logo`} 
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{exp.organization}
                          <span className="float-right text-sm text-muted-foreground">{exp.period}</span>
                        </h3>
                        <p className="text-lg text-muted-foreground mb-2">{exp.position}</p>
                        {exp.supervisor && (
                          <p className="text-sm mt-4">
                            <span className="font-medium">{exp.position.includes("Teaching Assistant") ? "Lecturer" : "Supervisor"}: </span>{exp.supervisor}
                          </p>
                        )}
                      </div>
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

