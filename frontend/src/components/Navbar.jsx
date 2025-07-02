import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

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
      }
    };

    const checkAuth = async () => {
      try {
        console.log('Checking cookies:', document.cookie);
        const response = await axios.get(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/user-profile/',
          { withCredentials: true }
        );
        console.log('Auth check response:', response.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          setIsAuthenticated(false);
          console.log('Unauthenticated, expected for logged-out user');
        } else {
          console.error('Auth check failed:', error.response?.data || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCsrfToken();
    checkAuth();
  }, []);

  const handleLogout = async () => {
    if (!csrfToken) {
      console.error('CSRF token not available for logout');
      navigate('/');
      return;
    }
    try {
      await axios.post(
        'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/logout/',
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsAuthenticated(false);
      console.log('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      navigate('/');
    }
  };

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">Food App</div>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/restaurants" onClick={() => setIsOpen(false)}>Restaurants</Link></li>
        <li><Link to="/create-restaurant" onClick={() => setIsOpen(false)}>Create Restaurant</Link></li>
        <li><Link to="/place-order" onClick={() => setIsOpen(false)}>Place Order</Link></li>
        <li><Link to="/book-table" onClick={() => setIsOpen(false)}>Book Table</Link></li>
        <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        {isAuthenticated ? (
          <li><button onClick={handleLogout} disabled={!csrfToken}>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;