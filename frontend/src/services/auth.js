import API from "@/lib/api";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const sendOtp = async (mobile) => {
  const res = await API.post("/auth/send-otp", { mobile });
  return res.data;
};

export const checkOtp = async (mobile, code) => {
  const res = await API.post("/auth/check-otp", { mobile, code });
  return res.data;
};


export const getNewAccessToken = async (refreshToken) => {
  const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
    refreshToken,
  });
  return res.data;
};
