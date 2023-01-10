import React from 'react'
import artist from "../../data/landing/artist";

function CreatorsCard() {
  return (
    <div className=''>
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 my-16">

          {artist.result.map((data, index) => (
           <div className="flex flex-col md:col-span-1 bg-white text-black border-2 border-orange-600 text-center rounded-md">

              <div>
                <img src={data.curated_info_of_user.cover_photo_path} className="w-full h-28" ></img>
              </div>

              <div className="relative">
                <div className="bg-avatar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <img src={data.curated_info_of_user.profile_photo_path} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 avatar-size"></img>
              </div>

              <div>           
                <div className='flex flex-col text-black mt-12'>
                      <span>{data.curated_info_of_user.username}</span>
                      <span className='text-sm text-orange-600'>@{data.curated_info_of_user.username}</span>
                      <span className='mx-4 mt-2 text-sm'>{data.curated_info_of_user.about_desc}</span>
                </div> 
              </div>

              <button className='p-2 rounded-full bg-transparent border text-orange-600 py-3 border-2 border-orange-600'>Follow</button>
              

            </div>
          ))}
          
        </div>
    </div>
  )
}

export default CreatorsCard