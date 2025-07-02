import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/forms.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/get-csrf-token/',
          { withCredentials: true }
        );
        setCsrfToken(response.data.csrfToken);
        console.log('CSRF token fetched:', response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error.response?.data || error.message);
        setMessage('Failed to fetch CSRF token. Please refresh and try again.');
      }
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!csrfToken) {
      setMessage('CSRF token not available. Please refresh and try again.');
      return;
    }
    try {
      const response = await axios.post(
        'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/login/',
        { username, password, next: from },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.status);
      console.log('Login response:', response.data);
      navigate(from, { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed. Please try again.');
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
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
        <button type="submit" disabled={!csrfToken}>Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;