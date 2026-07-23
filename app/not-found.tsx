import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="content-grid">
        <main className="text-center space-y-12 max-w-2xl mx-auto">
          {/* 404 Display */}
          <div className="space-y-6">
            <h1 className="text-display font-light tracking-tight text-foreground/90 relative">
              404
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-px bg-foreground/30"
              />
            </h1>

            <div className="space-y-4">
              <h2 className="text-heading-2 font-light tracking-tight text-foreground">
                Page Not Found
              </h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The page you’re looking for doesn’t exist or may have moved.
              </p>
            </div>
          </div>

          <Link href="/" className="btn-primary">
            <Home size={16} className="mr-2" aria-hidden="true" />
            Back to Home
          </Link>
        </main>
      </div>
    </div>
  )
}
