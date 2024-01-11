import React, { useState, useEffect } from "react";
import { useSidebar } from "../Context/SidebarContext";
import { IconArrowRight, IconPlus, IconTrash } from "@tabler/icons-react";
import Modal from "../Components/MusicModal";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Musics = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [musics, setMusics] = useState([]);


  const fetchMusics = async () => {
    try {
      const response = await axios.get("http://localhost:5432/music");
      console.log(response, "hello")
      setMusics(response.data);
    } catch (error) {
      console.error("Error fetching musics:", error);
    }
  };


  useEffect(() => {
    fetchMusics();
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

  // Function to handle reordering
  const handleReorder = (dragIndex, hoverIndex) => {
    const updatedMusics = [...musics];
    const draggedMusic = updatedMusics[dragIndex];
    updatedMusics.splice(dragIndex, 1);
    updatedMusics.splice(hoverIndex, 0, draggedMusic);

    setMusics(updatedMusics);
  };

  // Function to handle music deletion
  const handleDelete = async (musicId, index) => {
    try {
      const response =await axios.delete(`http://localhost:5432/music/delete/${musicId}`);

    if(response.status === 200){
      const updatedMusics = [...musics];
      updatedMusics.splice(index, 1);
      setMusics(updatedMusics);
      fetchMusics();
      toast.success('Music deleted successfully');

    }
    } catch (error) {
      console.error('Error deleting music:', error);

      toast.error('Error deleting music');
    }
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
      <div className="w-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Music List</h2>
        <ul>
          {musics.map((music, index) => (
            <li
              key={music.music_id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = parseInt(
                  e.dataTransfer.getData("text/plain"),
                  10
                );
                const hoverIndex = index;
                handleReorder(dragIndex, hoverIndex);
              }}
              className="flex items-center p-2 mb-2 border border-gray-300 rounded-md cursor-move"
            >
              <div className="w-1/5">
                {music.CoverImage ? (
                  <img
                    src={music.coverImageUrl}
                    alt={`Cover Image for ${music.title}`}
                    className="w-full h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-16 bg-gray-300 rounded-md flex items-center justify-center">
                    No Cover Image
                  </div>
                )}
              </div>
              <div className="flex-grow ml-4">
                <p className="text-white">{music.title}</p>
              </div>
              <div className="ml-auto">
                <IconTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(music.music_id, index)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal showModal={showModal} onClose={closeModal} onSubmit={handleSubmit} fetchMusics={fetchMusics} />
    </div>
  );
};

export default Musics;
