import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = authUser?._id === message?.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.user?.profilePic;
  const bubbleBgColor = fromMe ? "bg-sky-400" : "bg-slate-500";
  const formattedDate = extractTime(message?.createdAt);

  const getTime = (timestamp) => {
    const momentObj = moment(timestamp);
    const time = momentObj.format("HH:mm a");

    return time;
  };
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble   text-white ${bubbleBgColor} pb-2`}>
        <div>{message?.message}</div>

        <div className="text-end">
          {fromMe && <DoneIcon className="text-white m-0 p-0" />}

          {/* <DoneAllIcon className="text-blue-400"/> */}
        </div>
      </div>
      <div></div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {getTime(message?.createdAt)}
      </div>
    </div>
  );
}

export default Message;
