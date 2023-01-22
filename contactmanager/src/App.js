import React, { Component }  from 'react';
import './App.css';
import {ContactPage} from './Pages/ContactPage';
require('dotenv').config()

function App() {
  return (
    <div className="App">
      <ContactPage />
    </div>
  );
}

export default App;
