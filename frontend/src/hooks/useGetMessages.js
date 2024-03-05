import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetMessages = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation, conversations, setConversations,setUnreadCountOfSelectedUser } = useConversation()
    const { authUser } = useAuthContext()
    const token = authUser?.token

    useEffect(() => {
        if (selectedConversation?.user?._id) {
            getMessages()
            makeUnreadCountZero()
        }

    }, [selectedConversation?.user?._id, setMessages])

    const makeUnreadCountZero = () => {

        const convertedConversations = conversations?.map((conv) => {
            if (conv?.user?._id === selectedConversation?.user?._id) {
                conv.unreadCount = 0
                return conv
            }
            return conv
        })
        setConversations(convertedConversations)

    }

    const getMessages = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`http://localhost:5000/api/messages/${selectedConversation?.user?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res?.data
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(data?.messages)
            setUnreadCountOfSelectedUser(data?.unreadCount)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { messages, loading }
}

export default useGetMessages

