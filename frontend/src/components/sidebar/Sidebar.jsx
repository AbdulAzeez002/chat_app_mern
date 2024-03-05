import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import UserSearchModal from "../modals/UserSearchModal";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@mui/material/Tooltip";

function Sidebar() {
  const { loading } = useGetConversations();
  const { conversations } = useConversation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  useGetConversations()

  useEffect(() => {
    setFilteredConversations(conversations);
  }, [conversations]);

  const [filteredConversations, setFilteredConversations] =
    useState(conversations);

  return (
    <>
      <div
        style={{ height: "90vh", maxHeight: "90vh" }}
        className="w-[400px] flex flex-col p-2 relative border-r-2 border-slate-500"
      >
        <div >
          <SearchInput setFilteredConversations={setFilteredConversations} />
          
        </div>

        <div className="divider px-3"></div>
        <Conversations
          conversations={filteredConversations}
          loading={loading}
        />
        <Tooltip title={"new chat"}>
          <div onClick={handleOpen} className="absolute cursor-pointer bottom-20 right-5 z-10 bg-slate-100 rounded-full p-4 ">
            <CommentIcon  />
          </div>
        </Tooltip>
      </div>
      <UserSearchModal open={open} handleClose={handleClose} />
    </>
  );
}

export default Sidebar;
