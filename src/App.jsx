// src/App.jsx
import { useState, useEffect } from 'react';
import WoTrack from './WoTrack'; 
import WoTrack2 from './WoTrack2.jsx'; 
import Login from './Login.jsx';
import workoutService from '../src/services/workouts.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    workoutService
      .getAll()
      .then((response) => {
        setWorkouts(response.data); // Set the workouts state with fetched data
      })
  }, []); // Empty dependency array ensures this runs only once on mount

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
    <WoTrack2 
      user={user} 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn} 
      createWorkout={addWorkout} 
      workouts={workouts} 
      buttonLabel="show details" 
    /> 
  );

  return (
    <div>
      {isLoggedIn ? mainApp2() : loginForm()}
    </div>
  );
}

export default App;
