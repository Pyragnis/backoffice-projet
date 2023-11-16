// App.js
import React from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Form title="Connexion"/>
      </header>
    </div>
  );
}

export default App;
