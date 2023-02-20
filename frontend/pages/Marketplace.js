import React from "react";
import React, { useState, useEffect, useRef } from "react";
import SliderButton from "../components/SliderButton/SliderButton";
import Filter from "../components/SearchFilter/Filter";
import test from "../data/test.json";
import { useNavigate } from "react-router-dom";
import dropdownOption from "../data/filter/marketOption.json";
import { images } from "../constant";
import slideOption from "../data/filter/slideOption.json";
import ReactImageAppear from "react-image-appear";
import InfiniteScroll from "react-infinite-scroller";
import LazyLoad from "react-lazyload";
import { BsChevronDown } from "react-icons/bs";

function Marketplace() {
  const [selectedNFT, setSelectedNFT] = useState(null);

  // const elementRef = useRef(null);
  // const [arrowDisable, setArrowDisable] = useState(true);

  // const handleHorizantalScroll = (element, speed, distance, step) => {
  //   let scrollAmount = 0;
  //   const slideTimer = setInterval(() => {
  //     element.scrollLeft += step;
  //     scrollAmount += Math.abs(step);
  //     if (scrollAmount >= distance) {
  //       clearInterval(slideTimer);
  //     }
  //     if (element.scrollLeft === 0) {
  //       setArrowDisable(true);
  //     } else {
  //       setArrowDisable(false);
  //     }
  //   }, speed);
  // };

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
    navigate(`/marketplace/${data.sale_collectibles.collectible_uuid}`, {
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
        (d) => d.sale_collectibles.collectible_category === "Collectibles"
      ),
    membership: (data) =>
      data.filter(
        (d) => d.sale_collectibles.collectible_category === "Membership"
      ),
    arts: (data) =>
      data.filter((d) => d.sale_collectibles.collectible_category === "Art"),
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

  //smart contract marketplace

  return (
    <div className="body-container">
      <div className="font-bold pt-10 text-3xl">Explore Marketplace</div>

      {/* slider button */}
      {/* <div className="grid">
        <div className="flex my-16 items-center">
          <div
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, -10);
            }}
            disabled={arrowDisable}
            className="cursor-pointer"
          >
            <img src={images.arrow} />
          </div>

          <div
            className="flex mx-4 gap-6 overflow-x-hidden w-full"
            ref={elementRef}
          >
            {slideOption.map((slide, i) => (
              <div
                key={i}
                className=" w-1/5 flex-nowrap flex-none p-2 rounded-full bg-white text-orange-600 py-3 text-center border-2 border-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setSlideSelected(slide.value);
                }}
              >
                {slide.label}
              </div>
            ))}
          </div>

          <div
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, 10);
            }}
          >
            <img className="rotate-180 cursor-pointer" src={images.arrow} />
          </div>
        </div>
      </div> */}

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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
        <>
          {filteredNft().map((data, i) => (
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
                      src={data.sale_collectibles.ipfs_media_path}
                      className="object-cover object-center h-40 md:h-60 w-full rounded-lg cursor-pointer"
                    />
                  </LazyLoad>
                </div>
              </div>

              <div className="py-4 text-lg font-semibold">
                {data.sale_collectibles.collectible_name}
              </div>

              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-gray-400">
                    {data.sale_collectibles.collectible_type.toUpperCase()}
                  </span>
                  <p className="text-sm font-semibold">
                    Edition {data.quantity} /{" "}
                    {data.sale_collectibles.noOfCopies}
                  </p>
                </div>
                <div className="flex">
                  <img
                    onClick={() => handleCollectionClick(data)}
                    src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectible_collection.tokenLogo}`}
                    className="market-size z-10 cursor-pointer"
                  />
                  <img
                    onClick={() => handleCreatorClick(data)}
                    src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectibles_user.profile_photo_path}`}
                    className="market1-size z-20 cursor-pointer"
                  />
                  <img
                    onClick={() => handleOwnerClick(data)}
                    src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectibles_user.profile_photo_path}`}
                    className="market2-size z-30 cursor-pointer"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <p className="text-sm text-gray-400">List Price</p>
              <span className="text-md font-semibold">{`${
                data.onsale_current_price / 10 ** 18
              } Ⓝ`}</span>
            </div>
          ))}
          {/*  {loading && <p>Loading...</p>} */}
        </>
      </div>
    </div>
  );
}

export default Marketplace;
