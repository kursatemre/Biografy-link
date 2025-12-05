import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'profile'
  username?: string
  keywords?: string[]
  structuredData?: object
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  username,
  keywords = [],
  structuredData,
}: SEOProps) {
  const fullTitle = `${title} | TheLinker`
  const defaultImage = 'https://thelinker-three.vercel.app/og-image.png'
  const imageUrl = image || defaultImage
  const canonicalUrl = url || window.location.href

  // Default keywords for link-in-bio platform
  const defaultKeywords = [
    'link-in-bio',
    'bio link',
    'linktree alternatifi',
    'sosyal medya bio',
    'link toplama',
    'tek link birden çok bağlantı',
    'instagram bio link',
    'tiktok bio link',
    'youtube bio link',
    'ücretsiz bio link',
    'link sayfası',
    'sosyal medya linki',
  ]

  const allKeywords = [...defaultKeywords, ...keywords].join(', ')

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="TheLinker" />
      <meta property="og:locale" content="tr_TR" />
      {username && <meta property="profile:username" content={username} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content={username ? `@${username}` : '@TheLinker'} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content={username || 'TheLinker'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Mobile Optimization */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TheLinker" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
