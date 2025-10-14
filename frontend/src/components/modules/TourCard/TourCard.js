import Link from "next/link";
import styles from "./TourCard.module.css";
import { toFarsiNumberWithSeparator } from "@/utils/helper";
import Image from "next/image";

const TourCard = ({ tour }) => {
  const { id, title, options, image, price } = tour;
  return (
    <div className={styles.cardContainer}>
      <Image
        src={image}
        alt={title}
        width={300}
        height={150}
        className={styles.cardContainer__image}
      />
      <div className={styles.cardText}>
        <h1>{title}</h1>
        <h3>
          {options[0]} • {options[1]}
        </h3>
      </div>
      <div className={styles.cardPrice}>
        <Link href={`/tours/${id}`}>رزرو</Link>
        <p>
          <span className={styles.price}>
            {toFarsiNumberWithSeparator(price)}
          </span>{" "}
          تومان
        </p>
      </div>
    </div>
  );
};

export default TourCard;
