import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Activity from "./pages/Activity";
import Auctions from "./pages/Auctions";
import SingleAuction from "./pages/SingleNFTAuction";
import Marketplace from "./pages/Marketplace";
import { CreateSingle } from "./pages/CreateSingle";
import { CreateMultiple } from "./pages/CreateMultiple";

import "./assets/global.css";

import Footer from "./components/Container/Footer";
import { MainProfile } from "./pages/MainProfile";
import { NavProfile } from "./pages/NavProfile";
import { CreateCollectible } from "./pages/CreateCollectible";
import { SingleNFTMarketplace } from "./pages/SingleNFTMarketplace";
import { UpdateProfile } from "./pages/UpdateProfile";
import { HeaderLayout } from "./components/Layout/HeaderLayout";
import useIpfsFactory from "./hooks/useIpfsFactory";
import { MarketplaceCollection } from "./pages/MarketplaceCollection";
import { AuctionCollection } from "./pages/AuctionCollection";
import FAQs from "./pages/FAQs";

export default function App() {
  const { ipfs, ipfsInitError } = useIpfsFactory();
  // const id = useIpfs(ipfs, 'id')
  const [version, setVersion] = useState();

  useEffect(() => {
    if (!ipfs) return;

    const getVersion = async () => {
      const nodeId = await ipfs.version();
      setVersion(nodeId);
    };

    getVersion();
  }, [ipfs]);

  return (
    <>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route index path="/" element={<Landing />} />

          <Route exact path="marketplace">
            <Route index element={<Marketplace />} />
            <Route path=":id" element={<SingleNFTMarketplace />} />
          </Route>

          <Route strict exact path="activity" element={<Activity />} />

          <Route exact path="auctions">
            <Route index element={<Auctions />} />
            <Route path=":id" element={<SingleAuction />} />
          </Route>

          <Route exact path="profile">
            <Route index element={<MainProfile />} />
            <Route path=":id" element={<NavProfile />} />
          </Route>

          <Route exact path="collection">
            <Route path=":id" element={<MarketplaceCollection />} />
          </Route>

          <Route path="auction/:id" element={<AuctionCollection />} />

          <Route exact index path="create" element={<CreateCollectible />} />
          <Route exact path="create/nft" element={<CreateSingle />} />
          <Route
            exact
            path="create/:id/multiple"
            element={<CreateMultiple />}
          />

          <Route exact path="updateprofile" element={<UpdateProfile />} />
          <Route exact path="faqs" element={<FAQs />} />
        </Route>
      </Routes>

      {location.pathname == "/" && <Footer />}
    </>
  );
}
