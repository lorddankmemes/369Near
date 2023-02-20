import React from "react";

export default function MyBids() {
  return (
    <div className="w-full h-screen">
      <div className="mt-14  w-[85%] mx-auto">
        <h1 className="text-[30px] text-white mb-6 font-bold">My Bids</h1>
        <div className="flex justify-center items-center text-xl">
          <p>You currently don't have any bids</p>
        </div>
      </div>
    </div>
  );
}
