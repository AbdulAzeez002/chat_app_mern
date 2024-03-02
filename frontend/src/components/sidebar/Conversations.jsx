import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

function Conversations({conversations,loading}) {
  
  // const  {conversations}=useConversation()
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations &&
        conversations.map((conversation) => (
          <Conversation key={conversation?._id} conversation={conversation} />
        ))}

      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
}

export default Conversations;
