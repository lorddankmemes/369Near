import ipfsClient from "ipfs-http-client";
import { useEffect, useState } from "react";

let ipfs = null;

export default function useIpfsFactory() {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs));
  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    startIpfs();
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        console.log("Stopping IPFS");
        ipfs.stop().catch((err) => console.error(err));
        ipfs = null;
        setIpfsReady(false);
      }
    };
  }, []);

  async function startIpfs() {
    if (ipfs) {
      console.log("IPFS already started");
    } else if (window.ipfs && window.ipfs.enable) {
      console.log("Found window.ipfs");
      ipfs = await window.ipfs.enable();
    } else {
      try {
        console.log("IPFS Started");

        const projectId = "2L87coP3jFJtLT8Y5hexijTHRaq";
        const projectSecret = "a51b639a9206e494b4a09cf8b567b628";

        const auth =
          "Basic " +
          Buffer.from(projectId + ":" + projectSecret).toString("base64");
        ipfs = await ipfsClient.create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
          headers: {
            authorization: auth,
          },
        });
      } catch (error) {
        console.error("IPFS init error:", error);
        ipfs = null;
        setIpfsInitError(error);
      }
    }

    setIpfsReady(Boolean(ipfs));
  }

  const upload = async (buffer) => {
    return new Promise((resolve, reject) => {
      if(!ipfs) {
        reject("Ipfs not started")
      }

      ipfs.add(buffer)
        .then((data) => {
          setTimeout(() => {
            resolve(data)
          }, 1000)
        })
        .catch(e => {
          console.log(e)
        })
    })
  }

  return { ipfs, isIpfsReady, ipfsInitError, upload };
}