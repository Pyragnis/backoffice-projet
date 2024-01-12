import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const Modal = ({ showModal, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/artists/addartist`, data);
      console.log(response)
      if (response.status === 201) {
        toast.success('Artist added successfully!');
        reset();
      } 
    } catch (error) {
      console.error('Error adding artist:', error);
      toast.error('Error adding artist: ' + error.message);
    }
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${showModal ? '' : 'hidden'} flex items-center justify-center`}>
      <div className="modal-overlay absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="modal-content bg-white p-6 rounded-lg shadow-xl relative max-w-lg mx-auto">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={onClose}>
          &#x2715;
        </button>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input {...register('name')} type="text" className="w-full border-gray-300 p-2 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio:</label>
            <textarea {...register('bio')} className="w-full border-gray-300 p-2 rounded-md focus:ring-yellow-500 focus:border-yellow-500" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Modal;
