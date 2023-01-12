import generateAvatar from "github-like-avatar-generator";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        const gAvatar = generateAvatar({
            blocks: 6,
            width: 100,
          });
          
          setAvatar(gAvatar.base64)
    }, [])

    const value = {
        avatar
    }
    
    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
    return useContext(ProfileContext)
}