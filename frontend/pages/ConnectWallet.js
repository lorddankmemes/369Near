import React, { useState } from 'react'
import { images } from '../constant';
import { Wallet } from '../near-wallet';

export function SignInPrompt({onClick}) {
  return (
    <div>
        <span className='text-sm' onClick={onClick}>Sign in</span>
    </div>
  );
}

export function SignOutButton({onClick}) {
  const [open, setOpen] = useState(false);
  

  return (
    <div>
      <div onClick={() => setOpen(true)}  id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex mx-3 text-sm bg-orange-600 rounded-full md:mr-0" type="button">
        <img class="w-8 h-8 rounded-full" src={images.avatar} />
      </div>

  { open ?  
    <div id="dropdownAvatar" class="z-50 w-56 absolute m-2 right-10 mt-2 bg-white rounded-xl">
      <div className='border-b-2 border-gray-200 rounded-xl shadow-lg'>
        <div className="p-2 flex gap-x-3 border-2 border-orange-600 m-3 rounded-lg text-black">
          <img className="w-8 h-8 rounded-full" src={images.avatar} />
          <span className="block pt-1">Profile</span>
        </div>
      </div>

        <ul class="py-1 flex flex-col px-6 text-sm text-gray-700 dark:text-gray-200">
          <li className='flex pt-6'>
            <span><img src={images.setting}/></span>
            <a href="/profile" class="block pt-1 px-4">Dashboard</a>
          </li>
          <li className='flex pt-6'>
            <span><img src={images.setting}/></span>
            <a href="#" class="block pt-1 px-4">Bids</a>
          </li>
          <li className='flex py-6'>
            <span><img src={images.logout}/></span>
            <span onClick={onClick} class="block pt-1 px-4">Sign out</span>
          </li>
        </ul>
    </div>
    : null }
</div>
  );
} 



export const ConnectWallet = () => {

  const CONTRACT_ADDRESS = process.env.CONTRACT_NAME
  const [wallet, setWallet] = useState(new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS }))
  const [signIn, setSignIn] = useState(false);

  window.onload = async () => {
    setSignIn(await wallet.startUp())
    setWallet(wallet)
  }
/* 
  useEffect(() => {
     setSignIn(await wallet.startUp())
    setWallet(wallet)
  }); */


  if (signIn == false) {
    return <SignInPrompt onClick={() => wallet.signIn()}/>;
  } else {
    return <SignOutButton onClick={() => wallet.signOut()}/>
  }
}
