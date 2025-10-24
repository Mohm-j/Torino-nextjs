import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passengerSchema } from "@/validation/validationSchemas";
import { getBasket } from "@/services/basket";
import { toFarsiNumberWithSeparator } from "@/utils/helper";
import styles from "./BasketPage.module.css";
import { useRouter } from "next/router";
import { createOrder } from "@/services/order";
import { toast } from "react-toastify";
import { DatePicker } from "zaman";
import Image from "next/image";
import Loader from "@/components/common/Loader/Loader";

const BasketPage = () => {
  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(passengerSchema),
  });

  const birthDate = watch("birthDate");

  useEffect(() => {
    if (birthDate) setSelectedDate(new Date(birthDate));
  }, [birthDate]);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const data = await getBasket();
        setBasket(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "خطا در بارگذاری سبد خرید"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBasket();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createOrder({
        nationalCode: data.nationalId,
        fullName: data.fullName,
        gender: data.gender,
        birthDate: data.birthDate,
      });
      toast.success("سفارش با موفقیت ثبت شد");
      reset();
         router.push("/").then(() => {
        if (process.env.NODE_ENV === "development") {
          router.reload();
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ثبت سفارش، لطفاً دوباره تلاش کنید");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.basketContainer}>
      <div className={styles.basketForm}>
        <form
          id="passengerForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.passengerForm}
        >
          <h3>
            <Image
              src="/icons/profileBlack.svg"
              alt="user icon"
              width={25}
              height={25}
            />
            مشخصات مسافر
          </h3>

          <div className={styles.formGrid}>
            <div>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className={styles.error}>{errors.fullName.message}</span>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="کدملی"
                {...register("nationalId")}
              />
              {errors.nationalId && (
                <span className={styles.error}>
                  {errors.nationalId.message}
                </span>
              )}
            </div>

            <div className={styles.datePickerWrapper}>
              <DatePicker
                round="x2"
                accentColor="#28A745"
                position="center"
                value={selectedDate}
                onChange={(dateObj) => {
                  const value = dateObj?.value ?? null;
                  setSelectedDate(value);
                  setValue("birthDate", value, { shouldValidate: true });
                }}
              />

              {!selectedDate && (
                <span className={styles.placeholder}>تاریخ تولد</span>
              )}

              {errors.birthDate && (
                <span className={styles.error}>{errors.birthDate.message}</span>
              )}
            </div>

            <div>
              <select {...register("gender")}>
                <option value="">جنسیت</option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors.gender && (
                <span className={styles.error}>{errors.gender.message}</span>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className={styles.basketSummary}>
        <div className={styles.title}>
          <h3> {basket?.title}</h3>
          <p className={styles.basketDuration}>
            {basket?.options[0]} • {basket?.options[1]}
          </p>
        </div>
        <hr className={styles.separator} />
        <div className={styles.price}>
          <p className={styles.finalPriceLabel}>قیمت نهایی</p>
          <p className={styles.finalPrice}>
            <span>{toFarsiNumberWithSeparator(basket?.price)}</span> تومان
          </p>
        </div>
        <button type="submit" form="passengerForm" className={styles.submitBtn}>
          ثبت و خرید نهایی
        </button>
      </div>
    </div>
  );
};

export default BasketPage;
