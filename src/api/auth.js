import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/auth"; // backend URL

export const registerUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
