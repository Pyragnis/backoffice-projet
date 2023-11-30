// pages/Login/index.js
import React from 'react';
import Navbar from '../../components/VerticalNavbar';
import Form from '../../components/FormRegister';

const Register = () => {
  return (
    <div className="Register">
      <Navbar />
      <header className="Register-header">
        <Form title="Register" />
      </header>
    </div>
  );
};

export default Register;
