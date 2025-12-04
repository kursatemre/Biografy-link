import { useParams } from 'react-router-dom'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()

  // This will be fetched from Supabase
  const profile = {
    username: username,
    display_name: username,
    bio: 'Welcome to my page! 👋',
    avatar_url: null,
    links: [
      { id: '1', title: 'My Website', url: 'https://example.com', icon: '🌐' },
      { id: '2', title: 'Instagram', url: 'https://instagram.com', icon: '📸' },
      { id: '3', title: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
      { id: '4', title: 'Shop', url: 'https://shop.example.com', icon: '🛍️' },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
            {profile.display_name?.[0]?.toUpperCase() || '?'}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-2">@{profile.username}</h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">{profile.bio}</p>
        </div>

        {/* Links */}
        <div className="space-y-3 sm:space-y-4 max-w-lg mx-auto">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 sm:py-4 px-4 sm:px-6 bg-white hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:scale-105 hover:shadow-md active:scale-100"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {link.icon && <span className="text-xl sm:text-2xl">{link.icon}</span>}
                <span className="font-medium text-base sm:text-lg">{link.title}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500">
          <p>
            Create your own link page with{' '}
            <a href="/" className="text-primary-600 hover:underline">
              Biografy Link
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
