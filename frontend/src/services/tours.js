import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// get all tours
export const getTours = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${BASE_URL}/tour${params ? `?${params}` : ""}`);
  return res.data;
};

// get tour by id
export const getTourById = async (id) => {
  const res = await axios.get(`${BASE_URL}/tour/${id}`);
  return res.data;
};
