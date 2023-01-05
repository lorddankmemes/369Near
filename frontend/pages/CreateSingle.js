import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { images } from '../constant'
import { HiPlusSm } from 'react-icons/hi'
import useIpfsFactory from '../hooks/useIpfsFactory'
import { useWallet } from '../hooks/useWallet'
import DatePicker from "react-datepicker";
import Calendar from 'react-calendar';

export const CreateSingle = () => {
    const [value, onChange] = useState(new Date());
    const [startDate, setStartDate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        media: '',
        perpetual_royalties: {}
    })
    const [preview, setPreview] = useState()

    const { ipfs } = useIpfsFactory()
    const { accountId, callMethod } = useWallet()

    const onHandleChanged = (evt) => {
        const value = evt.target.value
        setMetadata({
            ...metadata,
            [evt.target.name]: value
        })
    }

    const onHandleSaleChanged = () => {
        setOnSale(true)
        setOnAuction(false)
    }

    const onHandleAuctionChanged = () => {
        setOnAuction(true)
        setOnSale(false)
    }

    const [image, setImage] = useState()

    const onFileChanged = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const imageRef = useRef(null)

    const onOpenFileDialog = (e) => {
        imageRef.current.click()
    }

    useEffect(() => {
        if (!image) {
          setPreview(undefined)
          return
        }
    
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
    
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const [category, setCategory] = useState('')
    const [royalty, setRoyalty] = useState(0)
    const [onSale, setOnSale] = useState(false)
    const [onAuction, setOnAuction] = useState(false)
    const [weth, setWeth] = useState(0)

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const cid = await ipfs.add(image)
            console.log(cid)
            if(cid.path) {

                // add cid
                setMetadata({
                    ...metadata,
                    media: cid.path
                })

                // add royalty
                const meta = {
                    ...metadata
                }

                meta.perpetual_royalties[`${accountId}`] = royalty

                const args = {
                    token_id: `${Date.now()}`,
                    metadata: meta,
                    receiver_id: accountId
                }

                await callMethod({
                    contractId: process.env.CONTRACT_NAME,
                    method: 'nft_mint',
                    args
                })
            }
          } catch(e) {
            console.log(e)
          }
    }

    const onToggleCalendar = () => {
        setStartDate(!startDate)
      }
    
    const onToggleClosed = () => {
        setStartDate(false)
    }
    

return (
    <>
    <div className='body-container'>

    {/* {showModal ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}
            ></div>
            <div className="flex relative justify-center items-center min-h-screen mt-40 px-4 py-8">
                <div className="absolute w-full max-w-lg mx-auto bg-gray-100 z-99 rounded-md shadow-lg">
                    <div className="mt-16 px-10 flex flex-col justify-center">

                            <h4 className="text-3xl text-center font-bold pb-10 text-gray-800">
                            NEP141 Collection
                            </h4>
                                <div className="flex flex-col gap-y-6 text-sm text-gray-400 w-full">

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
                                        name="search-form"
                                        id="search-form"
                                        className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
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
                                        className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                                        placeholder="Enter symbol"
                                        style={{ padding:"20px"}}
                                        />
                                        </div>
                                </label>

                                <label>
                                    Description
                                    <div>
                                    <input
                                        type="text"
                                        name="description"
                                        id="search-form"
                                        className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
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
    ) : <></>} */}

        <div className="grid grid-cols-2 lg:grid-cols-4 py-20 mx-6 lg:mx-28">
            <div className="col-span-4 lg:col-span-2">
                <Link to="/create" className='my-6'>Manage collectible type</Link>
                <div className='text-5xl font-semibold pt-6 pb-10'>Create single<br/>collectible</div>

                <div>Upload File</div>

                <div className='my-6 text-center text-gray-400 text-sm p-6 border-dashed border-2 border-white rounded-xl'>
                    <span>JPG, PNG, GIF, WEBP, MP3, WAV, MP4, GLTF, GLB or VOX. Max size 30mb.</span>
                    <div>
                        <input ref={imageRef} id="image" accept="image/*" type="file" onChange={onFileChanged} style={{ display: 'none' }} />
                        <button onClick={onOpenFileDialog} type="file" className='mt-6 px-16'>Choose File</button>
                    </div>
                </div>
            </div>

            <div className="flex col-span-4 lg:col-span-2 mx-6">
                <div className="relative w-full">
                <div className='pb-8'>Preview</div>
                    <div className='bg-white rounded-xl h-full relative'>
                        <img src={preview} alt="" className='object-cover' />
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 py-20 mx-6 lg:mx-28">
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

            <div className="flex col-span-4 lg:col-span-2 px-10 w-full">
                <form onSubmit={e => { handleSubmit(e) }}>

                    <div className="relative">
                        <div className="flex flex-col gap-y-6 text-sm">
                            <label>
                                Name
                                <div>
                                    <input
                                        name="title"
                                        value={metadata.title}
                                        onChange={onHandleChanged}
                                        className="bg-white outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
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
                                        value={metadata.description}
                                        onChange={onHandleChanged}
                                        className="bg-white outline-orange-600 w-full rounded-md mt-2 text-overflow text-black"
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
                                        type="number"
                                        name="royalty"
                                        id="royalty"
                                        onChange={e => setRoyalty(e.target.value)}
                                        className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
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
                                    className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                                    placeholder="E.g. Dimension"
                                    style={{ padding:"20px"}}
                                    />
                                <input
                                    type="text"
                                    name="size"
                                    className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                                    placeholder="E.g. 1200px x 2000px"
                                    style={{ padding:"20px"}}
                                    />
                                    <button>Add</button>
                                    </div>
                            </label>

                            <div className="flex justify-between w-full mt-4 mb-2">
                                <div className="text-gray-400 font-semibold text-md">
                                Put on Sale
                                </div>

                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input 
                                            type="checkbox"
                                            value={onSale}
                                            onChange={onHandleSaleChanged}
                                            /* onChange={e => setOnSale(e.target.value)} */
                                            className="sr-only" 
                                        />

                                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                    </div>             
                                </label>
                            </div>

                            <div className="flex justify-between w-full mb-2">
                                <div className="text-gray-400 font-semibold text-md">
                                Put on Auction
                                </div>

                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input 
                                            type="checkbox"
                                            value={onAuction}
                                            onChange={onHandleAuctionChanged}
                                            /* onChange={e => setOnAuction(e.target.value)} */
                                            className="sr-only" 
                                        />

                                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                    </div>             
                                </label>
                            </div>

                            <div className='flex flex-col md:col-span-2 my-2'>
                                <button
                                    type="button"
                                    onClick={onSubmit}
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


            {/* onSale modal */}
            { onSale === true && onAuction === false ?
                <div className="grid grid-cols-1 py-14 mx-6 lg:mx-28 px-20 bg-white text-black my-10">
                    <div className="col-span-4 lg:col-span-2">
                        <div className='text-4xl font-semibold pb-2'>Put on sale</div>
                            <label>
                            Enter the price in ETH for one item.
                                <div className='flex gap-4 mt-2'>
                                    <input
                                        type="number"
                                        name="weth"
                                        className="bg-white outline-orange-600 h-10 w-1/2 rounded-md text-black"
                                        value={weth}
                                        onChange={e => setWeth(e.target.value)}
                                        style={{ padding:"20px"}}
                                    />
                                    <div className='text-sm font-light'>
                                        Platform Fee: 0% <br/>
                                        You will receive Ξ 0.0001 (~$0.125)
                                    </div>   
                                </div>
                            </label>
                    </div>
                    <div className='flex justify-center'>
                        <input ref={imageRef} id="image" accept="image/*" type="file" onChange={onFileChanged} style={{ display: 'none' }} />
                        <button onClick={onOpenFileDialog} type="file" className='mt-6 px-16'>Put on Sale</button>
                    </div>
                </div>
                : 
                null
            }   
        
            {/* onAuction modal */}
            { onAuction ?
                <div className="grid grid-cols-1 py-14 mx-6 lg:mx-28 px-20 bg-white text-black">
                    <div className='text-4xl font-semibold pb-2'>Put on auction</div>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-20 mt-10'>
                            <div class="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                            <label>
                                Reserved Price (WETH)
                                        <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200 mt-2'>
                                            <div className="flex items-center md:col-span-2 justify-between">
                                                <input
                                                    /* type="number" */
                                                    name="weth"
                                                    className="h-16 w-full rounded-md pl-6 focus:outline-none"
                                                    value={weth}
                                                    onChange={e => setWeth(e.target.value)}
                                                   /*  style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}} */
                                                />
                                            </div>
                                            <div className='flex flex-col md:col-span-2'>
                                            <span>
                                                <select
                                                    name="selectweth"
                                                    value={weth}
                                                    className="h-16 w-full rounded-xl text-sm text-black mr-4"
                                                    placeholder="Enter name"
                                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                                 >
                                                    <option selected>WETH</option>
                                                    <option value="weth">Weth</option>
                                                </select>
                                            </span>
                                            </div>
                                        </div>
                                </label>

                                <label>
                                    Start Date
                                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200 mt-2'>
                                        <div className="flex items-center md:col-span-3">
                                            <input
                                                type="text"
                                                name="firstname"
                                                className="h-16 w-full rounded-md pl-6 focus:outline-none"
                                                placeholder="Enter your First name"
                                            /> 
                                        </div>

                                        <div className='flex items-center md:col-span-1'>
                                            <div onClick={() => onToggleCalendar()}>
                                                <img src={images.plus} />
                                            </div>
                                        </div>

                                        { startDate ?
                                            <div className='z-50 absolute bg-white shadow-2'>
                                                <Calendar onChange={onChange} value={value}/>
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>

                                </label>

                                

                                <label>
                                    End Date
                                        <div>
                                            <input
                                                type="text"
                                                name="lastname"
                                                className="h-16 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                                placeholder="Enter your Last name"
                                                style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                            />
                                        </div>
                                </label>
                            </div>
                            <div class="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                                <label>
                                Starting price (WETH)
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                className="h-16 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                                placeholder="Enter your email"
                                                style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                            >                                               
                                            </input>
                                        </div>
                                </label>

                                <label>
                                Bid Price increment (WETH)
                                        <div>
                                            <input
                                                type="text"
                                                name="firstname"
                                                className="h-16 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                                placeholder="Enter your First name"
                                                style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                            />
                                        </div>
                                </label>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <input ref={imageRef} id="image" accept="image/*" type="file" onChange={onFileChanged} style={{ display: 'none' }} />
                            <button onClick={onOpenFileDialog} type="file" className='mt-6 px-16'>Put on Auction</button>
                        </div>
                </div>
            :
                null
            }
        </div>
    </>
  )
}

