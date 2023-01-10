import { profile } from 'console';
import React, {useState, useEffect} from 'react'
import artwork from "../../data/landing/artwork";
import { useWallet } from '../../hooks/useWallet';

export const Collection = () => {

  const { accountId, viewMethod} = useWallet()

  const [collection, setCollection] = useState([])

  const getProfileCollection = async () => {
    const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
    setCollection(res)
  }

  useEffect(() => {
    if (accountId) {
      getProfileCollection()
    }
   }, [accountId, collection, getProfileCollection])
   

  return (
    <>
      <div>
         <div className='mx-8'>
         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {
            collection.length > 0 ? 
            collection.map((val,key) => {
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
               <>
                <></>
              </>
              }
          </div>
         </div>
    </div>
    </>
    
  )
}
