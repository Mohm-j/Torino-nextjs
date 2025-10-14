import Image from "next/image";
import styles from "./Introduction.module.css";

const Introduction = () => {
  return (
    <>
      <div className={styles.line}></div>
      <div className={styles.introContainer}>
        <div className={styles.introSubContainer}>
          <div className={styles.introLogo}>
            <Image
              src="/icons/Group 16.png"
              alt="percent logo"
              width={90}
              height={90}
              className={styles.logo}
            />
          </div>
          <div className={styles.introText}>
            <h2 className={styles.introText__title}>بصرفه ترین قیمت</h2>
            <p className={styles.introText__subtitle}>
              بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
            </p>
          </div>
        </div>
        <div className={styles.introSubContainer}>
          <div className={styles.introLogo}>
            <Image
              src="/icons/Group 17.png"
              alt="percent logo"
              width={90}
              height={90}
              className={styles.logo}
            />
          </div>
          <div className={styles.introText}>
            <h2 className={styles.introText__title}>پشتیبانی</h2>
            <p className={styles.introText__subtitle}>
              پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.
            </p>
          </div>
        </div>
        <div className={styles.introSubContainer}>
          <div className={styles.introLogo}>
            <Image
              src="/icons/Group 18.png"
              alt="percent logo"
              width={90}
              height={90}
              className={styles.logo}
            />
          </div>
          <div className={styles.introText}>
            <h2 className={styles.introText__title}>رضایت کاربران</h2>
            <p className={styles.introText__subtitle}>
              رضایت بیش از ۱۰ هزار کاربر از تور های ما.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
