import React, { useState } from "react";
import { OnSaleCollection } from "../components/Collection/OnSaleMarketplace";
import { Collectibles } from "../components/Collection/Collectibles";
import { MyAuction } from "../components/ProfileContent/MyAuction";
import { useLocation } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MarketplaceCollection = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const [currentComponent, setCurrentComponent] = useState(1);

  const MAX_LENGTH = 10;

  const displayText =
    data.sale_collectibles.collectible_collection.tokenAddress.length >
    MAX_LENGTH
      ? data.sale_collectibles.collectible_collection.tokenAddress.slice(
          0,
          MAX_LENGTH - 5
        ) +
        "..." +
        data.sale_collectibles.collectible_collection.tokenAddress.slice(-5)
      : data.sale_collectibles.collectible_collection.tokenAddress;

  // Copy the token
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        data.sale_collectibles.collectible_collection.tokenAddress
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
            src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectible_collection.tokenLogo}`}
          />
          <div className="text-2xl font-bold">
            {data.sale_collectibles.collectible_collection.tokenName}
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
            {currentComponent === 1 && <OnSaleCollection />}
            {currentComponent === 2 && <Collectibles />}
            {currentComponent === 3 && <MyAuction />}
          </div>
        </div>
      </div>
    </>
  );
};
