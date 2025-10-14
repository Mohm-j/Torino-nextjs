import { useState } from "react";
import ContactUs from "@/components/modules/Contact-us/Contact-us";
import styles from "./HomePage.module.css";

import Hero from "@/components/modules/Hero/Hero";
import TourList from "@/components/modules/TourList/TourList";
import AboutUs from "@/components/modules/About-us/About-us";
import Introduction from "@/components/modules/Introduction/Introduction";

const HomePage = ({ tours }) => {
  const [filteredTours, setFilteredTours] = useState(tours);

  return (
    <div className={styles.homeContainer}>
      <Hero onSearch={setFilteredTours} tours={tours} />
      <TourList tours={filteredTours} />
      <ContactUs />
      <AboutUs />
      <Introduction />
    </div>
  );
};

export default HomePage;
