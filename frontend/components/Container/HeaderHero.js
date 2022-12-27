import React from 'react'
import { images } from '../../constant'
import {useNavigate} from "react-router-dom"

function HeaderHero() {
  const navigate = useNavigate();

  return (
    <>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 h-screen content-center">
      <div className="flex md:col-span-1 justify-center">
        <div className='flex flex-col gap-y-2 font-bold'>                      
            <div className='text-sm text-orange-600'>3six9 NFT Marketplace</div>
            <div className='text-lg text-white'>A New Era of NFT Utility</div>
            <div className='text-4xl text-white leading-10'>Creator<br/>Economy<br/>Machine</div>
            <div className='text-2xl text-white'>Built on Aurora Blockchain</div>

            <div className='flex font-light text-sm my-8 gap-4'>
              <button className="py-3 px-6" onClick={()=>navigate("/Marketplace")}>Explore</button>
              <button className="py-3 px-6" onClick={()=>navigate("/ConnectWallet")}>Create</button>
            </div>

        </div>

       
      </div>

      <div className="flex md:col-span-1 justify-center">
        <div className='font-bold'>                      
            <img src={images.hero} width="300px" height="600px"/>
        </div>
      </div>
               
    </div>

   </>
  )
}

export default HeaderHero