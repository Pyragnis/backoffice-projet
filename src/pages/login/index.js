// pages/Login/index.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Form from '../../components/Form';

const Login = () => {
  return (
    <div className="Login">
      <Navbar />
      <header className="Login-header">
        <Form title="Connexion" />
      </header>
    </div>
  );
};

export default Login;
