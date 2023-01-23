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
  const [coverImg, setCoverImg] = useState()
  const [preview, setPreview] = useState()

    const onFileChanged = (e) => {
        setCoverImg(e.target.files[0])
    }

    const imageRef = useRef(null)

    const onOpenFileDialog = (e) => {
        imageRef.current.click()
    }

    useEffect(() => {
        if (!coverImg) {
          setPreview(undefined)
          return
        } else {
          setPreview(coverImg)
        }
    
        const objectUrl = URL.createObjectURL(coverImg)
        setPreview(objectUrl)
    
        return () => URL.revokeObjectURL(objectUrl)
    }, [coverImg])

    //add cover image into ipfs
  /*   if(coverImg) {
        const cid = await ipfs.add(coverImg)
        setCoverImg({
          [coverImg]: `ipfs://${cid}`
        })
      }
 */

    //remove cover image logic
    const handleRemoveImage = () => {
      if (coverImg) {
        coverImg.slice();
        setCoverImg(!coverImg)
      } 
    }

  

  return (
    <>

    {/* if no cover image */}
    { !coverImg ?
    <div className='h-80 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative'>
      <div className='absolute right-0 lg:bottom-0 '>

        { isOwner ?
          <div className='flex gap-4 mx-6 my-12 text-xs text-white'>
              <button onClick={onOpenFileDialog} type="file" className='rounded-full py-2 px-4'>
                    <input 
                      id="coverImg" 
                      ref={imageRef} 
                      accept="image/*" 
                      type="file" 
                      onChange={onFileChanged} 
                      hidden />
                        <label
                              htmlFor="coverImg"
                              >
                              Replace image
                        </label>
                </button>
              <button onClick={handleRemoveImage} className='bg-transparent rounded-full'>Remove</button>
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
                <button onClick={onOpenFileDialog} type="file" className='rounded-full py-2 px-4'>
                    <input 
                      id="coverImg" 
                      ref={imageRef} 
                      accept="image/*" 
                      type="file" 
                      onChange={onFileChanged} 
                      hidden />
                        <label
                              htmlFor="coverImg"
                              >
                              Replace image
                        </label>
                </button>
                <button onClick={handleRemoveImage} className='bg-transparent rounded-full'>Remove</button>
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
