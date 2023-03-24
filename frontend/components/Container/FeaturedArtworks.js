import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import artwork from "../../data/landing/artwork";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import LazyLoad from "react-lazyload";
import { images } from "../../constant";
import { useProfile } from "../../hooks/useProfile";

function FeaturedArtworks() {
  const { accountId, contractId, viewMethod} = useWallet()
  const { avatar } = useProfile();
  const [saleItem, setSaleItem] = useState([])
  const [sales, setSales] = useState([])
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null);

/*   const handleNFTClick = (data) => {
    setSelectedNFT(data);
    navigate(`/marketplace/${data.featured_collectible_info.collectible_uuid}`, {
      state: { data },
    });
  }; */

  const navigate = useNavigate();
  
  /* const handleNFTClick = (data) => {
    setSelectedNFT(data);
    navigate(`/test/${data.tokenId}`, {
      state: { data },
    });
  }; */

  const handleNFTClick = (data) => {
    setSelectedNFT(data);
    navigate(`/marketplace/${data.tokenId}`, {
      state: { data },
    });
  };

  const filteredNft = () => {
    const data = test.result;

    if (filteredData[filterOption]) {
      return filteredData[filterOption](data);
    } else if (filteredData[slideSelected]) {
      return filteredData[slideSelected](data);
    } else {
      return data;
    }
  };

  const [open, setOpen] = useState(false);
  const onToggleDropdown = () => {
    setOpen(!open);
  };

  const handleOptionSelection = (value) => {
    setFilterOption(value);
    setOpen(false);
  };
  
  useEffect(() => {
    const getSaleMarketplace = async () => {
      const contractNftSale = ['369-nft.bonebon.testnet', 'nft-series.bonebon.testnet'];
      const sales = [];
  
      for (let i = 0; i < contractNftSale.length; i++) {
        const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_sales_by_nft_contract_id', { nft_contract_id: contractNftSale[i], from_index:"0", limit:100 });
        if (res) {
          sales.push(...res);
        }
      }
  
      const nfts = [];
  
      for (const sale of sales) {
        const tokens = await viewMethod(sale.nft_contract_id, 'nft_tokens', { from_index: '0', limit: 100 });
        const filteredTokens = tokens.filter(token => token.token_id === sale.token_id);
  
        if (filteredTokens.length > 0) {
          nfts.push({
            contract_id: sale.nft_contract_id,
            metadata: filteredTokens[0].metadata,
            tokenId: filteredTokens[0].token_id,
            price: sale.sale_conditions,
            owner_id: sale.owner_id,
          });
        }
      }
  
      setSales(sales);
      setNfts(nfts);
      setIsLoaded(true);
    };
  
    getSaleMarketplace();
  }, []);

  return (
    <>
      <div className="ml-14 mr-6">
        <div className="flex justify-between">
          <span className="font-bold text-3xl">Featured Creations</span>
          <span>
            <Link to="/Marketplace">View all Creations</Link>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-14 my-16">
        {/*   {artwork.rows.map((data, index) => (
            <div
              key={index}
              onClick={() => handleNFTClick(data)}
              className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
            >
              <div>
                <img
                  className="object-cover object-center h-40 md:h-60 w-full rounded-lg"
                  src={data.featured_collectible_info.alternative_media_path}
                />
              </div>

              <div className="text-lg font-semibold py-4 truncate">
                {data.featured_collectible_info.collectible_name}
              </div>
              <div className="flex gap-2">
                <div>
                  <img
                    src={
                      data.featured_collectible_info.collectibles_user
                        .profile_photo_path
                    }
                    className="creator-size"
                  />
                </div>
                <div>
                  <span className="text-gray-500 text-sm font-light">
                    Creator
                  </span>
                  <div className="text-sm">
                    {data.featured_collectible_info.collectibles_user.username}
                  </div>
                </div>
              </div>
            </div>
          ))} */}
          {
        nfts.slice(0, 8).map((data, i) => (
          <div
          key={i}
          className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
        >
          <div className="rounded-lg">
            <div
              onClick={() => handleNFTClick(data)}
              className="bg-white rounded-lg"
            >
              <LazyLoad placeholder={<img src={images.loadNft} />}>
                <img
                  src={data.metadata.media}
                  className="object-cover object-center h-40 md:h-60 w-full rounded-lg cursor-pointer"
                />
              </LazyLoad>
            </div>
          </div>

          <div className="py-4 text-lg font-semibold">
            {data.metadata.title}
          </div>

          { data.owner_id === accountId ?
          <div className="flex gap-2">
                <div>
                  <img
                    src={avatar}
                    className="creator-size"
                  />
                </div>
                <div>
                  <span className="text-gray-500 text-sm font-light">
                    Creator
                  </span>
                  <div className="text-sm">
                    {data.owner_id}
                  </div>
                </div>
          </div>
          :
          <div className="flex gap-2">
          <div>
            <img
              src={data.avatar}
              className="creator-size"
            />
          </div>
          <div>
            <span className="text-gray-500 text-sm font-light">
              Creator
            </span>
            <div className="text-sm">
              {data.owner_id}
            </div>
          </div>
    </div>
          }
        </div>
    )) 
  }
        </div>
      </div>
    </>
  );
}

export default FeaturedArtworks;
