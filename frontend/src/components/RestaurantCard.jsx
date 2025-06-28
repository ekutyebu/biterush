import React from "react";

function RestaurantCard({
  name, cuisine, price, area, opens, distance, rating, offer, promoted, image
}) {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image-wrapper">
        <img src={image} alt={name} className="restaurant-image" />
        {promoted && <span className="promoted-badge">Promoted</span>}
        {offer && <span className="offer-badge">{offer}</span>}
      </div>
      <div className="restaurant-info">
        <div className="restaurant-header">
          <span className="restaurant-name">{name}</span>
          <span className="restaurant-rating">{rating}</span>
        </div>
        <div className="restaurant-cuisine">{cuisine}</div>
        <div className="restaurant-details">
          <span>{price}</span>
          <span>• {area}</span>
        </div>
        <div className="restaurant-meta">
          <span className={opens && opens.toLowerCase().includes("closes") ? "closing-soon" : ""}>{opens}</span>
          <span>{distance}</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
