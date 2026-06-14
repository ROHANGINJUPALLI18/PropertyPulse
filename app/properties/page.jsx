export const metadata = {
  title: 'Browse All Properties - PropertyPulse',
  description: 'Explore our collection of rental properties. Find your perfect home from thousands of verified listings.',
  keywords: 'rental properties, apartments, houses for rent, real estate listings',
  openGraph: {
    title: 'Browse All Properties - PropertyPulse',
    description: 'Find your perfect rental property from our verified listings',
    type: 'website',
  },
};
import PropertyCard from '@/components/PropertyCard';
import Property from '@/models/Property';
import connectDB from '@/config/database';

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Browse Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
