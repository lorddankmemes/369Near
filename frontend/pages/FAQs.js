import React, { useState } from "react";

export default function FAQs() {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(true);
  const [isActive3, setIsActive3] = useState(true);
  const [isActive4, setIsActive4] = useState(true);
  const [isActive5, setIsActive5] = useState(true);
  const [isActive6, setIsActive6] = useState(true);
  const [isActive7, setIsActive7] = useState(true);
  const [isActive8, setIsActive8] = useState(true);
  const [isActive9, setIsActive9] = useState(true);
  const [isActive10, setIsActive10] = useState(true);
  const [isActive11, setIsActive11] = useState(true);

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="mt-14 max-w-[1000px] w-[80%] mx-auto">
          <h3 className="text-[45px] text-white mb-6 font-bold">
            Frequently Asked Questions
          </h3>
          <h4 className="text-lg text-gray-100 mb-12">
            Need a helping hand? We’re all ears
          </h4>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive1 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive1(!isActive1)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  How to sign up for an account?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive1 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive1 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">
                Connect the wallet to the marketplace site and you are good to
                go!
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive2 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive2(!isActive2)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  What is the NFT marketplace used for?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive2 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive2 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">
                NFT marketplaces allow digital collectors to buy, sell and
                create their own tokens that represent ownership of unique,
                tangible and intangible items.
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive3 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive3(!isActive3)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  How to mint NFTs?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive3 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive3 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base font-medium text-black ">
                In order to mint an NFT, you need to obtain a crypto wallet and
                purchase your blockchain’s accepted cryptocurrency for
                transaction fees. Then, it’s as easy as uploading your desired
                media file, writing any terms for your smart contract, and
                setting a price.
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive4 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive4(!isActive4)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  Can I sell through this platform if I have artwork/project
                  minted on another platform?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive4 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive4 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base font-medium text-black ">
                Yes! Our platform integrated with EVM technology and we
                interlink with others platforms. Your work is viewable on
                different platforms!
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive5 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive5(!isActive5)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  How to buy NFTs?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive5 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive5 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base font-medium text-black flex flex-col ">
                <span className="">Step 1: Choose your web 3 wallet.</span>
                <span>
                  Step 2: Decide which cryptocurrency you need to buy NFTs.
                </span>
                <span>
                  Step 3: Deposit your cryptocurrency into your web3 wallet.{" "}
                </span>
                <span>Step 4: Connect your wallet to an NFT marketplace.</span>
                <span className="mt-4">Happy Shopping!</span>
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive6 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive6(!isActive6)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  What is the rate of transaction fee?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive6 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive6 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">
                2.5%. Read more &nbsp;
                <a
                  href="https://medium.com/@3six9OFFICIAL/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-white"
                >
                  here.
                </a>
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive7 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive7(!isActive7)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  What is the rate of royalties fee?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive7 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive7 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">10%</p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive8 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive8(!isActive8)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  What wallet can be connected?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive8 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive8 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">Metamask</p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive9 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive9(!isActive9)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  How to give feedback?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive9 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive9 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">
                Kindly reach out to us via our support line
                <a
                  href="support@3six9.space"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-white"
                >
                  {" "}
                  here.{" "}
                </a>
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive10 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive10(!isActive10)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  What about the gas fee?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive10 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive10 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base  font-medium text-black ">
                Good news! Gas fee is extreamly low when you make transactions
                on out platform. Roughly 0.001ETH/token at the moment.
              </p>
            </div>
          </section>
          <section className="cursor-pointer mb-10 ">
            <div
              className={`bg-[#f05223] flex flex-row items-center justify-between px-10 py-8 relative  ${
                !isActive11 ? "rounded-t-xl" : "rounded-xl"
              }`}
              onClick={() => setIsActive11(!isActive11)}
            >
              <div className="flex items-center content-start">
                <h3 className="flex items-center text-xl font-medium">
                  How to know more exciting news?
                </h3>
              </div>
              <i
                className={`fa fa-angle-${
                  !isActive11 ? "up" : "right"
                } absolute right-9 top-[40%] text-[#2C3038] text-xl `}
              />
            </div>
            <div
              className={`px-10 pb-8 bg-[#f05223]  ${
                isActive11 ? "hidden" : "rounded-b-xl"
              }`}
            >
              <p className="text-base font-medium text-black flex flex-col ">
                <span className="">
                  Please visit{" "}
                  <a
                    href="https://www.3six9.space"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-white"
                  >
                    3six9
                  </a>
                </span>
                <span className="">
                  Read more here{" "}
                  <a
                    href="https://medium.com/@3six9OFFICIAL/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-white"
                  >
                    3six9 Medium
                  </a>
                </span>
                <span className="">
                  Reach out here{" "}
                  <a
                    href="https://discord.gg/86uzNjMgPK"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-white"
                  >
                    3six9 Official Discord
                  </a>
                </span>
                <span className="">
                  Follow us here{" "}
                  <a
                    href="https://twitter.com/3six9OFFICIAL"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-white"
                  >
                    Twitter
                  </a>
                  <span>,</span>{" "}
                  <a
                    href="https://www.instagram.com/3six9official/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-white"
                  >
                    Instagram
                  </a>
                </span>
              </p>
            </div>
          </section>
          <div className="w-full mt-20 mb-10 flex justify-center items-center">
            <a
              href="mailto:support@3six9.space"
              className="px-40 py-5 bg-white text-black font-semibold rounded-xl border-2 border-white hover:border-orange-600"
            >
              Still have unanswered questions? Get in touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
