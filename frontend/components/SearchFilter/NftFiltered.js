import React from 'react';
import NftFilter from './NftFilterUI'

const NftFiltered = ({nfts}) => (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
        {/* {nfts.map((nft, index) => {
          return( */}
          <NftFilter data={nfts} />
        {/* )})} */}
      </div>
    </div>
  );

export default NftFiltered;