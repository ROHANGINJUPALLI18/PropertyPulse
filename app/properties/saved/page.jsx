import PropertyCard from "@/components/PropertyCard"
import { getSessionUser } from "@/utils/getSessionUser"
import connectDB from "@/config/database"
import User from "@/models/User"
import Property from "@/models/Property"

async function SavedPropertiesPage() {

    await connectDB();
    const sessionUser = await getSessionUser();
    const {userId} = sessionUser;
    
    const {bookmarks} = await User.findById(userId).populate('bookmarks');
    
    

    return (
    <section className="px-4 py-6" >
        <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4 px-4 py-6">
                Saved Properties
            </h1>
            {bookmarks.length === 0 ? (<h1 className="text-center text-red-500">No Properties Saved</h1>) :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
                    {
                        bookmarks.map((property)=>{
                            return <PropertyCard key={property._id} property={property} />
                        })
                    }
                </div>
            }
        </div>
    </section>
  )
}

export default SavedPropertiesPage