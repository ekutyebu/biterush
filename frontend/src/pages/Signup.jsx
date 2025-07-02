import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/signup/', { username, password });
      setMessage('Signup successful!');
    } catch (error) {
      setMessage('Signup failed');
      console.error(error);
    }
  };

  return (
    <div className="signup-form">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Signup;