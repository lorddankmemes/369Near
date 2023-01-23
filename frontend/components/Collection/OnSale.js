import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import test from '../../data/test.json'

export const OnSaleCollection = (props) => {
  const location = useLocation();
  const { data } = location.state;

  const selectedTokenAddress = data.sale_collectibles.collectible_collection.tokenAddress;

  const filteredNFTs = test.result.filter(nft => nft.sale_collectibles.collectible_collection.tokenAddress === selectedTokenAddress);

  const handleCreatorClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.user_public_address}`, { state: { data } })
  }

  const handleOwnerClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.user_public_address}`, { state: { data } })
  }

  return (
    <>
    <div>
      <div className=''>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredNFTs.map((data, key) => (
            <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
              <div>
                <img className="object-cover object-center h-60 w-96 rounded-lg" src={data.sale_collectibles.ipfs_media_path} />
              </div>
              <div className='text-lg font-semibold py-4'>{data.sale_collectibles.collectible_name}</div>
              <div className="flex justify-between">
                  <div>
                    <span className='text-sm text-gray-400'>{data.sale_collectibles.collectible_type.toUpperCase()}</span>
                    <p className="text-sm font-semibold">
                      Edition { data.quantity } / { data.sale_collectibles.noOfCopies}
                    </p>
                  </div>
                  <div className='flex'>
                      <img 
                        onClick={() => handleCreatorClick(data)} 
                        src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectibles_user.profile_photo_path}`}
                        className="market1-size z-20"
                      /> 
                      <img 
                        onClick={() => handleOwnerClick(data)} 
                        src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectibles_user.profile_photo_path}`}
                        className="market2-size z-30"
                      /> 
                  </div>
                </div>

              <hr className='my-4'/>

              <p className="text-sm text-gray-400">List Price</p>
              <span className="text-md font-semibold">{data.onsale_current_price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    )
}
