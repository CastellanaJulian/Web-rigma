import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.rigma.com.ar'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
