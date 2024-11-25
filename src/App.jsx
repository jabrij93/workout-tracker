// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WoTrack from './WoTrack';  // Renaming original App content for clarity
import Login from '../components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* If logged in, show the main timezone app, otherwise show login */}
        <Route
          path="/"
          element={isLoggedIn ? <WoTrack /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
