'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Sophisticated background pattern - matches homepage */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating geometric elements for visual poetry (now static) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-muted-foreground/10 rounded-full" />
      <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-muted-foreground/15 rounded-full" />
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-muted-foreground/8 rounded-full" />

      <div className="content-grid relative z-10">
        <div className="text-center space-y-16 max-w-3xl mx-auto">
          {/* 404 Display - Museum Quality Typography */}
          <div className="space-y-8">
            <div>
              <h1 className="text-display font-light tracking-tight text-foreground/90 relative">
                404
                {/* Subtle accent line */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
              </h1>
            </div>

            {/* Sophisticated messaging hierarchy */}
            <div className="space-y-6">
              <h2 className="text-heading-2 font-light tracking-tight text-foreground">
                Page Not Found
              </h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The page you're looking for seems to have wandered off into the digital void.
                Don't worry—even the best explorers sometimes take a wrong turn.
              </p>
            </div>
          </div>

          {/* Elegant Action Section */}
          <div className="space-y-8">
            {/* Primary Actions - Refined Button Treatment */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/" className="btn-primary group">
                <Home size={16} className="mr-2" />
                Back to Home
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn-ghost group"
              >
                <ArrowLeft
                  size={16}
                  className="mr-2 transition-transform group-hover:-translate-x-1"
                />
                Go Back
              </button>
            </div>
          </div>

          {/* Minimalist Status Indicator */}
          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 border border-border/30">
              <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" />
              <span className="text-xs text-muted-foreground/70 font-medium tracking-wide">
                Page Not Found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-8 right-8 w-24 h-24 opacity-[0.01]">
        <div className="w-full h-full border border-foreground rounded-full" />
      </div>
    </div>
  )
}
