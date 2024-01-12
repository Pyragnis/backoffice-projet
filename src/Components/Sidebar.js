import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../Context/SidebarContext";
import { IconArrowRight } from "@tabler/icons-react";

const Sidebar = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();

  return (
    <div
      className={`h-screen w-64 bg-black opacity-80 border-r-2 border-yellow-300 text-white overflow-hidden transition-all duration-300 z-10 fixed top-0 ${
        collapsed ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div
        className="absolute top-4 transition-transform transform"
        style={{ left: collapsed ? "10px" : "210px" }}
      >
        <IconArrowRight
          className="absolute text-yellow-400 h-10 w-10 cursor-pointer"
          onClick={handleToggleCollapse}
        />
      </div>

      <ul className="list-none p-0 flex flex-col items-center justify-center h-full">
        <li className="p-10">
          <Link to="/" className="text-white  cursor-pointer">
            Home
          </Link>
        </li>
        <li className="p-10">
          <Link to="/artists" className="text-white cursor-pointer">
            Artists
          </Link>
        </li>
        <li className="p-10">
          <Link to="/albums" className="text-white cursor-pointer">
            Albums
          </Link>
        </li>
        <li className="p-10">
          <Link to="/musics" className="text-white cursor-pointer">
            Musics
          </Link>    
        </li>
        <li className="p-10">
          <Link to="/cover" className="text-white cursor-pointer">
            Cover
          </Link>    
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
