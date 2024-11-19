import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate on successful login
import './Welcome.css';
import LeftImage from './mainlogo.png'; 

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the username and password to the backend for authentication
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        // If login is successful, redirect to the home page
        navigate('/home');
      } else {
        // If login fails, show an error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="welcome-container">
      {/* Left Side with Image */}
      <div className="left-pane">
        <img src={LeftImage} alt="Welcome" className="left-image" />
      </div>

      {/* Right Side with Sign In Form */}
      <div className="right-pane">
        <h1>Welcome to My React App</h1>
        <p>Sign in to continue your journey!</p>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
