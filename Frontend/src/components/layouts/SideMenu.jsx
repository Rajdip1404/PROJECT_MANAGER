import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data.js";
import { UserContext } from "../../context/user.context.jsx";
// import CharAvatar from "../Cards/CharAvatar.jsx";

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([])
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if(user) {
        setSideMenuData(user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center gap-1 mt-3 mb-7">
        <div className="relative">
          <img
            src={user?.profileImage || ""}
            alt="Profile Image"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {user?.role === "admin" && (
            <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
                Admin
            </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-xs text-gray-600">{user?.email || ""}</p>
      </div>

      {/* Menu Items */}
      {sideMenuData.map((item, index) => {
        const isActive = location.pathname === item.to; // Check if the route matches

        return (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px]  transition-all duration-200 ${
              isActive
                ? "text-primary font-semibold bg-linear-to-r from-blue-50/40 to-blue-100/80 border-r-3"
                : "text-gray-700 hover:bg-gray-100"
            } py-3 px-6 mb-3 cursor-pointer`}
            onClick={() => handleClick(item.to)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
