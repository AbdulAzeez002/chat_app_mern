import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from '../assets/notification.mp3'
import { checkUserAlreadyExists } from '../components/modals/UserSearchModal'
import { getUserDetails, updateUnreadCount } from '../services/userService'
import toast from 'react-hot-toast';

const useListenMessages = () => {

  const { socket } = useSocketContext()
  const { messages, setMessages, selectedConversation, conversations, setConversations } = useConversation()

  useEffect(() => {
    socket?.on('newMessage', async (newMessage) => {

      if (newMessage?.senderId === selectedConversation?.user?._id) {
        setMessages([...messages, newMessage])

        /// logic for making unread count zero
      
        const response=await updateUnreadCount(newMessage?.senderId)
        console.log(response,'response')

        const sound = new Audio(notificationSound)
        sound?.play()
        return
      } else {

        try {
          const userIndex = checkUserAlreadyExists(newMessage?.senderId, conversations)
          if (userIndex === -1) {

            const user = await getUserDetails(newMessage?.senderId)
            if (user) {
              setConversations([{ user, unreadCount: 1 }, ...conversations])
            }
          } else {

            const oldConversations = conversations
            const user = oldConversations?.splice(userIndex, 1)
            const newUser = { ...user[0] }
            newUser.unreadCount = newUser?.unreadCount + 1
            setConversations([newUser, ...oldConversations])
          }
        } catch (error) {
          toast.error(error.message)
        }

      }

    })

    return () => socket?.off('newMessage')
  }, [socket, messages, setMessages, conversations])
}

export default useListenMessages