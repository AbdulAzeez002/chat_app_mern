import axios from "axios"
import { getToken } from "../utils/getToken"

export const searchUser = async (term) => {
    
    const token=await getToken()
    

    try {
        const response = await axios.get(`http://localhost:5000/api/users/search/${term}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            return response?.data
        }
    } catch (error) {
        console.log(error.message)
    }
}