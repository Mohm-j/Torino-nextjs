import Link from "next/link";
import TourCard from "../TourCard/TourCard";
import styles from "./TourList.module.css";

const TourList = ({ tours }) => {
  return (
    <div className={styles.listContainer}>
      <h1 className={styles.listHeader}>همه تور ها</h1>
      <div className={styles.subListContainer}>
        {!tours.length ? (
          <div className={styles.emptyMessage}>هیچ توری یافت نشد</div>
        ) : (
          tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        )}
      </div>
      <div className={styles.btnContainer}>
        <Link href="/tours" className={styles.btn}>
          موارد بیشتر
        </Link>
      </div>
    </div>
  );
};

export default TourList;
