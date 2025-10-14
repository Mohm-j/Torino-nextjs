import TourCard from "@/components/modules/TourCard/TourCard";
import styles from "./ToursPage.module.css";

const ToursPage = ({ tours }) => {
  return (
    <div className={styles.listContainer}>
      <h1 className={styles.listHeader}>همه تورها</h1>
      <div className={styles.subListContainer}>
        {!tours?.length && (
          <h3 className={styles.subListContainer_text}>هیچ توری یافت نشد</h3>
        )}
        {tours.map((tour, index) => (
          <TourCard key={index} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default ToursPage;
