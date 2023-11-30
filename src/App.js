// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavbar from '../src/components/VerticalNavbar';
import Home from '../src/pages/Accueil';
import Register from '../src/pages/Register';
import Music from '../src/pages/Music';

const App = () => {
  return (
    <Router>
      <VerticalNavbar />
      <Routes>
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Music" element={<Music />} />
      </Routes>
    </Router>
  );
};

export default App;
