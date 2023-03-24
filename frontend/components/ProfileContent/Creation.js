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

  //single creation
  const getProfileCreation= async () => {
    const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setCreation(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileCreation()
    } 
   }, [accountId, creation, getProfileCreation])

   
   //series creation
   const [seriesCreation, setSeriesCreation] = useState([])

   const getSeriesCreation= async () => {
    const res = await viewMethod(process.env.CONTRACT_SERIES_NAME, 'get_series', { from_index:"0", limit:100 })
    const filteredSeries = res.filter(series => series.owner_id === accountId)
    setSeriesCreation(filteredSeries)
  }

  useEffect(() => {
    if (accountId) {
      getSeriesCreation()
    } 
   }, [accountId, seriesCreation, getSeriesCreation])

    //more details on single creation
    const [selectedNFT, setSelectedNFT] = useState(null)

    const [singleDetails, setSingleDetails] = useState([])

/*     const getSingleDetails= async () => {
     const res = await viewMethod(process.env.CONTRACT_SERIES_NAME, 'get_series_details')
     setSingleDetails(res)
   }
    
   useEffect(() => {
       getSingleDetails()
    }, [singleDetails, getSingleDetails]) */


   //more details on series
  
  const handleCreation = (val) => {
    setSelectedNFT(val)
    navigate(`/creation/${val.token_id}`, { state: { val } })
  }
  
/*   const handleCreation = (val) => {
    setSelectedNFT(val)
    navigate(`/creation/${token_id}`, {
      state: { val, token_id },
    });
  } */

  /*  const [seriesDetails, setSeriesDetails] = useState([])

   const getSeriesDetails= async () => {
    const res = await viewMethod(process.env.CONTRACT_SERIES_NAME, 'get_series_details')
    setSeriesDetails(res)
  }
   
  useEffect(() => {
      getSeriesDetails()
   }, [seriesDetails, getSeriesDetails]) */

 /*   const getSeriesDetails= async () => {
    const res = await viewMethod(process.env.CONTRACT_SERIES_NAME, 'get_series_details',  { series_id: seriesId })
    setSeriesDetails(res)
  }
   
  useEffect(() => {
      getSeriesDetails(seriesId)
   }, [seriesId, seriesDetails, getSeriesDetails]) */


  return (
 
    <>
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="flex justify-center items-center">
         <div onClick={handleCollectible} className='flex flex-col justify-center bg-white hover:bg-orange-600 hover:text-white border-2 border-orange-600 rounded-3xl text-orange-600 py-6 px-10'>
            <div className='text-center'>
                <div className='font-bold text-5xl'>+</div>
                <div className='font-semibold'>Create<br/>Collection</div>
            </div>
          </div>
      </div>
      {
        [...creation, ...seriesCreation].map((val,key) => {

          return (
            <>
              <div 
                key={key} 
                className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
              >
                  <div>      
                    <img 
                      className="object-cover object-center h-60 w-96 rounded-lg" 
                      src={val.metadata.media}
                      onClick={() => handleCreation(val)} 
                    />
                  </div>

                  <div className='text-lg font-semibold py-4'>{val.metadata.title}</div>

                  <div className='flex gap-x-2'>
                          <div>
                            <img src={val.metadata.media} className="market2-size"/>
                          </div>
                          <div>
                            <span className='text-black text-sm'>Creator</span>
                            <div className='text-black font-semibold text-sm'>{accountId}</div>
                          </div>
                    </div>
                  
              </div>
            </>
          )
        }) 
      }
    </div>

    {
      (creation.length < 0 && seriesCreation.length < 0) &&
      <div>
      <div className='text-md font-semibold text-white text-center py-6'>Looks like you have nothing in your creations yet!</div>
      <div className="grid grid-cols-1 md:grid-cols-1 text-white w-56 m-auto">
          <div onClick={handleCollectible} className='flex flex-col justify-center bg-white border-2 border-orange-600 rounded-3xl text-orange-600 py-16'>
            <div className='text-center'>
                <div className='font-bold text-5xl'>+</div>
                <div className='font-semibold'>Create<br/>Collection</div>
            </div>
          </div>
      </div>
    </div>
    }
  </>
  )
}
