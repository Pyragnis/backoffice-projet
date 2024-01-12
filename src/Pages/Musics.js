import React, { useState, useEffect } from "react";
import { IconArrowRight, IconPlus, IconTrash } from "@tabler/icons-react";
import { useSidebar } from "../Context/SidebarContext";
import MusicModal from "../Components/MusicModal";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Musics = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [musics, setMusics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMusics();
  }, []);

  const fetchMusics = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/music`);
      setMusics(response.data);
    } catch (error) {
      console.error("Error fetching musics:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = (formData) => {
    closeModal();
    fetchMusics();
  };

  const handleDelete = async (musicId, index) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/music/delete/${musicId}`);
      if (response.status === 200) {
        setMusics(musics.filter((_, i) => i !== index));
        toast.success('Music deleted successfully');
      } 
    } catch (error) {
      console.error('Error deleting music:', error);
      toast.error('Error deleting music');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMusics = musics.filter(music =>
    music.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Toaster position="top-right" />
      <div className="absolute top-0 left-0 p-4 transform" style={{ transform: `translateX(${collapsed ? '0' : '64px'})` }}>
        <IconArrowRight
          className="text-yellow-400 h-8 w-8 cursor-pointer"
          onClick={handleToggleCollapse}
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-900">
        <input
          type="text"
          placeholder="Search music..."
          className="flex-grow p-2 border border-yellow-300 rounded-md bg-black text-white"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <button
          className="ml-4 p-2 bg-yellow-500 text-white rounded-md"
          onClick={openModal}
        >
          <IconPlus size={24} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="p-4 space-y-2">
          {filteredMusics.map((music, index) => (
            <li key={music.music_id} className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-800">
              <div className="w-16 h-16 flex-none bg-gray-500 rounded-md overflow-hidden">
                {music.coverImageUrl ? (
                  <img src={music.coverImageUrl} alt={music.title} className="object-cover w-full h-full" />
                ) : (
                  <span className="flex items-center justify-center h-full text-gray-400">No Image</span>
                )}
              </div>
              <div className="flex-grow ml-4">
                <p className="text-yellow-400">{music.title}</p>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-600"
                onClick={() => handleDelete(music.music_id, index)}
              >
                <IconTrash size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <MusicModal showModal={showModal} onClose={closeModal} onSubmit={handleSubmit} fetchMusics={fetchMusics} />
    </div>
  );
};

export default Musics;
