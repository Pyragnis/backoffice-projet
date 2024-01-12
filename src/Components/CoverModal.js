import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const CoverModal = ({ showModal, onClose }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [albums, setAlbums] = useState([]);
  const selectedAlbumId = watch("album_id");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums/`);
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("Error fetching albums");
      }
    };

    fetchAlbums();
  }, []);

  const onSubmitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("album_id", selectedAlbumId);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cover/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      if (response.status === 200) {
        toast.success("Cover image added successfully!");
        onClose();
      } else {
        toast.error(`Failed to add cover image. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding cover image:", error);
      toast.error(`Error adding cover image: ${error.message}`);
    }
  };

  return (
    <div
      className={`modal ${
        showModal ? "block" : "hidden"
      } flex items-center justify-center fixed top-0 left-0 w-full h-full`}
    >
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content bg-white p-4 rounded-md shadow-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full max-w-md"
        >
          <label className="block mb-2">
            Album:
            <select
              {...register("album_id")}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select an album</option>
              {albums.map((album) => (
                <option key={album.album_id} value={album.album_id}>
                  {album.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Image:
            <input
              {...register("image")}
              type="file"
              className="w-full border p-2 rounded-md"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoverModal;
