// src/Login.jsx
import React, { useState } from 'react';
import './login.css';  // Assume you have styles in Login.css or move your CSS here

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateField = (name, value) => {
    if (name === "username" && value.trim() === "") {
      return "Username is required.";
    }
    if (name === "password" && value.length < 4) {
      return "Password must be at least 4 characters.";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the field as the user types
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);

    // Check if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Form submitted:", formData);
    }

    // Authentication logic here (for now just mock login)
    setIsLoggedIn(true);
  };

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
      <form className="content-1" onSubmit={handleSubmit}>
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
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "error" : formData.username ? "success" : ""}
                required
              />
              <span className="error-message">{errors.username}</span>
            </div>
            <div className="input-box">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : formData.password ? "success" : ""}
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
