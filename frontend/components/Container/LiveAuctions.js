import React from 'react'
import posts from "../../data/posts";
import AuctionsCard from '../Card/AuctionsCard';
import { Link } from 'react-router-dom'

function LiveAuctions({ title, likes, order, image }) {
  return (
    <div className='h-60 ml-20 mr-8'>
      <div className='font-bold text-3xl'>Live Auctions</div>

      <div className='flex justify-between text-md my-6'>
        <span>No auctions found</span>
        <span><Link to="/Auctions">View all auctions</Link></span>
      </div>

     {/*  <AuctionsCard /> */}
    </div>
  )
}

export default LiveAuctions