import { useState, useEffect, useRef } from 'react';
import Login from '../components/Login.jsx';
import WoTrack2 from '../components/WoTrack2.jsx';
import Notification from '../components/Notification.jsx';
import loginService from './services/login.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <div>
      <h1>Workout Tracker</h1>
      <Notification message={errorMessage} />
      {!user ? (
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
        <WoTrack2 user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
