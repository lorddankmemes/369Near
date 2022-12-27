import React from 'react'
import { images } from '../../constant'

function Footer() {
  return (
    <footer className='mt-40 '>
        <div className='flex justify-between mb-16'>
            <div  className='flex gap-16'>
                <div>
                    <span>
                        <img className="w-20 mb-6" src={images.logofooter} />
                    </span>
                    <span className='font-light'>
                    We help creators and businesses<br/>
                    accelebrate projects and<br/>
                    create impactful values for the <br/>users.
                    </span>
                </div>
                <div className="flex flex-col gap-6">
                    <span>About</span>
                    <span>Roadmap</span>
                    <span>News Events</span>
                    <span>FAQs</span>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <span>Privacy Policy</span>
                <span>Content Policy</span>
                <span>Terms of Use</span>
            </div>

            <div className="flex flex-col gap-6 mr-16">
                <span className='font-semibold'>Follow us on</span>
                
                <div></div>

                <span className='font-semibold'>Customer Support</span>

                <span className='text-orange-600 text-xl'>support@3six9.space</span>

            </div>
        </div>

        <div className='text-sm text-center'>2022, 3six9 All Rights Reserved</div>
    </footer>

  )
}

export default Footer
