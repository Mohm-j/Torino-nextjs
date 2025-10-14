import Link from "next/link";
import styles from "./NotFoundPage.module.css";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className={styles.notfoundContainer}>
      <div className={styles.notfoundRight}>
        <h1>صفحه مورد نظر یافت نشد!</h1>
        <Link href="/" className={styles.backLink}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <Image src="/icons/Error TV.png" alt="404 logo" width={500} height={500} />
    </div>
  );
};

export default NotFoundPage;
