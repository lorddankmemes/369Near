import React, {useState} from 'react'
import platform from "../data/platform";
import activity from '../data/activity.json'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from '../constant'
import moment from 'moment';

function Activity() {

   //filter function
   const topOption = [
    {
      value: "sellers",
      label: "Top Sellers"
    },
    {
      value: "collectors",
      label: "Top Collectors"
    }
  ]

  //filter function
  const timeOption = [
    {
      value: "sellers",
      label: "In 1 day"
    },
    {
      value: "collectors",
      label: "In 2 days"
    },
    {
      value: "collectors",
      label: "In 7 days"
    },
    {
      value: "collectors",
      label: "In 30 days"
    }
  ]

  const [filterOption, setFilterOption] = useState("");
  const [open, setOpen] = useState(false);
  const onToggleDropdown = () => {
    setOpen(!open)
  }

  const handleOptionSelection = (value) => {
    setFilterOption(value);
    setOpen(false);
  };

  return (
    <>
    <div className='body-container lg:mx-14'>
    <div className='pt-10'>
      <button>Go back</button>
    </div>

    <div className='text-5xl font-bold my-10'>Activity</div>

    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col md:col-span-1 gap-y-6 mr-10">
        <div className='box-border h-22 w-32 py-1 text-center border-4 bg-white text-black font-bold border-orange-600 rounded-full'>
          All activity
        </div>

        
        <div>
        <div className="grid gap-6 mb-10">
          {activity.result.map((data, index) => (
      
            <div className='grid grid-cols-3 md:grid-cols-3 bg-gray-100 text-black border-2 border-orange-600 p-4 rounded-lg relative'>
              <div className="flex flex-col col-span-1 md:col-span-1">
                  <LazyLoadImage className="object-cover object-center h-28 w-30 rounded-lg col-span-1" 
                  src={data.transaction_of_collectible.ipfs_media_path} 
                  loading="lazy"
                  />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-2 ml-6">
                  <span className='col-span-2 mt-8'>
                    <span className='font-bold'>{data.activity_by_user_name}</span>
                    <span> {data.action_type}</span>
                    <span className='text-gray-400 font-bold'> {data.transaction_of_collectible.collectible_name} </span>on
                    <span className='font-bold'> {data.transaction_of_collectible.collectible_category}</span>
                    <div className='text-gray-400 pt-4'>{moment(data.activity_datetime).fromNow()}</div>
                  </span>
              </div>
            </div>

        
          ))}
          </div>
        </div>

      </div>

      <div className="flex flex-col md:col-span-1">
        <div className='md:flex gap-x-6'>
                
            {/* filter function */}
            <div onClick={() => onToggleDropdown()} >
              <div className='text-black pl-4 pr-2 flex items-center border-2 bg-white border-orange-600 rounded-xl w-[200px] h-[60px]'>
              {filterOption ? dropdownOption.find(option => option.value === filterOption).label : 'Top Seller'}
              </div>

              { open ?  
                <div id="dropdownAvatar" className="z-50 w-56 absolute mt-4 bg-white text-black rounded-xl">
                  <ul className="flex flex-col p-6 text-sm text-gray-700">
                    <div>Sort by</div>
                    {topOption.map((option, i) => {
                      return (
                        <li className='flex pt-2' key={i}>
                          <a onClick={() => handleOptionSelection(option.value)} className="block pt-1">{option.label}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div> : <></> }
            </div>
            <div onClick={() => onToggleDropdown()} >
              <div className='text-black pl-4 pr-2 flex items-center border-2 bg-white border-orange-600 rounded-xl w-[200px] h-[60px]'>
              {filterOption ? dropdownOption.find(option => option.value === filterOption).label : 'In 1 day'}
              </div>

              { open ?  
                <div id="dropdownAvatar" className="z-50 w-56 absolute mt-4 bg-white text-black rounded-xl">
                  <ul className="flex flex-col p-6 text-sm text-gray-700">
                    <div>Sort by</div>
                    {timeOption.map((option, i) => {
                      return (
                        <li className='flex pt-2' key={i}>
                          <a onClick={() => handleOptionSelection(option.value)} className="block pt-1">{option.label}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div> : <></> }
            </div>
              
        </div>

        <div className='flex text-xl font-semibold justify-between bg-slate-800 my-6 px-10 py-14 rounded-lg'>
          <span>Top Sellers</span><span>Sales</span>
        </div>

        <div className='bg-slate-800 my-6 px-10 py-14 rounded-lg'>
          <span className='text-xl font-semibold'>Platform Statistics</span>

            <div className='h-20 w-100 bg-white rounded-xl mt-4 text-black font-semibold text-sm grid content-center'>
              <div className='flex justify-between mx-10'>
                <div className='flex gap-6'>
                  <img src={images.artCreated}></img>
                  <span>Artworks Collected</span>
                </div>
                <div>{platform.data.artworksCollected}</div>
              </div>
            </div>

            <div className='h-20 w-100 bg-white rounded-xl mt-4 text-black  font-semibold text-sm grid grid content-center'>
              <div className='flex justify-between mx-10'>
              <div className='flex gap-6'>
                  <img src={images.rewardsEarned}></img>
                  <span>Artworks Collected</span>
                </div>
                <div>{platform.data.artworksCollected}</div>
              </div>
            </div>
            
        </div>

      </div>
    </div>
    </div>
    </>
  )
}

export default Activity