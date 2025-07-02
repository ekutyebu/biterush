import React, { useState } from 'react';
import axios from 'axios';
import '../styles/table-booking.css';

const TableBooking = ({ restaurant }) => {
  const [formData, setFormData] = useState({
    booking_time: '',
    party_size: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/book-table/', {
        restaurant: restaurant.id,
        booking_time: formData.booking_time,
        party_size: parseInt(formData.party_size),
      }, { withCredentials: true });
      setMessage('Table booked successfully!');
    } catch (error) {
      setMessage('Error booking table');
      console.error(error);
    }
  };

  return (
    <div className="table-booking">
      <h2>Book a Table at {restaurant.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={formData.booking_time}
          onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Party Size"
          value={formData.party_size}
          onChange={(e) => setFormData({ ...formData, party_size: e.target.value })}
          min="1"
          required
        />
        <button type="submit">Book Table</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default TableBooking;