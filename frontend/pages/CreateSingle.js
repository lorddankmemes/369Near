import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { images } from '../constant'
import { HiPlusSm } from 'react-icons/hi'

export const CreateSingle = () => {

    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [onSale, setOnSale] = useState(false)
    const [onAuction, setOnAuction] = useState(false)

return (
    <>
    <div className='body-container'>

    {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex relative justify-center items-center min-h-screen mt-40 px-4 py-8">
                            <div className="absolute w-full max-w-lg mx-auto bg-gray-100 z-99 rounded-md shadow-lg">
                                <div className="mt-16 px-10 flex flex-col justify-center">

                                        <h4 className="text-3xl text-center font-bold pb-10 text-gray-800">
                                        ERC721 Collection
                                        </h4>
                                            <div class="flex flex-col gap-y-6 text-sm text-gray-400 w-full">

                                             <div
                                                type="search"
                                                name="search-form"
                                                id="search-form"
                                                className="flex flex-col md:col-span-2 border-dashed border-[1px] border-gray-300 w-full rounded-md text-center"
                                                style={{ padding:"50px"}}
                                            >
                                                <div className='text-gray-400 text-md'>Allowed png, gif, jpg 160x160px <br/> Recommended</div>
                                            </div>


                                            <label>
                                                Name
                                                <div>
                                                <input
                                                    type="search"
                                                    name="search-form"
                                                    id="search-form"
                                                    className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2"
                                                    placeholder="Enter token name"
                                                    style={{ padding:"20px"}}
                                                    />
                                                    </div>
                                            </label>

                                            <label>
                                                Symbol
                                                <div>
                                                <input
                                                    type="search"
                                                    name="search-form"
                                                    id="search-form"
                                                    className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2"
                                                    placeholder="Enter symbol"
                                                    style={{ padding:"20px"}}
                                                    />
                                                    </div>
                                            </label>

                                            <label>
                                                Description
                                                <div>
                                                <input
                                                    type="search"
                                                    name="search-form"
                                                    id="search-form"
                                                    className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2"
                                                    placeholder="Spread some words about your token"
                                                    style={{ padding:"20px"}}
                                                    />
                                                    </div>
                                            </label>

                                            <label>
                                                Short url
                                                <div>
                                                <input
                                                    type="search"
                                                    name="search-form"
                                                    id="search-form"
                                                    className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2"
                                                    placeholder="short-url"
                                                    style={{ padding:"20px"}}
                                                    />
                                                    </div>
                                            </label>
                                        </div>
                                      
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Create Collection
                                            </button>
                                        </div>
                                        <div className="items-center gap-2 mt-3 mb-10 sm:flex">
                                            <button
                                                className="w-full my-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
     
                </>
    ) : null}

        <div className="grid grid-cols-2 lg:grid-cols-4 py-20 mx-6 lg:mx-28">
            <div class="col-span-4 lg:col-span-2">
                <button className='my-6'>Manage collectible type</button>
                <div className='text-5xl font-semibold pt-6 pb-10'>Create single<br/>collectible</div>

                <div>Upload File</div>

                <div className='my-6 text-center text-gray-400 text-sm p-6 border-dashed border-2 border-white rounded-xl'>
                    <span>JPG, PNG, GIF, WEBP, MP3, WAV, MP4, GLTF, GLB or VOX. Max size 30mb.</span>
                    <div>
                        <button className='mt-6 px-16'>Choose File</button>
                    </div>
                </div>
            </div>

            <div class="flex col-span-4 lg:col-span-2 mx-6">
                <div class="relative w-full">
                <div className='pb-8'>Preview</div>
                    <div className='bg-white h-full rounded-xl'>
                            abc
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 py-20 mx-6 lg:mx-28">
            <div className='col-span-4 lg:col-span-2 flex flex-col bg-white rounded-xl px-10 py-6 font-medium text-gray-500'>
                <span>Unlock once purchased</span>
                <span className='pt-6'>Content below and media file will be unlocked after successful transaction</span>
                <span className='pt-16'>Collection</span>

                <div className='grid grid-cols-2 text-orange-600 font-semibold text-md gap-10 py-10 text-center'>
                    <div className='border-2 border-orange-600 py-12 rounded-3xl' onClick={() => setShowModal(true)}>
                        <HiPlusSm size={50} className="m-auto"/>
                        Create<br/>Collection
                    </div>
                    <div className='border-2 border-orange-600 py-12 rounded-3xl'>
                    <img src={images.logo} className="rounded-full h-14 w-14 m-auto mb-4" />
                        3six9 NFT
                    </div>
                </div>
            </div>

            <div class="flex col-span-4 lg:col-span-2 px-10 w-full">
                <form onSubmit={e => { handleSubmit(e) }}>

                    <div class="relative">
                        <div class="flex flex-col gap-y-6 text-sm">
                            <label>
                                Name
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="bg-white outline-orange-600 h-10 w-full rounded-md mt-2"
                                        placeholder="Name your artwork"
                                        style={{ padding:"20px"}}
                                    />
                                </div>
                            </label>

                            <label>
                                Description
                                <div>
                                    <textarea
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="bg-white outline-orange-600 w-full rounded-md mt-2 text-overflow"
                                        placeholder="Describe your NFT item and any unlockable content.
                                        E.g. Physical print unlocked with purchase."
                                        style={{ padding:"10px"}}
                                    />
                                </div>
                            </label>

                            <label>
                                Royalties
                                <div className='flex gap-4 mt-2'>
                                    <input
                                        type="search"
                                        name="search-form"
                                        id="search-form"
                                        className="bg-white outline-orange-600 h-10 w-full rounded-md"
                                        placeholder="Name your artwork"
                                        style={{ padding:"20px"}}
                                        />
                                </div>
                            
                            </label>

                            <label>
                                Category
                                <select
                                        name="category"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        className="bg-white outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                                        placeholder="Name your artwork"
                                        style={{ padding:"20px"}}
                                        >
                                            <option selected>Select category</option>
                                            <option value="collectibles">Collectibles</option>
                                            <option value="membership">Membership</option>
                                            <option value="ticketing">Ticketing</option>
                                            <option value="animation">Animation</option>
                                            <option value="arts">Arts</option>
                                            <option value="IRLart">IRL art</option>
                                            <option value="Trading Cards">Trading Cards</option>
                                            <option value="memes">Memes</option>
                                            <option value="music">Music</option>
                                </select>
                            </label>

                            <label>
                                Properties
                                <div className='flex gap-4 mt-2'>
                                <input
                                    type="text"
                                    name="dimension"
                                    className="bg-white outline-orange-600 h-10 w-full rounded-md"
                                    placeholder="E.g. Dimension"
                                    style={{ padding:"20px"}}
                                    />
                                <input
                                    type="text"
                                    name="size"
                                    className="bg-white outline-orange-600 h-10 w-full rounded-md"
                                    placeholder="E.g. 1200px x 2000px"
                                    style={{ padding:"20px"}}
                                    />
                                    <button>Add</button>
                                    </div>
                            </label>

                            <div className="flex justify-between w-full mt-4 mb-2">
                                <div class="text-gray-400 font-semibold text-md">
                                Put on Sale
                                </div>

                                <label class="flex items-center cursor-pointer">
                                    <div class="relative">
                                        <input 
                                            type="checkbox"
                                            value={onSale}
                                            onChange={e => setOnSale(e.target.value)}
                                            className="sr-only" 
                                        />

                                        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                    </div>             
                                </label>
                            </div>

                            <div className="flex justify-between w-full mb-2">
                                <div class="text-gray-400 font-semibold text-md">
                                Put on Auction
                                </div>

                                <label class="flex items-center cursor-pointer">
                                    <div class="relative">
                                        <input 
                                            type="checkbox"
                                            value={onAuction}
                                            onChange={e => setOnAuction(e.target.value)}
                                            className="sr-only" 
                                        />

                                        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                    </div>             
                                </label>
                            </div>

                            <div className='flex flex-col md:col-span-2 my-2'>
                                <button
                                    type="submit"
                                    value="submit"
                                    className='py-6 border-2 border-orange-600 bg-white text-black text-lg'
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

