import React, { useState, useEffect } from 'react'
import { useWallet } from '../../hooks/useWallet';
import {useNavigate} from "react-router-dom"

export const Creation = () => {

  const navigate = useNavigate();

  const handleCollectible = () => {
    navigate('/create')
  }

  const { accountId, viewMethod} = useWallet()

  const [creation, setCreation] = useState([])

  const getProfileCreation= async () => {
    const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setCreation(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileCreation()
    } 
   }, [accountId, creation, getProfileCreation])
   


  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
      creation.length > 0 ? 
      creation.map((val,key) => {

        return (
          
            <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                <div>      
                  <img className="object-cover object-center h-60 w-96 rounded-lg" src={val.metadata.media} />
                </div>

                <div className='text-lg font-semibold py-4'>{val.metadata.title}</div>
                
            </div>
         
         )})

         :

         <>
          <div>
            <div className='text-md font-semibold text-white text-center py-6'>Looks like who have nothing in your creations yet!</div>
            <div className="grid grid-cols-1 md:grid-cols-1 text-white w-56 m-auto">
                <div onClick={handleCollectible} className='flex flex-col justify-center bg-white border-2 border-orange-600 rounded-3xl text-orange-600 py-16'>
                  <div className='text-center'>
                      <div className='font-bold text-5xl'>+</div>
                      <div className='font-semibold'>Create<br/>Collection</div>
                  </div>
                </div>
            </div>
          </div>
         </>
         
        }
         </div>
    </>
  )
}
