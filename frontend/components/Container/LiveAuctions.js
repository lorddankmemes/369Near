import React from "react";
import posts from "../../data/posts";
// import AuctionsCard from "../Card/AuctionsCard";
import { Link } from "react-router-dom";
import artwork from "../../data/landing/artwork";
import auction from "../../data/auction";

function LiveAuctions({ title, likes, order, image }) {
  const maxLength = 10;

  return (
    <div className="h-auto ml-14 mr-6">
      <div className="flex justify-between text-md my-6">
        <div className="font-bold text-3xl">Live Auctions</div>
        <span>
          <Link to="/Auctions">View all auctions</Link>
        </span>
      </div>
      {/* <span>No auctions found</span> */}

      {/* <AuctionsCard /> */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-14 my-16">
        {auction.result.slice(0, 4).map((data, index) => (
          <div
            key={index}
            className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
          >
            <div>
              <img
                className="object-cover object-center h-40 md:h-60 w-full rounded-lg"
                src={data.auctions_of_collectible.alternative_media_path}
              />
            </div>

            <div className="text-lg font-semibold py-4 truncate">
              {data.auctions_of_collectible.collectible_name}
            </div>
            <div className="flex gap-2">
              <div>
                <img
                  src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectibles_user.profile_photo_path}`}
                  className="creator-size"
                />
              </div>
              <div>
                <span className="text-gray-500 text-sm font-light">
                  Creator
                </span>
                <div className="text-sm truncate">
                  {data.auctions_of_collectible.collectibles_user.username >
                  maxLength
                    ? `${data.auctions_of_collectible.collectibles_user.username.slice(
                        0,
                        maxLength
                      )}...`
                    : data.auctions_of_collectible.collectibles_user.username}
                  {/* {} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveAuctions;
