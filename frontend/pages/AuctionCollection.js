import React, { useState } from "react";
import { Collection } from "../components/ProfileContent/Collection";
import { MyAuction } from "../components/ProfileContent/MyAuction";
import { useLocation } from "react-router-dom";
import { OnSaleAuction } from "../components/Collection/OnSaleAuction";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuctionCollection = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const [currentComponent, setCurrentComponent] = useState(1);

  const MAX_LENGTH = 10;

  const displayText =
    data.auctions_of_collectible.collectible_collection.tokenAddress.length >
    MAX_LENGTH
      ? data.auctions_of_collectible.collectible_collection.tokenAddress.slice(
          0,
          MAX_LENGTH - 5
        ) +
        "..." +
        data.auctions_of_collectible.collectible_collection.tokenAddress.slice(
          -5
        )
      : data.auctions_of_collectible.collectible_collection.tokenAddress;

  // Copy the token
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        data.auctions_of_collectible.collectible_collection.tokenAddress
      );
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <div className="body-container">
        <div className="grid mt-10 text-center">
          <img
            className="profile-size"
            src={`https://ipfs.io/ipfs/${data.auctions_of_collectible.collectible_collection.tokenLogo}`}
          />
          <div className="text-2xl font-bold">
            {data.auctions_of_collectible.collectible_collection.tokenName}
          </div>
          <div
            className="pt-2 text-orange-600 text-underline font-semibold cursor-pointer"
            onClick={copyToClipboard}
          >
            {displayText}
          </div>
          <ToastContainer position="bottom-center" />
        </div>

        <div className="grid mt-10">
          <div className="flex gap-10 bg-none h-10 text-sm font-light border-b">
            <div
              className="cursor-pointer"
              onClick={() => setCurrentComponent(1)}
            >
              ONSALE
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setCurrentComponent(2)}
            >
              COLLECTION
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setCurrentComponent(3)}
            >
              AUCTIONS
            </div>
          </div>

          <div className="pt-10">
            {currentComponent === 1 && <OnSaleAuction />}
            {currentComponent === 2 && <Collection />}
            {currentComponent === 3 && <MyAuction />}
          </div>
        </div>
      </div>
    </>
  );
};
