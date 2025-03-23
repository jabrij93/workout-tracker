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
    }
  }, []);

  useEffect(() => {
    workoutService
      .getAll()
      .then((response) => {
        setWorkouts(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching workouts:', error);
      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
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
        handleSubmit={handleLogin}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
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
