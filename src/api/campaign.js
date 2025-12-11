import axios from "axios";

const API = "http://localhost:3000/api/banner";
// const API = "https://aspro-it-backend.onrender.com/api/banner";

export const getBanners = () => axios.get(API);

export const addBanner = (formData) =>
  axios.post(`${API}/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBanner = (id) => axios.delete(`${API}/${id}`);
export const totalBanners = () => axios.get(`${API}/total`);