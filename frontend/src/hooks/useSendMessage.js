import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const {messages,setMessages,selectedConversation}=useConversation()
    const {authUser}=useAuthContext()
    const token=authUser?.token
    

	

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:5000/api/messages/send/${selectedConversation?._id}`,{message:message},{headers:{
                Authorization:`Bearer ${token}`
            }});
            const data = res?.data
            if (data.error) {
                throw new Error(data.error);
            }

            if(data){
                setMessages([...messages,data])
            }
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
	return { loading, sendMessage };
};
export default useSendMessage;