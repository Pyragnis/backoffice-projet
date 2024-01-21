import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const AlbumEditModal = ({ albumId, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(''); 
  const [genre, setGenre] = useState(''); 

  const onSubmitHandler = async (data) => {
    setIsLoading(true);

    try {
      const updatedData = {
        ...data,
        description,
        genre,
      };

      // Send a PUT request to update the album data using the albumId
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/albums/update/${albumId}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success('Album updated successfully!');
        onClose();
      } else {
        toast.error(`Failed to update album. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating album:', error);
      toast.error(`Error updating album: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className={`modal flex items-center justify-center fixed top-0 left-0 w-full h-full`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content bg-white p-4 rounded-md shadow-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full max-w-md">
          {/* Add fields for updating album data (e.g., title, artist_id, description, genre) */}
          <label className="block mb-2">
            Title:
            <input
              {...register('title')}
              type="text"
              className="w-full border p-2 rounded-md"
            />
          </label>
        
          <label className="block mb-2">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Genre:
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
          </label>
          <button
            type="submit"
            className={`bg-green-500 text-white p-2 rounded-md ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Album'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumEditModal;
