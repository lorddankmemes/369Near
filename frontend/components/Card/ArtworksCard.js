import React from 'react'
import artwork from "../../data/landing/artwork";

function ArtworksCard() {
  return (
    <div>
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-14 my-16">

       {artwork.rows.map((data, index) => (
         <div class="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
           <div>      
            <img className="object-cover object-center h-60 w-96 rounded-lg" src={data.featured_collectible_info.alternative_media_path} />
          </div>

          <div className='text-lg font-semibold py-4'>{data.featured_collectible_info.collectible_name}</div>
          <div className='flex gap-4'>
            <div>
              <img src={data.featured_collectible_info.collectibles_user.profile_photo_path} className="creator-size"/></div>
            <div>
              <span className='text-gray-400 font-light'>Creator</span>
              <div>{data.featured_collectible_info.collectibles_user.username}</div>
          </div>
         </div>
         </div>
       ))}
     </div>
 </div>
  )
}

export default ArtworksCard