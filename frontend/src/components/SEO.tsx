import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'profile'
  username?: string
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  username,
}: SEOProps) {
  const fullTitle = `${title} | Biografy Link`
  const defaultImage = 'https://thelinker-three.vercel.app/og-image.png'
  const imageUrl = image || defaultImage
  const canonicalUrl = url || window.location.href

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Biografy Link" />
      {username && <meta property="profile:username" content={username} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content={username || 'Biografy Link'} />
    </Helmet>
  )
}
