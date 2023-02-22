import React, { useState, useEffect } from "react";

import { Dashboard } from "../components/OthersProfileContent/Dashboard";
import { Creation } from "../components/OthersProfileContent/Creation";
import { Collection } from "../components/OthersProfileContent/Collection";
import { OnSale } from "../components/OthersProfileContent/OnSale";
import { Favourite } from "../components/OthersProfileContent/Favourite";
import { Profile } from "../components/OthersProfileContent/Profile";
import { MyAuction } from "../components/OthersProfileContent/MyAuction";
import { CoverProfile } from "../components/OthersProfileContent/CoverProfile";
import { images } from "../constant";
import { useWallet } from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useLocation } from "react-router-dom";

export const NavProfile = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  /*  const { accountId } = useWallet()
    const { avatar } = useProfile() */

  const [currentComponent, setCurrentComponent] = useState(1);

  return (
    <div className="lg:mx-16 mt-4">
      <div>
        <div>
          <CoverProfile />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-4 pl-0 ml-10 mt-16">
          <div className="flex flex-col col-span-4 lg:col-span-1 bg-white rounded-2xl text-black py-10 px-6 ml-10 lg:ml-0 -translate-y-44">
            <div>
              <div>
                <img
                  className="profile-size m-10"
                  src={`https://ipfs.io/ipfs/${data.sale_collectibles.collectibles_user.profile_photo_path}`}
                />
              </div>
              <div className="text-2xl font-semibold text-center">
                @{data.sale_collectibles.collectibles_user.fullName}
              </div>
              <div className="text-center text-sm py-4">0x6E...C556</div>

              <div
                onClick={() => navigate("/updateprofile")}
                className="cursor-pointer my-16 text-center hover:border-orange-600 border-2 border-transparent p-2 hover:rounded-lg"
              >
                Follow
              </div>

              <div className="flex justify-between pb-6">
                <div className="flex text-sm font-medium flex-col gap-y-3">
                  <span>Project Views</span>
                  <span>Favourites</span>
                  <span>Followers</span>
                  <span>Following</span>
                  <span className="font-semibold">Contact Me</span>
                </div>

                <div className="flex flex-col text-sm font-medium text-gray-400 gap-y-3 text-right">
                  <span>N/A</span>
                  <span>0</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>

              <div className="py-10 text-sm font-semibold">
                <span>About</span>
                <span></span>
              </div>

              <div className="flex mt-48 mb-10 gap-x-4 justify-center">
                <span>
                  <img src={images.share} />
                </span>
              </div>

              <div className="my-8 text-xs text-center">
                Member Since: November 4, 2022
              </div>
            </div>
          </div>

          <div className="flex flex-col col-span-4 lg:col-span-3 -translate-y-24 md:translate-y-0">
            <div className="flex justify-between gap-3 bg-none rounded-full h-10 px-4 text-sm font-semibold overflow-x-auto">
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(1)}
              >
                CREATION
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(2)}
              >
                COLLECTION
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(3)}
              >
                ON SALE
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(4)}
              >
                MY AUCTIONS
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(5)}
              >
                FAVOURITE
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(6)}
              >
                DASHBOARD
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(7)}
              >
                PROFILE
              </button>
            </div>

            <div className="py-6">
              <div>
                {currentComponent === 1 && <Creation />}
                {currentComponent === 2 && <Collection />}
                {currentComponent === 3 && <OnSale />}
                {currentComponent === 4 && <MyAuction />}
                {currentComponent === 5 && <Favourite />}
                {currentComponent === 6 && <Dashboard />}
                {currentComponent === 7 && <Profile />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
