import React from 'react'
import artist from "../../data/landing/artist";

function FeaturedCreators() {
  return (
    <div className='h-screen mx-20'>
      <div className='font-bold text-3xl'>Featured Creators</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-16 mx-20 lg:min-h-[40%]">

          {artist.result.map((data, index) => (
           <div key={index} className="flex flex-col md:col-span-1 bg-white text-black border-2 border-orange-600 text-center rounded-xl">

              <div>
                <img src={data.curated_info_of_user.cover_photo_path} className="w-full h-28 xl:max-h-44 rounded-t-xl"></img>
              </div>

              <div className="relative">
                <div className="bg-avatar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <img src={data.curated_info_of_user.profile_photo_path} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 avatar-size"></img>
              </div>

              <div>           
                <div className='flex flex-col text-black mt-14'>
                      <span className='font-semibold text-md'>{data.curated_info_of_user.username}</span>
                      <span className='text-sm text-orange-600'>@{data.curated_info_of_user.username}</span>
                      <span className='mx-4 mt-2 text-xs leading-5 font-light'>{data.curated_info_of_user.about_desc}</span>
                </div> 
              </div>

              <button className='my-8 text-orange-600 bg-white rounded-full'>Follow</button>
              

            </div>
          ))}
          
        </div>

    </div>
  )
}

export default FeaturedCreators