// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WoTrack from './WoTrack';  // Renaming original App content for clarity
import Login from '../components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  // Function to render the login form
  const loginForm = () => (
    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} /> // Pass setIsLoggedIn to handle login
  );

  // Function to render the main app (WoTrack)
  const mainApp = () => (
    <WoTrack user={user} /> // Render your WoTrack component
  );

  return (
    <div>
      <h1>Workout Tracker</h1>
      {/* Conditionally render the login or main app based on login state */}
      {isLoggedIn ? mainApp() : loginForm()}
    </div>
  );
}

export default App;
