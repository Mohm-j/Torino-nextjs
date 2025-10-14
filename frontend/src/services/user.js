import API from "@/lib/api";

// getData
export const getUserProfile = async () => {
  const res = await API.get("/user/profile");
  return res.data;
};

// editData

export const updateUserProfile = async (updatedData) => {
  const res = await API.put("/user/profile", updatedData);
  return res.data;
};

// user all tours

export const getUserTours = async () => {
  const res = await API.get("/user/tours");
  return res.data;
};

// user all transactions

export const getUserTransactions = async () => {
  const res = await API.get("/user/transactions");
  return Array.isArray(res.data) ? res.data : [];
};
