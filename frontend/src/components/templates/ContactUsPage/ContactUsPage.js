import styles from "./ContactUsPage.module.css";

const ContactUsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>تماس با ما</h1>
        <p>
          <span className={styles.boldText}>تورینو</span> همراه و در کنار شماست
          تا شما با خیالی راحت تور مسافرتی خود را تهیه کنید. ما از سال ۱۳۸۹ در
          زمینه خدمت رسانی به مسافران و آژانس‌ های مسافرتی به عنوان{" "}
          <span className={styles.boldText}>&quot;قدیمی ترین&quot;</span>و{" "}
          <span className={styles.boldText}>&quot;مطمئن ترین&quot;</span> مرجع
          سفر در حال خدمات رسانی هستیم.
        </p>
        <p>
          در تورینو آژانسهای مسافرتی معتبر، خوشنام و دارای تمامی مجوزهای لازم
          گرد هم آمده اند تا تجربه ای بی نظیر برای شما فراهم شود. شما میتوانید
          تورهای خود را به صورت <span className={styles.boldText}>تلفنی</span> و{" "}
          <span className={styles.boldText}>حضوری</span> و یا{" "}
          <span className={styles.boldText}>آنلاین</span> از آژانس های فعال در
          تورینو فراهم کنید.
        </p>
        <p>
          اگر هر گونه سوالی دارید و اگر نیاز به مشورت دارید تلفن زیر در خدمت
          شماست تا با کارشناسان تورینو تماس برقرار کنید:
        </p>
      </div>
      <div className={styles.phone}>
        <div className={styles.phoneRight}>
          <h2>ویژه مسافران و کاربران</h2>
          <p>ساعت کاری: از شنبه تا پنجشنبه 9 تا 18 و جمعه‌ها تعطیل</p>
          <h2>۰۲۱-۹۹۸۸۷۷۶۶</h2>
        </div>
        <div className={styles.phoneLeft}>
          <h2>ویژه کسب و کارهای گردشگری و آژانس‌های همکار</h2>
          <p>
            ساعت کاری: از شنبه تا چهارشنبه 9 تا 18 و پنجشنبه و جمعه‌ها تعطیل
          </p>
          <h2>info@gmail.com</h2>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
