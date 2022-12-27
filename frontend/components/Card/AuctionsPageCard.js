import React, { useRef, useState, useEffect } from 'react'
import auction from '../../data/auction.json'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"

function AuctionsPageCard() {

  const Ref = useRef(null);
  
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
        total, hours, minutes, seconds
    };
}

const startTimer = (e) => {
  let { total, hours, minutes, seconds } 
              = getTimeRemaining(e);
  if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable
      setTimer(
          (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )
  }
}


const clearTimer = (e) => {
  
  // If you adjust it you should also need to
  // adjust the Endtime formula we are about
  // to code next    
  setTimer('00:00:10');

  // If you try to remove this line the 
  // updating of timer Variable will be
  // after 1000ms or 1sec
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
      startTimer(e);
  }, 1000)
  Ref.current = id;
}

const getDeadTime = () => {
  let deadline = new Date();

  // This is where you need to adjust if 
  // you entend to add more time
  deadline.setSeconds(deadline.getSeconds() + 10);
  return deadline;
}

// We can use useEffect so that when the component
// mount the timer will start as soon as possible

// We put empty array to act as componentDid
// mount only
useEffect(() => {
  clearTimer(getDeadTime());
}, []);

// Another way to call the clearTimer() to start
// the countdown is via action event from the
// button first we create function to be called
// by the button
const onClickReset = () => {
  clearTimer(getDeadTime());
}

const [selectedNFT, setSelectedNFT] = useState(null)

const navigate = useNavigate();

const handleNFTClick = (data) => {
  setSelectedNFT(data)
  navigate(`/auctions/${data.auctions_of_collectible.collectible_uuid}`)
}

  return (
    <>
    <div>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-16">
            
          {auction.result.map((data) => (
      
              <div class="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                <div
                  onClick={() => handleNFTClick(data)} 
                  className='bg-white rounded-lg'
                >
                  <img className="object-cover object-center h-60 w-96 rounded-lg" src={data.auctions_of_collectible.ipfs_media_path} />
                </div>

                <div className='py-4 text-lg font-semibold'>{data.auctions_of_collectible.collectible_name}</div>

                <div className='text-md text-gray-400'>{data.auctions_of_collectible.collectible_type.toUpperCase()}</div>

                <p class="font-semibold">Edition { data.quantity } / { data.quantity}</p>

                <hr className='my-4'/>

                <p class="text-md text-gray-400 ">Starting Price</p>
                <span className='font-semibold'>{data.starting_price}</span>

                <p class="text-md text-gray-400 pt-4">Ending In</p>
                {timer}
              </div>

          ))}
          </div>
    </div>
    </>
  )
}

export default AuctionsPageCard