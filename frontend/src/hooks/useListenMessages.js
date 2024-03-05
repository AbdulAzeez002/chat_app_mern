import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from '../assets/notification.mp3'
import { checkUserAlreadyExists } from '../components/modals/UserSearchModal'

const useListenMessages = () => {

  const { socket } = useSocketContext()
  const { messages, setMessages, selectedConversation, conversations } = useConversation()

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {

      if (newMessage?.senderId === selectedConversation?.user?._id) {
        setMessages([...messages, newMessage])
        const sound = new Audio(notificationSound)
        sound?.play()
      } else {
        const userIndex = checkUserAlreadyExists(newMessage?.senderId, conversations)
        console.log(userIndex, 'index')
        // if(newMessage?.senderId)
      }

    })

    return () => socket?.off('newMessage')
  }, [socket, messages, setMessages])
}

export default useListenMessages