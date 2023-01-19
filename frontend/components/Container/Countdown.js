import React, { useState, useEffect, useRef } from 'react';

function AuctionCountdown({ data }) {
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
    <div className='flex gap-x-4 font-medium text-md'>
      <div>{timeLeft.days}</div>
      <div>{timeLeft.hours}</div>
      <div>{timeLeft.minutes}</div>
      <div>{timeLeft.seconds}</div>
    </div>
    </>
  );
}

export default AuctionCountdown;

//start at this file first. We use ({data}) as props. What {} inside here is what exactly we want to add
//inside the parent component. Then inside the parent component, it will map inside  {auction.result.map((data) => (..))}
// data inside children component === data inside parent component 