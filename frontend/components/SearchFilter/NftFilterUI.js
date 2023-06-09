import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SingleNFTMarketplace } from "../../pages/SingleNFTMarketplace";

const NftFilter = ({ data }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const navigate = useNavigate();

  const handleNFTClick = (data) => {
    setSelectedNFT(data);
    navigate(`/marketplace/${data.sale_collectibles.collectible_uuid}`);
  };

  return (
    <div>
      <div className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative">
        <div className="bg-white rounded-lg">
          <div
            onClick={() => handleNFTClick(data)}
            className="bg-white rounded-lg"
          >
            <img
              className="object-cover object-center h-40 md:h-60 w-96 rounded-lg"
              src={data.sale_collectibles.ipfs_media_path}
            />
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
              Edition {data.quantity} / {data.sale_collectibles.noOfCopies}
            </p>
          </div>
          <div className="flex">
            <img
              src={data.sale_collectibles.ipfs_media_path}
              className="market-size z-10"
            />
            <img
              src={data.sale_collectibles.ipfs_media_path}
              className="market1-size z-20"
            />
            <img
              src={data.sale_collectibles.ipfs_media_path}
              className="market2-size z-30"
            />
          </div>
        </div>

        <hr className="my-4" />

        <p className="text-sm text-gray-400">List Price</p>
        <span className="text-md font-semibold">{`${
          data.onsale_current_price / 10 ** 18
        } Ⓝ`}</span>
      </div>

      {selectedNFT ? <div></div> : <></>}
    </div>
  );
};

export default NftFilter;
