// src/api/auth.js
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const BASE_URL = isProduction
  ? "https://aspro-it-backend.onrender.com/api/user"
  : "http://localhost:3000/api/user";

const api = axios.create({
  baseURL: BASE_URL,

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const googleAuth = async (googleToken) => {
  const res = await api.post("/google", {token:googleToken });
  return res.data;
};
// Register
export const registerUser = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

// Login
export const loginUser = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

// Get logged-in user info 
export const getUserInfo = async () => {
  const res = await api.get("/get-info");
  return res.data;
};

// Logout
export const logoutUser = async () => {
  const res = await api.post("/logout");
  return res.data;
};

// Refresh token
export const refreshToken = async () => {
  const res = await api.post("/refresh-token");
  return res.data;
};

// Reset Password
export const resetPassword = async (email, newPassword) => {
  const res = await api.post("/change-password", { email, newPassword });
  return res.data;
};

export default api;
