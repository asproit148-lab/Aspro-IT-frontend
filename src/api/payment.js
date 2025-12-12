import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const API = isProduction
  ? "https://aspro-it-backend.onrender.com/api/payment" // Live/Production URL
  : "http://localhost:3000/api/payment";

// Axios config
const config = {
  withCredentials: true,
};

// Submit payment
export const submitPayment = async (courseId, file) => {
  const formData = new FormData();
  formData.append("paymentScreenshot", file);

  const res = await axios.post(`${API}/submit/${courseId}`, formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Get user's payments
export const getUserPayments = async () => {
  const res = await axios.get(`${API}/my-payments`, config);
  return res.data;
};

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  const res = await axios.get(`${API}/${paymentId}`, config);
  return res.data;
};

// Admin: get all payments
export const getAllPayments = async (status) => {
  const url = status ? `${API}/admin/all?status=${status}` : `${API}/admin/all`;
  const res = await axios.get(url, config);
  return res.data;
};

// Admin: get pending payments
export const getPendingPayments = async () => {
  const res = await axios.get(`${API}/admin/pending`, config);
  return res.data;
};

// Admin: approve payment
export const approvePayment = async (paymentId) => {
  const res = await axios.put(`${API}/admin/approve/${paymentId}`, {}, config);
  return res.data;
};

// Admin: reject payment
export const rejectPayment = async (paymentId) => {
  const res = await axios.put(`${API}/admin/reject/${paymentId}`, {}, config);
  return res.data;
};

// Admin: stats
export const getPaymentStats = async () => {
  const res = await axios.get(`${API}/admin/stats`, config);
  return res.data;
};
