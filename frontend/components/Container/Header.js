import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { images } from '../../constant';
import SearchHeader from '../SearchFilter/SearchHeader';

export function SignInPrompt({greeting, onClick}) {
  return (
    <main>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}

export function HeaderText() {
  return (
   <>
   <header className='grid md:grid-cols-1 px-20 py-4 font-light fixed inset-x-0'>
   <div className='flex justify-between'>
     <div className='flex gap-10'>
        <Link to="/">
          <img className="w-24 p-1" src={images.logofooter} />
        </Link>
        <div className="grid content-center"><SearchHeader /></div>
      </div>

      <div className='flex gap-2'>
        <span className='flex gap-2'>
          <NavLink className="navbar grid content-center" to="/Marketplace">Marketplace</NavLink>
          <NavLink className="navbar grid content-center" to="/Auctions">Auctions</NavLink>
          <NavLink className="navbar grid content-center" to="/Activity">Activity</NavLink>
        </span>

          <button 
            className='bg-white text-black' 
            to="https://rainbowbridge.app/transfer">
            <span className='flex'>
              <img className="mr-2 w-6" src={images.rainbow}></img>
              <span className='text-xs'>Rainbow bridge</span>
            </span>
          </button>

          <button
            className='px-10'>
              <span className='text-xs' onClick>Connect Wallet</span>
          </button>
      </div>

   </div>
   </header>
   </>
  );
}
