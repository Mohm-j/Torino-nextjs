import API from "@/lib/api";

export const getBasket = async () => {
  const res = await API.get("/basket");
  return res.data;
};

export const addToBasket = async (tourId) => {
  const res = await API.put(`/basket/${tourId}`);
  return res.data;
};
