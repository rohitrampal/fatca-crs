// import * as React from "react";
import { useNavigate,  } from "react-router-dom";
// import { useDispatch } from "react-redux";
import logo from "../../assets/react.svg";
import { useState } from "react";
// import { logout } from "../../../../redux/features/authSlice";
// import { clearUser } from "../../../../redux/features/userSlice";

// interface Params {
//   lang: string|Record<string, string | undefined>;
// }

const SemiProfile = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleProfile = () => {
    navigate(`/mof/profile`);
  };
  const handleLogout = () => {
    // dispatch(logout());
    // dispatch(clearUser());
    localStorage.removeItem("token");
    // navigate("/");
  };

  return (
    <div className="relative inline-block ml-44">
      <button
        onClick={handleToggle}
        className="p-1 rounded-full border-2 border-black mt-1"
      >
        <img src={logo} alt="logo" className="w-7 " />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10 overflow-hidden">
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleProfile}
          >
            Profile
          </li>
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </li>
        </ul>
      )}
    </div>
  );
};

export default SemiProfile;
