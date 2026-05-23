'use client';
import { useState } from "react"
import Image from "next/image";
import {FaMapMarker} from 'react-icons/fa'
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

function ProfileProperties({properties:initialProperties}) {
    const [properties , setProperties] = useState(initialProperties);
    const handleDelete = async(propertyId) => {
        const confirmed = window.confirm('Are you sure you want to delete this property?')
        if(!confirmed){
            return;
        }
        await deleteProperty(propertyId)
        const updatedProperties = properties.filter((property)=>{
            return property._id !== propertyId
        })
        setProperties(updatedProperties)
        toast.success('Property Deleted Successfully')
    }
    
    return properties.map((property)=>{
        return  <div key={property._id} className="mb-10">
                        <Link href={`/properties/${property._id}`}>
                          <Image
                            className="h-32 w-full rounded-md object-cover"
                            src={property.images[0]}
                            alt="Property 1"
                            width={200}
                            height={200}
                          />
                        </Link>
                        <div className="mt-2">
                          <p className="text-lg font-semibold">{property.name}</p>
                          <div className="flex flex-start gap-2 mt-2 mb-2" >
                            <FaMapMarker className="text-orange-600" />
                            <p className="text-orange-600">  {property.location.city}  </p>
                          </div>
                          
                        </div>
                        <div className="mt-2">
                          <Link
                            href={`/properties/${property._id}/edit`}
                            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                          <button
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                            type="button"
                            onClick={()=>handleDelete(property._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
    })
}

export default ProfileProperties