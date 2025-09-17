import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/auth`; // backend URL
console.log('auth.js => triggered')

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
