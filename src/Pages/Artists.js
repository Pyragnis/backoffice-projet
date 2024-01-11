import React, { useState } from "react";
import { useSidebar } from "../Context/SidebarContext";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import Modal from "../Components/Modal";
import { Toaster } from "react-hot-toast";

const Artists = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] w-full bg-gray-600 opacity-80">
      <Toaster position="top-right" />
      <div className="absolute top-4 left-0 transition-transform transform" style={{ transform: `translateX(${collapsed ? '0' : '64px'})` }}>
        <IconArrowRight
          className="text-yellow-400 h-10 w-10 cursor-pointer"
          onClick={handleToggleCollapse}
        />
      </div>
      <div className="flex items-center justify-center top-0 left-0 w-full p-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded-l-md w-64" />
        <button className="cursor-pointer bg-yellow-300 text-white p-2 rounded-r-md" onClick={openModal}>
          <IconPlus size={26} />
        </button>
      </div>
      Artists
      <Modal showModal={showModal} onClose={closeModal} />
    </div>
  );
};

export default Artists;
