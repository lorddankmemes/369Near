import React, { useState, useEffect } from 'react'
import { useWallet } from '../../hooks/useWallet';


export const Profile = () => {

    const { accountId, viewMethod} = useWallet()

    const [created, setCreated] = useState(0)
    const [sold, setSold] = useState(0)
    const [revenue, setRevenue] = useState(0)

    const getInnerProfile = async () => {
      const res = await viewMethod(process.env.CONTRACT_NAME, 'nft_tokens_for_owner', { account_id: accountId})
      setCreated(res)
      setSold(res)
      setRevenue(res)
    }

    useEffect(() => {
      if (accountId) {
        getInnerProfile()
      }
    }, [accountId, created, sold, revenue, getInnerProfile])

  return (
      <div className='grid grid-cols-1 md:grid-cols-3 relative gap-8 mt-2 mx-4 w-full md:w-[90%]'>

          <div className='flex flex-col md:col-span-2 rounded-md text-black py-10 px-8 bg-white mx-6 md:mx-0'>

            <div className='pb-4'>About</div>
            <div className='grid grid-cols-2 relative gap-10'>
                <div className='border-2 border-orange-600 p-6 rounded-[35px]'>
                  <div>Artworks<br/>Created</div>
                  <div className='pt-4 text-3xl font-semibold'>{created.length}</div>
                </div>
                <div className='border-2 border-orange-600 p-6 rounded-[35px]'>
                  <span>Revenue<br/>Earned</span>
                  <div className='pt-4 text-3xl font-semibold'>0</div>
                </div>
            </div>
              
            <div class='grid grid-cols-2 relative gap-8 pt-8'>
                  <div className='border-2 border-orange-600 p-6 rounded-[35px]'>
                    <span>Artworks<br/>Sold</span>
                    <div className='pt-4 text-3xl font-semibold'>0</div>
                  </div>
                  <div className='border-2 border-orange-600 p-6 rounded-[35px]'>
                    <span>Followers</span>
                    <div className='pt-4 text-3xl font-semibold'>0</div>
                  </div>
            </div>       
          </div>

          <div className="flex flex-col md:col-span-1 mx-6 md:mx-0">
            <div className=''>
                <div>About</div>
                <div>Contact Me</div>
            </div>
          </div>
      </div>
  )
}
