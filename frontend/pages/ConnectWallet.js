import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../constant';
import { useWallet } from '../hooks/useWallet';
import { Wallet } from '../near-wallet';

export function SignInPrompt({onClick}) {
  return (
    <div>
        <span className='text-sm' onClick={onClick}>Sign in</span>
    </div>
  );
}

export function SignOutButton({ onHandleSignOut }) {
  
  const navigate = useNavigate()
  
  const [open, setOpen] = useState(false);
  
  const OnSignOut = () => {
    setOpen(false)
    onHandleSignOut()
  }

  const onToggleDropdown = () => {
    setOpen(!open)
  }

  const goTo = (to) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <div>
      <div onClick={() => onToggleDropdown()}  id="dropdownUserAvatarButton" className="flex mx-3 text-sm bg-orange-600 rounded-full md:mr-0">
        <img className="w-8 h-8 rounded-full" src={images.avatar} />
      </div>

  { open ?  
    <div id="dropdownAvatar" className="z-50 w-56 absolute m-2 right-10 mt-2 bg-white rounded-xl">
      <div className='border-b-2 border-gray-200 rounded-xl shadow-lg'>
        <div className="p-2 flex gap-x-3 border-2 border-orange-600 m-3 rounded-lg text-black">
          <img className="w-8 h-8 rounded-full" src={images.avatar} />
          <span className="block pt-1">Profile</span>
        </div>
      </div>

        <ul className="py-1 flex flex-col px-6 text-sm text-gray-700">
          <li className='flex pt-6'>
            <span><img src={images.setting}/></span>
            <a onClick={() => goTo('profile')} className="block pt-1 px-4">Dashboard</a>
          </li>
          <li className='flex pt-6'>
            <span><img src={images.setting}/></span>
            <a href="#" className="block pt-1 px-4">Bids</a>
          </li>
          <li className='flex py-6'>
            <span><img src={images.logout}/></span>
            <a onClick={OnSignOut} className="block pt-1 px-4">Sign out</a>
          </li>
        </ul>
    </div> : <></> }
</div>
  );
} 



export const ConnectWallet = () => {

  const {accountId, signIn, signOut} = useWallet();
  const [loaded, setLoaded] = useState(false)

  const onHandleLogin = () => {
    signIn(process.env.CONTRACT_NAME || "seed.bonebon.testnet");
  }

  const onHandleSignOut = () => {
    signOut()
  }

  useEffect(() => {
    if(accountId) { console.log(accountId); setLoaded(true)}
  }, [accountId, loaded])
  
  if (!accountId) {
    return <SignInPrompt onClick={() => onHandleLogin()}/>;
  } else {
    return <SignOutButton onHandleSignOut={onHandleSignOut}/>
  }
}
