import React from 'react'
import React, {useState, useEffect, useRef} from 'react'
import SliderButton from '../components/SliderButton/SliderButton'
import Filter from '../components/SearchFilter/Filter'
import test from '../data/test.json'
import {useNavigate} from "react-router-dom"
import dropdownOption from "../data/filter/marketOption.json";
import { images } from "../constant"
import slideOption from "../data/filter/slideOption.json";
import ReactImageAppear from 'react-image-appear';
import InfiniteScroll from 'react-infinite-scroller'; 

function Marketplace() {
  const [selectedNFT, setSelectedNFT] = useState(null)

  //slider component
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

  //navigate to the respective page based on uuid

  const navigate = useNavigate();

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
    navigate(`/profile/${data.user_public_address}`, { state: { data, type: "marketplace"} })
  }

  const handleOwnerClick = (data) => {
    setSelectedNFT(data)
    navigate(`/profile/${data.user_public_address}`, { state: { data } })
  }

  //filter function
  const [filterOption, setFilterOption] = useState("");
  const [slideSelected, setSlideSelected] = useState("");

  const filteredData = {
    //for filter function
    lowest: data => data.sort((a, b) => a.onsale_current_price - b.onsale_current_price),
    highest: data => data.sort((a, b) => b.onsale_current_price - a.onsale_current_price),
    recent: data => data.sort((a, b) => new Date(b.sale_collectibles.createdAt) - new Date(a.sale_collectibles.createdAt)),
    oldest: data => data.sort((a, b) => new Date(a.sale_collectibles.createdAt) - new Date(b.sale_collectibles.createdAt)),

    //for filter using slider button
    collectibles: data => data.filter(d => d.sale_collectibles.collectible_category === "Collectibles"),
    membership: data => data.filter(d => d.sale_collectibles.collectible_category === "Membership"),
    arts: data => data.filter(d => d.sale_collectibles.collectible_category === "Art"),
    ticketing: data => data.filter(d => d.sale_collectibles.collectible_category === "Ticketing"),
    animation: data => data.filter(d => d.sale_collectibles.collectible_category === "Animation"),
    IrlArt: data => data.filter(d => d.sale_collectibles.collectible_category === "IrlArt")
  };
  
  const filteredNft = () => {
    const data = test.result;

    if (filteredData[filterOption]) {
      return filteredData[filterOption](data);
    } else if (filteredData[slideSelected]) {
      return filteredData[slideSelected](data);
    } else {
      return data;
    }

  };
  
  const [open, setOpen] = useState(false);
  const onToggleDropdown = () => {
    setOpen(!open)
  }

  const handleOptionSelection = (value) => {
    setFilterOption(value);
    setOpen(false);
  };

  return (
    <div className='body-container'>
      <div className='font-bold pt-10 text-3xl'>Explore Marketplace</div>

      {/* slider button */}
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
        {filterOption ? dropdownOption.find(option => option.value === filterOption).label : 'Filter & Sort'}
        </div>

        { open ?  
          <div id="dropdownAvatar" className="z-50 w-56 absolute mt-4 bg-white text-black rounded-xl">
            <ul className="flex flex-col p-6 text-sm text-gray-700">
              <div>Sort by</div>
              {dropdownOption.map((option, i) => {
                return (
                  <li className='flex pt-2' key={i}>
                    <a onClick={() => handleOptionSelection(option.value)} className="block pt-1">{option.label}</a>
                  </li>
                );
              })}
            </ul>
          </div> : <></> }
      </div>



      
      {/* Listed nfts */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
          
          <>
              {filteredNft().map((data, i) => (
                <div key={i} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                  <div className='rounded-lg'>
                    <div
                      onClick={() => handleNFTClick(data)}  
                      className='bg-white rounded-lg'
                      >
                     {/*  <ReactImageAppear className="object-cover object-center h-40 md:h-60 w-full rounded-lg"
                        src={data.sale_collectibles.ipfs_media_path} >
                      </ReactImageAppear> */}
                       <div>
                        <img src={data.sale_collectibles.ipfs_media_path} className="object-cover object-center h-40 md:h-60 w-full rounded-lg" />
                      </div>
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
          {/*  {loading && <p>Loading...</p>} */} 
          </> 
          
      </div>

    </div>
  )
}

export default Marketplace