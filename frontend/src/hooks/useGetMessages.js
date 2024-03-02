import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetMessages = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation()
    const { authUser } = useAuthContext()
    const token = authUser?.token

    useEffect(() => {
        if (selectedConversation?._id) {
            getMessages()
        }

    }, [selectedConversation?._id,setMessages])

    const getMessages = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`http://localhost:5000/api/messages/${selectedConversation?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res?.data
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {messages,loading}
}

export default useGetMessages