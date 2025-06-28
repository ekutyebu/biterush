import React from "react";
import RestaurantCard from "./RestaurantCard";
import "./BestFoodSection.css"; // Add styles as shown below

const restaurants = [
  {
    name: "Tall Tales",
    cuisine: "Modern Indian, Continental",
    price: "₹2,500 for two",
    area: "Camac Street Area, Kolkata",
    opens: "Opens tomorrow at 12:15pm",
    distance: "3.4 km",
    rating: "4.1",
    offer: "Flat 15% OFF",
    promoted: true,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Darlings",
    cuisine: "Chinese, North Indian",
    price: "₹2,500 for two",
    area: "Camac Street Area, Kolkata",
    opens: "",
    distance: "3.1 km",
    rating: "4.3",
    offer: "",
    promoted: true,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "OG by the Lake",
    cuisine: "North Indian, Chinese, Italian",
    price: "₹1,200 for two",
    area: "Topsia, Kolkata",
    opens: "Closes in 43 minutes",
    distance: "4.8 km",
    rating: "4.1",
    offer: "",
    promoted: true,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80"
  }
];

function BestFoodSection() {
  return (
    <section className="best-food-section">
      <h2>Best Food in Kolkata</h2>
      <div className="restaurant-cards">
        {restaurants.map((rest, idx) => (
          <RestaurantCard key={idx} {...rest} />
        ))}
      </div>
    </section>
  );
}

export default BestFoodSection;
