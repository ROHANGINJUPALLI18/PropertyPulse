import connectDB from '@/config/database';
import Property from '@/models/Property';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

  // Connect to database and fetch all properties
  await connectDB();
  const properties = await Property.find({}).lean();

  // Start the XML document with the standard sitemap and image extensions namespace
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  properties.forEach((property) => {
    // Only include properties that have images
    if (property.images && property.images.length > 0) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/properties/${property._id}</loc>\n`;
      
      property.images.forEach((imageUrl) => {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${imageUrl}</image:loc>\n`;
        
        // Add image title using the property name (escape XML characters)
        if (property.name) {
          const escapedName = property.name
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
          xml += `      <image:title>${escapedName}</image:title>\n`;
        }
        
        xml += `    </image:image>\n`;
      });
      
      xml += `  </url>\n`;
    }
  });

  xml += `</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
      // Cache the sitemap for 24 hours, and serve stale while revalidating
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
