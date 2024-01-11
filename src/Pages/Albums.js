import React, { useState, useEffect } from 'react';
import { IconArrowRight, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useSidebar } from '../Context/SidebarContext';
import Modal from '../Components/AlbumModal';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'; 

const Albums = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [showModal, setShowModal] = useState(false);
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:5432/albums/');
      console.log(response.data, "here---------")
      const data = response.data;
      if (data) {
        setAlbums(data);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    closeModal();
  };

  const handleDelete = async (albumId) => {
    try {
      const response = await axios.delete(`http://localhost:5432/albums/delete/${albumId}`);
      if (response.status === 200) {
        toast.success('Album deleted successfully'); 
        getAlbums(); 
      } else {
        toast.error('Error deleting album'); 
      }
    } catch (error) {
      console.error('Error deleting album:', error);
      toast.error('Error deleting album'); 
    }
  };

  const handleEdit = (albumId) => {
    console.log('Editing album with ID:', albumId);
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] w-full bg-black">
      <div className="absolute top-4 left-0 transition-transform transform" style={{ transform: `translateX(${collapsed ? '0' : '64px'})` }}>
        <IconArrowRight className="text-yellow-400 h-10 w-10 cursor-pointer" onClick={handleToggleCollapse} />
      </div>
      <div className="flex items-center justify-center top-4 left-0 w-full p-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded-l-md w-64" />
        <button className="cursor-pointer bg-yellow-300 text-white p-2 rounded-r-md" onClick={openModal}>
          <IconPlus size={26} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {albums.map((album) => (
          <div key={album.album_id} className="bg-gray-800 p-4 rounded-md">
            <img src={album.albumCover} alt={`${album.title} Cover`} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-white text-lg mb-2">{album.title}</h3>
            <div className="flex space-x-2">
              <button className="text-red-500" onClick={() => handleDelete(album.album_id)}>
                <IconTrash />
              </button>
              <button className="text-blue-500" onClick={() => handleEdit(album.album_id)}>
                <IconEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Modal showModal={showModal} onClose={closeModal} onSubmit={handleSubmit} getAlbums={getAlbums}/>
    </div>
  );
};

export default Albums;
