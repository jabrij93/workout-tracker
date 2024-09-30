// src/Login.jsx
import React, { useState } from 'react';
import '../src/login.css';  // Assume you have styles in Login.css or move your CSS here

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple validation (you can improve this)
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Authentication logic here (for now just mock login)
    setIsLoggedIn(true);
  };

  return (
    <div className="login-container">
      <div className="left-container">
        <div className="image">
          <img src="./laptopncoffeebymeghanmosser.jpg" alt="laptop and coffee" />
          <div className="caption">Photo by <span>Meghan Mosser</span> on <span>Unsplash</span></div>
        </div>
        <div className="bg-image">
          <img src="./Jj-webdvlpr.png" alt="logo" />
        </div>
      </div>

      <form className="content-1" onSubmit={handleSubmit}>
        <div className="second-content">
          <h1>Let's do this!</h1>
          <ul className="required-user-info">
            <li className="input-box">
              <label htmlFor="first-name">FIRST NAME</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-box">
              <label htmlFor="last-name">LAST NAME</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-box">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-box">
              <label htmlFor="phone-number">PHONE NUMBER</label>
              <input
                type="text"
                id="phone-number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-box">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-box">
              <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </li>
          </ul>
        </div>

        <div className="third-content">
          <div className="submit-button">
            <button type="submit">Create Account</button>
            <p>Already have an account? <span>Log in</span></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
