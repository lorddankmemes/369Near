import React from "react";
import { images } from "../../constant";
import {
  BsTwitter,
  BsDiscord,
  BsInstagram,
  BsFacebook,
  BsLinkedin,
  BsTelegram,
} from "react-icons/bs";

import { SiTiktok, SiMedium } from "react-icons/si";

function Footer() {
  return (
    <footer>
      <div className="flex justify-between mt-40 mb-16">
        <div>
          <span>
            <img className="w-20 mb-6" src={images.logofooter} />
          </span>
          <span className="font-medium">
            We help creators and businesses
            <br />
            accelerate projects and
            <br />
            create impactful values for the users.
          </span>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <a
            href="https://www.3six9.space/about"
            target="_blank"
            className="text-orange-600"
          >
            About Us
          </a>
          <a href="https://www.3six9.space/roadmap" target="_blank">
            Roadmap
          </a>
          <a href="#">Featured Creators</a>
          <a href="https://www.3six9.space/news-events" target="_blank">
            News & Events
          </a>
          <a href="/#/faqs" target="_blank">
            FAQs
          </a>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <a href="https://www.3six9.space/privacy-policy/" target="_blank">
            Privacy Policy
          </a>
          <a
            href="https://3six9.space/content-policy/"
            target="_blank"
            className="footer-item"
          >
            Content Policy
          </a>
          <a
            href="https://www.3six9.space/terms-of-use"
            target="_blank"
            className="footer-item"
          >
            Terms of Use
          </a>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <span className="font-medium">Customer Support</span>
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

        <div className="flex flex-col gap-y-2">
          <span className="font-medium">Follow us:</span>
          <div className="flex">
            <div className="community-icon-div mr-3">
              <a
                href="https://twitter.com/3six9OFFICIAL"
                target="_blank"
                className="pl-0 pr-0"
              >
                <BsTwitter />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a
                href="https://www.instagram.com/3six9official/"
                target="_blank"
                className="pl-0 pr-0"
              >
                <BsInstagram />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a href="#" target="_blank" className="pl-0 pr-0">
                <BsFacebook />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a href="#" target="_blank" className="pl-0 pr-0">
                <BsLinkedin />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a
                href="https://t.me/threesixninenft"
                target="_blank"
                className="pl-0 pr-0"
              >
                <BsTelegram />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a href="#" target="_blank" className="pl-0 pr-0">
                <SiTiktok />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a
                href="https://medium.com/@3six9OFFICIAL/"
                target="_blank"
                className="pl-0 pr-0"
              >
                <SiMedium />
              </a>
            </div>
          </div>
          <span className="font-medium">Join the Community:</span>
          <div className="flex">
            <div className="community-icon-div mr-3">
              <a
                href="https://t.me/threesixninenft"
                target="_blank"
                className="pl-0 pr-0"
              >
                <BsTelegram />
              </a>
            </div>
            <div className="community-icon-div mr-3">
              <a
                href="https://discord.gg/86uzNjMgPK"
                target="_blank"
                className="pl-0 pr-0"
              >
                <BsDiscord />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-sm font-light">
        Copyright © 3six9.space. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
