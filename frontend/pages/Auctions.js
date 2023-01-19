import React, { useRef, useState, useEffect } from 'react'
import auction from '../data/auction.json'
import {useNavigate} from "react-router-dom"
import SliderButton from '../components/SliderButton/SliderButton'
import AuctionCountdown from '../components/Container/Countdown'


function Auctions() {

  const Ref = useRef(null);
  
  const [timer, setTimer] = useState('');
  const [days, setDays] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);

const [filterOption, setFilterOption] = useState("");

const dropdownOption = [
  {
    value: "",
    label: "Filter & Sort"
  },
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

 //filter function
 const filteredNft = () => {
   if (filterOption === "lowest") {
     const filteredPrice = auction.result.sort((a, b) => a.reserved_price - b.reserved_price);
     return filteredPrice;

   }  else if (filterOption === "highest") {
     const filteredPrice = auction.result.sort((a, b) => b.reserved_price - a.reserved_price);
     return filteredPrice;

   } else if (filterOption === "recent") {
     const filteredRecent = auction.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
     return filteredRecent;

   }  else {
     return auction.result;
   }
 };

const [selectedNFT, setSelectedNFT] = useState(null)

const navigate = useNavigate();

const handleNFTClick = (data) => {
  setSelectedNFT(data)
  navigate(`/auctions/${data.auctions_of_collectible.collectible_uuid}`, { state: { data } })
}

const handleCollectionClick = (data) => {
  setSelectedNFT(data)
  navigate(`/collection/${data.auctions_of_collectible.collectible_uuid}`, { state: { data } })
}

  return (
    <>
    <div className='body-container'>
     <div className='font-bold pt-10 text-3xl'>Auctions</div>
    <SliderButton />

    {/* <Filter /> */}

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
                      <img src={data.auctions_of_collectible.ipfs_media_path} className="market1-size z-20"/> 
                      <img src={data.auctions_of_collectible.ipfs_media_path} className="market2-size z-30"/> 
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