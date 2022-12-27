import React from 'react'

export const UpdateProfile = () => {
  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-1 mx-4 body-container mx-6 lg:mx-56">
        <div className='my-12 text-5xl font-semibold'>Edit your profile</div>

        <div className='grid bg-white rounded-lg my-6 p-10 '>
            <div className='grid grid-cols-2 md:grid-cols-4 px-6'>
                <div class="flex text-md col-span-2 md:col-span-2 font-semibold text-black ">
                    Enter your details
                </div>
                <div class="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                            <label>
                                Email
                                <div>
                                <input
                                    type="text"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200"
                                    placeholder="Enter your email"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                    </div>
                            </label>

                            <label>
                                First Name
                                <div>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200"
                                    placeholder="Enter your First name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                    </div>
                            </label>

                            <label>
                                Last Name
                                <div>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200"
                                    placeholder="Enter your Last name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                    </div>
                            </label>

                            <label>
                                Username
                                <div>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200"
                                    placeholder="Name your artwork"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                    </div>
                            </label>
                </div>
            </div>

            <div className='grid md:grid-cols-4 pt-20 px-6'>
                <div class="flex flex-col text-md font-semibold md:col-span-2 text-black ">
                    Add a short bio
                </div>
                <div class="flex flex-col text-sm gap-y-6 md:col-span-2">
                        <div>
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="h-12 w-full rounded-md border-[1px] border-gray-200"
                                placeholder="Enter a short bio"
                                style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                        </div>
                </div>
            </div>

            <div className='grid md:grid-cols-4 pt-16 px-6'>
                <div class="flex flex-col md:col-span-2">
                   <span className='font-semibold text-black'>Add a profile image</span>
                   <span className='text-sm'>Recommended size:<br/>
                    1000x1000px.<br/>
                    JPG, PNG or GIF.<br/>
                    10MB max size.</span>
                </div>

                <div
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="flex flex-col md:col-span-2 gap-y-40 border-dashed border-[1px] border-gray-300 w-full rounded-md h-[50vh] text-center"
                    style={{ padding:"50px"}}
                >
                    <div className='text-gray-400'>Drag and drop an image here, or click to browse.</div>
                    <div>
                        <a href='/updateprofile' 
                            className='text-center hover:border-orange-600 hover:border-2 hover:px-20 hover:py-2 hover:rounded-lg text-black'>
                            Choose file
                        </a>
                    </div>
                </div>

            </div>

            <div className='grid pt-20 px-6'>
                <div className='font-semibold text-black pb-8'>Add links to your<br/>social media profiles</div>
                <div className='flex flex-col gap-y-6'>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2 px-4">
                            <span className='text-black text-sm'>Website</span>
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2 justify-between">
                            <span className='text-black text-sm px-4'>Twitter</span>
                            <span className='text-gray-400 text-xs px-4'>twitter.com/</span>
                        </div>
                        <div className='flex flex-col  md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2  justify-between">
                            <span className='text-black text-sm px-4'>Telegram</span>
                            <span className='text-gray-400 text-xs px-4'>t.me/</span>
                        </div>
                        <div className='flex flex-col  md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2  justify-between">
                            <span className='text-black text-sm px-4'>Dribble</span>
                            <span className='text-gray-400 text-xs px-4'>dribble.com/</span>
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2 justify-between">
                            <span className='text-black text-sm px-4'>LinkedIn</span>
                            <span className='text-gray-400 text-xs px-4'>linkedin.com/</span>
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2 justify-between">
                            <span className='text-black text-sm px-4'>Instagram</span>
                            <span className='text-gray-400 text-xs px-4'>instagram.com/</span>
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-4 rounded-xl border-[1px] border-gray-200'>
                        <div class="flex items-center md:col-span-2 justify-between">
                            <span className='text-black text-sm px-4'>Youtube</span>
                            <span className='text-gray-400 text-xs px-4'>youtube.com/</span>
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                            <span>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    className="h-12 w-full rounded-xl text-sm"
                                    placeholder="Enter name"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                </div>
    </div>
    </div>
    </>
  )
}
