import { useState, useEffect } from "react";
import { createContext, ReactNode, useContext } from "react";
import { useHistory } from "react-router-dom";

import {firebase, auth } from '../../services/firebase';

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
    signInWithGoogle: () =>  Promise<void>;
    signOut: () =>  Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({children}: ProviderProps) => {
    const [user, setUser] = useState<User>();
    const history = useHistory();

    useEffect(() => {
        const unsusbscribe = auth.onAuthStateChanged(user => {
            if(user){
                const { displayName, photoURL, uid } = user;

                if(!displayName || !photoURL){
                    throw new Error("Missing information from Google Account.")
                }
    
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                })
            }
        })

        return () => {
            unsusbscribe();
        }
    }, [])

    async function signOut(){
        setUser(undefined)
        await firebase.auth().signOut();        
        history.push('/')
    }

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
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
