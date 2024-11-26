// src/Login.jsx
import React, { useState } from 'react';
import './login.css';  // Assume you have styles in Login.css or move your CSS here
import loginService from '../src/services/login.js'
import workoutService from '../src/services/workouts.js'

const Login = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      workoutService.setToken(user.token)
      console.log("user33", user)
      setUser(user)
      setUsername('')
      setPassword('')
      setIsLoggedIn(true)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="login-container">
      <div className="left-container">
        <div className="image">
          {/* Ensure image tags are self-closing */}
          <img src="./laptopncoffeebymeghanmosser.jpg" alt="laptop and coffee" />
          <div className="caption">
            Photo by <span>Meghan Mosser</span> on <span>Unsplash</span>
          </div>
        </div>
        <div className="bg-image">
          <img src="./Jj-webdvlpr.png" alt="logo" />
        </div>
      </div>
  
      {/* Form element */}
      <form className="content-1" onSubmit={handleLogin}>
        <div className="first-content">
          {/* Use self-closing tags for <br /> and correct className */}
          <p className="content1">
            This is not a real online service! You know you need something <br />
            like this in your life to help you realize your deepest dreams. <br />
            Sign up <i id="now">now</i> to get started. <br />
          </p>
          <p className="content2">
            You <i id="know"> know </i> you want to.
          </p>
        </div>
        
        <div className="second-content">
          <h1>Let's do this!</h1>
          <ul className="required-user-info">
            <div className="input-box">
              USERNAME
              <input
                type="text"
                name="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                required
              />
              <span className="error-message">{errors.username}</span>
            </div>
            <div className="input-box">
              PASSWORD
              <input
                type="password"
                name="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
              <span className="error-message">{errors.password}</span>
            </div>
          </ul>
        </div>
  
        <div className="third-content">
          <div className="submit-button">
            <button type="submit">Submit</button>
            <p>Don't have an account? <span>Register</span></p>
          </div>
        </div>
      </form>
    </div>
  );  
};

export default Login;
