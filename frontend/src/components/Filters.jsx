import React from "react";
import styles from "./Filters.module.css";

const filters = [
  "Filters",
  "Offers",
  "Rating: 4.5+",
  "Pet friendly",
  "Outdoor seating",
  "Serves Alcohol",
  "Open Now",
];

function Filters() {
  return (
    <div className={styles.filters}>
      {filters.map((filter, idx) => (
        <button key={idx} className={styles.filterBtn}>
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Filters;
