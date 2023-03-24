import React, { useState } from "react";
import platform from "../data/platform";
import activity from "../data/activity.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from "../constant";
import moment from "moment";
import { BsChevronDown } from "react-icons/bs";

function Activity() {
  //filter function
  const topOption = [
    {
      value: "sellers",
      label: "Top Sellers",
      label2: "Sales",
    },
    {
      value: "collectors",
      label: "Top Collectors",
      label2: "Collections",
    },
  ];

  //filter function
  const timeOption = [
    {
      value: "1d",
      label: "In 1 day",
    },
    {
      value: "2d",
      label: "In 2 days",
    },
    {
      value: "7d",
      label: "In 7 days",
    },
    {
      value: "30d",
      label: "In 30 days",
    },
  ];

  const [filterOptionTop, setFilterOptionTop] = useState("");
  const [filterOptionTime, setFilterOptionTime] = useState("");
  const [openTop, setOpenTop] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const onToggleDropdownTop = () => {
    setOpenTop(!openTop);
  };

  const onToggleDropdownTime = () => {
    setOpenTime(!openTime);
  };

  const handleOptionSelectionTop = (valueTop) => {
    setFilterOptionTop(valueTop);
    setOpenTop(false);
  };

  const handleOptionSelectionTime = (valueTime) => {
    setFilterOptionTime(valueTime);
    setOpenTime(false);
  };

  return (
    <>
      <div className="body-container lg:mx-14">
        <div className="pt-10">
          <a
            href="/"
            className="bg-white border-2 border-orange-600 text-black font-semibold rounded-xl py-2 px-8 hover:text-white hover:bg-orange-600"
          >
            Go back
          </a>
        </div>

        <div className="text-5xl font-bold my-10">Activity</div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col md:col-span-1 gap-y-10 mr-10">
            <div className="box-border h-22 w-32 py-1 text-center border-4 bg-white text-black font-bold border-orange-600 rounded-full">
              All activity
            </div>

            <div>
              <div className="grid gap-6 mb-10">
                {activity.result.map((data, index) => (
                  <div className="grid grid-cols-3 md:grid-cols-3 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
                    <div className="flex flex-col col-span-1 md:col-span-1">
                      <LazyLoadImage
                        className="object-cover object-center h-28 w-30 rounded-lg col-span-1"
                        src={data.transaction_of_collectible.ipfs_media_path}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col col-span-2 md:col-span-2 ml-6">
                      <span className="col-span-2 mt-8">
                        <span className="font-bold">
                          {data.activity_by_user_name}
                        </span>
                        <span> {data.action_type}</span>
                        <span className="text-gray-400 font-bold">
                          {" "}
                          {
                            data.transaction_of_collectible.collectible_name
                          }{" "}
                        </span>
                        on
                        <span className="font-bold">
                          {" "}
                          {data.transaction_of_collectible.collectible_category}
                        </span>
                        <div className="text-gray-400 pt-4">
                          {moment(data.activity_datetime).fromNow()}
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <div className="md:flex gap-x-6">
              {/* filter function */}

              {/* Top filter  */}
              <div className="flex justify-start items-center">
                <div onClick={() => onToggleDropdownTop()}>
                  <div className="text-black font-medium px-6 py-4 cursor-pointer flex justify-between items-center border-2 bg-white border-orange-600 rounded-xl w-56">
                    {filterOptionTop
                      ? topOption.find(
                          (option) => option.value === filterOptionTop
                        )
                        ? topOption.find(
                            (option) => option.value === filterOptionTop
                          ).label
                        : "Top Sellers"
                      : "Top Sellers"}
                    <BsChevronDown
                      className={`${
                        openTop ? "rotate-180 transform" : ""
                      }  text-black text-xl`}
                    />
                  </div>

                  {openTop ? (
                    <div
                      id="dropdownAvatar"
                      className="z-50 w-56 absolute mt-4 bg-white text-black rounded-xl"
                    >
                      <ul className="flex flex-col p-6 text-sm text-black font-medium">
                        <div className="text-gray-500 cursor-default">
                          Sort by
                        </div>
                        {topOption.map((option, i) => {
                          return (
                            <li className="flex pt-2 cursor-pointer" key={i}>
                              <a
                                onClick={() =>
                                  handleOptionSelectionTop(option.value)
                                }
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

              {/* Time filter  */}
              <div className="flex justify-start items-center">
                <div onClick={() => onToggleDropdownTime()}>
                  <div className="text-black font-medium px-6 py-4 cursor-pointer flex justify-between items-center border-2 bg-white border-orange-600 rounded-xl w-56">
                    {filterOptionTime
                      ? timeOption.find(
                          (option) => option.value === filterOptionTime
                        )
                        ? timeOption.find(
                            (option) => option.value === filterOptionTime
                          ).label
                        : "In 1 day"
                      : "In 1 day"}
                    <BsChevronDown
                      className={`${
                        openTime ? "rotate-180 transform" : ""
                      }  text-black text-xl`}
                    />
                  </div>

                  {openTime ? (
                    <div
                      id="dropdownAvatar"
                      className="z-50 w-56 absolute mt-4 bg-white text-black rounded-xl"
                    >
                      <ul className="flex flex-col p-6 text-sm text-black font-medium">
                        <div className="text-gray-500 cursor-default">
                          Sort by
                        </div>
                        {timeOption.map((option, i) => {
                          return (
                            <li className="flex pt-2 cursor-pointer" key={i}>
                              <a
                                onClick={() =>
                                  handleOptionSelectionTime(option.value)
                                }
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
            </div>

            <div className="flex text-xl font-semibold justify-between bg-slate-800 my-6 px-10 py-14 rounded-lg">
              <span>
                {filterOptionTop
                  ? topOption.find((option) => option.value === filterOptionTop)
                    ? topOption.find(
                        (option) => option.value === filterOptionTop
                      ).label
                    : "Top Sellers"
                  : "Top Sellers"}
              </span>
              <span>
                {filterOptionTop
                  ? topOption.find((option) => option.value === filterOptionTop)
                    ? topOption.find(
                        (option) => option.value === filterOptionTop
                      ).label
                    : "Top Sellers"
                  : "Top Sellers"}
              </span>
            </div>

            <div className="bg-slate-800 my-6 px-10 py-14 rounded-lg">
              <span className="text-xl font-semibold">Platform Statistics</span>

              <div className="bg-white rounded-xl mt-4 text-black font-semibold text-sm content-center py-6">
                <div className="flex justify-between mx-10 items-center">
                  <div className="flex gap-6 items-center">
                    <img src={images.artCreated}></img>
                    <span>Creation Collected</span>
                  </div>
                  <div>{platform.data.artworksCollected}</div>
                </div>
              </div>

              <div className=" bg-white rounded-xl mt-4 text-black py-6  font-semibold text-sm content-center">
                <div className="flex justify-between items-center mx-10">
                  <div className="flex gap-6 items-center">
                    <img src={images.rewardsEarned}></img>
                    <span>Artworks Collected</span>
                  </div>
                  <div>{platform.data.artworksCollected}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Activity;
