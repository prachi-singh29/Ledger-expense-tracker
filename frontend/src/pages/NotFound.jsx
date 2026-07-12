import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import AuroraBackground from '../components/AuroraBackground'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
      <AuroraBackground />
      <div className="glass-panel max-w-sm p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10">
          <Compass size={24} className="text-violet-400" />
        </div>
        <h1 className="mt-4 font-display text-xl font-semibold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-ink-faint">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
