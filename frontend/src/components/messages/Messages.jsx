import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import moment from 'moment'
import useConversation from "../../zustand/useConversation";

function Messages() {
  const { messages, loading } = useGetMessages();
  const {unReadCountOfselectedUser}=useConversation()

  
  // useListenMessages();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_, id) => <MessageSkeleton key={id} />)}

      {!loading && messages?.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}

      {!loading &&
        messages?.length > 0 &&
        messages?.map((message, index) => (
          <div ref={lastMessageRef} key={index}>
            
			
			<div className="flex justify-center py-2">
			<p className="text-center bg-white rounded px-2 text-sm">{getDayTag(message?.createdAt,messages[index-1]?.createdAt)}</p>
			</div>
			
            <Message key={index} message={message} showTick={messages?.length-1-index<unReadCountOfselectedUser} />
          </div>
        ))}
    </div>
  );
}

export default Messages;

const getDayTag=(currentDate,prevDate)=>{
    
	const current=moment(currentDate)
	const prev=moment(prevDate)
	const today=moment()
	if(!current?.isSame(prev,'day')){
		if(current.isSame(today,'day')){
			return "Today"
		}else if(current.isSame(today.clone().subtract(1, 'day'), 'day')){
			return "Yesterday"
		}else{
			return `${current?.format('ll')}`
		}
	}else{
		return ""
	}
}
