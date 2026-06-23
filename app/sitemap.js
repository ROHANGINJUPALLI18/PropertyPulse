import connectDB from '@/config/database';
import Property from '@/models/Property';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

  // Connect to database and fetch all properties
  await connectDB();
  const properties = await Property.find({}).lean();

  // Generate URLs for all dynamic property pages
  const propertyUrls = properties.map((property) => ({
    url: `${baseUrl}/properties/${property._id}`,
    lastModified: property.updatedAt || new Date(),
  }));

  // Define static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
    },
  ];

  // Return all routes
  return [...staticRoutes, ...propertyUrls];
}
