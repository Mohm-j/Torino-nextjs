import Image from "next/image";
import styles from "./Contact-us.module.css";

const ContactUs = () => {
  return (
    <div className={styles.contactContainer}>
      <Image src="/icons/call.png" alt="contact-us banner" width={1158} height={251} className={styles.contactContainer__image} />
      <Image src="/icons/call-us-mobile.jpg" alt="contact-us banner" width={327} height={220} className={styles.contactContainer__mobile} />
    </div>
  );
};

export default ContactUs;
