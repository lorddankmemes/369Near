import React, {useState, useEffect} from 'react'
import { useWallet } from '../../hooks/useWallet';

export const OnSale = () => {
  const { accountId, viewMethod} = useWallet()

  const [onSale, setOnSale] = useState([])

  const getProfileOnSale= async () => {
    const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setOnSale(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileOnSale()
    }
   }, [accountId, onSale, getProfileOnSale])
   

   //onSale real smart contract, get the val from marketplace metadata
   //method to retrieve information about all the NFTs that are currently for sale and owned by a specific account. 
   //This information can be useful when building a marketplace frontend and showing the NFTs that a specific account is selling.
   
  /*const getProfileOnSale= async () => {
    const res = await viewMethod(process.env.CONTRACT_MARKETPLACE, 'get_sales_by_owner_id', { account_id: accountId})
    setOnSale(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileOnSale()
    }
   }, [accountId, onSale, getProfileOnSale]) */


  return (
    <>
    <div>
         <div className='mx-8'>
         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {
            onSale.length > 0 ? 
            onSale.map((val,key) => {
              return (
                <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                    <div>      
                      <img className="object-cover object-center h-60 w-96 rounded-lg" src={val.metadata.media} />
                    </div>

                    <div className='text-lg font-semibold py-4'>{val.metadata.title}</div>
                    
                    {/* <div className='flex gap-4'>
                        <div>
                          <img src={val.metadata.featured_collectible_info.collectibles_user.profile_photo_path} className="creator-size"/>
                        </div>
                        <div>
                          <span className='text-gray-400 font-light'>Creator</span>
                          <div>{val.metadata.username}</div>
                        </div>
                    </div> */}
                </div>
               )})
               :
               <></>
              }
          </div>
         </div>
    </div>
    </>
  )
}
