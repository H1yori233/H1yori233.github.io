import React from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-foreground">404</h1>
        <h2 className="text-3xl font-semibold text-foreground/80">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Sorry, the page you are looking for doesn't exist. The link might be expired or you may have entered an incorrect address.
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 