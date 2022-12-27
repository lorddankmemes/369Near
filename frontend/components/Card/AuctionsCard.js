import React from 'react'
import posts from "../../data/creators";

function AuctionsCard() {
  return (
    <div className=''>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 my-16">

       {posts.map((element, index) => (
         <div class="flex md:col-span-1 bg-white text-black border-2 border-orange-600 text-center p-4 rounded-md">
           <div>           
           <div className='flex flex-col' key={index}>
                <img className="rounded-md" src={element.image} />
                <span className='text-lg font-semibold py-2'>{element.title}</span>
                <span>{element.username}</span>
           </div>
         </div>
         </div>
       ))}
     </div>
 </div>
  )
}

export default AuctionsCard