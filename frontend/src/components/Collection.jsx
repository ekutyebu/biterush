import React from "react";
import CollectionCard from "./CollectionCard";
import styles from "./Collections.module.css";
import trendingImg from "../assets/trending.jpg";
import rooftopImg from "../assets/rooftop.jpg";
import instaImg from "../assets/insta.jpg";
import cafesImg from "../assets/cafes.jpg";

const collections = [
  {
    title: "Top Trending Spots",
    count: 31,
    image: trendingImg,
  },
  {
    title: "Best Rooftop Places",
    count: 26,
    image: rooftopImg,
  },
  {
    title: "Insta-worthy Spots",
    count: 26,
    image: instaImg,
  },
  {
    title: "Must Visit Cafes",
    count: 17,
    image: cafesImg,
  },
];

function Collections() {
  return (
    <section className={styles.collections}>
      <h2>Collections</h2>
      <p>
        Explore curated lists of top restaurants, cafes, pubs, and bars in Kolkata, based on trends
      </p>
      <div className={styles.cards}>
        {collections.map((col, idx) => (
          <CollectionCard key={idx} {...col} />
        ))}
      </div>
    </section>
  );
}

export default Collections;
