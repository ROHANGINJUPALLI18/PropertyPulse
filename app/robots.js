export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow crawling of private/authenticated routes
      disallow: [
        '/profile', 
        '/messages', 
        '/properties/saved', 
        '/properties/add'
      ],
    },
    // Point bots to both the standard sitemap and the new image sitemap
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-images.xml`
    ],
  };
}
