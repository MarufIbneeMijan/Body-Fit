import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebse.init';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const authContext = createContext()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

const axiosPublic = useAxiosPublic()
    useEffect(()=>{
        const subscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user),
            setLoading(false)
            if(user){
                const userInfo = user.email
                axiosPublic.post('jwt',{userInfo})
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('token',res.data.token)
                    }
                })
            }
        })
        return ()=>subscribe()
    },[])

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const singIn = (email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const singOutUser= ()=>{
        localStorage.removeItem('token')
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })
    }
    const provider = new GoogleAuthProvider();
    const googleSingUp = ()=>{
        return signInWithPopup(auth, provider)
    } 
    const authInfo = {
        createUser,
        user,
        singIn,
        singOutUser,
        loading,
        updateUserProfile,
        googleSingUp
    }
return <authContext.Provider value={authInfo} >{children}</authContext.Provider>
};

export default AuthProvider;