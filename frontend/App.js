import 'regenerator-runtime/runtime';
import React from 'react';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from './pages/Landing';
import Activity from './pages/Activity';
import Auctions from './pages/Auctions';
import SingleAuction from './pages/SingleNFTAuction';
import Marketplace from './pages/Marketplace';
import { CreateSingle } from './pages/CreateSingle';
import { CreateMultiple } from './pages/CreateMultiple';

import './assets/global.css';

import Footer from './components/Container/Footer';
import { Profile } from './pages/Profile';
import { CreateCollectible } from './pages/CreateCollectible';
import { SingleNFTMarketplace } from './pages/SingleNFTMarketplace';
import { UpdateProfile } from './pages/UpdateProfile';
import { HeaderLayout } from './components/Layout/HeaderLayout';

export default function App() {

  return (
    <>

        <BrowserRouter>

        <Routes>
          <Route element={<HeaderLayout />}>
            <Route index path="/" element={<Landing />}/>

            <Route exact path="marketplace">
              <Route index element={<Marketplace />}/>
              <Route path=":id" element={<SingleNFTMarketplace/>} />
            </Route>

            <Route strict exact path="activity" element={<Activity />}/>

            <Route exact path="auctions" >
              <Route index element={<Auctions />} />
              <Route path=":id" element={<SingleAuction />} />
            </Route>

            <Route exact path="profile" element={<Profile />}/>
            
            <Route exact index path="create" element={<CreateCollectible />} />
            <Route exact path="create/:id/single" element={<CreateSingle />} />
            <Route exact path="create/:id/multiple" element={<CreateMultiple />} />

            <Route  exact path="updateprofile" element={<UpdateProfile/>}/>
          </Route>
        </Routes>
        

        {location.pathname == "/" && (
          <Footer />
        )}

      </BrowserRouter>
    </>
  );
} 
