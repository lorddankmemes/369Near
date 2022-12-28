import React from 'react'
import { images } from '../../constant'

export const Dashboard = () => {
  return (
    <div>
         <div className='mx-8'>
         <div className='py-6 text-gray-300 text-lg'>Profile Overview</div>
                <div>
                    <div className='grid grid-cols-2 md:grid-cols-3 rounded-lg relative py-6 gap-6 text-black'>
                        <div className="flex flex-col md:col-span-1 bg-white p-4 rounded-lg">
                            <span className='text-gray-500'>Artworks created</span>
                            <div className='flex justify-between py-4 px-2'>
                                <span className='text-3xl font-bold'>0</span>
                                <span><img src={images.artCreated}/></span>
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-1 bg-white p-4 rounded-lg">
                            <span className='text-gray-500'>Artworks sold</span>
                            <div className='flex justify-between py-4 px-2'>
                                <span className='text-3xl font-bold'>0</span>
                                <span><img src={images.artSold}/></span>
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-1 bg-white p-4 rounded-lg">
                            <span className='text-gray-500'>Revenue earned</span>
                            <div className='flex justify-between py-4 px-2'>
                                <span className='text-3xl font-bold'>0</span>
                                <span><img src={images.rewardsEarned}/></span>
                            </div>
                        </div>
                    </div>
                </div>
           

            <div className='bg-white text-black rounded-md p-6 mt-16'>
                <div className='py-6 text-[20px] font-semibold'>Market Activity</div>

                <div className='flex justify-between text-xs text-gray-500 font-medium h-28'>
                    <span>EVENT</span>
                    <span>ITEM</span>
                    <span>PRICE</span>
                    <span>QTY</span>
                    <span>FROM</span>
                    <span>TO</span>
                    <span>DATE</span>
                </div>
            </div>
            </div>
    </div>
  )
}
