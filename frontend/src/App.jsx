import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Restaurants from './pages/Restaurants';
import CreateRestaurant from './pages/CreateRestaurant';
import PlaceOrder from './pages/PlaceOrder';
import BookTable from './pages/BookTable';
import UserProfile from './pages/UserProfile';
import './styles/main.css';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/user-profile/', {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.error('ProtectedRoute auth check failed:', error.response?.data || error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null; // Avoid rendering until auth check completes
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: window.location.pathname }} />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/create-restaurant" element={<ProtectedRoute><CreateRestaurant /></ProtectedRoute>} />
          <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route path="/book-table" element={<ProtectedRoute><BookTable /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;