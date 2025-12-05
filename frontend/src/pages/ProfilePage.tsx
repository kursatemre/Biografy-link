import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProfileByUsername } from '@/hooks/useProfile'
import { useLinks } from '@/hooks/useLinks'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useTheme } from '@/hooks/useThemes'
import { Link2 } from 'lucide-react'
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa'
import SEO from '@/components/SEO'
import { getSocialIcon, getSocialColor } from '@/utils/socialMedia'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { profile, loading: profileLoading, error: profileError } = useProfileByUsername(username)
  const { links, loading: linksLoading } = useLinks(profile?.id)
  const { trackProfileView, trackLinkClick } = useAnalytics()
  const { theme, loading: themeLoading } = useTheme(profile?.theme_id || undefined)

  // Track profile view when page loads
  useEffect(() => {
    if (profile?.id) {
      trackProfileView(profile.id)
    }
  }, [profile?.id])

  const handleLinkClick = (linkId: string, url: string) => {
    if (profile?.id) {
      trackLinkClick(profile.id, linkId)
    }
    // Open link in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getButtonStyle = () => {
    if (!theme) return 'rounded-xl'
    switch (theme.config.buttonStyle) {
      case 'pill':
        return 'rounded-full'
      case 'square':
        return 'rounded-md'
      case 'rounded':
      default:
        return 'rounded-xl'
    }
  }

  if (profileLoading || themeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <Link2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">
            The profile @{username} doesn't exist or has been deactivated.
          </p>
          <a href="/" className="btn btn-primary">
            Go to Home
          </a>
        </div>
      </div>
    )
  }

  const siteUrl = window.location.origin
  const profileUrl = `${siteUrl}/${profile.username}`
  const profileTitle = profile.display_name || `@${profile.username}`
  const profileDescription = profile.bio || `Check out @${profile.username}'s links on OrionSoft.dev`
  const profileImage = profile.avatar_url || `${siteUrl}/default-avatar.png`

  return (
    <>
      <SEO
        title={profileTitle}
        description={profileDescription}
        image={profileImage}
        url={profileUrl}
        type="profile"
        username={profile.username}
      />
      <div
        className="min-h-screen py-6 sm:py-8 px-4"
        style={{
          background: profile.background_color || theme?.config.backgroundColor || '#ffffff',
          color: theme?.config.textColor || '#1f2937',
          fontFamily: theme?.config.fontFamily || 'Inter, sans-serif',
        }}
      >
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-6 sm:mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg border-4 border-white">
              {profile.username?.[0]?.toUpperCase() || '?'}
            </div>
          )}
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            {profile.display_name || `@${profile.username}`}
          </h1>
          <p
            className="text-sm sm:text-base px-4"
            style={{ color: profile.text_color || theme?.config.textColor || '#4b5563' }}
          >
            {profile.bio || `Welcome to @${profile.username}'s page! 👋`}
          </p>
        </div>

        {/* Contact Buttons */}
        {(profile.whatsapp || profile.phone || profile.email) && (
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {profile.whatsapp && (
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8" />
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Phone"
              >
                <FaPhone className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-700 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            )}
          </div>
        )}

        {/* Links */}
        {linksLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Link2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600">No links yet</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 max-w-lg mx-auto">
            {links.map((link) => {
              const SocialIcon = getSocialIcon(link.url)
              const socialColor = getSocialColor(link.url)

              const buttonColor = link.color || theme?.config.buttonColor || '#ffffff'
              const buttonTextColor = link.text_color || theme?.config.buttonTextColor || '#1f2937'

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className={`block w-full py-3 sm:py-4 px-4 sm:px-6 shadow-sm border transition-all hover:scale-105 hover:shadow-md active:scale-100 ${getButtonStyle()}`}
                  style={{
                    backgroundColor: buttonColor,
                    color: buttonTextColor,
                    borderColor: buttonColor,
                  }}
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {link.icon ? (
                      <span className="text-xl sm:text-2xl">{link.icon}</span>
                    ) : (
                      <SocialIcon
                        className="text-xl sm:text-2xl"
                        style={{ color: socialColor }}
                      />
                    )}
                    <span className="font-medium text-base sm:text-lg">{link.title}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div
          className="text-center mt-8 sm:mt-12 text-xs sm:text-sm"
          style={{ color: profile.text_color || theme?.config.textColor || '#6b7280' }}
        >
          <p>
            Create your own link page with{' '}
            <a
              href="https://orionsoft.dev"
              className="hover:underline"
              style={{ color: profile.text_color || theme?.config.textColor || '#6b7280' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              OrionSoft.dev
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
