import React, {useState, useEffect, useCallback} from 'react'
import { images } from '../constant';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

import { useWallet } from '../hooks/useWallet';


export const SingleCreation = (props) => {

    const location = useLocation();
    const val = location.state ? location.state.val : null;
    const [currentComponent, setCurrentComponent] = useState('A');
    const [showModal, setShowModal] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState(null)

    const { accountId, callMethod} = useWallet()

    const [hasMinted, setHasMinted] = useState(false)
    const isMinting = async (e) => {
    
          await callMethod({
            contractId: process.env.CONTRACT_SERIES_NAME,
            method: 'nft_mint',
            args: {
                token_id: `${Date.now()}`,
                metadata: val,
                receiver_id: accountId
            }
          })
    
          console.log(args)

          setHasMinted(true)
      }

      /* const isListing = async (e) => {
    
        await callMethod({
          contractId: process.env.CONTRACT_SERIES_NAME,
          method: 'nft_mint',
          args: {
              token_id: `${Date.now()}`,
              metadata: val,
              receiver_id: accountId
          }
        })
  
        console.log(args)

        setHasMinted(true)
    } */

  return (
    <>
    <div className='pl-24'>
        <div className="grid grid-cols-1 md:grid-cols-6 mx-4 content-center text-white pt-20">

            {/* modal for checkout */}
            {showModal ? (
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
            ) : null}

            {/* modal for sharing */}
            {showModalShare ? (
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
                                            {/* {{this.sharing.url}} */}
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

                        {/* <div onClick={() => setShowModal(true)} className='bg-white py-2 text-black rounded-lg text-center font-semibold'></div> */}
                       {/*  <div className='grid grid-cols-2 flex gap-x-4'>
                            <span onClick={isMinting} className='col-span-1 bg-white py-2 px-10 text-black rounded-lg text-center font-semibold'>Mint NFT</span>
                            <span className='col-span-1 bg-white py-2 px-10 text-black rounded-lg text-center font-semibold'>Cancel</span>
                        </div> */}

                        {accountId ?
                            <>
                            { hasMinted ? 
                                <div 
                                    /* onClick={isListing}   */
                                    className='bg-white py-2 text-black rounded-lg text-center font-semibold'
                                    >
                                    Update Price
                                </div>
                                :
                                <div 
                                    onClick={isMinting}  
                                    className='bg-white py-2 text-black rounded-lg text-center font-semibold'
                                    >
                                    Mint NFT
                                </div>
                            }
                            </>
                        :
                            <>
                            { hasMinted ? 
                                <div 
                                    onClick={isMinting}  
                                    className='bg-white py-2 text-black rounded-lg text-center font-semibold'
                                    >
                                    Make offer
                                </div>
                                :
                                <div 
                                    onClick={isMinting}  
                                    className='bg-white py-2 text-black rounded-lg text-center font-semibold'
                                    >
                                    Buy for 0.1
                                </div>
                            }
                            </>
                        }

                    </div>
                </div>

                <div class="flex lg:col-span-1 justify-center pt-10 md:pt-0">
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