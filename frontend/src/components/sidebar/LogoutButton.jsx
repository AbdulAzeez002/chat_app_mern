import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
function LogoutButton() {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="py-4 ">
      {!authUser ? (
        <div>
          <button
            className="btn bg-emerald-900 border-0 text-white hover:bg-emerald-700 w-20"
            onClick={logout}
          >
            Login
          </button>
        </div>
      ) : (
        <button
          className="btn bg-rose-900 border-0 text-white hover:bg-rose-700 w-20"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default LogoutButton;
