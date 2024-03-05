import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  return (
    <div
      style={{ maxHeight: "90vh" }}
      className="flex-1 flex flex-col px-4 py-4 "
    >
      <>
        {!selectedConversation ? (
          <>
            <NoChatSelected />
          </>
        ) : (
          <>
            <div className="bg-slate-200 px-4 py-2 mb-2 rounded flex justify-between">
              <div className="flex">
                <div>
                  <img src={selectedConversation?.user?.profilePic} className="h-9" alt="" />
                </div>
              <span className="text-gray-900 font-semibold ml-4">
                {selectedConversation?.user?.fullName}
              </span>
              </div>
              {/* <div>
                <button>delete</button>
              </div> */}
             
            </div>

            <Messages />
            <MessageInput />
          </>
        )}
        {/* Header */}
      </>
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
