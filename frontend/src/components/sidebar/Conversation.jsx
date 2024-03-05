import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ conversation,unreadCount }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {onlineUsers}=useSocketContext()
  const isSelected = selectedConversation?.user?._id === conversation?.user?._id;
  const isOnline=onlineUsers?.includes(conversation?.user?._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
	  ${isSelected && "bg-sky-500"}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline && 'online'}`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.user?.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.user?.fullName}</p>

            {
              unreadCount >0 && (<button type="button" class="text-white bg-emerald-500 text-xs p-2 rounded  font-small text-center ">{unreadCount}</button>)
            }
            
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
}

export default Conversation;
