import React, {useState, useEffect} from 'react'
import { useWallet } from '../hooks/useWallet';
import { useNavigate } from "react-router-dom";

export const TestSale = () => {

  const { accountId, contractId, viewMethod} = useWallet()
  const [saleItem, setSaleItem] = useState([])
  const [sales, setSales] = useState([])
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null);

/*   useEffect(() => {
  const getSaleMarketplace= async () => {
    const contractNftSale = ['369-nft.bonebon.testnet', 'nft-series.bonebon.testnet'];
    const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_sales_by_nft_contract_id', { nft_contract_id: contractNftSale, from_index:"0", limit:100 })
    setSaleItem(res)
    setIsLoaded(true);
  }
    if (accountId && !isLoaded) {
        getSaleMarketplace()
    }
      
   }, [accountId, saleItem, isLoaded]) */

   useEffect(() => {
    const getSaleMarketplace = async () => {
      const contractNftSale = ['369-nft.bonebon.testnet', 'nft-series.bonebon.testnet'];
      const sales = [];
      for (let i = 0; i < contractNftSale.length; i++) {
        const res = await viewMethod(process.env.CONTRACT_MARKETPLACE_NAME, 'get_sales_by_nft_contract_id', { nft_contract_id: contractNftSale[i], from_index:"0", limit:100 });
        sales.push(...res);
      }
      setSales(sales);
      console.log(sales)

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
    setNfts(nfts);
    setIsLoaded(true);
    };
    
    if (accountId || !isLoaded) {
      getSaleMarketplace();
    }
  }, [accountId, isLoaded]);
  

  //navigate page
  const navigate = useNavigate();

  const handleNFTClick = (data) => {
    setSelectedNFT(data);
    navigate(`/test/${data.tokenId}`, {
      state: { data },
    });
  };

  return (
    <div className='pt-10 mx-28'>
        <div className='text-white'>Test sale</div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {
        nfts.map((data, i) => (
            <>
              <div 
                key={i} 
                className="flex flex-col md:col-span-1 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative"
              >
                  <div>      
                    <img 
                      className="object-cover object-center h-60 w-96 rounded-lg" 
                      src={data.metadata.media}
                      onClick={() => handleNFTClick(data)}
                      /* onClick={() => handleCreation(val)}  */
                    />
                  </div>

                  <div className='text-lg font-semibold py-4'>{data.metadata.title}</div>

                  <div className='flex gap-x-2'>
                    <div>
                        <img src={data.metadata.media} className="market2-size"/>
                    </div>
                    <div>
                        <span className='text-black text-sm'>Creator</span>
                        <div className='text-black font-semibold text-sm'>{data.owner_id}</div>
                    </div>
                </div>
                  
              </div>
            </>
        )) 
      }
    </div>
    </div>
  )
}