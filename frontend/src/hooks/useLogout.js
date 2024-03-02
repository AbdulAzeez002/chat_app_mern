import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import axios from "axios"

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {

        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;

            if (data?.error) {
                throw new Error(data.error);
            }

            localStorage?.removeItem('user-info');
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout;