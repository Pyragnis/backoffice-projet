import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const Modal = ({ showModal, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post('http://localhost:5432/artists/addartist', data);
      if (response.status === 201) {
        toast.success('Artist added successfully!');
        reset();
      } else {
        toast.error('Failed to add artist. Status: ' + response.status);
      }
    } catch (error) {
      console.error('Error adding artist:', error);
      toast.error('Error adding artist: ' + error.message);
    }
    onClose();
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
            Name:
            <input {...register('name')} type="text" className="w-full border p-2 rounded-md" />
          </label>
          <label className="block mb-2">
            Bio:
            <textarea {...register('bio')} className="w-full border p-2 rounded-md"></textarea>
          </label>
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
