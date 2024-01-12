import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSidebar } from "../Context/SidebarContext";
import { IconArrowRight, IconPlus, IconTrash } from "@tabler/icons-react";
import Modal from "../Components/Modal"; // Update with your actual modal component
import { Toaster, toast } from "react-hot-toast";

const Artists = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/artists/`);
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      toast.error("Failed to load artists");
    }
  };

  const handleDelete = async (artistId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/artists/delete/${artistId}`);
      toast.success("Artist deleted successfully");
      fetchArtists();
    } catch (error) {
      console.error("Error deleting artist:", error);
      toast.error("Failed to delete artist");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          placeholder="Search artists..." 
          className="border p-2 rounded w-[500]" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconPlus 
          className="text-green-400" 
          onClick={openModal}
        />
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Artists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArtists.map((artist, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between">
              <h3 className="text-lg text-yellow-300">{artist.name}</h3>
              <IconTrash
                onClick={() => handleDelete(artist.artist_id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
            <p className="text-gray-400">{artist.bio}</p>
          </div>
        ))}
      </div>
      <Modal showModal={showModal} onClose={closeModal} /* Additional props */ />
    </div>
  );
};

export default Artists;
