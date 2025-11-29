// src/api/auth.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000/api/user", 
  baseURL: "https://aspro-it-backend.onrender.com/api/user", 

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

export default api;
