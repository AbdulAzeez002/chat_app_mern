import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
function LogoutButton() {
  const {loading,logout}=useLogout()

  return (
    
    <div className="py-4 ">
      {/* <BiLogOut className="w-6 h-6 text-white cursor-pointer"  /> */}
      <button className="btn bg-rose-900 border-0 text-white hover:bg-rose-700 w-20" onClick={logout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
