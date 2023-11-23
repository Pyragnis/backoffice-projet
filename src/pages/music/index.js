// pages/Login/index.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Form from '../../components/FormMusic';

const Music = () => {
  return (
    <div className="Music">
      <Navbar />
      <header className="Music-header">
        <Form title="Ajouter Music" />
      </header>
    </div>
  );
};

export default Music;
