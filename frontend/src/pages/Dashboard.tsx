import { useState } from 'react'
import { Link2, Plus, Settings, BarChart3, LogOut } from 'lucide-react'

export default function Dashboard() {
  const [links] = useState([
    { id: '1', title: 'My Website', url: 'https://example.com', is_active: true },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/username', is_active: true },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              <span className="text-lg sm:text-xl font-bold">Biografy Link</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-primary-600 hover:underline hidden sm:inline"
              >
                View Profile
              </a>
              <a
                href="/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:underline sm:hidden"
              >
                View
              </a>
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg" aria-label="Logout">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full" />
              <h2 className="text-lg sm:text-xl font-semibold text-center mb-1">@yourusername</h2>
              <p className="text-gray-600 text-center text-xs sm:text-sm mb-4">Your bio goes here</p>

              <div className="space-y-2">
                <button className="w-full btn btn-primary justify-center flex items-center gap-2 text-sm sm:text-base">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile Settings</span>
                  <span className="sm:hidden">Settings</span>
                </button>
                <button className="w-full btn btn-secondary justify-center flex items-center gap-2 text-sm sm:text-base">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </button>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary-600">0</div>
                    <div className="text-xs sm:text-sm text-gray-600">Views</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary-600">0</div>
                    <div className="text-xs sm:text-sm text-gray-600">Clicks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Your Links</h2>
                <button className="btn btn-primary flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Link</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {links.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Link2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">No links yet</p>
                  <button className="btn btn-primary text-sm sm:text-base">Add Your First Link</button>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {links.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{link.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{link.url}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
                        <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-2 py-1">
                          Edit
                        </button>
                        <button className="text-xs sm:text-sm text-red-600 hover:text-red-700 px-2 py-1">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
