import SearchBar from "@/components/modules/SearchBar/SearchBar";
import styles from "./Hero.module.css";
import Image from "next/image";

const Hero = ({ onSearch, tours }) => {
  return (
    <div className={styles.heroContainer}>
      <Image
        src="/icons/header.png"
        alt="header image"
        width={1440}
        height={350}
        priority 
        className={styles.heroContainer__image}
      />
      <h1 className={styles.heroHeader}>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h1>
      <SearchBar onSearch={onSearch} tours={tours} />
    </div>
  );
};

export default Hero;
