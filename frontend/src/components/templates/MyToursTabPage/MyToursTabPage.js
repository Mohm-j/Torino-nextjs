import {
  toFarsiNumberWithSeparator,
  toJalaliDate,
  translateCityName,
  translateVehicleName,
} from "@/utils/helper";
import styles from "./MyToursTabPage.module.css";
import { useUserTours } from "@/hooks/useUser";
import Image from "next/image";
import Loader from "@/components/common/Loader/Loader";
import { getVehicleIcon } from "@/utils/vehicleIcon";

const MyToursTab = () => {
  const { data: tours, isLoading, isError } = useUserTours();

  const getTourStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return { label: "رزرو شده", type: "reserved" };
    if (now >= start && now <= end)
      return { label: "در حال برگزاری", type: "running" };
    if (now > end) return { label: "به اتمام رسیده", type: "done" };
  };

  if (isLoading) return <Loader />;

  if (isError)
    return <p className={styles.error}>خطا در دریافت اطلاعات تورها.</p>;

  if (!tours?.length)
    return <p className={styles.empty}>شما هنوز توری رزرو نکرده‌اید.</p>;

  return (
    <div className={styles.MyTourContainer}>
      <div className={styles.list}>
        {tours.map((tour, index) => {
          const status = getTourStatus(tour.startDate, tour.endDate);

          return (
            <div key={index} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.subHeader}>
                  <Image
                    src="/icons/sun-fog.svg"
                    alt="sun icon"
                    width={25}
                    height={25}
                  />
                  <p>{tour.title}</p>
                </div>
                <div className={styles.subHeader}>
                  <span className={styles.transportIcon}>
                    {getVehicleIcon(tour.fleetVehicle) && (
                      <Image
                        src={getVehicleIcon(tour.fleetVehicle)}
                        alt={`${tour.fleetVehicle} icon`}
                        width={25}
                        height={25}
                        className={styles.icon}
                      />
                    )}
                  </span>
                  <p> سفر با {translateVehicleName(tour.fleetVehicle)} </p>
                </div>
                <div className={styles.subHeader}>
                  <span className={`${styles.status} ${styles[status.type]}`}>
                    {status.label}
                  </span>
                </div>
              </div>
              <div className={styles.main}>
                <div className={styles.subMain}>
                  <h3>
                    {translateCityName(tour.origin.name)} {" به "}
                    {translateCityName(tour.destination.name)}
                  </h3>
                  {"•"}
                  <span>{toJalaliDate(tour.startDate)}</span>
                </div>
                <div className={styles.subMain}>
                  <h3>تاریخ برگشت </h3>
                  {"•"}
                  <span>{toJalaliDate(tour.endDate)}</span>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.subFooter}>
                  <span>شماره تور </span>
                  <p className={styles.subFooter_text}>{tour.id.slice(0, 6)}</p>
                </div>
                <div className={styles.subFooter}>
                  <span>مبلغ پرداخت شده</span>
                  <p className={styles.subFooter_text}>
                    {toFarsiNumberWithSeparator(tour.price)} تومان
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyToursTab;
