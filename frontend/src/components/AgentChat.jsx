import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import RestaurantCard from './RestaurantCard';
import '../styles/agent-chat.css';

const AgentChat = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleSearch = (results) => {
    setRestaurants(results);
    setSelectedRestaurant(null);
  };

  const handleSelectRestaurant = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    // Mock menu items (replace with API call later)
    setMenuItems([
      { id: 1, name: 'Margherita Pizza', description: 'Classic pizza', price: 10.99 },
      { id: 2, name: 'Pasta', description: 'Creamy pasta', price: 12.99 },
    ]);
  };

  return (
    <div className="agent-chat">
      <SearchBar onSearch={handleSearch} />
      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} onSelect={handleSelectRestaurant} />
        ))}
      </div>
      {selectedRestaurant && (
        <div className="menu-section">
          <h2>Menu for {selectedRestaurant.name}</h2>
          <MenuItems items={menuItems} onAddToOrder={(item) => console.log('Add:', item)} />
        </div>
      )}
    </div>
  );
};

export default AgentChat;