import React, { useState, useEffect, useCallback } from 'react';
import { images } from '../constant';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useProfile } from '../hooks/useProfile';

export const SingleNFTMarketplace = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [sale, setSale] = useState({});

  useEffect(() => {
    const getNFT = async () => {
      const tokens = await viewMethod(params.contract_id, 'nft_tokens', {
        from_index: '0',
        limit: 100,
      });
      if (tokens) {
        const nft = tokens.find((token) => token.token_id === params.id);
        setData(nft);
      } else {
        navigate('/marketplace');
      }
    };

    const getSale = async () => {
      const res = await viewMethod(
        process.env.CONTRACT_MARKETPLACE_NAME,
        'get_sale',
        { nft_contract_token: `${params.contract_id}.${params.id}` }
      );

      if (res) {
        setSale(res);
      } else {
        navigate('/marketplace');
      }
    };

    if (data) {
      getNFT();
      getSale();
    }
  }, [params]);

  const [currentComponent, setCurrentComponent] = useState('A');
  const [showModal, setShowModal] = useState(false);
  const [modalUpdatePrice, setModalUpdatePrice] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const { accountId, contractId, viewMethod, callMethod } = useWallet();
  const { avatar } = useProfile();

  const handleCollectionClick = (data) => {
    setSelectedNFT(data);
    navigate(`/collection/${data.sale_collectibles.collectible_uuid}`, {
      state: { data },
    });
  };

  const handleCreatorClick = (data) => {
    setSelectedNFT(data);
    navigate(`/profile/${data.user_public_address}`, { state: { data } });
  };

  const handleOwnerClick = (data) => {
    setSelectedNFT(data);
    navigate(`/profile/${data.user_public_address}`, { state: { data } });
  };

  useEffect(() => {}, [currentComponent]);

  const [sharing, setSharing] = useState({
    url: '',
    title: '3six9 NFT',
    description: '3six9 NFT',
    quote: '3six9 NFT',
  });

  const networks = [
    {
      network: 'facebook',
      name: 'Facebook',
      icon: 'fab fa-facebook',
      color: '#ffffff',
    },
    {
      network: 'twitter',
      name: 'Twitter',
      icon: 'fab fah fa-lg fa-twitter',
      color: '#ffffff',
    },
    {
      network: 'linkedin',
      name: 'LinkedIn',
      icon: 'fab fah fa-lg fa-linkedin',
      color: '#ffffff',
    },
    {
      network: 'reddit',
      name: 'Reddit',
      icon: 'fab fah fa-lg fa-reddit-alien',
      color: '#ffffff',
    },
  ];

  const copyUrl = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    // form submission logic
  }, []);

  const isUpdatePrice = async () => {
    await callMethod({
      contractId: process.env.CONTRACT_MARKETPLACE_NAME,
      method: 'update_price',
      args: {
        token_id: data.tokenId,
        nft_contract_id: params.contract_id,
        price: parseNearAmount(newPrice),
      },
      gas: process.env.THIRTY_TGAS,
      deposit: '1',
    });
  };

  const onPurchase = async () => {
    await callMethod({
      contractId: process.env.CONTRACT_MARKETPLACE_NAME,
      method: 'offer',
      args: {
        token_id: data.tokenId,
        nft_contract_id: params.contract_id,
      },
      gas: process.env.THIRTY_TGAS,
      deposit: process.env.DEPOSIT,
    });

    console.log(args);
  };

  const isRemovingSale = async () => {
    await callMethod({
      contractId: process.env.CONTRACT_MARKETPLACE_NAME,
      method: 'remove_sale',
      args: {
        token_id: data.tokenId,
        nft_contract_id: params.contract_id,
      },
      gas: process.env.THIRTY_TGAS,
      deposit: '1',
    });
  };

  return (
    <>
      {data && data.metadata && (
        <div className='pl-24'>
          <div className='grid grid-cols-1 md:grid-cols-6 mx-4 content-center text-white pt-20'>
            {/* modal for checkout */}
            {showModal ? (
              <>
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                  <div
                    className='fixed inset-0 w-full h-full bg-black opacity-40'
                    onClick={() => setShowModal(false)}
                  ></div>
                  <div className='flex justify-center items-center min-h-screen px-4 py-8'>
                    <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
                      <div className='mt-3 flex justify-center'>
                        <div className='mt-10'>
                          <h4 className='text-3xl text-center font-bold text-gray-800'>
                            Checkout
                          </h4>
                          <p className='mt-2 text-center text-[16px] leading-relaxed text-gray-400'>
                            You are about to purchase
                            <span className='text-black font-semibold'>
                              {' '}
                              {data.metadata.title}{' '}
                            </span>
                            from
                            <span className='text-black font-semibold'>
                              {' '}
                              {data.owner_id}{' '}
                            </span>
                            <br />
                          </p>
                          <div className='flex justify-between text-black text-sm py-4 mt-4 px-4'>
                            <span>List price</span>
                            <span className='text-gray-400'>
                              {sale.sale_conditions / 10 ** 24} Ⓝ
                            </span>
                          </div>
                          <hr />
                          {/*  <div className="flex justify-between text-black text-sm pt-2 px-4">
                      <span>Your Balance</span>
                      <span className="text-gray-400">{}</span>
                    </div> */}
                          {/* <div className="flex justify-between text-black text-sm pt-2 px-4">
                      <span>Service Fee (2.5%)</span>
                      <span className="text-gray-400">abc</span>
                    </div> */}
                          <div className='flex justify-between text-black text-sm pt-2 pb-10 px-4'>
                            <span>You will pay</span>
                            <span className='text-gray-400'>
                              {sale.sale_conditions / 10 ** 24} Ⓝ
                            </span>
                          </div>

                          <div className='items-center gap-2 mt-3 sm:flex'>
                            <button
                              className='w-full mt-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2'
                              onClick={() => onPurchase()}
                            >
                              Proceed to payment
                            </button>
                          </div>
                          <div className='items-center gap-2 mt-3 mb-10 sm:flex'>
                            <button
                              className='w-full my-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2'
                              onClick={() => setShowModal(false)}
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

            {modalUpdatePrice ? (
              <>
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                  <div
                    className='fixed inset-0 w-full h-full bg-black opacity-40'
                    onClick={() => setModalUpdatePrice(false)}
                  ></div>
                  <div className='flex justify-center items-center min-h-screen px-4 py-8'>
                    <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
                      <div className='mt-3 flex justify-center'>
                        <div className='mt-4 mb-10 px-10'>
                          <div className='text-3xl text-center font-bold text-gray-800'>
                            Update Price
                          </div>
                          <div className='mt-10 relative text-black'>
                            <input
                              /* type="number" */
                              name='salePrice'
                              className='bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black'
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              style={{ padding: '20px' }}
                            />
                            <div className='pl-2 pr-3 text-xl absolute inset-y-0 right-0 pt-2 flex items-center'>
                              Ⓝ
                            </div>
                          </div>

                          {/* <div className='text-xs text-gray-800 pt-2'>
                                    Platform Fee: 0% <br/>
                                    You will receive Ξ 0 (~$0.000)
                                    </div> */}

                          <div className='pt-14'>
                            <div className='text-black text-sm mx-10 text-center'>
                              You will be redirected to your wallet to confirm
                              your transaction.
                            </div>
                            <div className='grid grid-cols-2 justify-center gap-x-4 text-gray-400 text-sm pt-4'>
                              <button
                                className='col-span-1 py-2'
                                onClick={isUpdatePrice}
                              >
                                Confirm
                              </button>
                              <button
                                className='col-span-1'
                                onClick={() => setModalUpdatePrice(false)}
                              >
                                Cancel
                              </button>
                            </div>
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
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                  <div
                    className='fixed inset-0 w-full h-full bg-black opacity-40'
                    onClick={() => setShowModalShare(false)}
                  ></div>
                  <div className='flex justify-center items-center min-h-screen px-4 py-8'>
                    <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
                      <div className='mt-3 flex justify-center'>
                        <div className='mt-10'>
                          <h4 className='text-3xl text-center font-bold text-gray-800'>
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

                          <div className='w-100 m-auto link-section'>
                            <div className='share-link text-weight-500 text-size-18'>
                              {/* {{this.sharing.url}} */}
                            </div>
                            <div className='link-copy-btn' onClick={copyUrl}>
                              <div className='m-auto'>copy</div>
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
            <div className='flex flex-col md:col-span-3 justify-end ml-10 xl:ml-28'>
              <div className='flex gap-x-4'>
                <span>
                  <img src={avatar} className='creator-size' />
                </span>
                <span className='font-extrabold pt-2 text-gray-400'>
                  {data.owner_id}
                </span>
              </div>
              <div>
                <div className='text-5xl font-bold pt-4 pb-10'>
                  {data.metadata.title}
                </div>
                <div>
                  <img
                    className='rounded-xl w-full h-full md:w-full md:h-full lg:w-4/5 lg:h-2/5'
                    src={data.metadata.media}
                  />
                </div>
              </div>
            </div>

            {/* right container */}
            <div className='flex md:col-span-2 justify-center md:min-w-[450px]'>
              <div className='flex flex-col w-full'>
                <div className='text-orange-600 font-bold text-4xl pb-6 pt-10'>
                  {`${(sale.sale_conditions / 10 ** 24).toFixed(2)} Ⓝ`}
                </div>
                {/* <div className="text-gray-500 pb-4 text-medium">
            $60.5905 (Edition 1 of 1)
          </div> */}
                <div className='bg-white flex flex-row text-black  rounded-full font-semibold items-center '>
                  <div
                    className={`rounded-full px-4 py-2 cursor-pointer  ${
                      currentComponent === 'A'
                        ? 'bg-orange-600'
                        : 'text-gray-500'
                    }`}
                    onClick={() => setCurrentComponent('A')}
                  >
                    Info
                  </div>
                  <div
                    className={`rounded-full px-4 py-2 cursor-pointer ${
                      currentComponent === 'B'
                        ? 'bg-orange-600'
                        : 'text-gray-500'
                    }`}
                    onClick={() => setCurrentComponent('B')}
                  >
                    Owners
                  </div>
                  <div
                    className={`rounded-full px-4 py-2 cursor-pointer ${
                      currentComponent === 'C'
                        ? 'bg-orange-600'
                        : 'text-gray-500'
                    }`}
                    onClick={() => setCurrentComponent('C')}
                  >
                    History
                  </div>
                </div>

                <div className='py-10 my-4 bg-gray-200 text-black rounded-xl font-medium'>
                  {currentComponent === 'A' ? (
                    <div className='grid gap-6 px-6'>
                      <div className='flex gap-x-4'>
                        <span>
                          <img
                            src={avatar}
                            className='creator-size'
                            onClick={() => handleCreatorClick(data)}
                          />
                        </span>
                        <span>
                          Owner
                          <div className='font-extrabold w-80 block truncate '>
                            {data.owner_id}
                          </div>
                        </span>
                      </div>
                      {/* <div className="bg-orange-100 px-10 py-4 text-gray-500 font-medium rounded-lg">
                  20.00% of sales will be paid to the original artist
                </div> */}
                      <div className='flex gap-x-4'>
                        <span>
                          <img
                            src={images.logo}
                            className='creator-size'
                            onClick={() => handleCollectionClick(data)}
                          />
                        </span>
                        <span>
                          Collection
                          <div className='font-extrabold'>
                            {'369 Marketplace'}
                          </div>
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {currentComponent === 'B' ? (
                    <div className='grid gap-6 px-6'>
                      <div className='flex gap-x-4'>
                        <span>
                          <img
                            src={data.metadata.media}
                            className='creator-size'
                          />
                        </span>
                        <span>
                          Owner
                          <div className='font-extrabold'>{data.owner_id}</div>
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {currentComponent === 'C' ? (
                    <div className='grid gap-6 px-6'>
                      <div className='flex gap-x-4'>
                        <span>
                          <img
                            src={data.metadata.media}
                            className='creator-size'
                          />
                        </span>
                        <span>
                          Owner
                          <div className='font-extrabold'>{data.owner_id}</div>
                        </span>
                      </div>
                      <div className='flex gap-x-4'>
                        {/* <span>
                    <img
                      src={
                        data.metadata.media
                      }
                      className="creator-size"
                    />
                  </span> */}
                        {/*  <span>
                    Is selling for 0.001 ETH
                    <div className="font-extrabold">
                      {data.owner_id}
                    </div>
                  </span> */}
                      </div>
                    </div>
                  ) : null}
                </div>

                {data.owner_id === accountId ? (
                  <div className='grid grid-cols-2'>
                    <div
                      onClick={() => setModalUpdatePrice(true)}
                      className='bg-white py-2 text-black rounded-lg text-center font-semibold mr-4 cursor-pointer'
                    >
                      Update price
                    </div>
                    <div
                      className='bg-white py-2 text-black rounded-lg text-center font-semibold'
                      onClick={isRemovingSale}
                    >
                      Remove sale
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowModal(true)}
                    className='bg-white py-2 text-black rounded-lg text-center font-semibold cursor-pointer'
                  >
                    Buy 1 for {`${sale.sale_conditions / 10 ** 24} Ⓝ`}
                  </div>
                )}
              </div>
            </div>

            <div className='flex lg:col-span-1 justify-center pt-10 md:pt-0'>
              <div className='flex md:flex-col gap-y-4 gap-x-10 mx-10'>
                <div className='bg-white rounded-liked py-4 pl-3.5'>
                  <img src={images.beforeliked} />
                </div>
                <div
                  onClick={() => setShowModalShare(true)}
                  className='bg-white rounded-liked py-4 pl-3'
                >
                  <img src={images.share} />
                </div>
              </div>
            </div>
          </div>

          {/* Description part */}
          <div className='grid grid-cols-1 md:grid-cols-1 mx-4 text-white pt-20'>
            <div className='flex justify-center p-2 rounded-full m-auto font-medium bg-white w-40 text-orange-600'>
              Description
            </div>

            <div className='flex flex-col gap-y-8 justify-center bg-white rounded-lg text-black my-6 p-20 mx-1 lg:mx-48'>
              <div>
                <span className='font-medium text-lg'>Description</span>
                <div className='font-medium text-md text-gray-500 pt-8'>
                  {data.metadata.description}
                </div>
              </div>

              <div>
                <span className='font-medium'>Token Address</span>
                <div className='font-medium text-md text-gray-500 pt-2'>
                  {params.contract_id}
                </div>
              </div>

              <div>
                <span className='font-medium'>Token Id</span>
                <div className='font-medium text-md text-gray-500 pt-2'>
                  {params.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
