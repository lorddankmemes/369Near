import React from 'react'
import React, {useState, useEffect} from 'react'
import SliderButton from '../components/SliderButton/SliderButton'
import Filter from '../components/SearchFilter/Filter'
import test from '../data/test.json'
import {useNavigate} from "react-router-dom"
import dropdownOption from "../data/filter/marketOption.json";

function Marketplace() {
  const [selectedNFT, setSelectedNFT] = useState(null)

  const navigate = useNavigate();

  //navigate to the respective page based on uuid
  const handleNFTClick = (data) => {
    setSelectedNFT(data)
    navigate(`/marketplace/${data.sale_collectibles.collectible_uuid}`, { state: { data } })
  }

 const handleCollectionClick = (data) => {
    setSelectedNFT(data)
    navigate(`/collection/${data.sale_collectibles.collectible_uuid}`, { state: { data } })
  }

  const handleCreatorClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.user_public_address}`, { state: { data } })
  }

  const handleOwnerClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.user_public_address}`, { state: { data } })
  }


  //filter function
  const [filterOption, setFilterOption] = useState("");

  const filteredNft = () => {
    if (filterOption === "lowest") {
      const filteredPrice = test.result.sort((a, b) => a.onsale_current_price - b.onsale_current_price);
      return filteredPrice;

    }  else if (filterOption === "highest") {
      const filteredPrice = test.result.sort((a, b) => b.onsale_current_price - a.onsale_current_price);
      return filteredPrice;

    } else if (filterOption === "recent") {
      const filteredRecent = test.result.sort((a, b) => new Date(b.sale_collectibles.createdAt) - new Date(a.sale_collectibles.createdAt));
      return filteredRecent;

    } else if(filterOption === "oldest"){
      const filteredOldest = test.result.sort((a, b) => new Date(a.sale_collectibles.createdAt) - new Date(b.sale_collectibles.createdAt));
      return filteredOldest;

    } else {
      return test.result;
    }
  };
   

/*   const onHandleClickOption = (e) => {
    if (e.target.value === 'lowest' || 'highest' || 'recent' || 'oldest') {
      setFilterOption(e.target.value);
    }  else {
      return
    }
} */


  return (
    <div className='body-container'>
      <div className='font-bold pt-10 text-3xl'>Explore Marketplace</div>

      <SliderButton />

    <div className='text-black pl-4 pr-2 text-center border-2 bg-white border-orange-600 rounded-xl w-[200px] h-[60px]'>
      <select
          className='w-full h-full outline-none'
          onChange={(e) => setFilterOption(e.target.value)}
          value={filterOption} 
         
        >
          {dropdownOption.map((option, i) => {
            return (
              <option value={option.value} key={i} >
                  {option.label}
              </option>
            );
          })}
      </select>
     </div>

         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
         
         <>
            {filteredNft().map((data, i) => (
              <div key={i} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
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
                      <img 
                        onClick={() => handleCollectionClick(data)} 
                        src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectible_collection.tokenLogo}`} 
                        className="market-size z-10"
                      /> 
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
          </> 
        
          </div>
    </div>
  )
}

export default Marketplace