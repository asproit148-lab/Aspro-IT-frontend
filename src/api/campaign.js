import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const API = isProduction
  ? "https://aspro-it-backend.onrender.com/api/banner" // Live/Production URL
  : "http://localhost:3000/api/banner";

export const getBanners = () => axios.get(API);

export const addBanner = (formData) =>
  axios.post(`${API}/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBanner = (id) => axios.delete(`${API}/${id}`);
export const totalBanners = () => axios.get(`${API}/total`);