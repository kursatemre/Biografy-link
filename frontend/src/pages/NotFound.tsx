import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-primary-600 mb-3 sm:mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Page Not Found</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
