import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';

const OrderForm = ({ restaurant, items, csrfToken }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://8000-firebase-biterush-1751358706245.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api/orders/',
        {
          restaurant: restaurant.id,
          items: selectedItems,
          total_price: selectedItems.reduce((total, itemId) => {
            const item = items.find((i) => i.id === itemId);
            return total + (item ? item.price : 0);
          }, 0),
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      setMessage('Order placed successfully!');
    } catch (error) {
      setMessage('Error placing order');
      console.error('Order error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="order-form">
      <h2>Order from {restaurant.name}</h2>
      <form onSubmit={handleSubmit}>
        {items.map((item) => (
          <div key={item.id} className="order-item">
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleItemSelect(item.id)}
              />
              {item.name} - ${item.price}
            </label>
          </div>
        ))}
        <button type="submit" disabled={!csrfToken}>Place Order</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default OrderForm;