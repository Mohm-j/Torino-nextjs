import * as yup from "yup";

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل را به درستی وارد کنید!"),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
});

export const passengerSchema = yup.object().shape({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalId: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  birthDate: yup
    .date()
    .required("تاریخ تولد الزامی است")
    .typeError("تاریخ تولد معتبر نیست"),
  gender: yup.string().required("انتخاب جنسیت الزامی است"),
});

// Dashboard

export const profileAccountSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .notRequired()
    .test("is-valid-email", "ایمیل معتبر نیست", (value) => {
      if (!value) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }),
});

export const profilePersonalSchema = yup.object().shape({
  firstName: yup.string().nullable().notRequired(),
  lastName: yup.string().nullable().notRequired(),
  nationalCode: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-nationalCode",
      "کد ملی باید ۱۰ رقم باشد",
      (value) => !value || /^\d{10}$/.test(value)
    ),
  birthDate: yup.string().nullable().notRequired(),
  gender: yup.string().nullable().notRequired(),
});

export const profileBankSchema = yup.object().shape({
  debitCard_code: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-card",
      "شماره کارت باید ۱۶ رقم باشد",
      (value) => !value || /^\d{16}$/.test(value)
    ),
  shaba_code: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-shaba",
      "شماره شبا باید با IR شروع شده و ۲۶ کاراکتر باشد",
      (value) => !value || /^IR\d{24}$/.test(value)
    ),
  accountIdentifier: yup.string().nullable().notRequired(),
});
