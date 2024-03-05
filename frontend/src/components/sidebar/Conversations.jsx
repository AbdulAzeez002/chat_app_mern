import React from "react";
import Conversation from "./Conversation";

function Conversations({conversations,loading}) {

  return (
    <div className=" flex flex-col   overflow-y-scroll py-2">
      {conversations &&
        conversations?.map((conversation) => (
          <Conversation key={conversation?._id} conversation={conversation} unreadCount={conversation?.unreadCount} />
        ))}

      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
}

export default Conversations;
