import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"

export const Creation = () => {

  const navigate = useNavigate();

  const handleCollectible = () => {
    navigate('/create')
  }

  return (
    <>
    <div className='text-md font-semibold text-white text-center py-6'>Looks like who have nothing in your creations yet!</div>
    <div className="grid grid-cols-1 md:grid-cols-1 text-white w-56 m-auto">
        <div onClick={handleCollectible} className='flex flex-col justify-center bg-white border-2 border-orange-600 rounded-3xl text-orange-600 py-16'>
          <div className='text-center'>
              <div className='font-bold text-5xl'>+</div>
              <div className='font-semibold'>Create<br/>Collection</div>
          </div>
        </div>
    </div>
    </>
  )
}
