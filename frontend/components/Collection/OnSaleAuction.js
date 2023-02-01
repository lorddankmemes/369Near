import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import auction from '../../data/auction.json'

export const OnSaleAuction = (props) => {
  const location = useLocation();
  const { data } = location.state;

  
  const selectedAuctionAddress = data.auctions_of_collectible.collectible_collection.tokenAddress;

  const filteredAuction = auction.result.filter(nft => nft.auctions_of_collectible.collectible_collection.tokenAddress === selectedAuctionAddress);

  const handleCreatorClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.auction_uuid}`, { state: { data } })
  }

  const handleOwnerClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.auction_uuid}`, { state: { data } })
  }

  return (
    <>
    <div>
      <div className=''>
      
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredAuction.map((data, key) => (
            <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
              <div>
                <img className="object-cover object-center h-60 w-96 rounded-lg" src={data.auctions_of_collectible.ipfs_media_path} />
              </div>
              <div className='text-lg font-semibold py-4'>{data.auctions_of_collectible.collectible_name}</div>
              <div className="flex justify-between">
                  <div>
                    <span className='text-sm text-gray-400'>{data.auctions_of_collectible.collectible_type.toUpperCase()}</span>
                    <p className="text-sm font-semibold">
                      Edition { data.quantity } / { data.quantity}
                    </p>
                  </div>
                  <div className='flex'>
                      <img 
                        onClick={() => handleCreatorClick(data)} 
                        src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectible_collection.tokenLogo}`}
                        className="market1-size z-20"
                      /> 
                      <img 
                        onClick={() => handleOwnerClick(data)} 
                        src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectible_collection.tokenLogo}`}
                        className="market2-size z-30"
                      /> 
                  </div>
                </div>

              <hr className='my-4'/>

              <p className="text-sm text-gray-400">List Price</p>
              <span className="text-md font-semibold">{data.starting_price}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
    </>
    )
}
