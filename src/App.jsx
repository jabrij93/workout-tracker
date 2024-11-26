// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WoTrack from './WoTrack'; 
import Login from '../components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  
  const loginForm = () => (
    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} /> 
  );

  const mainApp = () => (
    <WoTrack user={user} isLoggedIn={isLoggedIn} /> 
  );

  return (
    <div>
      <h1>Workout Tracker</h1>
      
      {isLoggedIn ? mainApp() : loginForm()}
    </div>
  );
}

export default App;
