import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'

export const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {

        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender })
        console.log(success, 'sueccess')
        if (!success) {
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                fullName: fullName,
                userName: userName,
                password: password,
                confirmPassword: confirmPassword,
                gender: gender
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;

            if (data?.error) {
                throw new Error(data.error);
            }

            if (data) {
                localStorage.setItem('user-info', JSON.stringify(data));
                setAuthUser(data);
            }

        } catch (error) {
            console.log(error, 'error')
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup }
}



const handleInputErrors = ({ fullName, userName, password, confirmPassword, gender }) => {

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false;
    }

    if (password?.length < 6) {
        toast.error('Password must be greater than 6')
        return false;
    }

    return true
}