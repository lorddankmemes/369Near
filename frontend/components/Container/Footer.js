import React from 'react'
import { images } from '../../constant'

function Footer() {
  return (
    <footer>
        <div className='flex justify-between mt-40 mb-16'>
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
            
            
            <div className="flex flex-col gap-y-6 -translate-x-28">
                <span>About</span>
                <span>Roadmap</span>
                <span>News Events</span>
                <span>FAQs</span>
            </div>

            <div className="flex flex-col gap-y-6 -translate-x-28">
                <span>Privacy Policy</span>
                <span>Content Policy</span>
                <span>Terms of Use</span>
            </div>

            <div className="flex flex-col gap-y-6 -translate-x-28">
                <span className='font-semibold'>Follow us on</span>
                
                <div className="flex">
                <div className="community-icon-div mr-3">
                <a
                href="https://twitter.com/3six9OFFICIAL"
                target="_blank"
                className="pl-0 pr-0"
                ><img
                    alt="Medium"
                    src={images.twitter}
                    className="community-icon mr-1"
                /></a >
                </div>
                <div className="community-icon-div mr-3">
                <a
                    href="https://medium.com/@3six9OFFICIAL/"
                    target="_blank"
                    className="pl-0 pr-0">
                    <img
                        alt="Medium"
                        src={images.medium}
                        className="community-icon mr-1"
                    />
                </a >
                </div>
                <div className="community-icon-div mr-3">
                <a
                    href="https://discord.gg/86uzNjMgPK"
                    target="_blank"
                    className="pl-0 pr-0">
                    <img
                        alt="Medium"
                        src={images.discord}
                        className="community-icon mr-1"
                    />
                </a >
                </div>
                <div className="community-icon-div mr-3">
                <a
                    href="https://www.instagram.com/3six9official/"
                    target="_blank"
                    className="pl-0 pr-0">
                    <img
                        alt="Medium"
                        src={images.instagram}
                        className="community-icon mr-1"
                    />
                </a >
                </div>
                <div className="community-icon-div mr-3">
                <a
                    href="https://t.me/threesixninenft"
                    target="_blank"
                    className="pl-0 pr-0">
                    <img
                        alt="Medium"
                        src={images.telegram}
                        className="community-icon mr-1"
                    />
                </a >
                </div>
            
                
            </div>

                <span className='font-semibold'>Customer Support</span>

                <span>
                    <a
                    href="mailto:support@3six9.space"
                    target="_blank"
                    className="text-orange-600 text-xl font-medium" 
                    >
                        support@3six9.space
                    </a>
                </span>
            </div>
        </div>
        <div className='text-center text-sm font-light'>2022, 3six9 All Rights Reserved</div>
    </footer>

  )
}

export default Footer