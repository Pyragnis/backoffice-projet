import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';



const MusicModal = ({ showModal, onClose, onSubmit, fetchMusics }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);


  const fetchArtistsAndAlbums = async () => {
    try {
      const artistsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/artists/`);
      const albumsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums`);

      setArtists(artistsResponse.data);
      setAlbums(albumsResponse.data);
    } catch (error) {
      console.error('Error fetching artists and albums:', error);
    }
  };

  useEffect(() => {
    fetchArtistsAndAlbums();
  }, []);

  const onSubmitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append('song', data.songfile[0]);
      formData.append('name', data.name);
      formData.append('album_id', data.album_id);
      // formData.append('artist_id', data.artist_id);

      console.log(formData)
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/music/addmusic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)
  
      if (response.status >= 200 && response.status < 300) {
        console.log('Music added successfully:', response.data);
        setValue('songfile', null);
        setValue('name', '');
        setValue('album_id', null);
        setValue('artist_id', null);
        toast.success('Music has successfully been added!');
        onClose();
      } 
    } catch (error) {
      console.error('Error adding music:', error);
      toast.error('Error adding music:', error.message);
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
            Song File:
            <input {...register('songfile')} type="file" className="w-full border p-2 rounded-md" />
          </label>
          <label className="block mb-2">
            Name:
            <input {...register('name')} type="text" className="w-full border p-2 rounded-md" />
          </label>
          <label className="block mb-2">
            Album:
            <select {...register('album_id')} className="w-full border p-2 rounded-md">
              <option value="" disabled>Select an album</option>
              {albums.map((album) => (
                <option key={album.album_id} value={album.album_id}>
                  {album.title}
                </option>
              ))}
            </select>
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
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MusicModal;
