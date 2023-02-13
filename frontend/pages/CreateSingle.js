import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../constant";
import { HiPlusSm } from "react-icons/hi";
import useIpfsFactory from "../hooks/useIpfsFactory";
import { useWallet } from "../hooks/useWallet";

export const CreateSingle = () => {
  const [showModal, setShowModal] = useState(false);
  const [royalty, setRoyalty] = useState(0);

  //properties state
  const [properties, setProperties] = useState([]);
  const [property1, setProperty1] = useState("");
  const [property2, setProperty2] = useState("");

  const handleChangeProperty1 = (event) => {
    setProperty1(event.target.value);
  };

  const handleChangeProperty2 = (event) => {
    setProperty2(event.target.value);
  };

  const addProperty = (e) => {
    e.preventDefault();

    const newProperty = { property1, property2 };
    setProperties([...properties, newProperty]);
    setProperty1("");
    setProperty2("");
  };

  const deleteProperty = (index) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  };

  //lock state
  const [onLock, setOnLock] = useState(false);

  //sale modal state
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);

  //auction modal state
  const [onAuction, setOnAuction] = useState(false);
  const [auction, setAuction] = useState({
    reservedPrice: 0,
    selectWeth: "",
    startDate: "",
    endDate: "",
    startPrice: 0.0,
    bidPrice: 0,
  });

  const onHandleChangedAuction = (evt) => {
    const value = evt.target.value;
    setAuction({
      ...auction,
      [evt.target.name]: value,
    });
  };

  //metadata state
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    media: "",
    perpetual_royalties: {},
    category: "",
  });

  const [preview, setPreview] = useState();

  const { ipfs } = useIpfsFactory();
  const { accountId, callMethod } = useWallet();

  const onHandleChanged = (evt) => {
    // const value = evt.target.value;
    setMetadata({
      ...metadata,
      [evt.target.name]: evt.target.value,
    });
  };

  //select option
  const selectCategory = [
    {
      value: "collectibles",
      label: "Collectibles",
    },
    {
      value: "membership",
      label: "Membership",
    },
    {
      value: "ticketing",
      label: "Ticketing",
    },
    {
      value: "animation",
      label: "Animation",
    },
    {
      value: "arts",
      label: "Arts",
    },
    {
      value: "Irl art",
      label: "Irl art",
    },
    {
      value: "trading",
      label: "Trading Cards",
    },
    {
      value: "memes",
      label: "Memes",
    },
    {
      value: "music",
      label: "Music",
    },
  ];

  //checkbox logic for onSale and onAuction
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const onHandleSaleChanged = (event) => {
    setCheckbox1(event.target.checked);
    setCheckbox2(false);

    setOnSale(true);

    if (checkbox1 === true) {
      setOnSale(false);
    }

    if (onSale === true) {
      setOnAuction(false);
    }
  };

  const onHandleAuctionChanged = (event) => {
    setCheckbox2(event.target.checked);
    setCheckbox1(false);

    setOnAuction(true);

    if (checkbox2 === true) {
      setOnAuction(false);
    }

    if (onAuction === true) {
      setOnSale(false);
    }
  };

  const onHandleLockChanged = () => {
    setOnLock(!onLock);
  };

  //image & preview logic for collection
  const imageRefCol = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onFileChangedCol = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  //image & preview logic for single collectible
  const [image, setImage] = useState();

  const onFileChanged = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const imageRef = useRef(null);

  const onOpenFileDialog = (e) => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  //submit function logic
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const cid = await ipfs.add(image);
      if (cid.path) {
        console.log(cid);
        // add cid
        setMetadata({
          ...metadata,
          media: cid.path,
        });

        // add royalty
        const meta = {
          ...metadata,
        };

        meta.perpetual_royalties[`${accountId}`] = royalty;

        const args = {
          token_id: `${Date.now()}`,
          metadata: meta,
          receiver_id: accountId,
        };

        console.log(args);

        await callMethod({
          contractId: process.env.CONTRACT_NAME,
          method: "nft_mint",
          args,
        });

        if (onAuction) {
          onSubmitOnAuction();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitOnSale = async (e) => {
    e.preventDefault();

    try {
      const cid = await ipfs.add(image);
      if (cid.path) {
        console.log(cid);
        // add cid
        setMetadata({
          ...metadata,
          media: cid.path,
        });

        setOnSale({
          onSale,
        });

        // add royalty
        const meta = {
          ...metadata,
        };

        meta.perpetual_royalties[`${accountId}`] = royalty;

        const args = {
          token_id: `${Date.now()}`,
          metadata: meta,
          receiver_id: accountId,
        };

        console.log(args);

        await callMethod({
          contractId: process.env.CONTRACT_NAME,
          method: "nft_mint",
          args,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitOnAuction = async () => {
    // auction
    // nft utk auction
  };

  return (
    <>
      <div className="body-container">
        {/* Create Collection Modal  */}
        {showModal ? (
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
                  <div className="flex flex-col gap-y-6 text-sm text-gray-400 w-full">
                    <div
                      className="cursor-pointer flex flex-col md:col-span-2 border-dashed border-[1px] border-gray-300 w-full rounded-md text-center"
                      style={{ padding: "40px" }}
                      onClick={() => imageRefCol.current.click()}
                    >
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <>
                          <span className="text-gray-400 text-md">
                            Allowed png, gif, jpg 160x160px <br /> Recommended
                          </span>
                          <input
                            ref={imageRefCol}
                            id="image"
                            accept="image/*"
                            type="file"
                            onChange={onFileChangedCol}
                            style={{ display: "none" }}
                          />
                        </>
                      )}
                    </div>

                    <label>
                      Name
                      <div>
                        <input
                          name="single-name"
                          id="single-name"
                          className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                          placeholder="Enter token name"
                          style={{ padding: "20px" }}
                        />
                      </div>
                    </label>

                    <label>
                      Symbol
                      <div>
                        <input
                          type="text"
                          name="single-symbol"
                          id="single-symbol"
                          className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                          placeholder="Enter symbol"
                          style={{ padding: "20px" }}
                        />
                      </div>
                    </label>

                    <label>
                      Description
                      <div>
                        <textarea
                          name="description"
                          id="description"
                          rows="5"
                          className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-auto w-full rounded-md mt-2 text-black"
                          placeholder="Spread some words about your token"
                          style={{ padding: "20px" }}
                        />
                      </div>
                    </label>

                    <label>
                      Short url
                      <div>
                        <input
                          type="text"
                          name="single-url"
                          id="single-url"
                          className="bg-transparent border-[1px] border-gray-300 outline-orange-600 h-10 w-full rounded-md mt-2"
                          placeholder="short-url"
                          style={{ padding: "20px" }}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Create Collection
                    </button>
                  </div>
                  <div className="items-center gap-2 mt-3 mb-10 sm:flex">
                    <button
                      className="w-full my-2 p-2.5 flex-1 text-black bg-transparent hover:ring-offset-2 hover:ring-orange-600 hover:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Create single collectible  */}
        <div className="grid grid-cols-2 lg:grid-cols-4 py-20 mx-6 lg:mx-28">
          <div className="col-span-4 lg:col-span-2">
            <Link to="/create" className="my-6">
              Manage collectible type
            </Link>
            <div className="text-5xl font-semibold pt-6 pb-10">
              Create single
              <br />
              collectible
            </div>

            <div>Upload File</div>

            <div className="my-6 text-center text-gray-400 text-sm p-6 border-dashed border-2 border-white rounded-xl">
              <span>
                JPG, PNG, GIF, WEBP, MP3, WAV, MP4, GLTF, GLB or VOX. Max size
                30mb.
              </span>
              <div>
                <input
                  ref={imageRef}
                  id="image"
                  accept="image/*"
                  type="file"
                  onChange={onFileChanged}
                  style={{ display: "none" }}
                />
                <button
                  onClick={onOpenFileDialog}
                  type="file"
                  className="mt-6 px-16"
                >
                  Choose File
                </button>
              </div>
            </div>
          </div>

          <div className="flex col-span-4 lg:col-span-2 mx-6">
            <div className="relative w-full">
              <div className="pb-4">Preview</div>
              <div className="bg-white rounded-xl h-full relative">
                <img
                  src={preview}
                  alt=""
                  className="object-fill h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* collection white background section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 py-20 mx-6 lg:mx-28">
          <div className="col-span-4 lg:col-span-2 flex flex-col bg-white rounded-xl px-10 py-6 font-normal">
            <div className="flex justify-between w-full mt-4 mb-2">
              <div className="text-black font-semibold text-md">
                Unlock once purchase
              </div>

              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    value={onLock}
                    onClick={onHandleLockChanged}
                    /* onChange={e => setOnSale(e.target.value)} */
                    className="sr-only"
                  />

                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
              </label>
            </div>

            {onLock ? (
              <>
                <div className="pt-6 text-gray-400">
                  Provide the Links of the content which buyer can download,
                  post purchase
                </div>
                <div className="mt-8">
                  <input
                    type="text"
                    name="externallink"
                    className="h-20 w-full text-sm font-normal px-4 outline-orange-600 rounded-md border-[1px] border-gray-200"
                    // placeholder="Tip: Markdown syntax is supported"
                  />
                </div>
              </>
            ) : (
              <span className="pt-6 text-gray-400">
                Content below and media file will be unlocked after successful
                transaction
              </span>
            )}

            <span className="pt-12 text-black font-semibold">Collection</span>

            <div className="grid grid-cols-2 text-orange-600 font-semibold text-md gap-10 py-10 text-center relative">
              <div
                className="border-2 border-orange-600 py-12 rounded-3xl cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <HiPlusSm size={50} className="m-auto" />
                Create
                <br />
                Collection
              </div>
              <span className="text-gray-500 absolute right-20 top-2 text-sm">
                Default
              </span>

              <div className="border-2 border-orange-600 py-12 rounded-3xl cursor-pointer">
                <img
                  src={images.logo}
                  className="rounded-full h-14 w-14 m-auto mb-4"
                />
                3six9 NFT
              </div>
            </div>
          </div>

          {/* input form section */}
          <div className="flex col-span-4 lg:col-span-2 px-10 w-full">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="relative">
                <div className="flex flex-col gap-y-6 text-sm">
                  <label>
                    Name
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={metadata.title}
                        onChange={onHandleChanged}
                        className="bg-white outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                        placeholder="Name your artwork"
                        style={{ padding: "20px" }}
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
                                        E.g. Physical print when purchase."
                        style={{ padding: "10px" }}
                      />
                    </div>
                  </label>

                  <label>
                    Royalties
                    <div className="flex gap-4 mt-2">
                      <input
                        type="number"
                        name="royalty"
                        id="royalty"
                        onChange={(e) => setRoyalty(e.target.value)}
                        className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                        style={{ padding: "20px" }}
                      />
                    </div>
                    <span className="text-xs ">Suggested: 10%, 20%, 30%</span>
                  </label>

                  <label>
                    Category
                    <select
                      name="category"
                      value={metadata.category}
                      onChange={onHandleChanged}
                      className="bg-white outline-orange-600 h-10 w-full rounded-md mt-2 text-black"
                      style={{ padding: "20px" }}
                    >
                      <option value="" className="text-black">
                        Select Category
                      </option>
                      {selectCategory.map((option, i) => {
                        return (
                          <option value={option.value} key={i}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </label>

                  <label>
                    Properties
                    <div>
                      {properties.map((property, index) => (
                        <div className="flex gap-4 mt-2" key={index}>
                          <input
                            type="text"
                            name="property1"
                            value={property.property1}
                            className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                            style={{ padding: "20px" }}
                          />
                          <input
                            type="text"
                            name="property2"
                            value={property.property2}
                            className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                            style={{ padding: "20px" }}
                          />

                          <button onClick={() => deleteProperty(index)}>
                            <img
                              src={images.deleteInput}
                              className="w-[80px] h-[20px]"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-2">
                      <input
                        type="text"
                        name="property1"
                        value={metadata.property1}
                        onChange={handleChangeProperty1}
                        className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                        placeholder="E.g. Dimension"
                        style={{ padding: "20px" }}
                      />
                      <input
                        type="text"
                        name="property2"
                        value={metadata.property2}
                        onChange={handleChangeProperty2}
                        className="bg-white outline-orange-600 h-10 w-full rounded-md text-black"
                        placeholder="E.g. 1200px x 2000px"
                        style={{ padding: "20px" }}
                      />

                      <button onClick={addProperty}>Add</button>
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
                          /* onClick={e => setOnSale(!onSale)} */
                          checked={checkbox1}
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
                          checked={checkbox2}
                          /* onChange={e => setOnAuction(e.target.value)} */
                          className="sr-only"
                        />

                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                      </div>
                    </label>
                  </div>

                  {onSale === false && onAuction === false ? (
                    <div className="flex flex-col md:col-span-2 my-2">
                      <button
                        type="button"
                        onClick={onSubmit}
                        className="py-4 border-2 border-orange-600 bg-white text-black text-lg font-medium"
                      >
                        Create
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* onSale modal */}
        {onSale === true && onAuction === false ? (
          <div className="grid grid-cols-1 py-14 mx-6 lg:mx-28 px-20 bg-white text-black my-10">
            <div className="col-span-4 lg:col-span-2">
              <div className="text-4xl font-semibold pb-2">Put on sale</div>
              <label>
                Enter the price in ETH for one item.
                <div className="flex gap-4 mt-2">
                  <input
                    type="number"
                    name="salePrice"
                    className="bg-white border-2 outline-orange-600 h-10 w-1/2 rounded-md text-black"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    style={{ padding: "20px" }}
                  />
                  <div className="text-sm font-light">
                    Platform Fee: 0% <br />
                    You will receive Ξ 0.0001 (~$0.125)
                  </div>
                </div>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onSubmitOnSale}
                type="file"
                className="mt-6 px-16 py-2"
              >
                Put on Sale
              </button>
            </div>
          </div>
        ) : null}

        {/* onAuction modal */}
        {onAuction ? (
          <div className="grid grid-cols-1 py-14 mx-6 lg:mx-28 px-20 bg-white text-black rounded-lg">
            <div className="text-4xl font-semibold pb-2">Put on Auction</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mt-10">
              <div className="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                <label>
                  Reserved Price (WETH)
                  <div className="grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200 mt-2">
                    <div className="flex items-center md:col-span-2 justify-between">
                      <input
                        /* type="number" */
                        name="reservedPrice"
                        className="h-16 w-full rounded-md pl-6 focus:outline-none"
                        value={auction.reservedPrice}
                        /* onChange={e => setReservedPrice(e.target.value)} */
                        onChange={onHandleChangedAuction}
                      />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                      <span>
                        <select
                          name="selectWeth"
                          value={auction.selectWeth}
                          onChange={onHandleChangedAuction}
                          className="h-16 w-full rounded-xl text-sm text-black mr-4"
                          placeholder="Enter name"
                          style={{
                            padding: "20px",
                            boxShadow:
                              "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)",
                          }}
                        >
                          <option /* onChange={e => setSelectWeth(e.target.value)} */
                            value
                          >
                            WETH
                          </option>
                          <option value="weth">Weth</option>
                        </select>
                      </span>
                    </div>
                  </div>
                </label>

                <label>
                  Start Date
                  <div className="grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200 mt-2">
                    <div className="flex items-center md:col-span-4">
                      <input
                        type="date"
                        name="startDate"
                        value={auction.startDate}
                        /* onChange={e => setStartDate(e.target.value)} */
                        onChange={onHandleChangedAuction}
                        className="h-16 w-full rounded-md px-6 focus:outline-none"
                      />
                    </div>
                  </div>
                </label>

                <label>
                  End Date
                  <div className="grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200 mt-2">
                    <div className="flex items-center md:col-span-4">
                      <input
                        type="date"
                        name="endDate"
                        value={auction.endDate}
                        /* onChange={e => setEndDate(e.target.value)} */
                        onChange={onHandleChangedAuction}
                        className="h-16 w-full rounded-md px-6 focus:outline-none"
                      />
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                <label>
                  Starting price (WETH)
                  <div>
                    <input
                      type="number"
                      name="startPrice"
                      value={auction.startPrice}
                      /* onChange={e => setStartPrice(e.target.value)} */
                      onChange={onHandleChangedAuction}
                      className="h-16 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                      style={{
                        padding: "20px",
                        boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)",
                      }}
                    ></input>
                  </div>
                </label>

                <label>
                  Bid Price increment (WETH)
                  <div>
                    <input
                      type="number"
                      name="bidPrice"
                      value={auction.bidPrice}
                      /* onChange={e => setBidPrice(e.target.value)} */
                      onChange={onHandleChangedAuction}
                      className="h-16 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                      style={{
                        padding: "20px",
                        boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)",
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onSubmitOnAuction}
                type="file"
                className="mt-6 px-16"
              >
                Put on Auction
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
