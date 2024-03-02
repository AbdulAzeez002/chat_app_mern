import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

function Sidebar() {
  const { loading } = useGetConversations();
  const { conversations } = useConversation();
  //  useGetConversations()

  useEffect(() => {
    setFilteredConversations(conversations);
  }, [conversations]);

  const [filteredConversations, setFilteredConversations] =
    useState(conversations);

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput setFilteredConversations={setFilteredConversations} />
      <div className="divider px-3"></div>
      <Conversations conversations={filteredConversations} loading={loading} />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
