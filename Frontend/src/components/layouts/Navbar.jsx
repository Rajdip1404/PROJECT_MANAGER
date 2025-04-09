import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 bacdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Project Manager</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import SideMenu from "./SideMenu";

// const Navbar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         !event.target.closest("#sidebar") &&
//         !event.target.closest("#menu-button")
//       ) {
//         setOpenSideMenu(false);
//       }
//     };

//     if (openSideMenu) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [openSideMenu]);

//   return (
//     <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
//       {/* Mobile Menu Button */}
//       <button
//         id="menu-button"
//         className="block lg:hidden text-black"
//         onClick={() => setOpenSideMenu(!openSideMenu)}
//       >
//         {openSideMenu ? (
//           <HiOutlineX className="text-2xl" />
//         ) : (
//           <HiOutlineMenu className="text-2xl" />
//         )}
//       </button>

//       {/* App Title */}
//       <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

//       {/* Responsive Sidebar */}
//       <div
//         id="sidebar"
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
//           openSideMenu ? "translate-x-0" : "-translate-x-full"
//         } lg:hidden`}
//       >
//         <SideMenu activeMenu={activeMenu} />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
