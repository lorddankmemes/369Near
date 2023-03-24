import generateAvatar from "github-like-avatar-generator";
import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "./useWallet";

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {

    const { accountId, viewMethod } = useWallet()
    
    const [avatar, setAvatar] = useState()
    const [username, setUsername] = useState()
    const [profile, setProfile] = useState({})

    const getUsername = async () => {
        const res = await viewMethod(
          process.env.CONTRACT_PROFILE,
          "getUsername",
          { accountId: accountId }
        );
    
        if (res) {
          setUsername(res);
          getProfile(res)
        }
    };

    const getProfile = async (username) => {
        const res = await viewMethod(
          process.env.CONTRACT_PROFILE,
          "getUserInfo",
          { username }
        );
    
        if (res) {
          if(res[2]) {
            let response = await fetch(`${process.env.INFURA_GATEWAY}/${res[2]}`)
            let data = await response.json()
            setProfile(data)

            let avatar = data.avatar.split("://")
            setAvatar(`${process.env.INFURA_GATEWAY}/${avatar[1]}`)
          }
        }
      };

    useEffect(() => {
        const gAvatar = generateAvatar({
            blocks: 6,
            width: 100,
          });
          
          setAvatar(gAvatar.base64)

          if(!username && accountId) {
            getUsername()
          }
    }, [username, accountId])

    const value = {
        avatar,
        username,
        profile
    }
    
    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
    return useContext(ProfileContext)
}