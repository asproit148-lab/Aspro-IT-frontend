import axios from "axios";

const API = "http://localhost:3000/api/banner";

export const getBanners = () => axios.get(API);
export const addBanner = (data) => axios.post(`${API}/add`, data);
export const deleteBanner = (id) => axios.delete(`${API}/${id}`);
export const totalBanners = () => axios.get(`${API}/total`);