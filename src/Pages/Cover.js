import React, { useState, useEffect } from "react";
import {
  IconArrowRight,
  IconPlus,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";
import { useSidebar } from "../Context/SidebarContext";
import CoverModal from "../Components/CoverModal";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Cover = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [covers, setCovers] = useState([]);

  const getCovers = async () => {
    try {
      const response = await axios.get("http://localhost:5432/cover/");
      const data = response.data;
      console.log(data);
      if (data) {
        setCovers(data);
      }
    } catch (error) {
      console.error("Error fetching covers:", error);
    }
  };

  useEffect(() => {
    getCovers();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (formData) => {
    // Handle form submission logic
    console.log("Form submitted:", formData);
    closeModal(); // Close the modal after submission
  };

  const handleDelete = async (coverId) => {
    try {
      const request = await axios.delete(
        `http://localhost:5432/cover/delete/${coverId}`
      );
      console.log(request)
      if (request.status === 200) {
        toast.success("Album deleted successfully");
      }
    } catch (error) {
      console.log("Deleting cover with ID:", coverId);
      toast.error("Error deleting album");
    }
  };

  const handleEdit = (coverId) => {
    // Implement edit logic using coverId
    console.log("Editing cover with ID:", coverId);
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] w-full bg-black">
      <div
        className="absolute top-4 left-0 transition-transform transform"
        style={{ transform: `translateX(${collapsed ? "0" : "64px"})` }}
      >
        <IconArrowRight
          className="text-yellow-400 h-10 w-10 cursor-pointer"
          onClick={handleToggleCollapse}
        />
      </div>
      <div className="flex items-center justify-center top-4 left-0 w-full p-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-l-md w-64"
        />
        <button
          className="cursor-pointer bg-yellow-300 text-white p-2 rounded-r-md"
          onClick={openModal}
        >
          <IconPlus size={26} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {covers.map((cover) => (
          <div key={cover.cover_id} className="bg-gray-800 p-4 rounded-md">
            <img
              src={cover.url}
              alt={`Cover Image`}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <div className="flex space-x-2">
              <button
                className="text-red-500"
                onClick={() => handleDelete(cover.cover_id)}
              >
                <IconTrash />
              </button>
              <button
                className="text-blue-500"
                onClick={() => handleEdit(cover.cover_id)}
              >
                <IconEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      <CoverModal
        showModal={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        getCovers={getCovers}
      />
    </div>
  );
};

export default Cover;
