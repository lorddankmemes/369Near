import { profile } from 'console';
import React, {useState, useEffect} from 'react'
import artwork from "../../data/landing/artwork";
import { useWallet } from '../../hooks/useWallet';
import {useNavigate} from "react-router-dom"

export const Collection = () => {

  const { accountId, viewMethod} = useWallet()

  const [collection, setCollection] = useState([])

 /*  const getProfileCollection = async () => {
    const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setCollection(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileCollection()
    }
   }, [accountId, collection, getProfileCollection])
 */
   //single creation
  const getProfileCollection= async () => {
    const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setCollection(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileCollection()
    } 
   }, [accountId, collection, getProfileCollection])

   
   //series creation
   const [seriesCollection, setSeriesCollection] = useState([])

   const getSeriesCollection= async () => {
    const res = await viewMethod(process.env.CONTRACT_SERIES_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setSeriesCollection(res)
  }

  useEffect(() => {
    if (accountId) {
      getSeriesCollection()
    } 
   }, [accountId, seriesCollection, getSeriesCollection])

     //more details on single collectible
     const navigate = useNavigate();
     const [selectedNFT, setSelectedNFT] = useState(null)
   
   const handleCreation = (val) => {
    setSelectedNFT(val)
    navigate(`/collectible/${val.token_id}`, { state: { val } })
  }
  

  return (
    <>
      <div>
         <div className='mx-8'>
         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

         {
        [...collection, ...seriesCollection].map((val,key) => {
              return (
                <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                    <div>      
                      <img 
                        className="object-cover object-center h-60 w-96 rounded-lg" 
                        src={val.metadata.media} 
                        onClick={() => handleCreation(val)} 
                      />
                    </div>

                    <div className='text-[10px] font-semibold py-4'>{val.metadata.title}</div>
                    
                    {/* list price and token type */}
                    <div className='flex gap-12'>
                        <div className=''>
                            <p className="text-sm text-gray-500">List Price</p>
                            <span className="text-sm font-semibold text-orange-600">0.041 ETH </span>
                        </div>
                        <div className=''>
                            <p className="text-sm text-gray-500">Token type</p>
                            <span className="text-sm font-semibold text-black">Edition 1 / 1</span>
                        </div>
                    </div>

                    <hr className='mt-8 mb-4'/>

                    {/* creator and owner section */}
                    <div className='flex gap-4'>
                      <div className='flex gap-2'>
                            <div>
                              <img src={val.metadata.media} className="market2-size"/>
                            </div>
                            <div>
                              <span className='text-gray-500 font-normal text-sm'>Creator</span>
                              <div className='font-normal text-sm block w-[64px] truncate'>{val.owner_id}</div>
                            </div>
                      </div>
                      <div className='flex gap-2'>
                          <div>
                            <img src={val.metadata.media} className="market2-size"/>
                          </div>
                          <div>
                            <span className='text-gray-500 font-normal text-sm'>Creator</span>
                            <div className='font-normal text-sm block w-[64px] truncate'>{val.owner_id}</div>
                          </div>
                      </div>
                    </div>
                </div>
               )})
              }
          </div>
         </div>
    </div>
    </>
    
  )
}
