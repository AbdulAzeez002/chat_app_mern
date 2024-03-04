import axios from "axios"
import { getToken } from "../utils/getToken"

export const searchUser = async (term) => {
    console.log(term, 'term')
    const token=await getToken()
    console.log(token,'token')

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