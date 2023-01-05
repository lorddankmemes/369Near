import React from 'react'
import React, {useState} from 'react'
import SliderButton from '../components/SliderButton/SliderButton'
import Filter from '../components/SearchFilter/Filter'
import test from '../data/test.json'
import {useNavigate} from "react-router-dom"
import NftList from '../components/SearchFilter/NftList'
import NftFiltered from '../components/SearchFilter/NftFiltered'


export default function Marketplace() {
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [filteredNft, setFilteredNft] = useState(null);
    
    const handleClick = event => {
      event.preventDefault();
      //filter alphabetically
      const filteredNft = test.result.sort((a,b)=> {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
  
      //filter alphabetically
      /* const filteredName = test.result.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      }); */
      setFilteredNft(filteredNft);  
    }

  // const handleFilterChange = newFilteredNft => {
  //   setFilteredNft(newFilteredNft);
  //   console.log("data", filteredNft)
  // };
/*   
  const navigate = useNavigate();

  const handleNFTClick = (data) => {
    setSelectedNFT(data)
    navigate(`/marketplace/${data.sale_collectibles.collectible_uuid}`)
  }
   */

  return (
    <div className='body-container'>
      <div className='font-bold pt-10 text-3xl'>Explore Marketplace</div>

      <SliderButton />
      
      <Filter handleClick={handleClick}/>

      {filteredNft ? (
        <NftFiltered nfts={filteredNft} />
      ) : (
        <NftList nfts={test.result} />
      )}

        {/*   {filteredNft ? (
          <div>
            <div data={filteredNft} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
          {test.result.map((data, index) => (
              <div key={index}  className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                <div className='bg-white rounded-lg'>
                  <div
                    onClick={() => handleNFTClick(data)}  
                    className='bg-white rounded-lg'
                    >
                    <img className="object-cover object-center h-40 md:h-60 w-96 rounded-lg" src={data.sale_collectibles.ipfs_media_path} />
                  </div>
                </div>
                
                <div className='py-4 text-lg font-semibold'>{data.sale_collectibles.collectible_name}</div>

                <div className="flex justify-between">
                  <div>
                    <span className='text-sm text-gray-400'>{data.sale_collectibles.collectible_type.toUpperCase()}</span>
                    <p className="text-sm font-semibold">
                      Edition { data.quantity } / { data.sale_collectibles.noOfCopies}
                    </p>
                  </div>
                  <div className='flex'>
                      <img src={data.sale_collectibles.ipfs_media_path} className="market-size z-10"/> 
                      <img src={data.sale_collectibles.ipfs_media_path} className="market1-size z-20"/> 
                      <img src={data.sale_collectibles.ipfs_media_path} className="market2-size z-30"/> 
                  </div>
                </div>

              <hr className='my-4'/>

              <p className="text-sm text-gray-400">List Price</p>
                <span className="text-md font-semibold">{data.onsale_current_price}</span>
              </div>
          ))}
            </div>
          </div>
           ) : (
            <div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
            {test.result.map((data, index) => (
                <div key={index} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                  <div className='bg-white rounded-lg'>
                    <div
                      onClick={() => handleNFTClick(data)}  
                      className='bg-white rounded-lg'
                      >
                      <img className="object-cover object-center h-40 md:h-60 w-96 rounded-lg" src={data.sale_collectibles.ipfs_media_path} />
                    </div>
                  </div>
                  
                  <div className='py-4 text-lg font-semibold'>{data.sale_collectibles.collectible_name}</div>
  
                  <div className="flex justify-between">
                    <div>
                      <span className='text-sm text-gray-400'>{data.sale_collectibles.collectible_type.toUpperCase()}</span>
                      <p className="text-sm font-semibold">
                        Edition { data.quantity } / { data.sale_collectibles.noOfCopies}
                      </p>
                    </div>
                    <div className='flex'>
                        <img src={data.sale_collectibles.ipfs_media_path} className="market-size z-10"/> 
                        <img src={data.sale_collectibles.ipfs_media_path} className="market1-size z-20"/> 
                        <img src={data.sale_collectibles.ipfs_media_path} className="market2-size z-30"/> 
                    </div>
                  </div>
  
                <hr className='my-4'/>
  
                <p className="text-sm text-gray-400">List Price</p>
                  <span className="text-md font-semibold">{data.onsale_current_price}</span>
                </div>
            ))}
            </div>
            </div>
           )} */}
    </div>
  )
}
