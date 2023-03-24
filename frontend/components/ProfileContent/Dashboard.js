import React, { useState, useEffect } from "react";
import { useWallet } from "../../hooks/useWallet";
import { images } from "../../constant";
import market from "../../data/market.json";
import moment from "moment";

export const Dashboard = () => {
  const { accountId, viewMethod } = useWallet();

  const [createdSingle, setCreatedSingle] = useState(0);
  const [createdSeries, setCreatedSeries] = useState(0);
  const [sold, setSold] = useState(0);
  const [revenue, setRevenue] = useState(0);

  //total artworks created in single
  const getArtworksCreatedSingle = async () => {
    const res = await viewMethod(
      process.env.CONTRACT_NAME,
      "nft_tokens_for_owner",
      { account_id: accountId }
    );
    setCreatedSingle(res);
  };

  useEffect(() => {
    if (accountId) {
      getArtworksCreatedSingle();
    }
  }, [accountId, createdSingle]);

  //total artworks created in series
  const getArtworksCreatedSeries = async () => {
    const res = await viewMethod(
      process.env.CONTRACT_SERIES_NAME,
      "nft_supply_for_owner",
      { account_id: accountId }
    );
    setCreatedSeries(res);
  };

  useEffect(() => {
    if (accountId) {
      getArtworksCreatedSeries();
    }
  }, [accountId, createdSeries]);

  /*  //returns the number of sales for a given account
    const getAmountSold = async () => {
        const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_supply_by_owner_id', { account_id: accountId})
        setSold(res)
      }

      useEffect(() => {
        if (accountId) {
          getAmountSold()
        }
      }, [accountId, sold, getAmountSold]) */

  return (
    <div>
      <div className="ml-1 mr-8">
        <div className="py-6 text-gray-300 text-lg">Profile Overview</div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 rounded-lg relative py-6 gap-6 text-black">
            <div className="flex flex-col md:col-span-1 bg-white p-4 rounded-lg">
              <span className="text-gray-500">Creations created</span>
              <div className="flex justify-between py-4 px-2">
                <span className="text-3xl font-bold">
                  {createdSingle.length}
                </span>
                <span>
                  <img src={images.artCreated} />
                </span>
              </div>
            </div>

            <div className="flex flex-col md:col-span-1 bg-white p-4 rounded-lg">
              <span className="text-gray-500">Creations sold</span>
              <div className="flex justify-between py-4 px-2">
                <span className="text-3xl font-bold">
                  {createdSeries}
                </span>
                <span>
                  <img src={images.artSold} />
                </span>
              </div>
            </div>

            <div className="flex flex-col md:col-span-1 bg-white p-4 rounded-lg">
              <span className="text-gray-500">Revenue earned</span>
              <div className="flex justify-between py-4 px-2">
                <span className="text-3xl font-bold">0</span>
                <span>
                  <img src={images.rewardsEarned} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-black rounded-md p-6 mt-16">
          <div className="py-6 text-[20px] font-semibold">Market Activity</div>

          {/* <div className='flex justify-between text-xs text-gray-500 font-medium h-28'>
                    <span>EVENT</span>
                    <span>ITEM</span>
                    <span>PRICE</span>
                    <span>QTY</span>
                    <span>FROM</span>
                    <span>TO</span>
                    <span>DATE</span>
                </div> */}

          <table className="table-auto w-full">
            <thead className="text-xs font-medium">
              <tr>
                <th scope="col" className="flex justify-start">
                  EVENT
                </th>
                <th scope="col" className="">
                  ITEM
                </th>
                <th scope="col" className="">
                  PRICE
                </th>
                <th scope="col" className="">
                  QTY
                </th>
                <th scope="col" className="">
                  FROM
                </th>
                <th scope="col" className="">
                  TO
                </th>
                <th scope="col" className="flex justify-end">
                  DATE
                </th>
              </tr>
            </thead>
            {market.data.result.map((data, index) => (
              <tbody className="text-xs" key={index}>
                <tr className="border-b w-full">
                  <td scope="col" className="pr-10 py-4 whitespace-nowrap">
                    {data.action_type}
                  </td>
                  <td
                    scope="col"
                    className="flex gap-x-8 pr-6 py-4 justify-center"
                  >
                    <span>
                      <img
                        className="market-size z-10"
                        src={data.transaction_of_collectible.ipfs_media_path}
                      />
                    </span>
                    <span className="block pt-3 truncate">
                      {data.transaction_of_collectible.collectible_name}
                    </span>
                  </td>
                  <td
                    scope="col"
                    className="px-10 py-4 whitespace-nowrap text-center"
                  >
                    {Number(
                      Math.round(data.unit_price / 1000000000000).toFixed(3)
                    )}
                  </td>
                  <td
                    scope="col"
                    className="py-4 whitespace-nowrap text-center"
                  >
                    {data.quantity}
                  </td>
                  {/* <td><p className='truncate'>{data.activity_by}</p></td> */}
                  <td
                    scope="col"
                    className="flex gap-x-8 pr-6 justify-center py-4"
                  >
                    <span>
                      <img
                        className="block market-size z-10"
                        src={data.transaction_of_collectible.ipfs_media_path}
                      />
                    </span>
                    <span className="block pt-3 w-[64px] lg:w-[100px] truncate">
                      {data.activity_by}
                    </span>
                  </td>
                  <td scope="col" className="px-6 py-4 whitespace-nowrap">
                    {data.transfer_to_username}
                  </td>
                  <td
                    scope="col"
                    className="pl-10 py-4 whitespace-nowrap text-right"
                  >
                    {moment(data.activity_datetime).fromNow()}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
