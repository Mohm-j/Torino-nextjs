import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user";
import { getCookie, setCookie, removeCookie } from "@/lib/cookie";
import { checkOtp, getNewAccessToken, sendOtp } from "@/services/auth";
import { toast } from "react-toastify";

// useAuth

export const useAuth = () => {
  const fetchProfile = async () => {
    let accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!accessToken && refreshToken) {
      try {
        const tokens = await getNewAccessToken(refreshToken);
        if (tokens?.accessToken) {
          setCookie("accessToken", tokens.accessToken, 30);
          if (tokens.refreshToken)
            setCookie("refreshToken", tokens.refreshToken, 365);
          accessToken = tokens.accessToken;
        }
      } catch (err) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        throw err;
      }
    }

    if (!accessToken) return null;
    return getUserProfile();
  };

  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchProfile,
    enabled: !!getCookie("accessToken") || !!getCookie("refreshToken"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// useRequireAuth

export const useRequireAuth = () => {
  const { data: user } = useAuth();

  const ensureAuth = async () => {
    if (user) return true;

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!accessToken && refreshToken) {
      try {
        const tokens = await getNewAccessToken(refreshToken);
        if (tokens?.accessToken) {
          setCookie("accessToken", tokens.accessToken, 30);
          if (tokens.refreshToken)
            setCookie("refreshToken", tokens.refreshToken, 365);
          return true;
        }
      } catch (err) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
      }
    }

    window.dispatchEvent(new CustomEvent("openLoginModal"));
    return false;
  };

  return { ensureAuth };
};

// useSendOtp

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (mobile) => sendOtp(mobile),
  });
};

// useCheckOtp

export const useCheckOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mobile, code }) => checkOtp(mobile, code),

    onSuccess: async (data) => {
      setCookie("accessToken", data.accessToken, 30);
      setCookie("refreshToken", data.refreshToken, 365);

      try {
        const profile = await getUserProfile();
        queryClient.setQueryData(["auth"], profile);
      } catch (error) {
        console.error(" خطا در دریافت پروفایل کاربر:", error);
      }
    },

    onError: (error) => {
      console.error(" خطا در تأیید کد:", error);
    },
  });
};

// useLogout

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    queryClient.invalidateQueries(["auth"]);
    toast.success("با موفقیت از حساب کاربری خارج شدید");
  };
};
