import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
    const {authUser}=useAuthContext()
    const token=authUser?.token
    

	useEffect(() => {
		

		getConversations();
	}, []);

    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/users",{headers:{
                Authorization:`Bearer ${token}`
            }});
            const data = res?.data
            if (data.error) {
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
	return { loading, conversations };
};
export default useGetConversations;