import React, {useState, useEffect, useRef} from 'react'
import { images } from '../constant';
import { useLocation } from 'react-router-dom';

//collectible auction info
const auction = {
  auction_end: "2023-03-02T15:29:00.000Z",
  auction_id: 32,
  auction_start: "2022-12-02T15:29:00.000Z",
  auction_status: 1,
  auction_uuid: "6fc177bc-1f95-4aa7-90f4-9b476787a47b",
  bid_increment: "10000000000000000",
  collectibleId: 220,
  currency_address: "0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb",
  currency_id: null,
  currency_symbol: "WETH",
  latest_bid: null,
  quantity: 1,
  reserved_price: "100000000000000000",
  seller_address: "0xaAF7689aeb37dF63CcB3F349c1aF636973BFcF1C",
  seller_first_name: "NEArt",
  seller_last_name: "my",
  seller_profile_photo_path: "QmRZ6ykVAYYYzk4D3auFVJqhcpYaumhMFmEHVamHEbsyA8",
  seller_username: "neart",
  starting_price: "4000000000000000",
  token_address: "0xFbE0F78D6a6339C9E7c586dD96dA9f5dFA09D773",
  token_id: 176,
  token_type: "erc721"
}

//collectible info
const info = {
  alternative_animation_media_path: null,
  alternative_media_path: "https://3six9.s3.ap-southeast-1.amazonaws.com/aurora/media/fce2ee1cd003347031e90bd0ebc9f40d",
  alternative_media_path_medium:"https://3six9.s3.ap-southeast-1.amazonaws.com/aurora/media/fce2ee1cd003347031e90bd0ebc9f40d-medium",
  alternative_media_path_og: "",
  animation_media_mime_type: "",
  collectible_category: "Collectibles",
  collectible_description: "Diver",
  collectible_favorite_count: 0,
  collectible_name: "Doolly #24",
  collectible_type: "erc721",
  collectible_uuid: "2c771431-3649-4a2a-97ad-ee3a4a3ad294",
  ipfs_animation_media_path: null,
  ipfs_hash: "QmYvxd6AvjYk4redPWmCnGpZzj7hrYxMnS8uJxk6KmJMDT",
  ipfs_media_path: "https://3six9.infura-ipfs.io/ipfs/QmRkwkxEvLWLqw1MoEhTjGR1Yo5REaDWdsggtNdPWLzxKg",
  ipfs_path: "QmYvxd6AvjYk4redPWmCnGpZzj7hrYxMnS8uJxk6KmJMDT",
}

function SingleAuction() {
  const location = useLocation();
  const { data } = location.state;
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('A');

  useEffect(() => {
    }, [currentComponent]);

    const Ref = useRef(null);

    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }
  
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(e);
    if (total >= 0) {
  
        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the beginning of the variable
        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
    }
  }
  
  const clearTimer = (e) => {
    
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:10');
  
    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000)
    Ref.current = id;
  }
  
  const getDeadTime = () => {
    let deadline = new Date();
  
    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  }
  
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-4 text-white pt-20 m-10 md:m-16 lg:m-0">

      {/* left section */}
      <div className="flex col-span-1 justify-center relative">
        { showModal ?
          <div className='flex bg-white py-10 text-black rounded-lg px-6 w-full lg:w-4/5 absolute z-3 bottom-0 lg:bottom-1/4' onClick={() => setShowModal(false)}>
             <div>
              Starting price
              <div>{auction.starting_price}{auction.currency_symbol}</div>
              <div>(+Platform fee {auction.currency_symbol})</div>
              <div>Auction ending in</div>
            </div>
          </div>
          : null}
          <img className="rounded-xl w-full h-full md:full md:h-full lg:w-3/5 lg:h-4/5" src={data.auctions_of_collectible.ipfs_media_path}  />
      </div>

      {/* right section */}
      <div class="flex col-span-1 lg:w-4/5 justify-center">
        { !showModal ?
          <div className='flex flex-col w-full'>

            <div className='flex gap-x-8 mb-12 pt-10 lg:pt-0'>
              <div className='bg-white rounded-full p-4'><img src={images.beforeliked} /></div>
              <div className='bg-white rounded-full p-4'><img src={images.plus} /></div>
              <div className='bg-white rounded-full py-4 px-3'><img src={images.share} /></div>
            </div>

            <div className='flex gap-x-4'>
                <span><img src={`https://ipfs.io/ipfs/${auction.seller_profile_photo_path}`} className="creator-size"/></span>
                <span>
                    <div className='font-bold'>{data.auctions_of_collectible.collectibles_user.username}</div>
                </span>
            </div>

            <div className='text-5xl font-bold pb-12'>{data.auctions_of_collectible.collectible_name}</div>

            <div className='flex flex-col gap-y-1 bg-white py-10 rounded-lg px-6 text-[14px] text-black'>
                <div className='font-medium pb-4'>Starting price</div>
                <div className='text-3xl font-medium'>{/* {auction.starting_price} */}0.004 {auction.currency_symbol}</div>
                <div className='font-semibold'>(+Platform fee 0.0001{auction.currency_symbol})</div>
                <div className='font-semibold text-gray-600'>$5.3249</div>
                <div className='font-semibold'>Auction ending in</div>
                <div className='text-3xl'>{timer}</div>
            </div>

            <div 
              onClick={() => setShowModal(true)} 
              className='outline outline-orange-600 bg-none py-6 my-10 text-orange-600 rounded-lg text-center font-semibold'>
              Place a bid
            </div>
          </div>
        : 
          <div className="flex flex-col w-full mr-10">
                      <div className='flex flex-col col-span-1'>
                      <div className='text-3xl lg:text-5xl  pb-10 pt-10 lg:pt-2 text-black font-semibold'>Place a bid</div>
                          <div className='grid md:grid-cols-4 rounded-xl border-[1px] bg-white border-gray-200 mt-2'>
                                            <div className="flex items-center md:col-span-3 justify-between">
                                                <input
                                                    /* type="number" */
                                                    name="reservedPrice"
                                                    className="h-16 w-full rounded-md pl-6 focus:outline-none"
                                                />
                                            </div>
                                            <div 
                                                className='flex flex-col md:col-span-1 w-full text-2xl font-medium text-black text-center rounded-xl'
                                                style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}>
                                                WETH
                                            </div>
                          </div>

                          <div className='text-sm pt-6 text-white'>$0.00</div>
                          <div className='text-sm pb-6 text-white'>Next minimum price is 0.014 WETH ($17.0635)</div>

                          <div className='flex flex-col md:flex-row justify-between gap-6 pt-8'>
                              <button
                                  className="w-full py-5 text-orange-600 bg-transparent ring-orange-600 ring-2 hover:bg-orange-600 hover:text-white"
                                  onClick={() =>
                                      setShowModal(false)
                                  }
                              >
                                  Place a bid
                              </button>
                              <button
                                  className="w-full py-5 text-orange-600 bg-transparent ring-orange-600 ring-2 hover:bg-orange-600 hover:text-white"
                                  onClick={() =>
                                        setShowModal(false)
                                  }
                              >
                                  Close
                              </button>
                          </div>

                          <div className='h-20 w-100 bg-neutral-300 text-white rounded-xl mt-6 font-semibold text-md grid content-center'>
                            <div className='flex justify-between mx-8'>
                              <div>Your Balance</div>
                              <div>0 WETH</div>
                            </div>
                          </div>

                          <div className='bg-white text-gray-600 w-2/5 text-center rounded-full shadow-2xl p-1 my-5'>
                            Convert ETH to WETH
                          </div>

                          <div className='pt-8 text-sm font-medium'>Bids placed in an auction cannot be withdrawn</div>
                          <div className='pt-2 text-sm font-medium text-gray-400'>Learn how our auctions work</div>

                          
              </div>
          </div>
      }
      </div>
     
    </div>
    

    <div class="grid grid-cols-1 md:grid-cols-1 mx-4 text-white pt-20">
        <div className='flex justify-center gap-20'>
           <span className='rounded-full h-10 px-4 bg-transparent active:bg-white' onClick={() => setOpen(true)} >Description</span>
           <span className='rounded-full h-10 px-4' onClick={() => setOpen(false)} >Bidding History</span>
        </div>

        <div className='justify-center bg-white rounded-lg text-black my-6 p-20 mx-2 lg:mx-56'>
        { open ? 
          <div className='flex flex-col gap-y-8'>
                <div>
                    <span className='font-medium text-lg'>Description</span>
                    <div className='font-medium text-md text-gray-500'>{info.collectible_description}</div>
                </div>

                <div>
                  <span className='font-medium text-lg'>Token Address</span>
                    <div className='font-medium text-md text-gray-500'>{auction.token_address}</div>
               </div>

                <div>
                    <span className='font-medium text-md'>Token Id</span>
                    <div className='font-medium text-md text-gray-500'>{auction.token_id}</div>
                </div>
            </div>
        : 
            <div>
              <span className='font-medium text-lg'>Description</span>
            </div>
         }
        </div>

    </div>
   </>
  )
}

export default SingleAuction