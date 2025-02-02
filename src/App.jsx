// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WoTrack from './WoTrack'; 
import WoTrack2 from '../components/WoTrack2'; 
import Login from '../components/Login';
import workoutService from '../src/services/workouts.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   workoutService
  //     .getAll()
  //     .then((response) => {
  //       console.log('Fetched workouts:', response.data); // Debugging log
  //       setWorkouts(response.data); // Set the workouts state with fetched data
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching workouts:', error);
  //     });
  // }, []); // Empty dependency array ensures this runs only once on mount

  // console.log('workoutsss', workouts)

  const addWorkout = (workoutObject) => {
    workoutService
      .create(workoutObject)
      .then((returnedWorkout) => {
        setWorkouts((prevWorkouts) => [...prevWorkouts, returnedWorkout]); // Update workouts state
      })
      .catch((error) => {
        console.error('Error adding workout:', error);
      });
  };

  const loginForm = () => (
    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} /> 
  );

  const mainApp = () => (
    <WoTrack user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} createWorkout={addWorkout} /> 
  );

  const mainApp2 = () => (
    <WoTrack2 user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} createWorkout={addWorkout} workouts={workouts} buttonLabel="show details" /> 
  );

  return (
    <div>
      {isLoggedIn ? mainApp2() : loginForm()}
    </div>
  );
}

export default App;
