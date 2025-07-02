import React from 'react';
import '../styles/restaurants.css';

const RestaurantCard = ({ restaurant, onSelect }) => {
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      <button onClick={() => onSelect(restaurant)}>View Menu</button>
    </div>
  );
};

export default RestaurantCard;