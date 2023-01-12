import React, { useState } from 'react'
import { OnSale } from '../components/ProfileContent/OnSale'
import { Collection } from '../components/ProfileContent/Collection'
import { MyAuction } from '../components/ProfileContent/MyAuction'

export const MainCollection = () => {
  const [currentComponent, setCurrentComponent] = useState(1);

  return (
    <>
    <div className='body-container'>
        <div className='grid mt-10 text-center'>
            <div className='profile-size'></div>
            <div className='text-2xl font-bold'>Simplifying Art (SA)</div>
            <div className='pt-2 text-orange-600 text-underline font-semibold'>token address collection</div>
        </div>

        <div className='grid mt-10'>
            <div className='flex gap-10 bg-none h-10 text-sm font-light border-b'>
                <div className='' onClick={() => setCurrentComponent(1)}>ONSALE</div>
                <div className='' onClick={() => setCurrentComponent(2)}>COLLECTION</div>
                <div className='' onClick={() => setCurrentComponent(3)}>AUCTIONS</div>
            </div>

            <div className='pt-10'>
                {currentComponent === 1 && <OnSale/>}
                {currentComponent === 2 && <Collection /> }
                {currentComponent === 3 && <MyAuction /> }
            </div>
        </div>
    </div>
    </>
  )
}
