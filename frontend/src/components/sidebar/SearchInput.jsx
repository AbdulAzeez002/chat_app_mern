import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";

function SearchInput({ setFilteredConversations }) {
  const [search, setSearch] = useState("");
  const { conversations } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredConversations = conversations?.filter((conversation) =>
      conversation?.fullName?.toLowerCase()?.includes(search?.toLowerCase())
    );
    setFilteredConversations(filteredConversations);
  };

  return (
    <form className="flex items-center gap-2 " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn  bg-emerald-700 border-0 hover:bg-emerald-800 text-white"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
