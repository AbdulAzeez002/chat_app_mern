import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import UserSearchModal from "../modals/UserSearchModal";

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
    <div style={{height:'90vh',maxHeight:'90vh'}} className="w-[400px] flex flex-col p-2">
      <div className="flex justify-between">
      <SearchInput setFilteredConversations={setFilteredConversations} />
      <button className="btn bg-rose-900 border-0 text-white hover:bg-rose-700 mr-2" onClick={handleOpen} >New Chat</button>
      </div>
       
      <div className="divider px-3"></div>
      <Conversations conversations={filteredConversations} loading={loading} />
      
      
    </div>
    <UserSearchModal open={open} handleClose={handleClose}/>
    </>
  );
}

export default Sidebar;
