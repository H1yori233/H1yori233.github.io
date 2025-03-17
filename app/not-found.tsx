import React from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
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