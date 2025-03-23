import { useState, useEffect, useRef } from 'react';
import Login from '../components/Login.jsx';
import WoTrack2 from '../components/WoTrack2.jsx';
import Notification from '../components/Notification.jsx';
import loginService from './services/login.js';
import workoutService from '../src/services/workouts.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setIsLoggedIn(true);
      fetchWorkouts();
    }
  }, []);

  const fetchWorkouts = async () => {
    try {
      const workouts = await workoutService.getAll();
      setWorkouts(workouts.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <div>
      <h1>Workout Tracker</h1>
      <Notification message={errorMessage} />
      {!isLoggedIn || !user ? (  // Ensure both conditions are checked
      <Login
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        fetchWorkouts={fetchWorkouts}
      />
      ) : (
        <WoTrack2 
          user={user} 
          handleLogout={handleLogout}
          workouts={workouts}   
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default App;
