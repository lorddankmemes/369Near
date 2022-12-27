import React, {useState, useEffect} from 'react'
import { images } from '../constant';

const nft = {"name":"One World Stamp - Pandemic Series","description":"This series of stamps was created to memorize the common experience faced by the whole world\n","image":"https://3six9.infura-ipfs.io/ipfs/QmVcZMWeRgn6nZffC38zxJxT4hNtYPgGJqT9gGkMR8XbpC","external_url":"https://app.3six9.space/token2/0xFbE0F78D6a6339C9E7c586dD96dA9f5dFA09D773:187","attributes":[]}

export const SingleNFTMarketplace = () => {

    const [currentComponent, setCurrentComponent] = useState('A');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        }, [currentComponent]);

  return (
    <>
    <div class="grid grid-cols-1 md:grid-cols-6 mx-4 content-center text-white pt-20">

    {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
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

        <div class="flex flex-col md:col-span-3 justify-center mx-8">
            <div className='flex gap-x-4'>
                <span><img src={nft.image} className="creator-size"/></span>
                <span className='font-extrabold pt-2 text-gray-400'>{nft.name}</span>
            </div>
            <div>
                <div className='text-5xl font-bold pt-4 pb-10'>{nft.name}</div> 
                <img src={nft.image}  />        
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
                                <span><img src={nft.image} className="creator-size"/></span>
                                <span>Owner
                                    <div className='font-extrabold'>{nft.name}</div>
                                </span>
                            </div>
                            <div className='flex gap-x-4'>
                                <span><img src={nft.image} className="creator-size"/></span>
                                <span>Creator
                                        <div className='font-extrabold'>{nft.name}</div>
                                </span>
                            </div>
                            <div className='bg-orange-100 px-10 py-4 text-gray-500 font-medium rounded-lg'>20.00% of sales will be paid to the original artist</div>
                            <div className='flex gap-x-4'>
                                <span><img src={nft.image} className="creator-size"/></span>
                                <span>Collection (ERC721)
                                        <div className='font-extrabold'>{nft.name}</div>
                                </span>
                            </div> 
                        </div>
                    : null}

                    {currentComponent === 'B' ? 
                        <div className='grid gap-6 px-6'>
                            <div className='flex gap-x-4'>
                                <span><img src={nft.image} className="creator-size"/></span>
                                <span>Is selling for 0.001 ETH
                                    <div className='font-extrabold'>{nft.name}</div>
                                </span>
                            </div>
                        </div>
                    : null}

                    {currentComponent === 'C' ? 
                        <div className='grid gap-6 px-6'>
                            <div className='flex gap-x-4'>
                                <span><img src={nft.image} className="creator-size"/></span>
                                <span>Is selling for 0.001 ETH
                                    <div className='font-extrabold'>{nft.name}</div>
                                </span>
                            </div>
                            <div className='flex gap-x-4'>
                                <span><img src={nft.image} className="creator-size"/></span>
                                <span>Is selling for 0.001 ETH
                                    <div className='font-extrabold'>{nft.name}</div>
                                </span>
                            </div>
                        </div>
                    : null}
                </div>

                <div onClick={() => setShowModal(true)} className='bg-white py-2 text-black rounded-lg text-center font-semibold'>Buy 1 for 0.001 ETH</div>
            </div>
        </div>

        <div class="flex lg:col-span-1 justify-center pt-10 md:pt-0">
        <div className='flex md:flex-col gap-y-4 gap-x-10 mx-10'>
                <div className='bg-white rounded-full py-4 px-2'><img src={images.beforeliked} /></div>
                <div className='bg-white rounded-full py-4 px-2'><img src={images.share} /></div>
            </div>
        </div>

    </div>


{/* Description part */}
    <div class="grid grid-cols-1 md:grid-cols-1 mx-4 text-white pt-20">
        <div className='flex justify-center p-2 rounded-full m-auto bg-white text-black w-40 text-orange-600'>Description</div>

            <div className='flex flex-col gap-y-8 justify-center bg-white rounded-lg text-black my-6 p-20 mx-1 lg:mx-48'>
                    <div>
                        <span className='font-medium text-lg'>Description</span>
                        <div className='font-medium text-md text-gray-500 pt-8'>
                        The Aurora Camel NFTs are the first in this collection to be released. The Aurora Camels is a collection of 274 uniquely generated digital collectibles living on the Aurora & Near blockchain.
                        </div>
                    </div>

                    <div>
                        <span className='font-medium'>Token Address</span>
                        <div className='font-medium text-md text-gray-500 pt-2'>{nft.name}</div>
                    </div>

                    <div>
                        <span className='font-medium'>Token Id</span>
                        <div className='font-medium text-md text-gray-500 pt-2'>{nft.name}</div>
                    </div>
            </div>
    </div>
    </>
  )
}
