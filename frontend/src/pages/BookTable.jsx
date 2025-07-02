import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/forms.css';

const BookTable = () => {
  const [formData, setFormData] = useState({
    restaurant: '',
    date_time: '',
    party_size: 1,
  });
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

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

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/restaurants/',
          { withCredentials: true }
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error.response?.data || error.message);
        setMessage('Failed to fetch restaurants. Please try again.');
      }
    };

    fetchCsrfToken();
    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!csrfToken) {
      setMessage('CSRF token not available. Please refresh and try again.');
      return;
    }
    try {
      await axios.post(
        'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/bookings/',
        formData,
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Table booked successfully!');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error booking table. Please try again.');
      console.error('Booking error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="book-table-form">
      <h1>Book a Table</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.restaurant}
          onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={formData.date_time}
          onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Party Size"
          value={formData.party_size}
          onChange={(e) => setFormData({ ...formData, party_size: e.target.value })}
        />
        <button type="submit" disabled={!csrfToken}>Book Table</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default BookTable;