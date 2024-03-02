import {create} from 'zustand'

const useConversation=create((set)=>({
    selectedConverstaion:null,
    setSelectedConversation:(selectedConverstaion)=>set({selectedConverstaion}),
    messages:[],
    setMessages:(messages)=>set({messages})
}))

export default useConversation;