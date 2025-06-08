'use client'

import { Layout } from '@/components/layout'
import { cn } from '@/lib/utils'
import { TextScramble } from '@/components/magicui/text-scramble'
import { RetroGrid } from '@/components/magicui/retro-grid'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center relative">
        <RetroGrid 
          className="z-0"
          cellSize={70}
          opacity={0.4}
          lightLineColor="#888888"
          darkLineColor="#444444"
          angle={60}
        />
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
  )
}

