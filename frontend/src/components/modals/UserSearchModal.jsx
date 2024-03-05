import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IoSearchSharp } from "react-icons/io5";
import debounce from "lodash.debounce";
import { searchUser } from "../../services/userService";
import useConversation from "../../zustand/useConversation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none", // Remove border
  boxShadow: "none", // Remove shadow
  height: 500,
  outline: 'none',
};



export const checkUserAlreadyExists=(id,conversations)=>{
 
  for (let i = 0; i < conversations.length; i++) {
    if (conversations[i]?.user?._id === id) {
        return i; // Return the index when a match is found
    }
}
return -1; 
}

const UserSearchModal = ({ open, handleClose }) => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  const {conversations,setConversations,setSelectedConversation}=useConversation();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {

    const users = await searchUser(searchText);
    if (users) {
      setUsers(users);
    }
  };

  const DebouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, [searchText]);

  useEffect(() => {
    DebouncedSearch();
    return () => {
      DebouncedSearch.cancel();
    };
  }, [searchText]);



  const handleClick=(user)=>{
    
    const userIndex=checkUserAlreadyExists(user?._id,conversations)
    if(userIndex===-1){
      const newUser={
        user:user,
        unreadCount:0,

      }
      const newConversations=[newUser,...conversations]
      setConversations(newConversations)
      setSelectedConversation(newUser)
      handleClose()
    }
    

  }



  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style} className='rounded'>
        <div>
          <div className="flex justify-between p-4">
            <h2 className="text-xl font-semibold">Search</h2>
            <div onClick={handleClose}>
              <CloseIcon className="cursor-pointer" />
            </div>
          </div>
          <hr className="my-2" />

          <div className="px-4">
            <div className="flex justify-between items-center border rounded ">
              <input
                className=" rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Search ..."
                value={searchText}
                onChange={handleChange}
              />
              <IoSearchSharp className="w-6 h-6 outline-none me-2 cursor-pointer" />
            </div>
          </div>
          <div className="max-h-80 mx-4  border pb-4 mb-4 rounded-bottom  overflow-y-scroll">
            {users && users?.map((user,index) => 
            
            <div key={index} onClick={()=>handleClick(user)} className={`flex p-4 border-b-slate-600 ${ index!==users?.length-1?'border':'pb-0'} cursor-pointer` }>
               
              <div className="">
                <img src={user?.profilePic} alt="" className="h-10" />
              </div>
              <div className="pl-3">
                {user?.fullName}
              </div>
            </div>)}
            {
              users?.length===0 && ( <p className="text-rose-800 text-center h-72 pt-12">No such user found</p> )
            }
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserSearchModal;
