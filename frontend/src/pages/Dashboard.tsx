import { useState, useEffect } from 'react'
import { Link2, Plus, Settings, BarChart3, LogOut, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { useLinks } from '@/hooks/useLinks'
import { useProfileAnalytics } from '@/hooks/useAnalytics'
import { useThemes } from '@/hooks/useThemes'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading, updateProfile } = useProfile(user?.id)
  const { links, loading: linksLoading, addLink, updateLink, deleteLink } = useLinks(profile?.id)
  const { stats, loading: analyticsLoading } = useProfileAnalytics(profile?.id)
  const { themes, loading: themesLoading } = useThemes()

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingLink, setEditingLink] = useState<any>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [formData, setFormData] = useState({ title: '', url: '', icon: '' })
  const [settingsData, setSettingsData] = useState({
    display_name: '',
    bio: '',
    avatar_url: '',
    theme_id: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Update settings data when profile loads
  useEffect(() => {
    if (profile) {
      setSettingsData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        theme_id: profile.theme_id || '',
      })
    }
  }, [profile])

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth')
    }
  }, [user, authLoading, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth')
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccessMessage('')

    const { error } = await updateProfile(settingsData)

    if (!error) {
      setShowSettings(false)
      setSuccessMessage('Profile updated successfully! ✓')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
    setSubmitting(false)
  }

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile?.id) return

    setSubmitting(true)
    setSuccessMessage('')

    const { error, data } = await addLink({
      profile_id: profile.id,
      title: formData.title,
      url: formData.url,
      icon: formData.icon || null,
      is_active: true,
      position: links.length,
    })

    if (!error && data) {
      setShowAddModal(false)
      setFormData({ title: '', url: '', icon: '' })
      setSuccessMessage(`Link "${formData.title}" added successfully! ✓`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } else if (error) {
      alert(`Error: ${error.message}`)
    }
    setSubmitting(false)
  }

  const handleEditLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLink) return

    setSubmitting(true)
    setSuccessMessage('')

    const { error } = await updateLink(editingLink.id, {
      title: formData.title,
      url: formData.url,
      icon: formData.icon || null,
    })

    if (!error) {
      setEditingLink(null)
      setFormData({ title: '', url: '', icon: '' })
      setSuccessMessage('Link updated successfully! ✓')
      setTimeout(() => setSuccessMessage(''), 3000)
    } else {
      alert(`Error: ${error.message}`)
    }
    setSubmitting(false)
  }

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    setSuccessMessage('')

    const { error } = await deleteLink(id)

    if (!error) {
      setSuccessMessage('Link deleted successfully! ✓')
      setTimeout(() => setSuccessMessage(''), 3000)
    } else {
      alert(`Error: ${error.message}`)
    }
  }

  const openEditModal = (link: any) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon || '',
    })
  }

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Profile not found</div>
      </div>
    )
  }

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
                href={`/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-primary-600 hover:underline hidden sm:inline"
              >
                View Profile
              </a>
              <a
                href={`/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:underline sm:hidden"
              >
                View
              </a>
              <button
                onClick={handleSignOut}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="container mx-auto px-4 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 text-center">
            {successMessage}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name || profile.username}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  {profile.username?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <h2 className="text-lg sm:text-xl font-semibold text-center mb-1">
                @{profile.username}
              </h2>
              <p className="text-gray-600 text-center text-xs sm:text-sm mb-4">
                {profile.bio || 'No bio yet'}
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full btn btn-primary justify-center flex items-center gap-2 text-sm sm:text-base"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile Settings</span>
                  <span className="sm:hidden">Settings</span>
                </button>
                <button
                  onClick={() => setShowAnalytics(true)}
                  className="w-full btn btn-secondary justify-center flex items-center gap-2 text-sm sm:text-base"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </button>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary-600">
                      {analyticsLoading ? '...' : stats.totalViews}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Views</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary-600">{links.length}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Links</div>
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
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-primary flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Link</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {linksLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading links...</p>
                </div>
              ) : links.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Link2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">No links yet</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="btn btn-primary text-sm sm:text-base"
                  >
                    Add Your First Link
                  </button>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {links.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {link.icon && <span className="text-lg">{link.icon}</span>}
                          <h3 className="font-medium text-sm sm:text-base truncate">{link.title}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{link.url}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
                        <button
                          onClick={() => openEditModal(link)}
                          className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-xs sm:text-sm text-red-600 hover:text-red-700 px-2 py-1"
                        >
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

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Profile Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Name"
                  value={settingsData.display_name}
                  onChange={(e) => setSettingsData({ ...settingsData, display_name: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  className="input"
                  placeholder="Tell us about yourself..."
                  rows={3}
                  value={settingsData.bio}
                  onChange={(e) => setSettingsData({ ...settingsData, bio: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://example.com/avatar.jpg"
                  value={settingsData.avatar_url}
                  onChange={(e) => setSettingsData({ ...settingsData, avatar_url: e.target.value })}
                  disabled={submitting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste a link to your profile picture
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                {themesLoading ? (
                  <p className="text-sm text-gray-500">Loading themes...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSettingsData({ ...settingsData, theme_id: theme.id })}
                        disabled={submitting}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          settingsData.theme_id === theme.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${theme.is_premium ? 'relative' : ''}`}
                      >
                        <div className="font-medium text-sm">{theme.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{theme.description}</div>
                        {theme.is_premium && (
                          <span className="absolute top-1 right-1 bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">
                            Pro
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 btn btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Analytics</h3>
              <button
                onClick={() => setShowAnalytics(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="card bg-gradient-to-br from-primary-50 to-purple-50 border-primary-100">
                <div className="text-3xl font-bold text-primary-600">
                  {analyticsLoading ? '...' : stats.totalViews}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Profile Views</div>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <div className="text-3xl font-bold text-green-600">
                  {analyticsLoading ? '...' : stats.totalClicks}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Link Clicks</div>
              </div>

              <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
                <div className="text-3xl font-bold text-blue-600">{links.length}</div>
                <div className="text-sm text-gray-600 mt-1">Active Links</div>
              </div>

              {stats.totalViews > 0 || stats.totalClicks > 0 ? (
                <div className="text-center text-sm text-gray-500 mt-6">
                  <p>✅ Analytics tracking is active!</p>
                  <p className="mt-1">We're tracking views and clicks on your links.</p>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 mt-6">
                  <p>📊 Analytics ready!</p>
                  <p className="mt-1">Visit your profile page to start tracking.</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowAnalytics(false)}
              className="w-full btn btn-secondary mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Link Modal */}
      {(showAddModal || editingLink) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingLink ? 'Edit Link' : 'Add New Link'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingLink(null)
                  setFormData({ title: '', url: '', icon: '' })
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingLink ? handleEditLink : handleAddLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="My Website"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (emoji, optional)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="🌐"
                  maxLength={2}
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingLink(null)
                    setFormData({ title: '', url: '', icon: '' })
                  }}
                  className="flex-1 btn btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : (editingLink ? 'Update' : 'Add Link')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
