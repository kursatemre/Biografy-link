import { useState } from 'react'
import { Link2, Plus, Settings, BarChart3, LogOut } from 'lucide-react'

export default function Dashboard() {
  const [links, setLinks] = useState([
    { id: '1', title: 'My Website', url: 'https://example.com', is_active: true },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/username', is_active: true },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-bold">Biografy Link</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:underline"
              >
                View Profile
              </a>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full" />
              <h2 className="text-xl font-semibold text-center mb-1">@yourusername</h2>
              <p className="text-gray-600 text-center text-sm mb-4">Your bio goes here</p>

              <div className="space-y-2">
                <button className="w-full btn btn-primary justify-center flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Profile Settings
                </button>
                <button className="w-full btn btn-secondary justify-center flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">0</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">0</div>
                    <div className="text-sm text-gray-600">Clicks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Links</h2>
                <button className="btn btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>

              {links.length === 0 ? (
                <div className="text-center py-12">
                  <Link2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No links yet</p>
                  <button className="btn btn-primary">Add Your First Link</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {links.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{link.title}</h3>
                        <p className="text-sm text-gray-600">{link.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-700">
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
