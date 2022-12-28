import React from 'react'
import { Link } from 'react-router-dom'
import artwork from "../../data/landing/artwork";

function FeaturedArtworks() {
  return (
    <>
    <div className='ml-14 mr-6'>
      <div className='flex justify-between'>
        <span className='font-bold text-3xl'>Featured Artworks</span>
        <span><Link to="/Marketplace">View all artworks</Link></span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-14 my-16">

       {artwork.rows.map((data, index) => (
         <div key={index} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
           <div>      
            <img className="object-cover object-center h-40 md:h-60 w-full rounded-lg" src={data.featured_collectible_info.alternative_media_path} />
          </div>

          <div className='text-lg font-semibold py-4 truncate'>{data.featured_collectible_info.collectible_name}</div>
          <div className='flex gap-2'>
            <div>
              <img src={data.featured_collectible_info.collectibles_user.profile_photo_path} className="creator-size"/></div>
            <div>
              <span className='text-gray-500 text-sm font-light'>Creator</span>
              <div className='text-sm'>{data.featured_collectible_info.collectibles_user.username}</div>
          </div>
         </div>
         </div>
       ))}
     </div>
    </div>
    </>
  )
}

export default FeaturedArtworks