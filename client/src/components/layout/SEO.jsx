import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/data/site.js'

const SEO = ({ title, description, path = '/' }) => {
  const pageTitle = title ? `${title} | ${siteConfig.brand}` : siteConfig.brand
  const pageDescription = description || siteConfig.description
  const pageUrl = `${siteConfig.baseUrl}${path}`
  const imageUrl = `${siteConfig.baseUrl}/heroicai-og.svg`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}

export default SEO
