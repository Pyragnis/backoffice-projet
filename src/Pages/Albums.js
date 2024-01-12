import React, { useState, useEffect } from "react";
import { IconArrowRight, IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import { useSidebar } from "../Context/SidebarContext";
import AlbumModal from "../Components/AlbumModal"; // Update with your actual modal component
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Albums = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums/`);
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("Failed to load albums");
      }
    };
    getAlbums();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (albumId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/albums/delete/${albumId}`);
      if (response.status === 200) {
        toast.success("Album deleted successfully");
        setAlbums(albums.filter(album => album.album_id !== albumId));
      } else {
        toast.error("Error deleting album");
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Error deleting album");
    }
  };

  const handleEdit = (albumId) => {
    console.log("Editing album with ID:", albumId);
    // Add logic for editing albums here...
  };

  return (
    <div className="min-h-screen w-full bg-black p-4">
      <Toaster position="top-right" />
      <div className="flex items-center mb-4">
        <IconArrowRight 
          className={`text-yellow-400 h-6 w-6 mr-3 cursor-pointer ${collapsed ? '' : 'rotate-180'}`} 
          onClick={handleToggleCollapse} 
        />
        <input 
          type="text" 
          placeholder="Search albums..." 
          className="border p-2 rounded w-full md:w-1/2 lg:w-1/3" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconPlus 
          className="text-green-400 h-6 w-6 ml-3 cursor-pointer" 
          onClick={openModal}
        />
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Albums</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlbums.map(album => (
          <div key={album.album_id} className="bg-gray-800 rounded-lg p-4">
            <img
              src={album.albumCover || 'default-cover.jpg'}
              alt={album.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg text-yellow-300 mb-2">{album.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(album.album_id)}
                className="text-red-500 hover:text-red-600"
              >
                <IconTrash size={20} />
              </button>
              <button
                onClick={() => handleEdit(album.album_id)}
                className="text-blue-500 hover:text-blue-600"
              >
                <IconEdit size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <AlbumModal showModal={showModal} onClose={closeModal} />
    </div>
  );
};

export default Albums;
