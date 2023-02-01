import React, { useState } from 'react'
import { Collection } from '../components/ProfileContent/Collection'
import { MyAuction } from '../components/ProfileContent/MyAuction'
import { useLocation } from 'react-router-dom';
import { OnSaleAuction } from '../components/Collection/OnSaleAuction';

export const AuctionCollection = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const [currentComponent, setCurrentComponent] = useState(1);

  return (
    <>
    <div className='body-container'>
        <div className='grid mt-10 text-center'>
            <img className='profile-size' src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectible_collection.tokenLogo}`}  />
            <div className='text-2xl font-bold'>{data.auctions_of_collectible.collectible_collection.tokenName}</div>
            <div className='pt-2 text-orange-600 text-underline font-semibold'>{data.auctions_of_collectible.collectible_collection.tokenAddress}</div>
        </div>

        <div className='grid mt-10'>
            <div className='flex gap-10 bg-none h-10 text-sm font-light border-b'>
                <div className='' onClick={() => setCurrentComponent(1)}>ONSALE</div>
                <div className='' onClick={() => setCurrentComponent(2)}>COLLECTION</div>
                <div className='' onClick={() => setCurrentComponent(3)}>AUCTIONS</div>
            </div>

            <div className='pt-10'>
                {currentComponent === 1 && <OnSaleAuction/>}
                {currentComponent === 2 && <Collection /> }
                {currentComponent === 3 && <MyAuction /> }
            </div>
        </div>
    </div>
    </>
  )
}
