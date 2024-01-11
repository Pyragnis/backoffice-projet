import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const AlbumModal = ({ showModal, onClose, onSubmit, getAlbums}) => {
  const { register, handleSubmit, setValue } = useForm();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsResponse = await axios.get('http://localhost:5432/artists/');
        setArtists(artistsResponse.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);


  const onSubmitHandler = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('http://localhost:5432/albums/add', data);

      console.log(response)
  
      if (response.status === 200) {
        console.log('Album added successfully:', response.data);
        setValue('title', '');
        setValue('release_date', '');
        setValue('genre', '');
        setValue('description', '');
        setValue('artist_id', null);
        toast.success('Album has successfully been added!');
        getAlbums()
        onClose();
      } else {
        console.error('Error adding album. Status:', response.status);
        toast.error(`Error adding album. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding album:', error);
      toast.error(`Error adding album: ${error.message}`);
    }
  };
  

  return (
    <div className={`modal ${showModal ? 'block' : 'hidden'} flex items-center justify-center fixed top-0 left-0 w-full h-full`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content bg-white p-4 rounded-md shadow-md relative">
        <button className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={onClose}>
          &#x2715;
        </button>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full max-w-md">
          <label className="block mb-2">
            Title:
            <input {...register('title')} type="text" className="w-full border p-2 rounded-md" />
          </label>
          <label className="block mb-2">
            Release Date:
            <input {...register('release_date')} type="date" className="w-full border p-2 rounded-md" />
          </label>
          <label className="block mb-2">
            Genre:
            <input {...register('genre')} type="text" className="w-full border p-2 rounded-md" />
          </label>
          <label className="block mb-2">
            Description:
            <textarea {...register('description')} className="w-full border p-2 rounded-md"></textarea>
          </label>
          <label className="block mb-2">
            Artist:
            <select {...register('artist_id')} className="w-full border p-2 rounded-md">
              <option value="" disabled>Select an artist</option>
              {artists.map((artist) => (
                <option key={artist.artist_id} value={artist.artist_id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumModal;
