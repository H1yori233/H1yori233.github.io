'use client'

import { Layout } from '@/components/layout'
import { cn } from '@/lib/utils'
import { TextScramble } from '@/components/magicui/text-scramble'
import ShapeBlur from '@/components/ui/shape-blur'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kaichin Kong - Design X Technology</title>
        <meta name="description" content="Welcome to my digital portfolio. I'm Kaichin Kong, a Computer Science graduate student at UC San Diego passionate about LLM infrastructure, ML systems, and innovative design solutions." />
        <meta name="keywords" content="portfolio, computer science, machine learning, design, UC San Diego, Zhejiang University, LLM infrastructure, Kaichin Kong, Kaiqin Kong, 孔楷钦" />

        {/* Open Graph */}
        <meta property="og:title" content="Kaichin Kong - Design X Technology" />
        <meta property="og:description" content="Welcome to my digital portfolio. I'm Kaichin Kong, a Computer Science graduate student at UC San Diego passionate about LLM infrastructure, ML systems, and innovative design solutions." />
        <meta property="og:image" content="/images/avatar.png" />
        <meta property="og:url" content="https://h1yori233.github.io" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kaichin Kong - Design X Technology" />
        <meta name="twitter:description" content="Welcome to my digital portfolio. I'm Kaichin Kong, a Computer Science graduate student at UC San Diego passionate about LLM infrastructure, ML systems, and innovative design solutions." />
        <meta name="twitter:image" content="/images/avatar.png" />

        <link rel="canonical" href="https://h1yori233.github.io" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center relative">
        <div className="max-w-4xl z-10 relative">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl flex items-center justify-center gap-1 md:gap-4">
            <TextScramble
              text="Design"
              className="font-bold mr-3"
              charChangeCount={16}
              charChangeSpeed={60}
              delay={100}
            />
            <span className="pointer-events-none z-10 whitespace-pre-wrap 
              bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] 
              bg-clip-text text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
              font-medium leading-none tracking-tighter 
              text-transparent">
              X
            </span>
            <TextScramble
              text="Technology"
              className="font-bold ml-3"
              charChangeCount={20}
              charChangeSpeed={55}
              delay={100}
            />
          </h1>
        </div>
      </div>
    </Layout>
    </>
  )
}

