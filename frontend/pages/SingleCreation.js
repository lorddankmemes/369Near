import React, {useState, useEffect, useCallback} from 'react'
import { images } from '../constant';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { parseNearAmount } from 'near-api-js/lib/utils/format';

import { useWallet } from '../hooks/useWallet';


export const SingleCreation = ({tokenId}) => {

    const location = useLocation();
    const val = location.state ? location.state.val : null;
    const id = location.state ? location.state.id : null;
    const [currentComponent, setCurrentComponent] = useState('A');
    const [showModal, setShowModal] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [modalUpdatePrice, setModalUpdatePrice] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState(null)
    const [newPrice, setNewPrice] = useState()

    const { accountId, callMethod} = useWallet()

    const [hasMinted, setHasMinted] = useState(false)
    const [hasListed, setHasListed] = useState(false)

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Mint NFT Series');
    
    const isMinting = async () => {
      try {
        let result = await callMethod({
          contractId: process.env.CONTRACT_SERIES_NAME,
          method: 'nft_mint',
          args: {
            id: val.series_id.toString(),
            metadata: val,
            receiver_id: accountId
          }
        }).then(() => {
            useNavigate('/profile');
            setHasMinted(true);
          });
    
        const a = {
          token_id: result.args.token_id
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }      

    const isListing = async () => {
            const nftApprovePromise = callMethod({
                contractId: process.env.CONTRACT_NAME,
                method: 'nft_approve',
                args: {
                  token_id: val.token_id,
                  account_id: 'nft-marketplace.bonebon.testnet',
                  msg: JSON.stringify({
					sale_conditions: parseNearAmount(newPrice),
				}),
                },
              })
              
              const storageDepositPromise = callMethod({
                contractId: process.env.CONTRACT_MARKETPLACE_NAME,
                method: 'storage_deposit',
                args: {
                  account_id: accountId,
                },
              })
            
              const [nftApproveResult, storageDepositResult] = await Promise.all([nftApprovePromise, storageDepositPromise]).then(() => useNavigate('/profile'))
              
              console.log(nftApproveResult);
              console.log(storageDepositResult);
              

              setHasListed(true)    
     }

    const updatePrice = async () => {
        await callMethod({
            contractId: process.env.CONTRACT_MARKETPLACE_NAME,
            method: 'update_price',
            args: {
                token_id: val.token_id,
                nft_contract_id: accountId,
                msg: JSON.stringify({
					price: parseNearAmount(newPrice),
				}),
            }
        })
  
        console.log(args)
    }

    const isPurchasing = async () => {
        await callMethod({
            contractId: process.env.CONTRACT_MARKETPLACE_NAME,
            method: 'offer',
            args: {
                token_id: val.token_id,
                nft_contract_id: accountId,
            }
        })
  
        console.log(args)
    }
    

  return (
    <>
    <div className='pl-24'>
        <div className="grid grid-cols-1 md:grid-cols-6 mx-4 content-center text-white pt-20">

            {/* modal for checkout */}
           {/*  {showModal ? (
            <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowModal(false)}
                    >
                    </div>
                    <div className="flex justify-center items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3 flex justify-center">
                                <div className="mt-10">
                                    <h4 className="text-3xl text-center font-bold text-gray-800">
                                        Checkout
                                    </h4>
                                    <p className="mt-2 text-center text-[16px] leading-relaxed text-gray-400">
                                        You are about to purchase CAT 1010 from<br/>
                                        0x2dc7fec828327542b7b6d67ef277660cab329c11
                                    </p>
                                    <div className='flex justify-between text-black text-sm py-4 mt-4'>
                                        <span>List price</span><span className='text-gray-400'>abc</span>
                                    </div>
                                    <hr />
                                    <div className='flex justify-between text-black text-sm pt-2'>
                                        <span>Your Balance</span><span className='text-gray-400'>abc</span>
                                    </div>
                                    <div className='flex justify-between text-black text-sm pt-2'>
                                        <span>Service Fee (2.5%)</span><span className='text-gray-400'>abc</span>
                                    </div>
                                    <div className='flex justify-between text-black text-sm pt-2'>
                                        <span>You will pay</span><span className='text-gray-400'>abc</span>
                                    </div>
                                
                                    <div className="items-center gap-2 mt-3 sm:flex">
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2"
                                            onClick={() =>
                                                setShowModal(false)
                                            }
                                        >
                                            Proceed to payment
                                        </button>
                                    </div>
                                    <div className="items-center gap-2 mt-3 mb-10 sm:flex">
                                        <button
                                            className="w-full my-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2"
                                            onClick={() =>
                                                setShowModal(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>              
            ) : null} */}

            {/* modal for sharing */}
           {/*  {showModalShare ? (
            <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowModalShare(false)}
                    >
                    </div>
                    <div className="flex justify-center items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3 flex justify-center">
                                <div className="mt-10">
                                    <h4 className="text-3xl text-center font-bold text-gray-800">
                                        Share with your community
                                    </h4>
                                    <div className='flex justify-center gap-x-10 text-gray-400 text-sm pt-10'>
                                        {networks.map((network, i) => {
                                            return (
                                            <div
                                                networks={network}
                                                network={network.network}
                                                key={network.network}
                                                url={sharing.url}
                                                title={sharing.title}
                                                description={sharing.description}
                                                quote={sharing.quote}
                                            >
                                                <i className={network.icon}></i>
                                            </div>
                                        );
                                        })}
                                        </div>
                                    <div className='flex justify-between text-black text-sm py-4 mt-4'>
                                        <span>or copy link</span>
                                        
                                    </div>
                                    <hr />
                                  
                                    <div className="w-100 m-auto link-section">
                                        <div className="share-link text-weight-500 text-size-18">
                                        </div>
                                        <div className="link-copy-btn" onClick={copyUrl}><div class="m-auto">copy</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </>              
            ) : null} */}

              {/* modal for update price */}
              {modalUpdatePrice ? (
            <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setModalUpdatePrice(false)}
                    >
                    </div>
                    <div className="flex justify-center items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3 flex justify-center">
                                <div className="mt-4 mb-10 px-10">
                                    <div className="text-3xl text-center font-bold text-gray-800">
                                        Update Price
                                    </div>
                                    <div className='mt-10 relative text-black'>
                                    <input
                                        /* type="number" */
                                        name="salePrice"
                                        className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        style={{ padding:"20px"}}
                                        />
                                        <div
                                            className="pl-2 pr-3 text-xl absolute inset-y-0 right-0 pt-2 flex items-center"
                                        >
                                        Ⓝ
                                        </div>
                                    </div>

                                    <div className='text-xs text-gray-800 pt-2'>
                                    Platform Fee: 0% <br/>
                                    You will receive Ξ 0 (~$0.000)
                                    </div>

                                    <div className='pt-14'>
                                        <div className='text-black text-sm mx-10 text-center'>You will be redirected to your wallet to confirm your transaction.</div>
                                        <div className='grid grid-cols-2 justify-center gap-x-4 text-gray-400 text-sm pt-4'>
                                            <button className="col-span-1 py-2" onClick={isListing}>Confirm</button>
                                            <button className="col-span-1" onClick={() => setModalUpdatePrice(false)}>Cancel</button>
                                        </div>
                                    </div>
                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>              
            ) : null}

                {/* left container */}
                {val && (
                <>
                <div className="flex flex-col md:col-span-3 justify-center mx-10">
                    <div className='flex gap-x-4'>
                        <span><img src={val.metadata.media} className="creator-size"/></span>
                        <span className='font-extrabold pt-2 text-gray-400'>{val.metadata.title}</span>
                    </div>
                    <div>
                        <div className='text-5xl font-bold pt-4 pb-10'>{val.metadata.title}</div> 
                        <div>
                            <img className='rounded-xl w-full h-full md:w-full md:h-full lg:w-4/5 lg:h-2/5' src={val.metadata.media}  />  
                        </div>      
                    </div>
                </div>
                

                <div class="flex md:col-span-2 justify-center md:min-w-[450px]">
                    <div className='flex flex-col w-full'>
                        <div className='text-orange-600 font-bold text-4xl pb-6 pt-10'>0.005ETH</div>
                        <div className='text-gray-500 pb-4 text-medium'>$60.5905 (Edition 1 of 1)</div>
                        <div className='bg-white rounded-full h-10'>
                            <button className='button-slide rounded-full h-10 px-8' onClick={() => setCurrentComponent('A')}>Info</button>
                            <button className='button-slide rounded-full h-10 px-4' onClick={() => setCurrentComponent('B')}>Owners</button>
                            <button className='button-slide rounded-full h-10 px-4' onClick={() => setCurrentComponent('C')}>History</button>
                        </div>

                        <div className='py-10 my-4 bg-gray-200 text-black rounded-xl'>
                            {currentComponent === 'A' ? 
                                <div className='grid gap-6 px-6'>
                                    <div className='flex gap-x-4'>
                                        <span>
                                            <img 
                                                src={val.metadata.media} 
                                                className="creator-size"
                                                onClick={() => handleCreatorClick(data)} 
                                            />
                                        </span>
                                        <span>Owner
                                            <div className='font-extrabold w-80 block truncate '>{val.metadata.title}</div>
                                        </span>
                                    </div>
                                    <div className='flex gap-x-4'>
                                        <span>
                                            <img 
                                                src={val.metadata.media}
                                                className="creator-size"
                                                onClick={() => handleOwnerClick(data)} 
                                            />
                                        </span>
                                        <span>Creator
                                                <div className='font-extrabold w-80 block truncate '>{val.metadata.title}</div>
                                        </span>
                                    </div>
                                    <div className='bg-orange-100 px-10 py-4 text-gray-500 font-medium rounded-lg'>20.00% of sales will be paid to the original artist</div>
                                    <div className='flex gap-x-4'>
                                        <span>
                                            <img 
                                                src={val.metadata.media} 
                                                className="creator-size"
                                                onClick={() => handleCollectionClick(data)} 
                                            />
                                        </span>
                                        <span>Collection (ERC721)
                                                <div className='font-extrabold'>{val.metadata.title}</div>
                                        </span>
                                    </div> 
                                </div>
                            : null}

                        </div>

                        { accountId ?
                            <>
                            <div className='grid grid-cols-1 flex gap-x-4'>
                                { val.series_id ?
                                  (hasMinted === true ?
                                    <button
                                      disabled
                                      className='opacity-50 cursor-not-allowed col-span-1 bg-white py-2 px-10 text-black rounded-lg text-center font-semibold'
                                    >
                                      Minted
                                    </button>
                                    :
                                    <button
                                      onClick={isMinting}
                                      className='col-span-1 bg-white py-2 px-10 text-black rounded-lg text-center font-semibold'
                                    >
                                      Mint NFT Series
                                    </button>
                                  )
                                :
                                  <button 
                                    disabled 
                                    className='opacity-50 cursor-not-allowed col-span-1 bg-white py-2 px-10 text-black rounded-lg text-center font-semibold'
                                    >
                                     Minted
                                  </button>
                                }
                                {/* <button 
                                    onClick={() => setModalUpdatePrice(true)} 
                                    className='bg-white col-span-1 py-2 px-10 text-black rounded-lg text-center font-semibold'
                                    >
                                    List NFT
                                </button> */}
                            </div> 
                            </>
                        :
                            <>
                                <div 
                                    onClick={isPurchasing}  
                                    className='bg-white py-2 text-black rounded-lg text-center font-semibold'
                                    >
                                    Buy 1 for 0.1N
                                </div>
                            </>
                        }

                    </div>
                </div>


                <div className="flex lg:col-span-1 justify-center pt-10 md:pt-0">
                <div className='flex md:flex-col gap-y-4 gap-x-10 mx-10'>
                        <div className='bg-white rounded-liked py-4 pl-3.5'><img src={images.beforeliked} /></div>
                        <div onClick={() => setShowModalShare(true)} className='bg-white rounded-liked py-4 pl-3'>
                            <img src={images.share} />
                        </div>
                    </div>
                </div>
                </>
                )}
        </div>

    </div>
    </>
  )
}