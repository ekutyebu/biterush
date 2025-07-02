import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from '../components/OrderForm';

const PlaceOrder = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
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
      }
    };

    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/restaurants/1/',
          { withCredentials: true }
        );
        setRestaurant(restaurantResponse.data);
        const menuResponse = await axios.get(
          'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/menu-items/?restaurant=1',
          { withCredentials: true }
        );
        setItems(menuResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };

    fetchCsrfToken();
    fetchData();
  }, []);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h1>Place Your Order</h1>
      <OrderForm restaurant={restaurant} items={items} csrfToken={csrfToken} />
    </div>
  );
};

export default PlaceOrder;