import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";

function Messages() {
  const { messages, loading } = useGetMessages();
 
  const lastMessageRef=useRef(null)

  useEffect(()=>{
	setTimeout(()=>{
		lastMessageRef?.current?.scrollIntoView({behavior:'smooth'})
	},100)
  },[messages])

  return (
    <div className="px-4 flex-1 overflow-auto">

		{
			loading && ([...Array(3)].map((_,id)=>(<MessageSkeleton key={id}/>)))
		}

		{
			!loading && messages?.length===0 && (<p className="text-center text-white">Send a message to start the conversation</p>)
		}

		{
			!loading && messages?.length>0 && messages?.map((message,id)=>(
				<div ref={lastMessageRef}><Message key={id} message={message}/></div>
				
			))
		}
     
    </div>
  );
}

export default Messages;
