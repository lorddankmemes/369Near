import React, { useState, useEffect } from 'react';
import avatar from 'github-like-avatar-generator';
import useIpfsFactory from '../../hooks/useIpfsFactory'
import { useWallet } from '../../hooks/useWallet'

export const Avatar = ({ accountId }) => {
    
    const { ipfs } = useIpfsFactory()
    const { accountId } = useWallet()

    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
      async function generateAndStoreAvatar() {
        // Generate a random avatar
        const avatarBuffer = avatar.generate();
  
        // Convert the avatar to a base64 encoded string
        const avatarString = avatarBuffer.toString('base64');

        const cid = await ipfs.add({ content: Buffer.from(avatarString, 'base64') });

        const avatarIpfsHash = cid.path;
  
        // Save the IPFS hash to your NEAR contract or database
        // Replace this with your own code to save the hash
        saveAvatarIpfsHash(accountId, avatarIpfsHash);
  
        // Set the avatar URL to the IPFS hash so that it can be displayed
        setAvatarUrl(`https://ipfs.io/ipfs/${avatarIpfsHash}`);
      }
  
      generateAndStoreAvatar();

    }, [accountId]);
  
    return (
      <img src={avatarUrl} alt="User avatar" />
    );
}
