import React from 'react'
import platform from "../data/platform";
import activity from '../data/activity.json'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from '../constant'
import moment from 'moment';

function Activity() {
  return (
    <>
    <div className='body-container lg:mx-14'>
    <div className='pt-10'>
      <button>Go back</button>
    </div>

    <div className='text-5xl font-bold my-10'>Activity</div>

    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex flex-col md:col-span-1 gap-y-6 mr-10">
        <div className='box-border h-22 w-32 py-1 text-center border-4 bg-white text-black font-bold border-orange-600 rounded-full'>
          All activity
        </div>

        
        <div>
        <div class="grid gap-6 mb-10">
          {activity.result.map((data, index) => (
      
            <div className='grid grid-cols-3 md:grid-cols-3 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative'>
              <div class="flex flex-col col-span-1 md:col-span-1">
                  <LazyLoadImage className="object-cover object-center h-28 w-30 rounded-lg col-span-1" 
                  src={data.transaction_of_collectible.ipfs_media_path} 
                  loading="lazy"
                  />
              </div>
              <div class="flex flex-col col-span-2 md:col-span-2 ml-6">
                  <span className='col-span-2 mt-8'>
                    <span className='font-bold'>{data.activity_by_user_name}</span>
                    <span> {data.action_type}</span>
                    <span className='text-gray-400 font-bold'> {data.transaction_of_collectible.collectible_name} </span>on
                    <span className='font-bold'> {data.transaction_of_collectible.collectible_category}</span>
                    <div className='text-gray-400 pt-4'>{moment(data.activity_datetime).fromNow()}</div>
                  </span>
              </div>
            </div>

        
          ))}
          </div>
        </div>

      </div>

      <div class="flex flex-col md:col-span-1">
        <div className='md:flex gap-x-6'>
          <div className='box-border h-14 w-40 py-4 text-center border-2 bg-white text-black border-orange-600 rounded-md'>
            Top Sellers
          </div>
          <div className='box-border h-14 w-40 py-4 mt-4 md:mt-0 text-center border-2 bg-white text-black border-orange-600 rounded-md '>
            In one day
          </div>
        </div>

        <div className='flex text-xl font-semibold justify-between bg-slate-800 my-6 px-10 py-14 rounded-lg'>
          <span>Top Sellers</span><span>Sales</span>
        </div>

        <div className='bg-slate-800 my-6 px-10 py-14 rounded-lg'>
          <span className='text-xl font-semibold'>Platform Statistics</span>

            <div className='h-20 w-100 bg-white rounded-xl mt-4 text-black font-semibold text-sm grid content-center'>
              <div className='flex justify-between mx-10'>
                <div className='flex gap-6'>
                  <img src={images.artCreated}></img>
                  <span>Artworks Collected</span>
                </div>
                <div>{platform.data.artworksCollected}</div>
              </div>
            </div>

            <div className='h-20 w-100 bg-white rounded-xl mt-4 text-black  font-semibold text-sm grid grid content-center'>
              <div className='flex justify-between mx-10'>
              <div className='flex gap-6'>
                  <img src={images.rewardsEarned}></img>
                  <span>Artworks Collected</span>
                </div>
                <div>{platform.data.artworksCollected}</div>
              </div>
            </div>
            
        </div>

      </div>
    </div>
    </div>
    </>
  )
}

export default Activity