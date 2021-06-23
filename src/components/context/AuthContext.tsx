import { useState } from "react";
import { createContext, ReactNode, useContext } from "react";

import {firebase, auth, database} from '../../services/firebase';

type ProviderProps = {
    children: ReactNode
}

type User = {
    id: string;
    name: string;
    avatar: string;
}

interface IAuthContextProps {
    user: User | undefined,
    signInWithGoogle: () =>  void;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({children}: ProviderProps) => {
    const [user, setUser] = useState<User>();

    async function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if(result.user) {
            const { displayName, photoURL, uid } = result.user;

            if(!displayName || !photoURL){
                throw new Error("Missing information from Google Account.")
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            })
        }

        console.log(result)
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (AuthContext);
