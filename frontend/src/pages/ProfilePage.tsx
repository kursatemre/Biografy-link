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

  // Structured Data for Profile (Schema.org Person/ProfilePage)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": profile.display_name || profile.username,
      "alternateName": `@${profile.username}`,
      "description": profile.bio,
      "image": profileImage,
      "url": profileUrl,
      "sameAs": links
        .filter((link: { is_active: boolean; url: string }) =>
          link.is_active && (
            link.url.includes('instagram.com') || link.url.includes('twitter.com') ||
            link.url.includes('linkedin.com') || link.url.includes('youtube.com') ||
            link.url.includes('tiktok.com') || link.url.includes('facebook.com')
          )
        )
        .map((link: { url: string }) => link.url)
    },
    "url": profileUrl,
    "about": profile.bio
  }

  // Profile-specific keywords
  const profileKeywords = [
    profile.username,
    profile.display_name || '',
    'sosyal medya profili',
    'link sayfası',
    theme?.name || ''
  ].filter(Boolean)

  return (
    <>
      <SEO
        title={profileTitle}
        description={profileDescription}
        image={profileImage}
        url={profileUrl}
        type="profile"
        username={profile.username}
        keywords={profileKeywords}
        structuredData={structuredData}
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
          <div className={
            theme?.name === 'Creative Portfolio'
              ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
              : theme?.name === 'Gallery Portfolio'
              ? "space-y-4 sm:space-y-6 max-w-2xl mx-auto"
              : "space-y-3 sm:space-y-4 max-w-lg mx-auto"
          }>
            {links.map((link) => {
              const SocialIcon = getSocialIcon(link.url)
              const socialColor = getSocialColor(link.url)

              const buttonColor = link.color || theme?.config.buttonColor || '#ffffff'
              const buttonTextColor = link.text_color || theme?.config.buttonTextColor || '#1f2937'

              // Theme checks
              const isShopTheme = theme?.name === 'Shop'
              const isCreativePortfolio = theme?.name === 'Creative Portfolio'
              const isMinimalPortfolio = theme?.name === 'Minimal Portfolio'
              const isGalleryPortfolio = theme?.name === 'Gallery Portfolio'
              const isBusinessPortfolio = theme?.name === 'Business Portfolio'

              // Shop theme: Show product image on left, name and description on right
              if (isShopTheme) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className={`block w-full py-3 sm:py-4 px-3 sm:px-4 shadow-lg border-2 transition-all hover:scale-102 hover:shadow-xl active:scale-100 ${getButtonStyle()}`}
                    style={{
                      backgroundColor: buttonColor,
                      color: buttonTextColor,
                      borderColor: buttonTextColor,
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Left: Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden bg-white/10">
                        {link.image_url ? (
                          <img
                            src={link.image_url}
                            alt={link.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to icon if image fails to load
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : link.icon ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-3xl sm:text-4xl">{link.icon}</span>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <SocialIcon
                              className="text-3xl sm:text-4xl"
                              style={{ color: socialColor }}
                            />
                          </div>
                        )}
                      </div>
                      {/* Right: Product Name and Description */}
                      <div className="flex-grow min-w-0 text-left">
                        <h2 className="font-bold text-base sm:text-lg mb-1 leading-snug text-left">
                          {link.title}
                        </h2>
                        <p className="text-sm text-current opacity-90 mt-1 line-clamp-2 text-left">
                          {link.description || 'Ürün detaylarını görmek için tıklayın'}
                        </p>
                        <span className="text-xs font-semibold mt-2 inline-block opacity-100">
                          🛍️ Ürünü İncele ve Satın Al
                        </span>
                      </div>
                    </div>
                  </button>
                )
              }

              // Creative Portfolio: Grid card layout with hover effects
              if (isCreativePortfolio) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className={`block w-full overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${getButtonStyle()}`}
                    style={{
                      backgroundColor: buttonColor,
                      color: buttonTextColor,
                    }}
                  >
                    {/* Image/Icon on top */}
                    <div className="w-full h-40 sm:h-48 relative overflow-hidden bg-gradient-to-br from-white/20 to-white/5">
                      {link.image_url ? (
                        <img
                          src={link.image_url}
                          alt={link.title}
                          className="w-full h-full object-cover"
                        />
                      ) : link.icon ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl sm:text-6xl">{link.icon}</span>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <SocialIcon className="text-5xl sm:text-6xl" style={{ color: socialColor }} />
                        </div>
                      )}
                    </div>
                    {/* Content below */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-bold text-base sm:text-lg mb-2">{link.title}</h3>
                      {link.description && (
                        <p className="text-sm opacity-80 line-clamp-2">{link.description}</p>
                      )}
                    </div>
                  </button>
                )
              }

              // Minimal Portfolio: Ultra clean list with thin borders
              if (isMinimalPortfolio) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className="block w-full py-4 sm:py-6 px-0 border-b border-gray-200 transition-all hover:pl-4 group text-left"
                    style={{ color: buttonTextColor }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:underline">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="text-sm opacity-60 line-clamp-1">{link.description}</p>
                        )}
                      </div>
                      <div className="text-2xl ml-4 opacity-40 group-hover:opacity-100 transition-opacity">
                        {link.icon || '→'}
                      </div>
                    </div>
                  </button>
                )
              }

              // Gallery Portfolio: Large image cards with overlay
              if (isGalleryPortfolio) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className={`block w-full relative overflow-hidden group ${getButtonStyle()}`}
                    style={{ height: '280px' }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      {link.image_url ? (
                        <img
                          src={link.image_url}
                          alt={link.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: buttonColor }}
                        >
                          {link.icon ? (
                            <span className="text-6xl sm:text-7xl" style={{ color: buttonTextColor }}>{link.icon}</span>
                          ) : (
                            <SocialIcon className="text-6xl sm:text-7xl" style={{ color: socialColor }} />
                          )}
                        </div>
                      )}
                    </div>
                    {/* Overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                      <div className="text-left text-white">
                        <h3 className="font-bold text-lg sm:text-xl mb-1">{link.title}</h3>
                        {link.description && (
                          <p className="text-sm opacity-90 line-clamp-2">{link.description}</p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              }

              // Business Portfolio: Professional case study cards
              if (isBusinessPortfolio) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className={`block w-full text-left border-l-4 shadow-md hover:shadow-xl transition-all hover:border-l-8 ${getButtonStyle()}`}
                    style={{
                      backgroundColor: buttonColor,
                      color: buttonTextColor,
                      borderColor: buttonTextColor,
                    }}
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        {/* Icon/Image */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-black/5">
                          {link.image_url ? (
                            <img src={link.image_url} alt={link.title} className="w-full h-full object-cover" />
                          ) : link.icon ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-3xl">{link.icon}</span>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <SocialIcon className="text-3xl" style={{ color: socialColor }} />
                            </div>
                          )}
                        </div>
                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg sm:text-xl mb-2">{link.title}</h3>
                          {link.description && (
                            <p className="text-sm opacity-75 mb-3 line-clamp-2">{link.description}</p>
                          )}
                          <span className="text-xs font-semibold uppercase tracking-wide opacity-60">
                            View Case Study →
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              }

              // Default theme layout
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
