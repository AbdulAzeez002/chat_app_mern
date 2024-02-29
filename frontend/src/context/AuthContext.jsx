import { createContext, useContext, useState } from "react";


export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
   
    const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem('user-info'))||null)
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}

export const useAuthContext=()=>{
    return useContext(AuthContext)
}