import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import test from '../../data/test.json'

export const OnSaleCollection = (props) => {
    const location = useLocation();
   const { data } = location.state;

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Filter the data
        const filteredData = test.result.filter(data => data.sale_collectibles.collectible_collection.tokenAddress);
        setFilteredData(filteredData);
      }, []);

  return (
    <>
    on sale
    {/* <div><img src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectible_collection.tokenLogo}`} /></div> */}

   {/*  <div>
         <div className='mx-8'>
         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {
            data.sale_collectibles.collectible_collection.tokenAddress ? 

            test.result.map((data,key) => {
    
              return (
                <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                    <div>      
                      <img className="object-cover object-center h-60 w-96 rounded-lg" src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectible_collection.tokenLogo}`} />
                    </div>

                    <div className='text-lg font-semibold py-4'>{data.sale_collectibles.collectible_name}</div>
                    
                </div>
               )})
               :
               <></>
              }
          </div>
         </div>
    </div> */}

    <div>
    {filteredData.map((data, i) => (
        <div
          key={i}>
          <div>{data.sale_collectibles.collectible_collection.tokenName}</div>
        </div>
      ))}
    </div>
    </>
  )
}
