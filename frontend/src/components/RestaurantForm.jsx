import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';

const RestaurantForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [locationData, setLocationData] = useState({ address: '', city: '', country: '' });
  const [serviceData, setServiceData] = useState({ service_type: '', details: '' });
  const [menuData, setMenuData] = useState({ name: '', description: '', price: '', category: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const restaurantResponse = await axios.post('http://localhost:8000/api/restaurants/create/', formData);
      const restaurantId = restaurantResponse.data.id;
      await axios.post('http://localhost:8000/api/locations/create/', { ...locationData, restaurant: restaurantId });
      await axios.post('http://localhost:8000/api/services/create/', { ...serviceData, restaurant: restaurantId });
      await axios.post('http://localhost:8000/api/menu-items/create/', { ...menuData, restaurant: restaurantId });
      setMessage('Restaurant created successfully!');
    } catch (error) {
      setMessage('Error creating restaurant');
      console.error(error);
    }
  };

  return (
    <div className="restaurant-form">
      <h2>Create Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <h3>Restaurant Details</h3>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <h3>Location</h3>
        <input
          type="text"
          placeholder="Address"
          value={locationData.address}
          onChange={(e) => setLocationData({ ...locationData, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={locationData.city}
          onChange={(e) => setLocationData({ ...locationData, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={locationData.country}
          onChange={(e) => setLocationData({ ...locationData, country: e.target.value })}
        />
        <h3>Service</h3>
        <input
          type="text"
          placeholder="Service Type (e.g., Delivery)"
          value={serviceData.service_type}
          onChange={(e) => setServiceData({ ...serviceData, service_type: e.target.value })}
        />
        <textarea
          placeholder="Service Details"
          value={serviceData.details}
          onChange={(e) => setServiceData({ ...serviceData, details: e.target.value })}
        ></textarea>
        <h3>Menu Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={menuData.name}
          onChange={(e) => setMenuData({ ...menuData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={menuData.price}
          onChange={(e) => setMenuData({ ...menuData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={menuData.category}
          onChange={(e) => setMenuData({ ...menuData, category: e.target.value })}
        />
        <button type="submit">Create Restaurant</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default RestaurantForm;