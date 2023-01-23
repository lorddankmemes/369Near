import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import test from "../../data/test.json";
import { useWallet } from '../../hooks/useWallet';
import {useNavigate} from "react-router-dom"

export const Creation = (props) => {

  const location = useLocation();
  const { data } = location.state;

  const selectedCreation = data.sale_collectibles.collectibles_user.fullName;

  const filteredNFTs = test.result.filter(nft => nft.sale_collectibles.collectibles_user.fullName === selectedCreation);
   
  return (
    <>
      <div>
         <div className='mx-8'>
         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

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
