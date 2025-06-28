import React from "react";
import styles from "./CollectionCard.module.css";

function CollectionCard({ title, count, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>{count} Places</div>
      </div>
    </div>
  );
}

export default CollectionCard;
