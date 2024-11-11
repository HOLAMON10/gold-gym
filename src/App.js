import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import MenuAdmin from './componentesMenu/MenuAdmin' // Asegúrate de que el nombre coincide con el nombre del componente
import Login from './Components/LoginForm';


function App() {
  const [message] = useState("");
  return (
   
      
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/componentesMenu/MenuAdmin" element={<MenuAdmin/>} />
        </Routes>
      </Router>

  );
}

export default App;
