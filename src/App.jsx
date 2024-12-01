// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WoTrack from './WoTrack'; 
import Login from '../components/Login';
import workoutService from '../src/services/workouts.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([]);
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    workoutService
      .getAll()
      .then(initialWorkouts => {
        setWorkouts(initialWorkouts);
      });
  }, []);

  const addWorkout = (workoutObject) => {
    workoutService
      .create(workoutObject)
      .then(returnedWorkout => {
        setWorkouts(workouts.concat(returnedWorkout))
      })
  }

  const loginForm = () => (
    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} /> 
  );

  const mainApp = () => (
    <WoTrack user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} createWorkout={addWorkout} /> 
  );

  return (
    <div>
      <h1>Workout Tracker</h1>
      
      {isLoggedIn ? mainApp() : loginForm()}
    </div>
  );
}

export default App;
