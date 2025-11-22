import axios from "axios";

// const API = "http://localhost:3000/api/coupon";
const API = "https://aspro-it-backend.onrender.com/api/coupon";

const config = {
  withCredentials: true,
};

// Create Coupon
export const addCoupon = async (data) => {
  const res = await axios.post(`${API}/add`, data, config);
  return res.data;
};

// Edit Coupon
export const editCoupon = async (couponId, data) => {
  const res = await axios.put(`${API}/edit/${couponId}`, data, config);
  return res.data;
};

// Delete Coupon
export const deleteCoupon = async (couponId) => {
  const res = await axios.delete(`${API}/delete/${couponId}`, config);
  return res.data;
};

// Apply Coupon
export const applyCoupon = async (data) => {
  const res = await axios.post(`${API}/apply`, data, config);
  return res.data;
};

// Get All Coupons
export const getAllCoupons = async () => {
  const res = await axios.get(`${API}/all`, config);
  return res.data;
};

// Get Single Coupon
export const getCoupon = async (couponId) => {
  const res = await axios.get(`${API}/${couponId}`, config);
  return res.data;
};

// Get Total Coupons
export const totalCoupons = async () => {
  const res = await axios.get(`${API}/total`, config);
  return res.data;
};
