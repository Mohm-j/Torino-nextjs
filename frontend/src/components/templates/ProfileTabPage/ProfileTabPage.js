import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  profileAccountSchema,
  profilePersonalSchema,
  profileBankSchema,
} from "../../../validation/validationSchemas";

import styles from "./ProfileTabPage.module.css";
import { toFarsiNumber, toJalaliDate } from "@/utils/helper";
import { DatePicker } from "zaman";
import { useUpdateUserProfile, useUserProfile } from "@/hooks/useUser";
import Image from "next/image";
import Loader from "@/components/common/Loader/Loader";

const ProfileTabPage = () => {
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);

  const { data: user, isLoading } = useUserProfile();
  const { mutate: updateUserProfile } = useUpdateUserProfile();
  const [editSection, setEditSection] = useState(null);

  const accountForm = useForm({
    resolver: yupResolver(profileAccountSchema),
    defaultValues: { email: "" },
  });

  const personalForm = useForm({
    resolver: yupResolver(profilePersonalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: "",
      gender: "",
    },
  });

  const bankForm = useForm({
    resolver: yupResolver(profileBankSchema),
    defaultValues: {
      debitCard_code: "",
      shaba_code: "",
      accountIdentifier: "",
    },
  });

  useEffect(() => {
    if (user) {
      accountForm.reset({
        email: user.email || "",
      });
      personalForm.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        nationalCode: user.nationalCode || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
      });
      bankForm.reset({
        debitCard_code: user.payment?.debitCard_code || "",
        shaba_code: user.payment?.shaba_code || "",
        accountIdentifier: user.payment?.accountIdentifier || "",
      });
      if (user.birthDate) {
        setSelectedBirthDate(new Date(user.birthDate));
      }
    }
  }, [user]);

  if (isLoading) return <Loader />;

  const handleAccountSave = (data) => {
    updateUserProfile(data, {
      onSuccess: () => setEditSection(null),
    });
  };

  const handlePersonalSave = (data) => {
    updateUserProfile(data, {
      onSuccess: () => setEditSection(null),
    });
  };

  const handleBankSave = (data) => {
    updateUserProfile(
      { payment: { ...data } },
      { onSuccess: () => setEditSection(null) }
    );
  };

  return (
    <div className={styles.profileContainer}>
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>اطلاعات حساب کاربری</h3>
          {editSection !== "account" && (
            <button
              onClick={() => setEditSection("account")}
              className={styles.editBtn}
            >
              <Image
                src="/icons/edit.svg"
                alt="edit icon"
                width={13}
                height={13}
              />{" "}
              ویرایش اطلاعات
            </button>
          )}
        </div>

        <div className={styles.infoGrid}>
          <div>
            <span>شماره همراه</span>
            <p>{toFarsiNumber(user?.mobile)}</p>
          </div>

          <div>
            <span>ایمیل</span>
            {editSection === "account" ? (
              <input
                type="email"
                {...accountForm.register("email")}
                defaultValue={user?.email || ""}
                className={styles.editableInput}
              />
            ) : (
              <p>{user?.email || "-"}</p>
            )}
          </div>
        </div>

        {editSection === "account" && (
          <div className={styles.actions}>
            <button
              type="button"
              onClick={accountForm.handleSubmit(handleAccountSave)}
              className={styles.saveBtn}
            >
              تایید
            </button>
            <button
              type="button"
              onClick={() => setEditSection(null)}
              className={styles.cancelBtn}
            >
              انصراف
            </button>
          </div>
        )}
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>اطلاعات شخصی</h3>
          {editSection !== "personal" && (
            <button
              onClick={() => setEditSection("personal")}
              className={styles.editBtn}
            >
              <Image
                src="/icons/edit.svg"
                alt="edit icon"
                width={13}
                height={13}
              />
              ویرایش اطلاعات
            </button>
          )}
        </div>

        {editSection === "personal" ? (
          <form
            onSubmit={personalForm.handleSubmit(handlePersonalSave)}
            className={styles.form}
          >
            <div className={styles.formGrid}>
              <div>
                <input
                  placeholder="نام"
                  {...personalForm.register("firstName")}
                  defaultValue={user?.firstName || ""}
                />
                <p className={styles.error}>
                  {personalForm.formState.errors.firstName?.message}
                </p>
              </div>
              <div>
                <input
                  placeholder="نام خانوادگی"
                  {...personalForm.register("lastName")}
                  defaultValue={user?.lastName || ""}
                />
                <p className={styles.error}>
                  {personalForm.formState.errors.lastName?.message}
                </p>
              </div>
              <div>
                <input
                  placeholder="کد ملی"
                  {...personalForm.register("nationalCode")}
                  defaultValue={user?.nationalCode || ""}
                />
                <p className={styles.error}>
                  {personalForm.formState.errors.nationalCode?.message}
                </p>
              </div>
              <div className={styles.dateInputWrapper}>
                <DatePicker
                  round="x2"
                  accentColor="#28A745"
                  value={selectedBirthDate}
                  position="left"
                  onChange={(dateObj) => {
                    const value = dateObj?.value ?? null;
                    setSelectedBirthDate(value);
                    personalForm.setValue("birthDate", value, {
                      shouldValidate: true,
                    });
                  }}
                />

                {!selectedBirthDate && (
                  <span className={styles.placeholder}>تاریخ</span>
                )}
                <p className={styles.error}>
                  {personalForm.formState.errors.birthDate?.message}
                </p>
              </div>

              <div className={styles.gender}>
                <select
                  {...personalForm.register("gender")}
                  defaultValue={user?.gender || ""}
                >
                  <option value="">جنسیت</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
                <p className={styles.error}>
                  {personalForm.formState.errors.gender?.message}
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.saveBtn}>
                ذخیره
              </button>
              <button
                type="button"
                onClick={() => setEditSection(null)}
                className={styles.cancelBtn}
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.infoGrid}>
            <div>
              <span>نام</span>
              <p>{user?.firstName || "-"}</p>
            </div>
            <div>
              <span>نام خانوادگی</span>
              <p>{user?.lastName || "-"}</p>
            </div>
            <div>
              <span>کد ملی</span>
              <p>{user?.nationalCode || "-"}</p>
            </div>
            <div>
              <span>تاریخ تولد</span>
              <p>{user?.birthDate ? toJalaliDate(user.birthDate) : "-"}</p>
            </div>
            <div>
              <span>جنسیت</span>
              <p>
                {user?.gender ? (user.gender === "male" ? "مرد" : "زن") : "-"}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>اطلاعات حساب بانکی</h3>
          {editSection !== "bank" && (
            <button
              onClick={() => setEditSection("bank")}
              className={styles.editBtn}
            >
              <Image
                src="/icons/edit.svg"
                alt="edit icon"
                width={13}
                height={13}
              />
              ویرایش اطلاعات
            </button>
          )}
        </div>

        {editSection === "bank" ? (
          <form
            onSubmit={bankForm.handleSubmit(handleBankSave)}
            className={styles.form}
          >
            <div className={styles.formGrid}>
              <div>
                <input
                  placeholder="شماره کارت"
                  {...bankForm.register("debitCard_code")}
                  defaultValue={user?.payment?.debitCard_code || ""}
                />
                <p className={styles.error}>
                  {bankForm.formState.errors.debitCard_code?.message}
                </p>
              </div>
              <div>
                <input
                  placeholder="شماره شبا (IR...)"
                  {...bankForm.register("shaba_code")}
                  defaultValue={user?.payment?.shaba_code || ""}
                />
                <p className={styles.error}>
                  {bankForm.formState.errors.shaba_code?.message}
                </p>
              </div>
              <div>
                <input
                  placeholder="نام حساب / شناسه"
                  {...bankForm.register("accountIdentifier")}
                  defaultValue={user?.payment?.accountIdentifier || ""}
                />
                <p className={styles.error}>
                  {bankForm.formState.errors.accountIdentifier?.message}
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.saveBtn}>
                ذخیره
              </button>
              <button
                type="button"
                onClick={() => setEditSection(null)}
                className={styles.cancelBtn}
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.infoGrid}>
            <div>
              <span>شماره شبا</span>
              <p>{user?.payment?.shaba_code || "-"}</p>
            </div>
            <div>
              <span>شماره کارت</span>
              <p>{user?.payment?.debitCard_code || "-"}</p>
            </div>
            <div>
              <span>شماره حساب</span>
              <p>{user?.payment?.accountIdentifier || "-"}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileTabPage;
