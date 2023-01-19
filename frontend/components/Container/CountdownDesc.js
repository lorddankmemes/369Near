import React, { useState, useEffect, useRef } from 'react';

function AuctionCountdownDesc({ data }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(data.auction_end));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(data.auction_end));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeLeft(endTime) {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <>  
    <div className='flex gap-x-4 font-medium text-md pt-4 text-left'>
      <div>
        <div className='text-3xl'>{timeLeft.days}</div>
        <div className='text-gray-500 font-semibold'>Days</div>
      </div>
      <div>
        <div className='text-3xl'>{timeLeft.hours}</div>
        <div className='text-gray-500 font-semibold'>Hours</div>
      </div>
      <div>
        <div className='text-3xl'>{timeLeft.minutes}</div>
        <div className='text-gray-500 font-semibold'>Minutes</div>
      </div>
      <div>
        <div className='text-3xl'>{timeLeft.seconds}</div>
        <div className='text-gray-500 font-semibold'>Seconds</div>
      </div>
    </div>
    </>
  );
}

export default AuctionCountdownDesc;