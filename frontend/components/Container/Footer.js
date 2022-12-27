import React from 'react'
import { images } from '../../constant'

function Footer() {
  return (
    <footer className='flex justify-between mt-40 mb-16'>
        <div>
            <span>
                <img className="w-20 mb-6" src={images.logofooter} />
            </span>
            <span className='font-medium'>
            We help creators and businesses<br/>
            accelebrate projects and<br/>
            create impactful values for the users.
            </span>
        </div>

        <div className="flex flex-col">
            <span>About</span>
            <span>Roadmap</span>
            <span>News Events</span>
            <span>FAQs</span>
        </div>

        <div className="flex flex-col">
            <span>Privacy Policy</span>
            <span>Content Policy</span>
            <span>Terms of Use</span>
        </div>

        <div className="flex flex-col">
            <span>Follow us on</span>
            
            <div></div>

            <span>Customer Support</span>

            <span>support@3six9.space</span>

        </div>
    </footer>

  )
}

export default Footer