import Image from "next/image";
import Slideshow from "../../common/SlideShow/SlideShow";
import styles from "./About-us.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutRight}>
        <div className={styles.aboutRight__header}>
          <Image
            src="/icons/question.png"
            alt="question logo"
            width={38}
            height={40}
          />
          <h1>
            چرا<span> تورینو </span>؟
          </h1>
        </div>
        <h2 className={styles.aboutRightTitle}>تور طبیعت گردی و تاریخی </h2>
        <p className={styles.aboutRightText}>
          اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
          طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
          طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
          آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی
          را خریداری کنید.
        </p>
      </div>
      <div className={styles.aboutLeft}>
        <Slideshow />
      </div>
    </div>
  );
};

export default AboutUs;
