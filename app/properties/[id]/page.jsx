import PropertyImages from '@/components/PropertyImages';
import ShareButtons from '@/components/ShareButton';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { convertToSerializeableObject } from '@/utils/convertToObject';



export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    await connectDB();
    const propertyDoc = await Property.findById(id).lean();
    
    if (!propertyDoc) {
      return {
        title: 'Property Not Found - PropertyPulse',
        description: 'The property you are looking for does not exist.',
      };
    }

    const property = convertToSerializeableObject(propertyDoc);
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://property-pulse-beige-eight.vercel.app';

    return {
      title: `${property.name} - ${property.type} Property in ${property.location.city}, ${property.location.state} | PropertyPulse`,
      description: `Beautiful ${property.type} with ${property.beds} beds, ${property.baths} baths at ₹${property.price}/month. ${property.description.substring(0, 120)}...`,
      keywords: `${property.type}, ${property.location.city}, ${property.location.state}, rental property, apartment, real estate, rental listings`,
      openGraph: {
        title: `${property.name} - PropertyPulse`,
        description: `${property.type} at ₹${property.price}/month - ${property.beds}BHK in ${property.location.city}, ${property.location.state}`,
        url: `${baseUrl}/properties/${id}`,
        type: 'website',
        images: [
          {
            url: property.images[0] || 'https://via.placeholder.com/1200x630',
            width: 1200,
            height: 630,
            alt: property.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${property.name} - PropertyPulse`,
        description: `${property.type} at ₹${property.price}/month in ${property.location.city}, ${property.location.state}`,
        // the below placeholders does not exsist over an long term 
        images: [property.images[0] || 'https://via.placeholder.com/1200x630'],
      },
      alternates: {
        canonical: `${baseUrl}/properties/${id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'PropertyPulse - Find Perfect Rental Properties',
      description: 'Browse the best rental properties in your area',
    };
  }
}

const PropertyPage = async ({ params }) => {
  const {id} = await params;
  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializeableObject(propertyDoc)

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            <PropertyDetails property={property} />
            <aside className='space-y-4' >
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>   
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyPage;
