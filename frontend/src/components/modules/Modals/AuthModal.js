import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

import Image from "next/image";
import Modal from "./Modal";
import styles from "./AuthModal.module.css";

import { phoneSchema } from "@/validation/validationSchemas";
import { formatTime, toFarsiNumber } from "@/utils/helper";
import { useCheckOtp, useSendOtp } from "@/hooks/useAuth";

const AuthModal = ({ open, onClose }) => {
  const [step, setStep] = useState("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const { mutateAsync: sendOtp, isPending: sendingOtp } = useSendOtp();
  const { mutateAsync: checkOtp, isPending: checkingOtp } = useCheckOtp();

  useEffect(() => {
    if (open) {
      setStep("phone");
      setMobile("");
      setOtp("");
      setTimeLeft(0);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "otp") return;
    setTimeLeft(120);

    const interval = setInterval(
      () => setTimeLeft((prev) => Math.max(prev - 1, 0)),
      1000
    );
    return () => clearInterval(interval);
  }, [step]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(phoneSchema) });

  const handleSendOtp = async (phoneNumber = mobile) => {
    try {
      await sendOtp(phoneNumber);
      if (step === "phone") setMobile(phoneNumber);
      setStep("otp");
      setTimeLeft(120);
      toast.success("کد تایید ارسال شد");
    } catch (err) {
      toast.error(err.response?.data?.message || "خطا در ارسال کد");
    }
  };

  const onSubmitPhone = (data) => handleSendOtp(data.phone);

  const onSubmitOtp = async () => {
    try {
      await checkOtp({ mobile, code: otp });
      toast.success("ورود موفقیت‌آمیز بود");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "کد تایید اشتباه است");
      setOtp("");
    }
  };

  return (
    <Modal open={open}>
      <div className={styles.modalHeader}>
        {step === "phone" ? (
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <Image
              src="/icons/closeBtn.svg"
              alt="close icon"
              width={40}
              height={40}
            />
          </button>
        ) : (
          <button
            className={styles.modalBackBtn}
            onClick={() => setStep("phone")}
          >
            <Image
              src="/icons/backBtn.svg"
              alt="back icon"
              width={30}
              height={30}
            />
          </button>
        )}
      </div>

      {step === "phone" ? (
        <PhoneStep
          onSubmit={handleSubmit(onSubmitPhone)}
          register={register}
          errors={errors}
          isLoading={sendingOtp}
        />
      ) : (
        <OtpStep
          mobile={mobile}
          otp={otp}
          setOtp={setOtp}
          timeLeft={timeLeft}
          onResend={handleSendOtp}
          onSubmitOtp={onSubmitOtp}
          isResending={sendingOtp}
          isVerifying={checkingOtp}
        />
      )}
    </Modal>
  );
};

export default AuthModal;

// PhoneStep / OtpStep Components

const PhoneStep = ({ onSubmit, register, errors, isLoading }) => (
  <form onSubmit={onSubmit} className={styles.form}>
    <h2 className={styles.title}>ورود به تورینو</h2>
    <p className={styles.subtitle}>شماره موبایل خود را وارد کنید</p>

    <input
      {...register("phone")}
      pattern="[0-9۰-۹]+"
      placeholder="مثال : ۰۹۱۲۳۴۵۶۷۸۹"
      className={styles.input}
    />
    {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

    <button type="submit" className={styles.submitBtn} disabled={isLoading}>
      {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
    </button>
  </form>
);

const OtpStep = ({
  mobile,
  otp,
  setOtp,
  timeLeft,
  onResend,
  onSubmitOtp,
  isResending,
  isVerifying,
}) => (
  <div className={styles.form}>
    <h2 className={styles.title}>کد تایید</h2>
    <p>کد تایید به شماره &quot;{toFarsiNumber(mobile)}&quot; ارسال شد</p>
    <div className={styles.otpWrapper}>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        isInputNum
        shouldAutoFocus
        renderInput={(props) => <input {...props} />}
        inputStyle={styles.otpInput}
      />
    </div>

    <button
      onClick={onSubmitOtp}
      disabled={otp.length !== 6 || isVerifying}
      className={styles.submitBtn}
    >
      {isVerifying ? "در حال بررسی..." : "تایید"}
    </button>

    <div className={styles.resendWrapper}>
      {timeLeft > 0 ? (
        <p>
          تا ارسال مجدد کد: <span>{formatTime(timeLeft)}</span>
        </p>
      ) : (
        <button
          onClick={() => onResend()}
          className={styles.resendBtn}
          disabled={isResending}
        >
          {isResending ? "در حال ارسال..." : "ارسال مجدد کد"}
        </button>
      )}
    </div>
  </div>
);
