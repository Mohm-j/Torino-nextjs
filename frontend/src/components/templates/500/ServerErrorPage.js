import Image from "next/image";
import styles from "../500/ServerErrorPage.module.css";

const ServerErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorRight}>
        <h1>اتصال با سرور برقرار نیست!</h1>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
      <Image
        src="/icons/Error Lamp Robot.png"
        alt="Server Error logo"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ServerErrorPage;
