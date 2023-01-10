import React, { useState, useEffect, useRef} from 'react'
import { useWallet } from '../../hooks/useWallet';

export const CoverProfile = () => {

  const {accountId} = useWallet();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (accountId) {
      //need to call viewMethod at here
      setIsOwner(!isOwner)
    }
   }, [accountId] )


   //upload cover image logic
   const [preview, setPreview] = useState()
   const [coverImg, setCoverImg] = useState()

   const onFileChange = (e) => {
       console.log(e.target.files[0])
       setCoverImg(e.target.files[0])
   }

   useEffect(() => {
    if (!coverImg) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(coverImg)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [coverImg])

 /*  if(coverImg) {
    const cid = await ipfs.add(coverImg)
    setCoverImg({
      [coverImg]: `ipfs://${cid}`
    })
  }
 */
  //remove cover image logic


  //ipfs

  

  return (
    <>

    {/* if no cover image */}
    { !coverImg ?
    <div className='h-80 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative'>
      <div className='absolute right-0 lg:bottom-0 '>

        { isOwner ?
          <div className='flex gap-4 mx-6 my-12 text-xs text-white'>
              <button onChange={onFileChange} className='rounded-full py-2 px-4'>
                  <input 
                    id="coverImg" 
                    type="file" 
                    value={coverImg} 
                    hidden />
                      <label
                            htmlFor="coverImg"
                            >
                            Replace image
                      </label>
              </button>
              <button className='bg-transparent rounded-full'>Remove</button>
          </div>
        :
          <></>
        }

      </div>
    </div>
    :

    /* after cover image was uploaded */
    <div className='h-80 w-full relative'>
      <span><img src={preview} alt="" className='h-80 w-full object-cover relative'/>
        <div className='absolute right-0 lg:bottom-0 '>

          { isOwner ?
            <div className='flex gap-4 mx-6 my-12 text-xs text-white'>
                <button className='rounded-full py-2 px-4'>
                    <input id="coverImg" type="file" onChange={onFileChange} hidden />
                        <label
                              htmlFor="coverImg"
                              >
                              Replace image
                        </label>
                </button>
                <button className='bg-transparent rounded-full'>Remove</button>
            </div>
          :
            <></>
          }

        </div>
      </span>
    </div>
    }
    </>
  )
}
