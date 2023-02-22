import React, { useState, useEffect } from "react";
import { useWallet } from "../../hooks/useWallet";

export const Profile = () => {
  const { accountId, viewMethod } = useWallet();

    const [created, setCreated] = useState(0)
    const [sold, setSold] = useState(0)
    const [revenue, setRevenue] = useState(0)

  const getInnerProfile = async () => {
    const res = await viewMethod(
      process.env.CONTRACT_NAME,
      "nft_tokens_for_owner",
      { account_id: accountId }
    );
    setCreated(res);
  };

    useEffect(() => {
      if (accountId) {
        getInnerProfile()
      }
    }, [accountId, created, getInnerProfile])

    const [userNFT, setUserNFT] = useState([])

    const getNFTProfile = async () => {
      const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_supply_by_owner', { nft_contract_id: accountId})
      setUserNFT(res)
    }

    useEffect(() => {
      if (accountId) {
        getNFTProfile()
      }
    }, [accountId, userNFT, getNFTProfile])


  /*  //returns the number of sales for a given account
    const getAmountSold = async () => {
      const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_supply_by_owner_id', { account_id: accountId})
      setSold(res)
    }

    useEffect(() => {
      if (accountId) {
        getAmountSold()
      }
    }, [accountId, sold, getAmountSold]) */

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 relative gap-8 mt-2 mx-4 w-full md:w-[90%]">
      <div className="flex flex-col md:col-span-2 rounded-md text-black py-10 px-8 bg-white mx-6 md:mx-0">
        <div className="pb-4">About</div>
        <div className="grid grid-cols-2 relative gap-10">
          <div className="border-2 border-orange-600 p-6 rounded-[35px]">
            <div>
              Creations
              <br />
              Created
            </div>
            <div className="pt-4 text-3xl font-semibold">{created.length}</div>
          </div>
          <div className="border-2 border-orange-600 p-6 rounded-[35px]">
            <span>
              Revenue
              <br />
              Earned
            </span>
            <div className="pt-4 text-3xl font-semibold">0</div>
          </div>
        </div>

        <div class="grid grid-cols-2 relative gap-8 pt-8">
          <div className="border-2 border-orange-600 p-6 rounded-[35px]">
            <span>
              Creations
              <br />
              Sold
            </span>
            <div className="pt-4 text-3xl font-semibold">0</div>
          </div>
          <div className="border-2 border-orange-600 p-6 rounded-[35px]">
            <span>Followers</span>
            <div className="pt-4 text-3xl font-semibold">0</div>
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

      <div className='grid grid-cols-1 md:grid-cols-3 relative gap-8 mt-20 mx-4 w-full md:w-[90%]'>
      {userNFT.length > 0 ? 
      userNFT.map((val,key) => {
        return (
          <div key={key} className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
              <div>      
                <img className="object-cover object-center h-60 w-96 rounded-lg" src={val.metadata.media} />
              </div>

              <div className='text-[10px] font-semibold py-4'>{val.metadata.title}</div>
              
              {/* list price and token type */}
              <div className='flex gap-12'>
                  <div className=''>
                      <p className="text-sm text-gray-500">List Price</p>
                      <span className="text-sm font-semibold text-orange-600">0.041 ETH </span>
                  </div>
                  <div className=''>
                      <p className="text-sm text-gray-500">Token type</p>
                      <span className="text-sm font-semibold text-black">Edition 1 / 1</span>
                  </div>
              </div>
          </div>
         )})
         :
         <>
          <></>
        </>
        }
      </div>
    </>
  )
}
