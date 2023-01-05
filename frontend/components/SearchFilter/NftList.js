import React from 'react';
import NftFilter from './NftFilterUI'

const NftList = ({nfts}) => (
  <div>
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-14 my-16">
        {nfts.map((nft, index) => (
        <NftFilter key={index} data={nft} />
        ))}
    </div>
  </div>
);

export default NftList;