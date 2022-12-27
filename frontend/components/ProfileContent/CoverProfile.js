import React from 'react'

export const CoverProfile = () => {
  return (
    <>
    <div className='h-80 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative'>
      <div className='absolute right-0 lg:bottom-0 '>
      <div className='flex gap-4 mx-6 my-12 text-xs text-white'>
        <button className='rounded-full py-2 px-4'>Replace image</button>
        <button className='bg-transparent rounded-full'>Remove</button>
      </div>
      </div>
    </div>
    </>
  )
}
