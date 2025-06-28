import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>zomato</div>
      <div className={styles.locationSearch}>
        <input className={styles.location} value="Kolkata" readOnly />
        <input
          className={styles.search}
          placeholder="Search for restaurant, cuisine or a dish"
        />
      </div>
      <div className={styles.authButtons}>
        <button>Log in</button>
        <button>Sign up</button>
      </div>
    </header>
  );
}

export default Header;
