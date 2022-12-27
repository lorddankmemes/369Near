import React, {useState} from 'react'
import { Link, NavLink } from "react-router-dom";
import { images } from '../../constant';
import { ConnectWallet } from '../../pages/ConnectWallet';
import SearchHeader from '../SearchFilter/SearchHeader';
import { Outlet } from 'react-router-dom';

export const HeaderLayout = () => {
    const [open, setOpen] = useState(false);

  return (
    <>
    <header className='grid md:grid-cols-1 px-20 py-4 font-light fixed inset-x-0 z-50 invisible md:visible'>
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

                <button className='px-10'><ConnectWallet /></button>
            </div>
        </div>
    </header>


    {/* hamburger header */}
    
    <header>
    <div className='grid md:grid-cols-1 px-6 py-4 font-light z-50 md:invisible'>
        <div className='flex justify-between'>
            <div>
                <Link to="/">
                <img className="w-16 p-1" src={images.logofooter} />
                </Link>
            </div>
            <div>
            <button onClick={() => setOpen(true)}>try</button>
            </div>
        </div>
    </div>

    { open ?
    <div className='grid absolute z-50'>
    <div className="flex" onClick={() => setOpen(false)}>
            <div className="flex flex-col h-screen p-3 bg-white text-black font-light w-72">
                <div className="space-y-3">
                    <div className="relative my-4 mx-2">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm outline outline-offset-2 outline-1 rounded-md focus:outline-black rounded-2xl"
                        />
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm px-4">
                            <li className="rounded-sm">
                                <a
                                    href="/marketplace"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <span>Marketplace</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="/auctions"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <span>Auction</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="/activity"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <span>Activity</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <img className="mr-2 w-6" src={images.rainbow}></img>
                                    <span>Rainbow Bridge</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                            <button className='px-10'><ConnectWallet /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
    </div>
    : null }
    </header>
    
    <Outlet />
   </>
  )
}
