import React, { useState, useEffect } from "react";

import { Dashboard } from "../components/ProfileContent/Dashboard";
import { Creation } from "../components/ProfileContent/Creation";
import { Collection } from "../components/ProfileContent/Collection";
import { OnSale } from "../components/ProfileContent/OnSale";
import { Favourite } from "../components/ProfileContent/Favourite";
import { Profile } from "../components/ProfileContent/Profile";
import { MyAuction } from "../components/ProfileContent/MyAuction";
import { CoverProfile } from "../components/ProfileContent/CoverProfile";
import { images } from "../constant";
import { useWallet } from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useLocation } from "react-router-dom";

export const MainProfile = () => {
  const navigate = useNavigate();

  const { accountId } = useWallet();
  const { username } = useProfile();
  const { avatar } = useProfile();
  const  { profile } = useProfile()

  const [currentComponent, setCurrentComponent] = useState(1);

  return (
    <div className="mt-4 mx-20 min-[1920px]:mx-48">
      <div>
        <div>
          <CoverProfile />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-4 pl-0 ml-10 mt-16">
          {/* left container */}
          <div className="flex flex-col col-span-4 lg:col-span-1 bg-white rounded-2xl text-black py-10 px-4 ml-10 lg:ml-0 -translate-y-44 max-h-[1000px]">
            <div>
              <div>
                <img className="profile-size m-10" src={avatar} />
              </div>
              <div className="text-2xl font-semibold text-center">
                {/* @{profile.user_public_address.slice(-4).padStart(profile.user_public_address.length, ".")} */}
                {username}
              </div>
              <div className="text-center text-sm py-4">{accountId}</div>

              <div
                onClick={() => navigate("/updateprofile")}
                className="cursor-pointer my-16 text-center hover:border-orange-600 border-2 border-transparent p-2 hover:rounded-lg"
              >
                Edit Profile
              </div>

              <div className="flex justify-between pb-6">
                <div className="flex text-sm flex-col gap-y-3">
                  <span className="font-medium">Project Views</span>
                  <span className="font-medium">Favourites</span>
                  <span className="font-medium">Followers</span>
                  <span className="font-medium">Following</span>
                  <div className="font-semibold pt-10">Contact Me</div>
                  <div className="">{profile.email}</div>
                </div>

                <div className="flex flex-col text-sm font-medium text-gray-400 gap-y-3 text-right">
                  <span>N/A</span>
                  <span>0</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>

              <div className="py-10 text-sm ">
                <div className="font-semibold">About</div>
                <div className="pt-2">{profile.bio}</div>
              </div>

              <div className="flex mt-48 mb-10 gap-x-4 justify-center">
                <span>
                  <img src={images.share} />
                </span>
              </div>

              {/* <div className="my-8 text-xs text-center">
                Member Since: November 4, 2022
              </div> */}
            </div>
          </div>

          {/*  right container */}
          {/* button */}
          <div className="flex flex-col col-span-4 lg:col-span-3 -translate-y-24 md:translate-y-0">
            <div className="flex justify-between gap-3 bg-none rounded-full h-10 px-4 text-sm font-semibold overflow-x-auto">
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(1)}
              >
                DASHBOARD
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(2)}
              >
                CREATION
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(3)}
              >
                COLLECTIBLES
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(4)}
              >
                ON SALE
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(5)}
              >
                MY AUCTIONS
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(6)}
              >
                FAVOURITE
              </button>
              <button
                className="button-profile rounded-full h-10 px-4"
                onClick={() => setCurrentComponent(7)}
              >
                PROFILE
              </button>
            </div>

            <div className="py-6">
              {/* Content */}
              <div>
                {currentComponent === 1 && <Dashboard />}
                {currentComponent === 2 && <Creation />}
                {currentComponent === 3 && <Collection />}
                {currentComponent === 4 && <OnSale />}
                {currentComponent === 5 && <MyAuction />}
                {currentComponent === 6 && <Favourite />}
                {currentComponent === 7 && <Profile />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  :
    <div>
    <div><CoverProfile /></div>

    <div className='grid grid-cols-1 lg:grid-cols-4 relative gap-6 pl-0 lg:pl-16 pr-10 mt-16'>


    <div className='flex flex-col col-span-4 lg:col-span-1 bg-white rounded-2xl text-black py-10 px-6 ml-10 lg:ml-0 -translate-y-44'>
        <div>
            <div><img className='profile-size m-10' src={`https://ipfs.io/ipfs/${data.collectible_sale_user.profile_photo_path}`}/></div>
            <div className='text-2xl font-semibold text-center'>
                {accountId}
            </div>
            <div className='text-center text-sm py-4'>{accountId}</div>

            <div onClick={()=>navigate("/updateprofile")}
                className='my-16 text-center hover:border-orange-600 hover:border-2 hover:p-2 hover:rounded-lg'>
                Edit Profile
            </div>

            <div className='flex justify-between pb-6'>
                <div className='flex text-sm font-medium flex-col gap-y-3'>
                    <span>Project Views</span>
                    <span>Favourites</span>
                    <span>Followers</span>
                    <span>Following</span>
                    <span className='font-semibold'>Contact Me</span>
                </div>

                <div className='flex flex-col text-sm font-medium text-gray-400 gap-y-3 text-right'>
                    <span>N/A</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                </div>

            </div>

            <div className='py-10 text-sm font-semibold'>
                <span>About</span>
                <span></span>
            </div>

            <div className='flex mt-48 mb-10 gap-x-4 justify-center'>
                <span><img src={images.share}/></span>
            </div>

            <div className='my-8 text-xs text-center'>Member Since: November 4, 2022</div>
        </div>
    </div>



    <div className="flex flex-col col-span-4 lg:col-span-3 -translate-y-24 md:translate-y-0">
        <div className='flex justify-between gap-3 bg-none rounded-full h-10 px-8 text-sm font-semibold overflow-x-auto'>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(1)}>DASHBOARD</button>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(2)}>CREATION</button>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(3)}>COLLECTION</button>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(4)}>ON SALE</button>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(5)}>MY AUCTIONS</button>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(6)}>FAVOURITE</button>
            <button className='button-profile rounded-full h-10 px-4' onClick={() => setCurrentComponent(7)}>PROFILE</button>
        </div>

        <div className='py-6'>

            <div>
                {currentComponent === 1 && <Dashboard/>}
                {currentComponent === 2 && <Creation /> }
                {currentComponent === 3 && <Collection /> }
                {currentComponent === 4 && <OnSale /> }
                {currentComponent === 5 && <MyAuction /> }
                {currentComponent === 6 && <Favourite /> }
                {currentComponent === 7 && <Profile /> }
            </div>

        </div>
    </div>
    </div>
    </div>

    }  */}
    </div>
  );
};
