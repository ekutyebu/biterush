import React from 'react';
import '../styles/restaurants.css';

const MenuItems = ({ items, onAddToOrder }) => {
  return (
    <div className="menu-items">
      {items.map(item => (
        <div key={item.id} className="menu-item">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>${item.price}</p>
          <button onClick={() => onAddToOrder(item)}>Add to Order</button>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;