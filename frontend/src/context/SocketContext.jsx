import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'
export const SocketContext=createContext()


export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
   const [socket,setSocket]=useState(null)
   const [onlineUsers,setOnlineUsers]=useState([])
   const {authUser}=useAuthContext()

   useEffect(()=>{
    
    if(authUser){
        const newSocket=io('http://localhost:5000',{
            query:{
                userId:authUser?._id
            }
        })
        setSocket(newSocket)

        // socket.on is used to listen to events
        newSocket.on('getOnlineUsers',(onlineUsers)=>{ console.log(onlineUsers,'onlin'); setOnlineUsers(onlineUsers)})

    }else{
        if(socket){
            socket.close()
            setSocket(null)
        }
    }
    return ()=>{
        if(socket){
            socket.close()
        }
        }
   },[authUser])
    
    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}