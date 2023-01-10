import React, {useState} from 'react'
import test from '../../data/test.json'
import {useNavigate} from "react-router-dom"


function MarketplaceCard() {

  const [selectedNFT, setSelectedNFT] = useState(null)

  const navigate = useNavigate();

  const handleNFTClick = (data) => {
    setSelectedNFT(data)
    navigate(`/marketplace/${data.sale_collectibles.collectible_uuid}`)
  }

  return (
    <div>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-14 my-16">
          {test.result.map((data, index) => (
              <div class="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                <div className='bg-white rounded-lg'>
                  <div
                    onClick={() => handleNFTClick(data)}  
                    className='bg-white rounded-lg'
                    >
                    <img className="object-cover object-center h-60 w-96 rounded-lg" src={data.sale_collectibles.ipfs_media_path} />
                  </div>
                </div>
                
                <div className='py-4 text-lg font-semibold'>{data.sale_collectibles.collectible_name}</div>
                <span className='text-sm text-gray-400'>{data.sale_collectibles.collectible_type.toUpperCase()}</span>
                <p className="text-md font-medium">
                  Edition { data.quantity } / { data.sale_collectibles.noOfCopies}
                </p>

              <hr className='my-4'/>

              <p className="text-md text-gray-400">List Price</p>
                <span>{data.onsale_current_price}</span>
              </div>
          ))}
          </div>
    </div>
  )
  }

export default MarketplaceCard