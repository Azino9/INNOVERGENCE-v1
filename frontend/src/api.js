import axios from "axios";

export const BASE_URL = "https://mlsc-admin-backend-1.onrender.com/api"; 

const api = axios.create({
  baseURL: BASE_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
