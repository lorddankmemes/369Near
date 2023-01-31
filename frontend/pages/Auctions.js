import React, { useRef, useState, useEffect, useRef } from 'react'
import auction from '../data/auction.json'
import {useNavigate} from "react-router-dom"
import SliderButton from '../components/SliderButton/SliderButton'
import { images } from "../constant"
import AuctionCountdown from '../components/Container/Countdown'
import slideOption from "../data/filter/slideOption.json";


function Auctions() {

  const Ref = useRef(null);

   //filter function
  const dropdownAuction = [
    {
      value: "recent",
      label: "Recently added"
    },
    {
      value: "highest",
      label: "Highest Bid"
    },
    {
      value: "lowest",
      label: "Lowest Bid"
    }
  ]

  const [open, setOpen] = useState(false);
  const onToggleDropdown = () => {
    setOpen(!open)
  }

  const handleOptionSelection = (value) => {
    setFilterOption(value);
    setOpen(false);
  };

  //slider button logic
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };


 //filter function
 const [filterOption, setFilterOption] = useState("");
 const [slideSelected, setSlideSelected] = useState("");

 const filteredData = {
   //for filter function
   lowest: data => data.sort((a, b) =>  a.reserved_price - b.reserved_price),
   highest: data => data.sort((a, b) => b.reserved_price - a.reserved_price),
   recent: data => data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),

   //for filter using slider button
   collectibles: data => data.filter(d => d.auctions_of_collectible.collectible_category === "Collectibles"),
   membership: data => data.filter(d => d.auctions_of_collectible.collectible_category === "Membership"),
   arts: data => data.filter(d => d.auctions_of_collectible.collectible_category === "Art"),
   ticketing: data => data.filter(d => d.auctions_of_collectible.collectible_category === "Ticketing"),
   animation: data => data.filter(d => d.auctions_of_collectible.collectible_category === "Animation"),
   IrlArt: data => data.filter(d => d.auctions_of_collectible.collectible_category === "IrlArt")
 };
 
 const filteredNft = () => {
   const data = auction.result;

   if (filteredData[filterOption]) {
     return filteredData[filterOption](data);
   } else if (filteredData[slideSelected]) {
     return filteredData[slideSelected](data);
   } else {
     return data;
   }

 };
 
//navigate to the respective page based on data
const [selectedNFT, setSelectedNFT] = useState(null)
const navigate = useNavigate();

const handleNFTClick = (data) => {
  setSelectedNFT(data)
  navigate(`/auctions/${data.auctions_of_collectible.collectible_uuid}`, { state: { data } })
}

const handleCollectionClick = (data) => {
  setSelectedNFT(data)
  navigate(`/auction/${data.auctions_of_collectible.collectible_uuid}`, { state: { data } })
}

const handleCreatorClick = (data) => {
  setSelectedNFT(data)
  navigate(`/profile/${data.auctions_of_collectible.collectibles_user.user_public_address}`, { state: { data, type: "auction"} })
}

const handleOwnerClick = (data) => {
  setSelectedNFT(data)
  navigate(`/profile/${data.user_public_address}`, { state: { data } })
}



  return (
    <>
    <div className='body-container'>
        <div className='font-bold pt-10 text-3xl'>Auctions</div>
    
        <div className='grid'>
              <div className='flex my-16 gap-6'>
                <div
                    onClick={() => {
                      handleHorizantalScroll(elementRef.current, 25, 100, -10);
                    }}
                    disabled={arrowDisable}
                  >
                    <img src={images.arrow} />
                </div>

                <div className='flex mx-10 gap-6 overflow-x-hidden w-full -translate-y-2' ref={elementRef}>
                    {slideOption.map((slide, i) => 
                      <div 
                        key={i}
                        className=' w-1/5 flex-nowrap flex-none p-2 rounded-full bg-white text-orange-600 py-3 text-center border-2 border-orange-600 hover:bg-orange-600 hover:text-white'
                        onClick={() => {
                          setSlideSelected(slide.value);
                        }}   
                      >
                        {slide.label}
                      </div>
                    )}
                </div>

            <div
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 25, 100, 10);
              }}
            >
              <img className="rotate-180" src={images.arrow} />
            </div>
          </div>
        </div>

      
        {/* filter function */}
        <div onClick={() => onToggleDropdown()} >
          <div className='text-black pl-4 pr-2 flex items-center border-2 bg-white border-orange-600 rounded-xl w-[200px] h-[60px]'>
          {filterOption ? dropdownAuction.find(option => option.value === filterOption).label : 'Filter & Sort'}
          </div>

          { open ?  
            <div id="dropdownAvatar" className="z-50 w-56 absolute mt-4 bg-white text-black rounded-xl">
              <ul className="flex flex-col p-6 text-sm text-gray-700">
                <div>Sort by</div>
                {dropdownAuction.map((option, i) => {
                  return (
                    <li className='flex pt-2' key={i}>
                      <a onClick={() => handleOptionSelection(option.value)} className="block pt-1">{option.label}</a>
                    </li>
                  );
                })}
              </ul>
            </div> : <></> }
        </div>

        <div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
                
              {filteredNft().map((data, i) => (
          
                  <div key={i} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                    <div
                      onClick={() => handleNFTClick(data)} 
                      className='bg-white rounded-lg'
                    >
                      <img className="object-cover object-center h-60 w-96 rounded-lg" src={data.auctions_of_collectible.ipfs_media_path} />
                    </div>

                    <div className='py-4 text-lg font-semibold'>{data.auctions_of_collectible.collectible_name}</div>

                    <div className="flex justify-between">
                      <div>
                      <div className='text-md text-gray-400'>{data.auctions_of_collectible.collectible_type.toUpperCase()}</div>
                        <div className="text-sm font-semibold">
                          <span className="font-semibold">Edition { data.quantity } / { data.quantity}</span>
                        </div>
                      </div>
                      <div className='flex'>
                          <img 
                              onClick={() => handleCollectionClick(data)} 
                              src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectible_collection.tokenLogo}`} 
                              className="market-size z-10"
                          /> 
                          <img 
                              onClick={() => handleCreatorClick(data)} 
                              src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectibles_user.profile_photo_path}`}
                              className="market1-size z-20"
                            /> 
                            <img 
                              onClick={() => handleOwnerClick(data)} 
                              src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectibles_user.profile_photo_path}`}
                              className="market2-size z-30"
                            /> 
                      </div>
                    </div>


                    <hr className='my-4'/>

                    <p className="text-md text-gray-400 ">Starting Price</p>
                    <span className='font-semibold'>{data.starting_price}</span>

                    <p className="text-md text-gray-400 pt-4">Ending In</p>
                    {/* {new Date(data.auction_end).toLocaleString()} */}
                    {/* <div>{days}d {hours}h {minutes}m {seconds}s</div> */}
                    <AuctionCountdown data={data} />
                  </div>

              ))}
            </div>
        </div>
    </div>
    </>
  )
}


export default Auctions
