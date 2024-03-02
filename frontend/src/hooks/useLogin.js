import { useState } from "react";
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios'
const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async ({ userName, password }) => {
        const success = handleInputErrors(userName, password)
        console.log(success, 'sueccess')
        if (!success) {
            return;
        }

        setLoading(false)
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                userName: userName,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response?.data
            if (data?.error) {
                throw new Error(data.error)
            }

            if (data) {
                localStorage.setItem('user-info', JSON.stringify(data))
                setAuthUser(data)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(true)
        }
    }

    return { loading, login }
}

export default useLogin;

const handleInputErrors = (userName, password) => {

    if (!userName || !password) {
        toast.error("Please fill all the fields")
        return false;
    }

    return true
}