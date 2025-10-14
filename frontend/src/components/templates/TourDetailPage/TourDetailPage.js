import {
  toFarsiNumber,
  toFarsiNumberWithSeparator,
  toJalaliDate,
  translateCityName,
  translateVehicleName,
} from "@/utils/helper";
import styles from "./TourDetailPage.module.css";
import { useRouter } from "next/router";
import { addToBasket } from "@/services/basket";
import { toast } from "react-toastify";
import { useAuth, useRequireAuth } from "@/hooks/useAuth";
import Image from "next/image";

const TourDetailPage = ({ tour }) => {
  const {
    id,
    image,
    title,
    options,
    price,
    origin,
    startDate,
    endDate,
    fleetVehicle,
    availableSeats,
    insurance,
  } = tour;

  const router = useRouter();
  const { data: user } = useAuth();
  const { ensureAuth } = useRequireAuth();

  const reserveHandler = async () => {
    await ensureAuth();

    if (!user) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      toast.info("برای رزرو باید ابتدا وارد حساب شوید");
      return;
    }

    try {
      await addToBasket(id);
      toast.success("تور با موفقیت به سبد خرید اضافه شد");
      router.push("/basket");
    } catch (error) {
      toast.error("خطا در رزرو تور. لطفاً دوباره تلاش کنید");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.right}>
          <Image src={image} alt={title} width={400} height={265} />
        </div>

        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          <p>
            {options[0]} • {options[1]}
          </p>

          <div className={styles.intro}>
            <div className={styles.introItem}>
              <Image
                src="/icons/user-tick.svg"
                alt="user icon"
                width={15}
                height={20}
              />
              <p> تورلیدر از مبدا</p>
            </div>
            <div className={styles.introItem}>
              <Image
                src="/icons/map.svg"
                alt="map icon"
                width={15}
                height={15}
              />
              <p>برنامه سفر </p>
            </div>
            <div className={styles.introItem}>
              <Image
                src="/icons/medal-star.svg"
                alt="medal icon"
                width={15}
                height={15}
              />
              <p>تضمین کیفیت</p>
            </div>
          </div>

          <div className={styles.priceBox}>
            <div className={styles.price}>
              <p>
                <span>{toFarsiNumberWithSeparator(price)}</span> تومان
              </p>
            </div>
            <button className={styles.reserveBtn} onClick={reserveHandler}>
              رزرو و خرید
            </button>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <div className={styles.infoTitle}>
            <Image
              src="/icons/routing-2.svg"
              alt="route icon"
              width={20}
              height={20}
            />
            <p className={styles.infoTitleHeader}>مبدا</p>
          </div>
          <p className={styles.infoSubTitle}>
            {translateCityName(origin.name)}
          </p>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoTitle}>
            <Image
              src="/icons/calendarTour.svg"
              alt="calendar icon"
              width={20}
              height={20}
            />
            <p className={styles.infoTitleHeader}>تاریخ رفت</p>
          </div>
          <p className={styles.infoSubTitle}>{toJalaliDate(startDate)}</p>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoTitle}>
            <Image
              src="/icons/calendarTour.svg"
              alt="calendar icon"
              width={20}
              height={20}
            />
            <p className={styles.infoTitleHeader}>تاریخ برگشت</p>
          </div>
          <p className={styles.infoSubTitle}>{toJalaliDate(endDate)}</p>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoTitle}>
            <Image
              src="/icons/bus-black.svg"
              alt="bus icon"
              width={20}
              height={20}
            />
            <p className={styles.infoTitleHeader}>حمل و نقل</p>
          </div>
          <p className={styles.infoSubTitle}>
            {translateVehicleName(fleetVehicle)}
          </p>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoTitle}>
            <Image
              src="/icons/profile-2user.svg"
              alt="profile icon"
              width={20}
              height={20}
            />
            <p className={styles.infoTitleHeader}>ظرفیت</p>
          </div>
          <p className={styles.infoSubTitle}>
            {toFarsiNumber(availableSeats)} نفر
          </p>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoTitle}>
            <Image
              src="/icons/security.svg"
              alt="security icon"
              width={20}
              height={20}
            />
            <p className={styles.infoTitleHeader}>بیمه</p>
          </div>
          <p className={styles.infoSubTitle}>
            {insurance ? "بیمه ۵۰ هزار دیناری" : "فاقد بیمه"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
