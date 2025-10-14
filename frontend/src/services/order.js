import API from "@/lib/api";

export const createOrder = async (orderData) => {
  const res = await API.post("/order", orderData);
  return res.data;
};