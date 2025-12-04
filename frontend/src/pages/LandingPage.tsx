import { Link } from 'react-router-dom'
import { Link2, Palette, BarChart3, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Biografy Link</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/auth" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link to="/auth" className="btn btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-10 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            One Link for
            <span className="text-primary-600"> All Your Links</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Create a beautiful landing page for your social media bio.
            Share all your content, products, and services in one place.
          </p>
          <Link to="/auth" className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 inline-block">
            Start For Free
          </Link>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20">
          <FeatureCard
            icon={<Link2 className="w-8 h-8" />}
            title="Unlimited Links"
            description="Add as many links as you want. Organize them your way."
          />
          <FeatureCard
            icon={<Palette className="w-8 h-8" />}
            title="Custom Themes"
            description="Choose from beautiful themes or create your own style."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Analytics"
            description="Track clicks and views to understand your audience."
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Fast & Simple"
            description="Set up in minutes. No coding required."
          />
        </div>

        {/* Demo Preview */}
        <div className="mt-12 sm:mt-16 md:mt-20 max-w-md mx-auto">
          <div className="card bg-white p-6 sm:p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full" />
            <h3 className="text-xl font-semibold mb-2">@yourusername</h3>
            <p className="text-gray-600 mb-6">Your bio goes here ✨</p>
            <div className="space-y-3">
              {['My Website', 'Instagram', 'YouTube', 'Shop'].map((item) => (
                <div
                  key={item}
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 sm:py-8 mt-12 sm:mt-16 md:mt-20 border-t">
        <div className="text-center text-gray-600 text-sm sm:text-base">
          <p>&copy; 2024 Biografy Link. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center hover:shadow-md transition-shadow">
      <div className="text-primary-600 flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
