import React from "react";
import React, { useState, useEffect, useRef } from "react";
import SliderButton from "../components/SliderButton/SliderButton";
import Filter from "../components/SearchFilter/Filter";
import { useNavigate } from "react-router-dom";
import dropdownOption from "../data/filter/marketOption.json";
import { images } from "../constant";
import slideOption from "../data/filter/slideOption.json";
import ReactImageAppear from "react-image-appear";
import InfiniteScroll from "react-infinite-scroller";
import LazyLoad from "react-lazyload";
import { BsChevronDown } from "react-icons/bs";
import { useWallet } from "../hooks/useWallet";
import { useProfile } from "../hooks/useProfile";

function Marketplace() {
  const { accountId, contractId, viewMethod} = useWallet()
  const { avatar } = useProfile();
  const [saleItem, setSaleItem] = useState([])
  const [sales, setSales] = useState([])
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null);

  //slider component
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === slideOption.length - 5 ? currentIndex : currentIndex + 5
    );
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? 0 : currentIndex - 5);
  };

  //navigate to the respective page based on uuid

  const navigate = useNavigate();

  const handleNFTClick = (data) => {
    setSelectedNFT(data);
    navigate(`/marketplace/${data.contract_id}/${data.tokenId}`, {
      state: { data },
    });
  };

  const handleCollectionClick = (data) => {
    setSelectedNFT(data);
    navigate(`/collection/${data.sale_collectibles.collectible_uuid}`, {
      state: { data },
    });
  };

  const handleCreatorClick = (data) => {
    setSelectedNFT(data);
    navigate(`/profile/${data.user_public_address}`, {
      state: { data, type: "marketplace" },
    });
  };

  const handleOwnerClick = (data) => {
    setSelectedNFT(data);
    navigate(`/profile/${data.user_public_address}`, { state: { data } });
  };

  //filter function
  const [filterOption, setFilterOption] = useState("");
  const [slideSelected, setSlideSelected] = useState(slideOption[0].value);

  const filteredData = {
    //for filter function
    lowest: (data) =>
      data.sort((a, b) => a.onsale_current_price - b.onsale_current_price),
    highest: (data) =>
      data.sort((a, b) => b.onsale_current_price - a.onsale_current_price),
    recent: (data) =>
      data.sort(
        (a, b) =>
          new Date(b.sale_collectibles.createdAt) -
          new Date(a.sale_collectibles.createdAt)
      ),
    oldest: (data) =>
      data.sort(
        (a, b) =>
          new Date(a.sale_collectibles.createdAt) -
          new Date(b.sale_collectibles.createdAt)
      ),

    //for filter using slider button
    collectibles: (data) =>
      data.filter(
        (d) => d.metadata.category === "Collectibles"
      ),
    membership: (data) =>
      data.filter(
        (d) => d.sale_collectibles.collectible_category === "Membership"
      ),
    arts: (data) =>
      data.filter((d) => d.metadata.category === "Art"),
    ticketing: (data) =>
      data.filter(
        (d) => d.sale_collectibles.collectible_category === "Ticketing"
      ),
    animation: (data) =>
      data.filter(
        (d) => d.sale_collectibles.collectible_category === "Animation"
      ),
    IrlArt: (data) =>
      data.filter((d) => d.sale_collectibles.collectible_category === "IrlArt"),
  };

  const filteredNft = () => {
    const data = test.result;

    if (filteredData[filterOption]) {
      return filteredData[filterOption](data);
    } else if (filteredData[slideSelected]) {
      return filteredData[slideSelected](data);
    } else {
      return data;
    }
  };

  const [open, setOpen] = useState(false);
  const onToggleDropdown = () => {
    setOpen(!open);
  };

  const handleOptionSelection = (value) => {
    setFilterOption(value);
    setOpen(false);
  };
  
  useEffect(() => {
    const getSaleMarketplace = async () => {
      const contractNftSale = ['369-nft.bonebon.testnet', 'nft-series.bonebon.testnet'];
      const sales = [];
  
      for (let i = 0; i < contractNftSale.length; i++) {
        const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_sales_by_nft_contract_id', { nft_contract_id: contractNftSale[i], from_index:"0", limit:100 });
        if (res) {
          sales.push(...res);
        }
      }
  
      const nfts = [];
  
      for (const sale of sales) {
        const tokens = await viewMethod(sale.nft_contract_id, 'nft_tokens', { from_index: '0', limit: 100 });
        const filteredTokens = tokens.filter(token => token.token_id === sale.token_id);
  
        if (filteredTokens.length > 0) {
          nfts.push({
            contract_id: sale.nft_contract_id,
            metadata: filteredTokens[0].metadata,
            tokenId: filteredTokens[0].token_id,
            price: sale.sale_conditions,
            owner_id: sale.owner_id,
          });
        }
      }
      
      console.log(nfts)
      setSales(sales);
      setNfts(nfts);
      setIsLoaded(true);
    };
  
    getSaleMarketplace();
  }, []);
  

  return (
    <div className='pt-10 mx-28'>

        <div className="grid">
        <div className="flex my-16 items-center">
          <div
            className="cursor-pointer"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src={images.arrow} className="" />
          </div>
          {/* <div className="flex mx-4 gap-4 overflow-x-hidden w-full justify-around">
            {slideOption
              .slice(currentIndex, currentIndex + 5)
              .map((option, index) => (
                <button
                  key={index}
                  className="w-[18%] flex-nowrap flex-none rounded-full bg-white text-orange-600 py-3 text-center border-2 border-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer"
                  onClick={() => {
                    setSlideSelected(option.value);
                  }}
                >
                  {option.label}
                </button>
              ))}
          </div> */}
          <div className="flex mx-4 gap-4 overflow-x-hidden w-full justify-around">
            {slideOption
              .slice(currentIndex, currentIndex + 5)
              .map((option, index) => (
                <button
                  key={index}
                  className={`w-[18%] flex-nowrap flex-none rounded-full text-center py-3 border-2 ${
                    slideSelected === option.value
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                  } cursor-pointer`}
                  onClick={() => {
                    setSlideSelected(option.value);
                  }}
                >
                  {option.label}
                </button>
              ))}
          </div>
          <div
            className="cursor-pointer"
            onClick={handleNext}
            disabled={currentIndex === slideOption.length - 5}
          >
            <img className="rotate-180 " src={images.arrow} />
          </div>
        </div>
      </div>

      {/* filter function */}
      <div className="flex justify-start items-center w-full mx-auto ">
        <div onClick={() => onToggleDropdown()}>
          <div className="text-black text-sm font-medium border-2 bg-white border-orange-600 rounded-xl px-6 py-4 w-56 flex justify-between items-center cursor-pointer">
            {filterOption
              ? dropdownOption.find((option) => option.value === filterOption)
                  .label
              : "Filter & Sort"}
            <BsChevronDown
              className={`${
                open ? "rotate-180 transform" : ""
              }  text-black text-xl`}
            />
          </div>
          {open ? (
            <div
              id="dropdownAvatar"
              className="z-20 w-56 absolute mt-4 bg-white  rounded-xl"
            >
              <ul className="flex flex-col p-6 text-sm font-medium text-black">
                <div className="cursor-default text-gray-500">Sort by</div>
                {dropdownOption.map((option, i) => {
                  return (
                    <li className="flex pt-2 cursor-pointer" key={i}>
                      <a
                        onClick={() => handleOptionSelection(option.value)}
                        className="block pt-1"
                      >
                        {option.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-20">
      {
        nfts.map((data, i) => (
           /*  <>
              <div 
                key={i} 
                className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
              >
                  <div>
                  <LazyLoad placeholder={<img src={images.loadNft} />}>       
                    <img 
                      className="object-cover object-center h-60 w-96 rounded-lg" 
                      src={data.metadata.media}
                      onClick={() => handleNFTClick(data)}
                    />
                    </LazyLoad>
                  </div>

                  <div className='text-lg font-semibold py-4'>{data.metadata.title}</div>

                  <div className='flex gap-x-2'>
                    <div>
                        <img src={data.metadata.media} className="market2-size"/>
                    </div>
                    <div>
                        <span className='text-black text-sm'>Creator</span>
                        <div className='text-black font-semibold text-sm'>{data.owner_id}</div>
                    </div>
                </div>
                  
              </div>
            </> */
            <div
              key={i}
              className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
            >
              <div className="rounded-lg">
                <div
                  onClick={() => handleNFTClick(data)}
                  className="bg-white rounded-lg"
                >
                  <LazyLoad placeholder={<img src={images.loadNft} />}>
                    <img
                      src={data.metadata.media}
                      className="object-cover object-center h-40 md:h-60 w-full rounded-lg cursor-pointer"
                    />
                  </LazyLoad>
                </div>
              </div>

              <div className="py-4 text-lg font-semibold">
                {data.metadata.title}
              </div>

              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-gray-400">
                   {/*  ERC721 to display NFT standard type */}
                   NFT SERIES
                  </span>
                  <p className="text-sm font-semibold">
                    {/* Edition 1/1 to display edition number in future */}
                  </p>
                </div>
                <div className="flex">
                  <img
                    onClick={() => handleCollectionClick(data)}
                    src={avatar}
                    className="market-size z-10 cursor-pointer"
                  />
                  <img
                    onClick={() => handleCreatorClick(data)}
                    src={avatar}
                    className="market1-size z-20 cursor-pointer"
                  />
                  <img
                    onClick={() => handleOwnerClick(data)}
                    src={data.metadata.media}
                    className="market2-size z-30 cursor-pointer"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <p className="text-sm text-gray-400">List Price</p>
              <span className="text-md font-semibold">
              {`${(data.price / 10 ** 24).toFixed(2)} Ⓝ`}
              </span>
            </div>
        )) 
      }
    </div>
    </div>
  )
}

export default Marketplace;
