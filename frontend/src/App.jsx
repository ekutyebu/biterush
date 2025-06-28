import React from "react";
import Header from "./components/Header.jsx";
import Collections from "./components/Collections.jsx";
import Filters from "./components/Filters.jsx";
import styles from "./App.module.css";
import PromoBanner from "./components/PromoBanner";
import BestFoodSection from "./components/BestFoodSection";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Collections />
        <Filters />
        <PromoBanner />
        <BestFoodSection />
      </main>
    </div>
  );
}

export default App;
