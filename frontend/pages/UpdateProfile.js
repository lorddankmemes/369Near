import React, { useState } from 'react'

export const UpdateProfile = ({addProfileUpdate}) => {
    
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [twitter, setTwitter] = useState('')
    const [website, setWebsite] = useState('')
    const [telegram, setTelegram] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [dribble, setDribble] = useState('')
    const [youtube, setYoutube] = useState('')
    const [image, setImage] = useState(null)

    const handleSubmit= (e) => {
        addProfileUpdate([email, firstname, lastname, username, bio, twitter, website, telegram, instagram, linkedin, dribble, youtube])
        e.preventDefault();
      }

    const onImageChange = (event) => {
       if (event.target.files && event.target.files[0]) {
         setImage(URL.createObjectURL(event.target.files[0]));
       }
      }

    return (
    <>
    <div class="grid grid-cols-1 md:grid-cols-1 mx-4 body-container mx-6 lg:mx-56">
        <div className='my-12 text-5xl font-semibold'>Edit your profile</div>

        <div className='grid bg-white rounded-lg my-6 p-10 '>
            <form onSubmit={e => { handleSubmit(e) }}>

                <div className='grid grid-cols-2 md:grid-cols-4 px-6'>
                    <div class="flex text-md col-span-2 md:col-span-2 font-semibold text-black ">
                        Enter your details
                    </div>
                    <div class="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                        <label>
                            Email
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                        placeholder="Enter your email"
                                        style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                </div>
                        </label>

                        <label>
                            First Name
                                <div>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={firstname}
                                        onChange={e => setFirstname(e.target.value)}
                                        className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                        placeholder="Enter your First name"
                                        style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                </div>
                        </label>

                        <label>
                            Last Name
                                <div>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={lastname}
                                        onChange={e => setLastname(e.target.value)}
                                        className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                        placeholder="Enter your Last name"
                                        style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                </div>
                        </label>

                        <label>
                            Username
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="h-12 w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                        placeholder="Name your artwork"
                                        style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                    />
                                </div>
                        </label>
                    </div>
                </div>


                <div className='grid grid-cols-2 md:grid-cols-4 pt-16 px-6'>
                    <div class="flex text-md col-span-2 md:col-span-2 font-semibold text-black ">
                        Add a short bio
                    </div>
                    <div class="flex flex-col col-span-2 gap-y-8 text-sm md:col-span-2 text-gray-400">
                        <label>
                            <div>
                                <textarea
                                    type="text"
                                    name="bio"
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    className="w-full rounded-md mt-2 border-[1px] border-gray-200 focus:outline-none"
                                    placeholder="Enter a short bio"
                                    style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                />
                            </div>
                        </label>
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

                    <div className="flex flex-col md:col-span-2 border-dashed border-[1px] border-gray-300 w-full rounded-md h-[50vh] relative">
                        <div className='text-gray-400 px-10 pt-4 text-center'>Drag and drop an image here, or click to browse.</div>
                        <div className='mx-10'>
                            <img src={image} className='object-cover h-60 w-96 rounded-md'/>
                        </div>
                        <input type="file" files={image} onChange={onImageChange} className='m-auto relative left-2' />
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
                                            type="url"
                                            name="website"
                                            value={website}
                                            onChange={e => setWebsite(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
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
                                <div className='flex flex-col md:col-span-2'>
                                    <span>
                                        <input
                                            type="url"
                                            name="twitter"
                                            value={twitter}
                                            onChange={e => setTwitter(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
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
                                            type="url"
                                            name="telegram"
                                            value={telegram}
                                            onChange={e => setTelegram(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
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
                                            type="url"
                                            name="dribble"
                                            value={dribble}
                                            onChange={e => setDribble(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
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
                                            type="url"
                                            name="linkedin"
                                            value={linkedin}
                                            onChange={e => setLinkedin(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
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
                                            type="url"
                                            name="instagram"
                                            value={instagram}
                                            onChange={e => setInstagram(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
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
                                            type="URL"
                                            name="youtube"
                                            value={youtube}
                                            onChange={e => setYoutube(e.target.value)}
                                            className="h-12 w-full rounded-xl text-sm text-black"
                                            placeholder="Enter name"
                                            style={{ padding:"20px", boxShadow: "inset 8px 8px 4px 0px rgb(0 0 0 / 0.05)"}}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex flex-col md:col-span-2 my-10'>
                        <button
                            type="submit"
                            value="submit"
                            className="rounded-xl text-md text-black "
                        >
                            Submit
                        </button>
                    </div>
            </form>
        </div>
    </div>
    </>
  )
}
