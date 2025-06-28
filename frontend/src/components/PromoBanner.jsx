import React from "react";
const bannerImg = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

function PromoBanner() {
  return (
    <div className="promo-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="promo-overlay">
        <h2>Get up to <span>50% OFF</span></h2>
        <p>on your dining bills with Zomato</p>
        <button className="promo-btn">Check out all the restaurants</button>
      </div>
    </div>
  );
}

export default PromoBanner;
