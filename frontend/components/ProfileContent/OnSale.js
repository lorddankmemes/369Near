import React, {useState, useEffect} from 'react'
import { useWallet } from '../../hooks/useWallet';

// const nft  = {
//   contractId,
//   metadata
// }
export const OnSale = () => {
  const { accountId, viewMethod} = useWallet()

  const [sales, setSales] = useState([])
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNftsAdded, setIsNftsAdded] = useState(false)

  /* useEffect(() => {

    const getProfileOnSale = async () => {
      const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_sales_by_owner_id', { account_id: accountId, from_index:"0", limit:100})
      setSales(res)
      setIsLoaded(true)
      for(contract of res) {
        loadNft(contract.nft_contract_id, contract.sale_conditions)
      }

    }

    const loadNft = async (contract_id, price) => {
      const res = await viewMethod(contract_id, 'nft_tokens_for_owner', { account_id: accountId, from_index:"0", limit:100 })
      for(nft of res) {
        setNfts(oldArray => [...oldArray, {
          contract_id,
          metadata: nft.metadata,
          tokenId: nft.token_id,
          price: price
        }])
      }
    }

    if (accountId && !isLoaded) {
      getProfileOnSale()
    }
   }, [accountId, sales, isLoaded]) */
   
   useEffect(() => {

    const getProfileOnSale = async () => {
      const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_sales_by_owner_id', { account_id: accountId, from_index:"0", limit:100})
      setSales(res)
      setIsLoaded(true)
      for(contract of res) {
        loadNft(contract.nft_contract_id, contract.sale_conditions)
      }
  
    }
  
    const loadNft = async (contract_id, price) => {
      const res = await viewMethod(contract_id, 'nft_tokens_for_owner', { account_id: accountId, from_index:"0", limit:100 })
      let nftsArray = []
      for(nft of res) {
        nftsArray.push({
          contract_id,
          metadata: nft.metadata,
          tokenId: nft.token_id,
          price: price
        })
      }
      if(!isNftsAdded) {
        setNfts(nftsArray)
        setIsNftsAdded(true)
      }
    }
  
    let isNftsAdded = false
    
    if (accountId && !isLoaded) {
      getProfileOnSale()
    }
  }, [accountId, sales, isLoaded])
  

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
            nfts.map((val,key) => {
              return (
                <div
                key={key}
                className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
              >
                <div className="rounded-lg">
                  <div
                    /* onClick={() => handleNFTClick(data)} */
                    className="bg-white rounded-lg"
                    >
                      <img
                        src={val.metadata.media}
                        className="object-cover object-center h-40 md:h-60 w-full rounded-lg cursor-pointer"
                      />
                  </div>
                </div>
  
                <div className="py-4 text-lg font-semibold">
                  {/* {val.metadata.title} */}
                </div>
  
                <div className="flex justify-between">
                  <div>
                    <span className="text-sm text-gray-400">
                    NEP171
                    </span>
                    <p className="text-sm font-semibold">
                    {/*  Edition {onSale.quantity} /{" "}
                      {onSale.noOfCopies} */}
                    </p>
                  </div>
                  <div className="flex">
                    <img
                     /*  onClick={() => handleCollectionClick(data)} */
                      /* src={val.metadata.media} */
                      className="market-size z-10 cursor-pointer"
                    />
                    <img
                      /* onClick={() => handleCreatorClick(data)} */
                      /* src={val.metadata.media} */
                      className="market1-size z-20 cursor-pointer"
                    />
                    <img
                     /*  onClick={() => handleOwnerClick(data)} */
                      /* src={val.metadata.media} */
                      className="market2-size z-30 cursor-pointer"
                    />
                  </div>
                </div>
  
                <hr className="my-4" />
  
                <p className="text-sm text-gray-400">List Price</p>
                  <span className="text-md font-semibold">
                  {`${
                    val.price / 10 ** 24
                  } Ⓝ`}
                  </span>
              </div>
               )})
              }
          </div>
         </div>
    </div>
    </>
  )
}
