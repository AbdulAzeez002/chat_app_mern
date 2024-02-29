import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogout=()=>{
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()
    
    const logout=async()=>{

        setLoading(true)
        try {
            const response=await fetch('http://localhost:5000/api/auth/logout',{
                method:'POST',
                headers:{"Content-type":"application/json"}
            })

            const data=response.json()
            if(data?.error){
                throw new Error(data.error)
            }
            localStorage?.removeItem('user-info')
            setAuthUser(null)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return {loading,logout}
}

export default useLogout;